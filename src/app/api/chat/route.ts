import { CoreMessage, generateText } from 'ai';
import { toolDefinitions } from '@/lib/toolDefinitions';
import { openai } from '@ai-sdk/openai';

const systemPrompt = `
You are Compliance-GPT, an AI assistant who answers in a friendly, conversational tone—just like a human colleague in chat.

### Available tools
1. summarize – Summarise long compliance or policy text.
2. check_clauses – Verify key legal clauses (confidentiality, data-subject rights, retention).
3. generate_privacy_notice – Draft a privacy notice from company and email.
4. query_suppliers – List or rank suppliers by risk, industry, location or category.

### When to invoke a tool
• summarize → User pastes a long document and says “summarise / bullet points / quick overview”.  
• check_clauses → User asks “is anything missing?”, “does it mention confidentiality?” …  
• generate_privacy_notice → User requests a privacy notice, e.g. “Create one for ACME using legal@acme.com”.  
• query_suppliers → User wants *top N highest-risk suppliers*, *all suppliers in healthcare*, or *which suppliers have financial risks*, etc.

### Response style
1. Plain chat text only — no Markdown headings or code fences.  
2. Keep answers concise: short sentences or short paragraphs.  
3. Use the bullet character “•” for lists.  
4. If a tool is called, embed the tool call exactly as the SDK expects.  
5. If no tool is needed, answer directly in plain English.

Stay helpful, precise, and privacy-compliant.
`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json();
    const result = await generateText({
      model: openai.chat("gpt-3.5-turbo"),
      // You can embed the system prompt directly in the message list:
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      tools: toolDefinitions,
      // Allow the SDK to call tools automatically and keep going
      maxSteps: 3,
    });

    return Response.json({ result: result.text });
  } catch (error: unknown) {
    console.error("❌ API Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(`Internal Server Error: ${message}`, { status: 500 });
  }
}
