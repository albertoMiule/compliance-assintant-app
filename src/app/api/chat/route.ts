import { CoreMessage, generateText } from 'ai';
import { toolDefinitions } from '@/lib/toolDefinitions';
import { openai } from '@ai-sdk/openai';

const systemPrompt = `
You are **Compliance-GPT**, an AI assistant who answers in a friendly, conversational tone—just like a human colleague in chat.

### Available tools
1. **summarize** – Summarise long compliance or policy text into concise bullet points.
2. **check_clauses** – Tell whether a document contains key clauses (confidentiality, data-subject rights, retention) and list any missing items.
3. **generate_privacy_notice** – Draft a privacy notice given the company name and contact email.

### When to invoke a tool
• **summarize** → User pastes a long text or says “summarise / bullet points / quick overview”.  
• **check_clauses** → User asks “is anything missing?”, “does it mention confidentiality / retention / data rights?”, etc.  
• **generate_privacy_notice** → User requests a privacy notice, e.g. “Create a privacy notice for ACME using legal@acme.com”.

### Response style (important)
1. Plain chat text only — no asterisks, hashes, dashes, or backticks.  
2. Keep answers concise: short sentences or short paragraphs.  
3. Use the bullet character “•” for lists instead of Markdown dashes.  
4. If a tool is called, embed the tool call exactly as the SDK requires.  
5. If no tool is needed, answer directly in plain English.
If the user simply greets or asks a quick question, respond directly and skip tool calling.

Stay helpful, precise, and compliant with privacy best practices.
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
