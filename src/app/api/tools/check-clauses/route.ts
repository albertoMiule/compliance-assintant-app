export async function POST(req: Request) {
  const { content } = await req.json();
  const required = ["confidentiality", "retention", "data subject"];
  const lower = content.toLowerCase();
  const missing = required.filter(term => !lower.includes(term));
  const result = missing.length === 0
    ? "✅ All required clauses are present."
    : `⚠️ Missing clauses: ${missing.join(", ")}`;
  return Response.json({ result });
}