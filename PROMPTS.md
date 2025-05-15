🎬 DEMO PROMPTS FOR YOUR COMPLIANCE ASSISTANT

Below is a curated set of copy-and-paste prompts you can use while demoing your assistant’s main capabilities.

⸻

✅ 1. Summarize a Policy (Triggers summarize tool)

Prompt

Summarize the following privacy-policy excerpt in concise bullet points:

Our organization collects employee data such as name, address, and payroll information solely for HR purposes. All records are stored on encrypted servers located in the EU. The data is accessed only by authorized HR personnel and retained for the duration of employment plus seven years for tax-compliance reasons. We never share personal data with third parties except when legally required by government authorities.

⸻

✅ 2. Check Required Clauses (Triggers check_clauses tool)

Prompt

Does this document contain all required compliance clauses? Focus on confidentiality, data-subject rights, and retention policies. List any clause that is missing, please:

ACME Corp collects basic contact information (name, job title, work email) from business clients to provide software-as-a-service products. ACME agrees to protect the information from unauthorized disclosure. The contract is silent on how long the data is retained and does not discuss clients’ rights to access or delete their data.

⸻

✅ 3. Generate Privacy Notice (Triggers generate_privacy_notice tool)

Prompt

Draft a privacy notice for “GreenTech Solutions” using legal@greentech.com as the contact email.

⸻

✅ 4. Supplier Risk Module (Triggers suppliers tool)

Use these prompts to showcase dynamic querying of your mock supplier database.

What you’re testing	Demo Prompt
Top-N ranking	“What are the top 3 suppliers with the highest risk scores?”
Industry filter	“Show me every supplier in the healthcare industry.”
Risk-category filter	“Which suppliers have financial compliance risks?”
Location substring	“List suppliers located in Germany.”
Risk-score range	“Give me suppliers whose risk score is 6 or higher.”
Combined filters	“Find the top 2 suppliers in the manufacturing industry that have environmental risk.”
Name-sorted output	“Show all suppliers, sorted alphabetically by name.”
All filters combined	“From suppliers in the USA, list the three highest-risk ones with regulatory issues.”


⸻

Tip: Encourage demo observers to tweak numbers, industries, or risk categories to prove the assistant responds dynamically.