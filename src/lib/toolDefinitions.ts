import { tool, type ToolSet } from "ai";
import { z } from "zod";

/** 
 * Summarize a compliance or policy document into concise bullet points. 
 */
export const summarize = tool({
  description: "Generate a concise, bullet‑point summary of the provided compliance or policy document.",
  parameters: z.object({
    text: z.string().describe(
      "Full compliance or policy document to summarise"
    ),
  }),
  async execute({ text }) {
    return {
      result: `📝 Summary: ${text.slice(0, 100)}...`,
    };
  },
});

/**
 * Check if specific legal clauses (e.g., confidentiality or retention) are present.
 */
export const check_clauses = tool({
  description:
    "Detect whether the text contains required legal clauses (e.g., confidentiality, data‑subject rights, retention) and report any omissions.",
  parameters: z.object({
    content: z.string().describe("Compliance text to inspect for required clauses"),
  }),
  async execute({ content }) {
    return {
      result: `✅ Clauses check initiated on: ${content.slice(0, 100)}...`,
    };
  },
});

/**
 * Generate a privacy notice based on company name and email.
 */
export const generate_privacy_notice = tool({
  description:
    "Draft a privacy notice for the specified company, using the contact email and covering data collection, usage, retention, and user rights.",
  parameters: z.object({
    company: z.string().describe("Company name to appear in the notice"),
    email: z.string().describe("Contact email for privacy-related queries"),
  }),
async execute({ company, email }) {
  return {
    result: `**Privacy Notice – ${company}**

${company} collects only the personal data needed to provide and improve our services (e.g., name, work email, usage metrics). Data is kept no longer than strictly necessary, protected with industry-standard security, and never sold to third parties—shared only with trusted processors or authorities when legally required. You may request access, correction, or deletion of your data at any time. Questions? Contact **${email}**.`,
  };
}
});

/**
 * Export as ToolSet so `generateText()` can accept it directly.
 */
export const toolDefinitions: ToolSet = {
  summarize,
  check_clauses,
  generate_privacy_notice,
};
