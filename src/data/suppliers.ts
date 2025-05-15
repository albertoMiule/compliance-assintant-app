import { z } from "zod";

/**
 * Schema and type for a supplier-risk record.
 */
export const SupplierSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  riskScore: z.number().int().min(1).max(10),
  riskCategories: z.array(z.string()),     // at least 1; we store 2–3 each
  location: z.string(),                    // “City, Country”
  industry: z.string(),
});

export type Supplier = z.infer<typeof SupplierSchema>;

/**
 * Mock database – 10 fictional suppliers with varied risk profiles.
 */
export const suppliers: Supplier[] = [
  {
    id: "c41758b5-e9f8-46b1-a58c-2a24b61f1f6d",
    name: "Aegis Medical Ltd.",
    riskScore: 9,
    riskCategories: ["Financial", "Regulatory"],
    location: "Boston, USA",
    industry: "Healthcare",
  },
  {
    id: "d32b07e6-53a1-45c9-a51f-9305e600e5ee",
    name: "GreenWorks Plastics",
    riskScore: 4,
    riskCategories: ["Environmental", "Operational"],
    location: "Hamburg, Germany",
    industry: "Manufacturing",
  },
  {
    id: "e4d3c210-8f22-42de-9b4e-3bbf7e99e5a9",
    name: "Quantum Foods Inc.",
    riskScore: 8,
    riskCategories: ["Supply Chain", "Financial"],
    location: "Chicago, USA",
    industry: "Food & Beverage",
  },
  {
    id: "f876c9d2-0b24-4ffd-bbb3-6e3e91940b27",
    name: "NovaTech Solar",
    riskScore: 6,
    riskCategories: ["Environmental", "Safety"],
    location: "Shenzhen, China",
    industry: "Energy",
  },
  {
    id: "a6aa3db4-fd8e-4de9-b761-7a206129d3d4",
    name: "Alpine Logistics GmbH",
    riskScore: 7,
    riskCategories: ["Operational", "Regulatory"],
    location: "Vienna, Austria",
    industry: "Transportation",
  },
  {
    id: "b318c5e9-3c01-48c4-9fe1-c84a5faf6471",
    name: "BrightSky Pharma",
    riskScore: 10,
    riskCategories: ["Regulatory", "Quality"],
    location: "Basel, Switzerland",
    industry: "Pharmaceuticals",
  },
  {
    id: "9b02ffca-89f5-4a70-9d53-26d3bde5f529",
    name: "Horizon Textiles",
    riskScore: 5,
    riskCategories: ["Labour", "Environmental"],
    location: "Dhaka, Bangladesh",
    industry: "Apparel",
  },
  {
    id: "2248c2e7-b86e-468e-b6f5-0242d2faac64",
    name: "AquaPure Chemicals",
    riskScore: 3,
    riskCategories: ["Environmental", "Safety"],
    location: "Rotterdam, Netherlands",
    industry: "Chemicals",
  },
  {
    id: "6d4800ec-6f71-4907-9c00-b7101ee77937",
    name: "Sterling Financial Services",
    riskScore: 8,
    riskCategories: ["Financial", "Data Privacy"],
    location: "London, UK",
    industry: "Finance",
  },
  {
    id: "77c8cbae-7770-4204-bf52-fc66bfbf6fa2",
    name: "TerraGrow Agriculture",
    riskScore: 2,
    riskCategories: ["Environmental", "Supply Chain"],
    location: "São Paulo, Brazil",
    industry: "Agriculture",
  },
];