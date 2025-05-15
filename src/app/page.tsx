/* ────────────────────────────────────────────────────────────────
   src/app/page.tsx   ←  overwrite everything with this version
────────────────────────────────────────────────────────────────── */
"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [isSending, setIsSending]         = useState(false);   // spinner on Send
  const [assistantTyping, setAssistantTyping] = useState(false); // “typing…” dots
  const bottomRef = useRef<HTMLDivElement>(null);

  /*  ---- ensure hydration only once ---- */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  /* ─── main send handler ─────────────────────────────────────── */
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    /* 1️⃣  optimistic user bubble */
    const next = [...messages, { role: "user", content: input } as const];
    setMessages(next);
    setInput("");

    /* 2️⃣  UI flags */
    setIsSending(true);
    setAssistantTyping(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" } as const]);

    /* 3️⃣  network call */
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });

    const { result } = await res.json();          // { result: string }

    /* 4️⃣  fill placeholder */
    setMessages((prev) => {
      const clone = [...prev];
      clone[clone.length - 1] = { role: "assistant", content: result.trim() } as const;      
      return clone;
    });

    /* 5️⃣  reset flags + autoscroll */
    setIsSending(false);
    setAssistantTyping(false);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ─── render ────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      {/* header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Compliance Assistant</h1>
      </header>

      {/* thread */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-xs p-3 rounded-xl ${
                m.role === "user"
                  ? "bg-green-600 text-white rounded-bl-none"
                  : "bg-gray-100 text-black border border-gray-300 rounded-br-none"
              }`}
            >
              {m.role === "assistant" ? <ReactMarkdown>{m.content}</ReactMarkdown> : m.content}
            </div>
          </div>
        ))}

        {/* typing indicator */}
        {assistantTyping && (
          <div className="flex gap-1 pl-6">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* input */}
      <footer className="p-4 bg-white flex gap-2 border-t">
        <input
          className="flex-1 rounded-lg border border-gray-400 bg-white text-gray-900
             p-2 outline-none focus:ring-2 focus:ring-blue-400
             placeholder:text-gray-400"          
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e);
            }
          }}
          placeholder="Type your message…"
        />

        <button
          onClick={sendMessage}
          disabled={isSending}
          className="relative px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-40"
        >
          {isSending ? (
            <>
              <span className="invisible">Send</span>
              <svg
                className="absolute inset-0 m-auto h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </>
          ) : (
            "Send"
          )}
        </button>
      </footer>
    </div>
  );
}