"use client";
import { useState } from "react";

export default function ToolResultGroup({
  title,
  results
}: {
  title: string;
  results: { input: string; output: string }[];
}) {
  const [open, setOpen] = useState(true);

  if (!results.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      {/* Section Header */}
      <div
        className="flex justify-between items-center cursor-pointer mb-4"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <span className="text-lg text-blue-500 font-bold">{open ? "−" : "+"}</span>
      </div>

      {/* Tool Result Cards */}
      {open && (
        <div className="space-y-4">
          {results.map((res, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm hover:shadow transition"
            >
              <div className="text-xs text-gray-500 mb-1">Input:</div>
              <div className="text-sm text-gray-800 mb-2">{res.input}</div>

              <div className="text-xs text-gray-500 mb-1">Result:</div>
              <div className="text-sm font-medium text-gray-900 whitespace-pre-wrap">
                {res.output}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}