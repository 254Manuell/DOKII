// Example clinics data
const clinics = [
  { id: 1, name: "Nairobi Health Center", address: "123 Kenyatta Ave, Nairobi", status: "Open Now" },
  { id: 2, name: "Kisumu Medical Clinic", address: "456 Lake Rd, Kisumu", status: "Closed" },
];

export async function GET() {
  return new Response(JSON.stringify({ clinics }), { status: 200 });
}
