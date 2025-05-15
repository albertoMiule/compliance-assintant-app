Compliance Assistant – Full-Stack Take-Home

A Next.js 15 application that demonstrates chat-driven compliance workflows powered by the Vercel AI SDK (OpenAI “tool calling”). The repo is intentionally small yet production-ready: run it locally in seconds, deploy to Vercel in two clicks.

⸻

✨ Feature Summary
	•	Framework & Tooling: Next.js 15, TypeScript, Tailwind CSS, ESLint/Prettier
	•	AI Integration: Vercel AI SDK with OpenAI chat completions and automatic tool calling
	•	Tools Available: summarize, check_clauses, generate_privacy_notice, query_suppliers
	•	Supplier Risk Module: 10-item mock DB with filters (top-N, industry, location, risk category, risk range, sort)
	•	Chat UX: Markdown rendering, Send-button spinner, three-dot typing indicator
	•	Prompt Kit: Ready-to-use queries in PROMPTS.md
	•	Testing: Jest + React Testing Library scaffold (sample test for query_suppliers)

⸻

📁 Project Structure

src/
 ├─ app/
 │  ├─ api/
 │  │   ├─ chat/route.ts        # unified chat endpoint (AI + tools)
 │  │   └─ tools/…             # optional: per-tool routes if you externalise logic
 │  ├─ page.tsx                # chat UI (client component)
 │  └─ dashboard/…            # demo dashboard to extend
 ├─ data/suppliers.ts         # mock supplier risk dataset
 ├─ lib/toolDefinitions.ts    # 4 OpenAI tools + typings
 └─ tests/…                   # Jest unit tests


⸻

🛠️ Local Development

Prerequisites
	•	Node 18 LTS or newer
	•	An OpenAI API key with chat permissions

1  Clone & Install

git clone https://github.com/your-user/compliance-assistant.git
cd compliance-assistant
pnpm install               # or npm / yarn

2  Environment Variables (.env.local)

# Required
OPENAI_API_KEY=sk-...

# Optional overrides
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_MODEL=gpt-3.5-turbo

3  Start the Dev Server

pnpm dev

Open http://localhost:3000 and start chatting.

⸻

🔑 Environment Variables in Production (Vercel)

Set these in Vercel → Project → Settings → Environment Variables:
	•	OPENAI_API_KEY – your production key
	•	OPENAI_MODEL (optional) – defaults to gpt-3.5-turbo

Vercel injects them at build-time and runtime (process.env.*). No code changes required.

⸻

🚀 Deploying to Vercel
	1.	Push the repo to GitHub/GitLab.
	2.	In the Vercel Dashboard click ➕ Add New → Project and import the repo.
	3.	Vercel auto-detects: Framework = Next.js, Build Command =pnpm build, Output Dir =.vercel/output.
	4.	Add the env variables above.
	5.	Click Deploy → in ~60 s your Production URL (e.g. https://<project>.vercel.app) is live.
	6.	(Optional) Add a custom domain:

vercel domains add compliance-assistant.com

⸻

🤖 Usage Examples

Try these in the chat:
	•	“What are the top 3 suppliers with the highest risk scores?”
	•	“Show me suppliers in the healthcare industry.”
	•	“Generate a privacy notice for ACME Corp using privacy@acme.com.”
	•	“Summarise this policy: … ”

More prompts in PROMPTS.md.

⸻

🏗️ Scripts
	•	pnpm dev – start dev server with hot reload
	•	pnpm build – create production build
	•	pnpm start – run built app locally (PORT=3000)
	•	pnpm lint – run ESLint + Prettier
	•	pnpm test – run Jest tests

⸻

🗺️ Roadmap
	•	Persist supplier data in SQLite / Vercel Postgres
	•	Upload PDFs and summarise chunks with embeddings
	•	Role-based auth (NextAuth.js or Vercel Secure Compute)
	•	CI workflow that lints & tests before auto-deploy

⸻

🪪 License

MIT – feel free to fork; attribution appreciated.