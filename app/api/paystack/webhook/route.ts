import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseSecret = process.env.SUPABASE_SECRET_KEY;

    if (!paystackSecret || !supabaseUrl || !supabaseSecret) {
      return new Response("Server configuration error", {
        status: 500,
      });
    }

    const body = await request.text();

    const signature = request.headers.get(
      "x-paystack-signature"
    );

    if (!signature) {
      return new Response("Missing signature", {
        status: 401,
      });
    }

    const hash = crypto
      .createHmac("sha512", paystackSecret)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return new Response("Invalid signature", {
        status: 401,
      });
    }

    const event = JSON.parse(body);

    if (event.event !== "charge.success") {
      return new Response("OK", {
        status: 200,
      });
    }

    const data = event.data;

    const userId = data.metadata?.user_id;
    const reference = data.reference;
    const amountKobo = Number(data.amount);
    const currency = data.currency;

    if (
      !userId ||
      !reference ||
      !Number.isFinite(amountKobo) ||
      amountKobo <= 0 ||
      currency !== "NGN"
    ) {
      return new Response("Invalid payment data", {
        status: 400,
      });
    }

    const amountNaira = amountKobo / 100;

    const supabase = createClient(
      supabaseUrl,
      supabaseSecret
    );

    const { error } = await supabase.rpc("credit_wallet", {
      p_user_id: userId,
      p_reference: reference,
      p_amount: amountNaira,
      p_currency: currency,
    });

    if (error) {
      console.error("Wallet credit error:", error);

      return new Response("Wallet credit failed", {
        status: 500,
      });
    }

    console.log(
      `Wallet credited: ${userId} - ₦${amountNaira} - ${reference}`
    );

    return new Response("OK", {
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);

    return new Response("Webhook error", {
      status: 500,
    });
  }
}
