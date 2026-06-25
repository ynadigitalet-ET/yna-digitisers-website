import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail, paymentConfirmationEmailHtml } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const supabase = createAdminClient();
    const amount = session.amount_total || 0;
    const packageName = session.metadata?.package_name || "Unknown Package";
    const customerEmail = session.customer_details?.email || session.customer_email || "";

    await supabase.from("payments").insert({
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string,
      customer_email: customerEmail,
      amount,
      currency: session.currency || "usd",
      package_name: packageName,
      status: "paid",
    });

    if (customerEmail) {
      await sendEmail({
        to: customerEmail,
        subject: "Payment Confirmation — YNA Digitisers",
        html: paymentConfirmationEmailHtml({
          customer_email: customerEmail,
          package_name: packageName,
          amount,
        }),
      });

      await sendEmail({
        subject: `New Payment: ${packageName} — $${(amount / 100).toFixed(2)}`,
        html: `
          <h2>New Payment Received</h2>
          <p><strong>Customer:</strong> ${customerEmail}</p>
          <p><strong>Package:</strong> ${packageName}</p>
          <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)}</p>
        `,
      });
    }
  }

  return NextResponse.json({ received: true });
}
