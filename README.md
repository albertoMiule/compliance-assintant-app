# Compliance Assistant – Full‑Stack Take‑Home

A **Next.js 15** demo app that showcases **chat‑driven compliance workflows** powered by the **Vercel AI SDK** (OpenAI tool calling). Clone it, run it locally in seconds, or deploy to Vercel in a minute.

---

## ✨ Features

* **Modern stack:** Next.js 15, TypeScript, Tailwind CSS, ESLint/Prettier.
* **AI integration:** Vercel AI SDK → automatic OpenAI tool calling.
* **Built‑in tools:** `summarize`, `check_clauses`, `generate_privacy_notice`, `query_suppliers`.
* **Supplier Risk module:** 10‑item mock DB with powerful filters (top‑N, industry, location, risk category, risk range, custom sort).
* **Chat UX:** Markdown rendering, send‑button spinner, three‑dot typing indicator, welcome message.
* **Prompt kit:** Handy examples in [`PROMPTS.md`](./PROMPTS.md).
* **Testing:** Jest 29 + React Testing Library starter suite.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── chat/route.ts        # unified chat + tool endpoint
│   ├── page.tsx                # chat UI (client component)
│   └── dashboard/              # placeholder for extra pages
├── data/suppliers.ts           # mock supplier‑risk dataset
├── lib/toolDefinitions.ts      # all OpenAI tools
└── tests/                      # Jest unit tests
```

---

## 🛠️ Local Setup

### Prerequisites

* **Node ≥ 18 LTS**
* An **OpenAI API key** with `chat` capability

### 1  Clone & Install

```bash
git clone https://github.com/albertoMiule/compliance-assintant-app
cd compliance-assistant
pnpm install    # or npm / yarn
```

### 2  Create `.env.local`

```dotenv
OPENAI_API_KEY=sk-...
# Optional overrides
# OPENAI_MODEL=gpt-3.5-turbo
# OPENAI_BASE_URL=https://api.openai.com/v1
```

### 3  Run Dev Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and start chatting.

---

## 🔑 Environment Variables (Vercel)

| Name                        | Example            | Scope                |
| --------------------------- | ------------------ | -------------------- |
| `OPENAI_API_KEY`            | `sk-prod-xxxxxxxx` | Production & Preview |
| `OPENAI_MODEL` *(optional)* | `gpt-3.5-turbo`    | Production & Preview |

> If `OPENAI_MODEL` is omitted the app defaults to **gpt‑3.5‑turbo**.

---

## 🚀 Deploy to Vercel (CLI)

```bash
# one‑time: install CLI & log in
npm i -g vercel
vercel login

# inside project root — link & set secret
vercel link                        # create / link Vercel project
vercel env add OPENAI_API_KEY prod # paste key when prompted

# first production deploy
vercel --prod
```

A live URL such as `https://compliance-assistant-app.vercel.app` is available in \~60 s.

---

## 🤖 Quick Prompts

```text
What are the top 3 suppliers with the highest risk scores?
Show me suppliers in the healthcare industry.
Draft a privacy notice for ACME Corp using privacy@acme.com.
Summarise the following policy: … <paste text>
```

More examples in [`PROMPTS.md`](./PROMPTS.md).

---

## 🏗️ Scripts

| Command      | Description                         |
| ------------ | ----------------------------------- |
| `pnpm dev`   | Start dev server with hot reload    |
| `pnpm build` | Compile production build            |
| `pnpm start` | Run built app locally (`PORT=3000`) |
| `pnpm lint`  | Run ESLint + Prettier               |
| `pnpm test`  | Run Jest unit tests                 |

---

## 🗺️ Roadmap

* Persist supplier data in SQLite / Vercel Postgres.
* PDF upload + embedding summaries.
* Auth via NextAuth.js.
* CI workflow for lint + test before deploy.

---

## 🪪 License

[MIT](LICENSE) – free to use, modify, and share.
