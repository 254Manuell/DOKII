// Example health education content
const topics = [
  { id: 1, title: "Malaria Prevention", content: "Use mosquito nets and eliminate stagnant water." },
  { id: 2, title: "Safe Drinking Water", content: "Boil or treat water before drinking." },
];

export async function GET() {
  return new Response(JSON.stringify({ topics }), { status: 200 });
}
