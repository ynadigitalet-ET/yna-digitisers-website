"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendEmail,
  projectRequestEmailHtml,
  contactMessageEmailHtml,
  newsletterWelcomeEmailHtml,
} from "@/lib/resend";
import { isValidEmail } from "@/lib/utils";
import type { ActionResult, ContactMessageInput, ProjectRequestInput } from "@/types";

export async function submitProjectRequest(
  input: ProjectRequestInput
): Promise<ActionResult> {
  // Honeypot anti-spam check
  if (input.honeypot) {
    return { success: true, message: "Request submitted successfully!" };
  }

  const { full_name, business_name, email, phone, website_type, budget_range, project_description } = input;

  if (!full_name?.trim()) return { success: false, message: "Full name is required." };
  if (!business_name?.trim()) return { success: false, message: "Business name is required." };
  if (!email?.trim() || !isValidEmail(email)) return { success: false, message: "Valid email is required." };
  if (!website_type) return { success: false, message: "Please select a website type." };
  if (!budget_range) return { success: false, message: "Please select a budget range." };
  if (!project_description?.trim()) return { success: false, message: "Project description is required." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("project_requests").insert({
    name: full_name.trim(),
    business_name: business_name.trim(),
    email: email.trim(),
    phone: phone?.trim() || null,
    website_type,
    budget: budget_range,
    description: project_description.trim(),
    status: "New",
  });

  if (error) {
    console.error("Project request error:", error);
    if (error.code === "PGRST125") {
      return {
        success: false,
        message: "Database connection misconfigured. Check NEXT_PUBLIC_SUPABASE_URL (must not include /rest/v1).",
      };
    }
    if (error.code === "PGRST204") {
      return {
        success: false,
        message: "Database schema mismatch. Please contact support.",
      };
    }
    return { success: false, message: "Failed to submit request. Please try again." };
  }

  await sendEmail({
    subject: `New Project Request from ${full_name}`,
    html: projectRequestEmailHtml(input),
  });

  return { success: true, message: "Your project request has been submitted! We'll contact you within 24 hours." };
}

export async function submitContactMessage(
  input: ContactMessageInput
): Promise<ActionResult> {
  if (input.honeypot) {
    return { success: true, message: "Message sent successfully!" };
  }

  const { name, email, subject, message } = input;

  if (!name?.trim()) return { success: false, message: "Name is required." };
  if (!email?.trim() || !isValidEmail(email)) return { success: false, message: "Valid email is required." };
  if (!subject?.trim()) return { success: false, message: "Subject is required." };
  if (!message?.trim()) return { success: false, message: "Message is required." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    is_read: false,
  });

  if (error) {
    console.error("Contact message error:", error);
    return { success: false, message: "Failed to send message. Please try again." };
  }

  await sendEmail({
    subject: `Contact: ${subject}`,
    html: contactMessageEmailHtml(input),
  });

  return { success: true, message: "Your message has been sent! We'll get back to you soon." };
}

export async function subscribeNewsletter(email: string): Promise<ActionResult> {
  if (!email?.trim() || !isValidEmail(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("newsletter_subscribers").insert({
    email: email.trim().toLowerCase(),
  });

  if (error) {
    console.error("Newsletter subscribe error:", error);
    if (error.code === "23505") {
      return { success: false, message: "You're already subscribed!" };
    }
    if (error.code === "PGRST125") {
      return {
        success: false,
        message: "Database connection misconfigured. Check NEXT_PUBLIC_SUPABASE_URL (must not include /rest/v1).",
      };
    }
    return { success: false, message: "Failed to subscribe. Please try again." };
  }

  await sendEmail({
    to: email.trim(),
    subject: "Welcome to YNA Digitisers Newsletter!",
    html: newsletterWelcomeEmailHtml(email.trim()),
  });

  // Notify owner (works on Resend sandbox; subscriber welcome may require verified domain)
  await sendEmail({
    subject: `New newsletter subscriber: ${email.trim()}`,
    html: `<p>${email.trim()} subscribed to the newsletter.</p>`,
  });

  return { success: true, message: "Successfully subscribed to our newsletter!" };
}
