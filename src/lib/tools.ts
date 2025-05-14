const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// 1. Summarize tool
export async function summarize({ text }: { text: string }) {
  const response = await fetch(`${baseUrl}/api/tools/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const data = await response.json();
  return { result: data.result };
}

// 2. Clause checker
export async function check_clauses({ content }: { content: string }) {
  const response = await fetch(`${baseUrl}/api/tools/check-clauses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });
  const data = await response.json();
  return { result: data.result };
}

// 3. Privacy notice generator
export async function generate_privacy_notice({
  company,
  email
}: {
  company: string;
  email: string;
}) {
  const response = await fetch(`${baseUrl}/api/tools/privacy-notice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company, email })
  });
  const data = await response.json();
  return { result: data.result };
}

// Export all
export const tools = {
  summarize,
  check_clauses,
  generate_privacy_notice
};