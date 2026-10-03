"use client";

import { useEffect, useState } from "react";

type ScriptLine = {
  /** prompt lines are typed as commands (with a `$ ` prefix); others are output */
  prompt?: boolean;
  text: string;
  className?: string;
};

const SCRIPT: ScriptLine[] = [
  { prompt: true, text: "whoami" },
  { text: "John Pham — Full-Stack Developer · Bay Area, CA" },
  { prompt: true, text: "cat ./mission.txt" },
  {
    text: "Leveling up through the 100 Devs program. Building for the web, one commit at a time.",
    className: "text-muted",
  },
  { prompt: true, text: "ls ./links" },
  { text: "github/  linkedin/  x/  email/", className: "text-accent" },
];

export function TerminalHero() {
  const [reduced, setReduced] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced || lineIdx >= SCRIPT.length) return;
    const current = SCRIPT[lineIdx];
    const speed = current.prompt ? 65 : 14;
    const initialPause = charIdx === 0 ? (current.prompt ? 150 : 350) : speed;
    const t = setTimeout(() => {
      if (charIdx < current.text.length) {
        setCharIdx((c) => c + 1);
      } else {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }
    }, initialPause);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, reduced]);

  const done = lineIdx >= SCRIPT.length;
  const visibleLines = reduced ? SCRIPT : SCRIPT.slice(0, lineIdx);
  const current = !reduced && !done ? SCRIPT[lineIdx] : undefined;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/40">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">john@dev: ~</span>
      </div>

      {/* typed content */}
      <div className="min-h-[13.5rem] space-y-1.5 p-5 font-mono text-sm leading-relaxed sm:p-6 sm:text-base">
        {visibleLines.map((line, i) => (
          <p key={i} className={line.className}>
            {line.prompt && <span className="mr-2 text-accent">$</span>}
            {line.text}
          </p>
        ))}
        {current && (
          <p className={current.className}>
            {current.prompt && <span className="mr-2 text-accent">$</span>}
            {current.text.slice(0, charIdx)}
            <span className="caret ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent" />
          </p>
        )}
        {done && (
          <p>
            <span className="mr-2 text-accent">$</span>
            <span className="caret ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent" />
          </p>
        )}
      </div>
    </div>
  );
}
