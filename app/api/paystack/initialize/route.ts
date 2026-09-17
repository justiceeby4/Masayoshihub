import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret) {
      return Response.json(
        { error: "Paystack secret key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const amountNaira = Number(body.amount);

    if (
      !Number.isFinite(amountNaira) ||
      !Number.isInteger(amountNaira) ||
      amountNaira < 100
    ) {
      return Response.json(
        { error: "Enter a valid amount of at least ₦100." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // Cookie updates are not required for this request.
            }
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const reference = `MH-${crypto.randomUUID()}`;

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          amount: String(amountNaira * 100),
          currency: "NGN",
          reference,
          callback_url:
            "https://masayoshihub.vercel.app/wallet?payment=success",
          metadata: {
            user_id: user.id,
            purpose: "wallet_funding",
          },
        }),
      }
    );

    const result = await paystackResponse.json();

    if (!paystackResponse.ok || !result.status) {
      return Response.json(
        {
          error:
            result.message || "Unable to initialize Paystack payment.",
        },
        { status: 400 }
      );
    }

    return Response.json({
      authorization_url: result.data.authorization_url,
      reference: result.data.reference,
    });
  } catch {
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
