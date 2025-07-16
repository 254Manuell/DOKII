import { NextRequest } from "next/server";

// Dummy medicine database
const medicines = [
  { barcode: "1234567890", name: "Paracetamol", status: "authentic" },
  { barcode: "0987654321", name: "Amoxicillin", status: "counterfeit" },
];

export async function POST(req: NextRequest) {
  try {
    const { barcode } = await req.json();
    if (!barcode) {
      return new Response(JSON.stringify({ error: "Barcode is required." }), { status: 400 });
    }
    const found = medicines.find((m) => m.barcode === barcode);
    if (found) {
      return new Response(JSON.stringify({ name: found.name, status: found.status }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Medicine not found." }), { status: 404 });
    }
  } catch {
    return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
  }
}
