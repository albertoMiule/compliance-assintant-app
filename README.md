Compliance Assistant – Full-Stack Take-Home

A tiny but production-ready Next.js 15 web app that showcases chat-driven compliance workflows powered by the Vercel AI SDK (OpenAI tool calling). Clone, run, or deploy to Vercel in under five minutes.

⸻

✨ Features
	•	Framework & Tooling – Next.js 15, TypeScript, Tailwind CSS, ESLint/Prettier
	•	AI Integration – Vercel AI SDK with automatic OpenAI tool calling
	•	Built-in Tools – summarize, check_clauses, generate_privacy_notice, query_suppliers
	•	Supplier Risk Module – 10-item mock DB with filters (top-N, industry, location, risk category, risk range, custom sort)
	•	Chat UX – Markdown rendering, Send-button spinner, three-dot typing indicator, first-time welcome message
	•	Prompt Kit – Handy examples in PROMPTS.md
	•	Testing – Jest 29 + React Testing Library starter suite

⸻

📁 Project Structure

src/
 ├─ app/
 │  ├─ api/
 │  │   └─ chat/route.ts        # unified chat + tool endpoint
 │  ├─ page.tsx                # chat UI (client component)
 │  └─ dashboard/…             # placeholder for extra pages
 ├─ data/suppliers.ts          # mock supplier-risk dataset
 ├─ lib/toolDefinitions.ts     # all OpenAI tools
 └─ tests/…                    # Jest unit tests


⸻

🛠️ Local Setup

Prerequisites
	•	Node 18 LTS or newer
	•	An OpenAI API key with chat capability

1  Clone & Install

git clone https://github.com/your-user/compliance-assistant.git
cd compliance-assistant
pnpm install            # or npm / yarn

2  Create .env.local

OPENAI_API_KEY=sk-…
# Optional overrides
# OPENAI_MODEL=gpt-3.5-turbo
# OPENAI_BASE_URL=https://api.openai.com/v1

3  Run Dev Server

pnpm dev

Visit http://localhost:3000 and start chatting.

⸻

🔑 Environment Variables (Production)

Add these in Vercel → Project → Settings → Environment Variables:

Name	Example	Scope
OPENAI_API_KEY	sk-prod-xxxxxxxx	Production + Preview
OPENAI_MODEL*	gpt-3.5-turbo	Production + Preview

*Optional – defaults to gpt-3.5-turbo if omitted.

⸻

🚀 Deploy to Vercel

# one-time: install CLI & log in
npm i -g vercel
vercel login

# inside project root
vercel link                        # create / link project
vercel env add OPENAI_API_KEY prod # paste key when prompted
vercel --prod                      # build & deploy

A live URL like https://your-project.vercel.app appears in ~60 s.

⸻

🤖 Quick Prompts
	•	Top suppliers – “What are the top 3 suppliers with the highest risk scores?”
	•	Industry filter – “Show me suppliers in the healthcare industry.”
	•	Generate notice – “Draft a privacy notice for ACME Corp using privacy@acme.com.”
	•	Summarise doc – “Summarise the following policy: … ”

More in PROMPTS.md.

⸻

🏗️ Scripts

Script	Description
pnpm dev	Start dev server with hot reload
pnpm build	Production build
pnpm start	Run built app (PORT=3000)
pnpm lint	ESLint + Prettier
pnpm test	Jest unit tests


⸻

🗺️ Roadmap
	•	Persist supplier data in SQLite / Vercel Postgres
	•	PDF upload + embedding summaries
	•	Auth via NextAuth.js
	•	CI workflow for lint + test pre-deploy

⸻

🪪 License

MIT – free to use, modify, and share.