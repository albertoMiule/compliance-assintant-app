import { NextRequest, NextResponse } from 'next/server';
import { suppliers } from '@/data/suppliers';

export async function POST(req: NextRequest) {
  const body = await req.json();        // { top?, industry?, ... }

  // 1️⃣ Filter
  let result = suppliers.filter((s) => {
    if (body.industry && s.industry.toLowerCase() !== body.industry.toLowerCase()) return false;
    if (body.location && !s.location.toLowerCase().includes(body.location.toLowerCase())) return false;
    if (body.category && !s.riskCategories.map(c=>c.toLowerCase()).includes(body.category.toLowerCase())) return false;
    if (body.minRisk && s.riskScore < body.minRisk) return false;
    if (body.maxRisk && s.riskScore > body.maxRisk) return false;
    return true;
  });

  // 2️⃣ Sort
  result.sort((a, b) =>
    body.sort === 'NAME_ASC'
      ? a.name.localeCompare(b.name)
      : b.riskScore - a.riskScore,
  );

  // 3️⃣ Top-N
  if (body.top) result = result.slice(0, body.top);

  return NextResponse.json({ suppliers: result });
}