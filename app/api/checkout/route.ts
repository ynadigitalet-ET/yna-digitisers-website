import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSiteUrl } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { packageSlug, packageName, price } = await req.json();

    if (!packageSlug || !packageName || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${packageName} Package — YNA Digitisers`,
              description: `Web design ${packageName} package`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        package_slug: packageSlug,
        package_name: packageName,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
