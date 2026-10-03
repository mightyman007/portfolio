import { NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { checkContactRateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email().max(200),
  message: z.string().min(10).max(2000),
});

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // honeypot filled → almost certainly a bot; return fake success and drop it
  const { website: honeypot } = (body ?? {}) as Record<string, unknown>;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return Response.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please check your fields and try again." },
      { status: 400 },
    );
  }

  const rl = await checkContactRateLimit(clientIp(request));
  if (!rl.success) {
    return Response.json(
      { ok: false, error: "Too many messages from you — try again in a bit." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // not configured yet — surface the direct email as the fallback
    console.warn("[contact] RESEND_API_KEY not set; dropping message:", parsed.data);
    return Response.json(
      {
        ok: false,
        error: `Contact service is still warming up — email me directly at ${site.email}.`,
      },
      { status: 503 },
    );
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: [site.email],
    replyTo: `${name} <${email}>`,
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("[contact] resend error:", error);
    return Response.json(
      { ok: false, error: "Couldn't send your message — try again or email me directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
