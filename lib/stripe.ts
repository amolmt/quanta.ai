import Stripe from "stripe";

// TODO: fix - stripe payment redirect issue
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});
