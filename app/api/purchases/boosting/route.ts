import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const services: Record<
  string,
  Record<string, { rate: number; minimum: number }>
> = {
  TikTok: {
    Followers: { rate: 5999, minimum: 100 },
    Likes: { rate: 1499, minimum: 100 },
    Views: { rate: 200, minimum: 500 },
    Shares: { rate: 500, minimum: 100 },
  },
  Instagram: {
    Followers: { rate: 5499, minimum: 100 },
    Likes: { rate: 1199, minimum: 100 },
    Views: { rate: 99, minimum: 1000 },
  },
  Facebook: {
    "Profile Followers": { rate: 5499, minimum: 100 },
    "Page Followers": { rate: 3499, minimum: 100 },
    "Post Likes": { rate: 1199, minimum: 100 },
    "Video/Reel Views": { rate: 499, minimum: 100 },
  },
};

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabasePublishableKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const supabaseSecret = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabasePublishableKey || !supabaseSecret) {
      return Response.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();

    const authSupabase = createServerClient(
      supabaseUrl,
      supabasePublishableKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(
                ({ name, value, options }) => {
                  cookieStore.set(name, value, options);
                }
              );
            } catch {
              // Cookie updates are not required here.
            }
          },
        },
      }
    );

    const {
      data: { user },
    } = await authSupabase.auth.getUser();

    if (!user) {
      return Response.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const platform = String(body.platform || "");
    const service = String(body.service || "");
    const quantity = Number(body.quantity);
    const socialLink = String(body.socialLink || "").trim();

    const platformServices = services[platform];
    const selected = platformServices?.[service];

    if (!selected) {
      return Response.json(
        { error: "Invalid platform or service." },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < selected.minimum
    ) {
      return Response.json(
        {
          error: `Minimum quantity is ${selected.minimum.toLocaleString()}.`,
        },
        { status: 400 }
      );
    }

    if (
      !socialLink.startsWith("http://") &&
      !socialLink.startsWith("https://")
    ) {
      return Response.json(
        { error: "Please enter a valid social media link." },
        { status: 400 }
      );
    }

    const amount = Math.round(
      (quantity / 1000) * selected.rate
    );

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      return Response.json(
        { error: "Invalid purchase amount." },
        { status: 400 }
      );
    }

    const adminSupabase = createClient(
      supabaseUrl,
      supabaseSecret
    );

    const { data: purchased, error } =
      await adminSupabase.rpc("buy_product", {
        p_user_id: user.id,
        p_product_id: "social-media-boosting",
        p_amount: amount,
      });

    if (error) {
      console.error("Boosting purchase error:", error);

      return Response.json(
        { error: "Unable to complete purchase." },
        { status: 500 }
      );
    }

    if (!purchased) {
      return Response.json(
        { error: "Insufficient wallet balance." },
        { status: 400 }
      );
    }

    console.log("Boosting order received:", {
      userId: user.id,
      platform,
      service,
      quantity,
      socialLink,
      amount,
    });

    return Response.json({
      success: true,
      message:
        "Purchase received — please hold while we process your order.",
      amount,
    });
  } catch (error) {
    console.error("Boosting route error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
