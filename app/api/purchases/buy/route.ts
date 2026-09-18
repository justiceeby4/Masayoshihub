import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { products } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabasePublishableKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const supabaseSecret = process.env.SUPABASE_SECRET_KEY;

    if (
      !supabaseUrl ||
      !supabasePublishableKey ||
      !supabaseSecret
    ) {
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
    const productId = String(body.productId || "");

    const product = products.find(
      (item) => item.id === productId
    );

    if (!product) {
      return Response.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const adminSupabase = createClient(
      supabaseUrl,
      supabaseSecret
    );

    const { data: purchased, error } =
      await adminSupabase.rpc("buy_product", {
        p_user_id: user.id,
        p_product_id: product.id,
        p_amount: product.price,
      });

    if (error) {
      console.error("Purchase error:", error);

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

    return Response.json({
      success: true,
      message: "Purchase successful.",
      product: product.title,
    });
  } catch (error) {
    console.error("Buy route error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
