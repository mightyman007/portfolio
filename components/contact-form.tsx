"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && json.ok) {
        setStatus("success");
        setMessage("Message sent — I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(json.error ?? "Something went wrong. Try again in a bit.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error — check your connection and try again.");
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* honeypot — hidden from humans, catnip for bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-muted">
            name
          </label>
          <input id="name" name="name" required minLength={2} maxLength={100} placeholder="Ada Lovelace" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-muted">
            email
          </label>
          <input id="email" name="email" type="email" required maxLength={200} placeholder="you@example.com" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-muted">
          message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="What's on your mind?"
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? (
            <span className="size-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
          ) : (
            <Send className="size-4" />
          )}
          {status === "sending" ? "sending…" : "send message"}
        </button>

        {(status === "success" || status === "error") && (
          <p
            role="status"
            className={`text-sm ${status === "success" ? "text-accent" : "text-red-400"}`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
