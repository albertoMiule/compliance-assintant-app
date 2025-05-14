"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    // The API returns JSON: { result: string }
    const { result } = await response.json();
    setMessages([...newMessages, { role: "assistant", content: result.trim() }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Compliance Assistant</h1>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-xs p-3 rounded-xl ${
                msg.role === "user"
                  ? "bg-green-600 text-white rounded-bl-none"
                  : "bg-gray-100 text-black border border-gray-300 rounded-br-none"
              }`}
            >
              {msg.role === "assistant" ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Input */}
      <footer className="p-4 bg-white flex gap-2 border-t">
        <input
          className="flex-1 border border-gray-400 rounded-lg p-2 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e);
            }
          }}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </footer>
    </div>
  );
}