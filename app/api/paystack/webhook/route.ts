import crypto from "crypto";

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    return new Response("Missing Paystack secret key", {
      status: 500,
    });
  }

  const body = await request.text();

  const signature = request.headers.get(
    "x-paystack-signature"
  );

  const hash = crypto
    .createHmac("sha512", secret)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return new Response("Invalid signature", {
      status: 401,
    });
  }

  const event = JSON.parse(body);

  console.log("Paystack webhook received:", event.event);

  return new Response("OK", {
    status: 200,
  });
}
