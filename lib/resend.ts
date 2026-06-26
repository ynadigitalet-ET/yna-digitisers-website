import { Resend } from "resend";
import { OWNER_EMAIL, SITE_NAME } from "./constants";
import type { TelebirrOrderInput } from "@/types";

let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

interface EmailOptions {
  to?: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to = OWNER_EMAIL, subject, html }: EmailOptions) {
  const client = getResend();
  if (!client) {
    console.warn("Resend API key not configured — email not sent:", subject);
    return { success: false, error: "Email service not configured" };
  }

  try {
    const { error } = await client.emails.send({
      from: `${SITE_NAME} <onboarding@resend.dev>`,
      to,
      subject,
      html,
    });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: String(error) };
  }
}

export function projectRequestEmailHtml(data: {
  full_name: string;
  business_name: string;
  email: string;
  phone?: string;
  website_type: string;
  budget_range: string;
  project_description: string;
}) {
  return `
    <h2>New Project Request</h2>
    <p><strong>Name:</strong> ${data.full_name}</p>
    <p><strong>Business:</strong> ${data.business_name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
    <p><strong>Website Type:</strong> ${data.website_type}</p>
    <p><strong>Budget:</strong> ${data.budget_range}</p>
    <p><strong>Description:</strong></p>
    <p>${data.project_description.replace(/\n/g, "<br>")}</p>
  `;
}

export function contactMessageEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;
}

export function paymentConfirmationEmailHtml(data: {
  customer_email: string;
  package_name: string;
  amount: number;
}) {
  return `
    <h2>Payment Confirmation</h2>
    <p>Thank you for your purchase!</p>
    <p><strong>Package:</strong> ${data.package_name}</p>
    <p><strong>Amount:</strong> $${(data.amount / 100).toFixed(2)}</p>
    <p>We will contact you shortly to begin your project.</p>
  `;
}

export function newsletterWelcomeEmailHtml(email: string) {
  return `
    <h2>Welcome to ${SITE_NAME}!</h2>
    <p>Thank you for subscribing to our newsletter, ${email}.</p>
    <p>You'll receive updates on web design tips, special offers, and company news.</p>
  `;
}

export function telebirrOrderEmailHtml(data: TelebirrOrderInput) {
  return `
    <h2>New Telebirr Payment Confirmation</h2>
    <p><strong>Customer:</strong> ${data.customer_name}</p>
    <p><strong>Email:</strong> ${data.customer_email}</p>
    <p><strong>Phone:</strong> ${data.customer_phone}</p>
    <p><strong>Package:</strong> ${data.package_name}</p>
    <p><strong>Amount:</strong> ${data.amount}</p>
    <p><strong>Telebirr Number Used:</strong> ${data.telebirr_number_used}</p>
    <p><strong>Transaction Reference:</strong> ${data.transaction_reference}</p>
  `;
}
