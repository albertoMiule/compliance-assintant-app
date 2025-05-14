export async function POST(req: Request) {
  const { company, email } = await req.json();
  const result = `This privacy notice is issued by ${company}. For inquiries, contact ${email}.`;
  return Response.json({ result });
}