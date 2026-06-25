import Stripe from "stripe";

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export function getStripePublicKey() {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "";
}
