Compliance Assistant – Take-Home Assignment

A full-stack web application that demonstrates chat-driven compliance assistance powered by the Vercel AI SDK and OpenAI function (tool) calling.

The current code base provides a working scaffold with a real chat endpoint, three example tools, and a minimal UI that you can extend to meet the rest of the challenge requirements.

⸻

✨ Implemented Features

Category	Details
Framework & Tooling	Next.js 15 (App Router) • TypeScript • Tailwind CSS • ESLint/Prettier
AI Integration	Vercel AI SDK → openai.chat() with tool-calling support
Chat Endpoint	src/app/api/chat/route.ts collects user / assistant messages, calls OpenAI, and streams responses
Example Tools	summarize • check_clauses • generate_privacy_notice declared in src/lib/toolDefinitions.ts
Tool API Routes	Each tool has its own route under src/app/api/tools/ with basic validation & error handling
UI	Simple chat page (src/app/page.tsx) and demo dashboard (src/app/dashboard/) with a search bar and grouped results
Styling	Tailwind configured via tailwind.config.mjs; global styles in src/app/globals.css
Scripts	dev, build, start, lint defined in package.json

Note: The supplier risk database and related search tool are not yet implemented. See the Roadmap below.

⸻

🏗️  Project Structure (high level)

└── src/
    ├── app/
    │   ├── api/
    │   │   ├── chat/route.ts         # Chat completion endpoint
    │   │   └── tools/                # One route per tool
    │   ├── dashboard/                # Demo dashboard (client component)
    │   └── page.tsx                  # Chat UI
    ├── lib/
    │   └── toolDefinitions.ts        # OpenAI tool schema & typings
    └── types/                        # Shared TypeScript types
├── public/
├── tailwind.config.mjs
└── tsconfig.json


⸻

🚀 Getting Started

Prerequisites
	•	Node 18 LTS or newer
	•	An OpenAI API key (OPENAI_API_KEY)

1. Clone & Install

git clone https://github.com/your-user/compliance-assistant.git
cd compliance-assistant
npm install    # or npm / yarn

2. Environment Variables

Create a .env.local file at the project root:

OPENAI_API_KEY=sk-...

3. Run Locally

npm dev

Open http://localhost:3000 in your browser.

4. Build & Start (optional)

npm build && npm start


⸻

⚙️ Useful Scripts

Command	Purpose
npm dev	Start local dev server with hot reload
npm build	Create a production build
npm start	Start the production server (after build)
npm lint	Run ESLint


⸻

🗺️  Roadmap / Next Steps
	1.	Supplier Risk Module
	•	Seed an in-memory/mock database with 8-10 suppliers (name, riskScore 1-10, riskCategories, location, industry).
	•	Add a query_suppliers tool that supports natural-language filters (top N by risk, by industry, by category).
	2.	Enhanced UX
	•	Loading & typing indicators in the chat.
	•	Validation & error states in forms.
	3.	Testing
	•	Configure Jest + Testing Library.
	•	Write unit tests for tool routes and utility functions.
	4.	Deployment
	•	Add a Vercel deployment workflow (vercel.json or GitHub Actions) and update this README with live link.
	5.	Documentation
	•	Technical architecture diagram and detailed API docs.

Feel free to fork and continue building! PRs are welcome if you spot an issue.

⸻

🪪 License

This project is provided for assessment purposes and is distributed under the MIT License.