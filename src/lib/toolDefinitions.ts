import { tool, type ToolSet } from "ai";
import { z } from "zod";
import { suppliers } from "@/data/suppliers";
import { Supplier } from "@/data/suppliers"; // type only

/* existing summarize / check_clauses / generate_privacy_notice … */

export const query_suppliers = tool({
  description:
    "Return suppliers that meet the optional filters. If multiple filters are provided, combine them with AND. Default sort is highest riskScore first.",
  parameters: z
    .object({
      top: z.number().int().min(1).optional()
        .describe("Return only the N suppliers with the highest riskScore"),
      industry: z.string().optional()
        .describe("Exact industry name to filter by, case-insensitive"),
      location: z.string().optional()
        .describe("Substring match on City or Country"),
      category: z.string().optional()
        .describe("One riskCategory to filter by"),
      minRisk: z.number().int().min(1).max(10).optional(),
      maxRisk: z.number().int().min(1).max(10).optional(),
      sort: z.enum(["RISK_DESC", "NAME_ASC"]).optional()
        .describe("Sorting mode; defaults to risk score desc"),
    })
    .strict(),
  async execute(args) {
    // 1. Filter
    let list: Supplier[] = suppliers.filter((s) => {
      if (args.industry && s.industry.toLowerCase() !== args.industry.toLowerCase()) return false;
      if (args.location && !s.location.toLowerCase().includes(args.location.toLowerCase())) return false;
      if (args.category && !s.riskCategories.map((c) => c.toLowerCase()).includes(args.category.toLowerCase())) return false;
      if (args.minRisk && s.riskScore < args.minRisk) return false;
      if (args.maxRisk && s.riskScore > args.maxRisk) return false;
      return true;
    });

    // 2. Sort
    if (args.sort === "NAME_ASC") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => b.riskScore - a.riskScore);
    }

    // 3. Top-N
    if (args.top) list = list.slice(0, args.top);

    return { suppliers: list };
  },
});

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
  query_suppliers
};
