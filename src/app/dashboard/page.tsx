// src/app/dashboard/page.tsx
"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ToolResultGroup from "../components/ToolResultGroup";

// Dummy example data — replace with your actual stored results
const MOCK_DATA = {
  summarize: [
    { input: "GDPR summary", output: "• GDPR requires consent..." }
  ],
  check_clauses: [
    { input: "Privacy terms", output: "⚠️ Missing: data subject" }
  ],
  generate_privacy_notice: [
    { input: "ACME Corp + legal@acme.com", output: "This privacy notice is..." }
  ]
};

export default function DashboardPage() {
  const [search, setSearch] = useState("");

  const filter = (items: { input: string; output: string }[]) =>
    items.filter(
      (item) =>
        item.input.toLowerCase().includes(search.toLowerCase()) ||
        item.output.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-1000">Tool Results Dashboard</h1>
      <SearchBar value={search} onChange={setSearch} />

      <ToolResultGroup title="Summaries" results={filter(MOCK_DATA.summarize)} />
      <ToolResultGroup title="Clause Check" results={filter(MOCK_DATA.check_clauses)} />
      <ToolResultGroup title="Privacy Notices" results={filter(MOCK_DATA.generate_privacy_notice)} />
    </div>
  );
}