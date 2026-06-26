"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { buildSocialLinksPayload } from "@/lib/social";
import type { ProjectStatus, TelebirrOrderStatus } from "@/types";

async function adminAction() {
  await requireAdmin();
  return createAdminClient();
}

export async function updateProjectStatus(id: string, status: ProjectStatus) {
  const supabase = await adminAction();
  const { error } = await supabase.from("project_requests").update({ status }).eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProjectRequest(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("project_requests").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function updateMessageRead(id: string, is_read: boolean) {
  const supabase = await adminAction();
  const { error } = await supabase.from("contact_messages").update({ is_read }).eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteContactMessage(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function saveBlogPost(data: {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  published: boolean;
}) {
  const supabase = await adminAction();
  const slug = slugify(data.title);
  const payload = {
    title: data.title,
    slug,
    content: data.content,
    excerpt: data.excerpt || null,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    published: data.published,
    updated_at: new Date().toISOString(),
  };

  const { error } = data.id
    ? await supabase.from("blog_posts").update(payload).eq("id", data.id)
    : await supabase.from("blog_posts").insert(payload);

  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/blog");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/blog");
  return { success: true };
}

export async function saveTestimonial(data: {
  id?: string;
  name: string;
  company?: string;
  content: string;
  rating: number;
  is_visible: boolean;
}) {
  const supabase = await adminAction();
  const { error } = data.id
    ? await supabase.from("testimonials").update(data).eq("id", data.id)
    : await supabase.from("testimonials").insert(data);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function saveFAQ(data: { id?: string; question: string; answer: string; sort_order: number }) {
  const supabase = await adminAction();
  const { error } = data.id
    ? await supabase.from("faq").update(data).eq("id", data.id)
    : await supabase.from("faq").insert(data);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteFAQ(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("faq").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function saveSocialLinks(data: Record<string, string>) {
  const supabase = await adminAction();
  const { data: existing } = await supabase.from("social_links").select("id").limit(1).single();

  const payload = buildSocialLinksPayload(data);
  const { error } = existing
    ? await supabase.from("social_links").update(payload).eq("id", existing.id)
    : await supabase.from("social_links").insert(payload);

  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/admin/social");
  revalidatePath("/", "layout");
  revalidatePath("/contact");
  return { success: true };
}

export async function saveService(data: {
  id?: string;
  title: string;
  slug: string;
  description: string;
  benefits: string[];
  price: string;
  icon: string;
  is_visible: boolean;
  sort_order: number;
}) {
  const supabase = await adminAction();
  const { error } = data.id
    ? await supabase.from("services").update(data).eq("id", data.id)
    : await supabase.from("services").insert(data);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/services");
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function savePricingPackage(data: {
  id?: string;
  name: string;
  slug: string;
  price: number;
  features: string[];
  is_visible: boolean;
  sort_order: number;
}) {
  const supabase = await adminAction();
  const { error } = data.id
    ? await supabase.from("pricing_packages").update(data).eq("id", data.id)
    : await supabase.from("pricing_packages").insert(data);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/pricing");
  return { success: true };
}

export async function deletePricingPackage(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("pricing_packages").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function saveTeamMember(data: {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  image_url?: string;
  sort_order: number;
}) {
  const supabase = await adminAction();
  const { error } = data.id
    ? await supabase.from("team_members").update(data).eq("id", data.id)
    : await supabase.from("team_members").insert(data);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/about");
  return { success: true };
}

export async function deleteTeamMember(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteSubscriber(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function saveClientLogo(data: {
  id?: string;
  name: string;
  logo_url: string;
  website_url?: string;
  is_visible: boolean;
  sort_order: number;
}) {
  const supabase = await adminAction();
  const { error } = data.id
    ? await supabase.from("client_logos").update(data).eq("id", data.id)
    : await supabase.from("client_logos").insert(data);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteClientLogo(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("client_logos").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function exportSubscribersCSV() {
  const supabase = await adminAction();
  const { data } = await supabase.from("newsletter_subscribers").select("email, created_at").order("created_at");
  if (!data) return "";

  const header = "Email,Subscribed At\n";
  const rows = data.map((s) => `${s.email},${s.created_at}`).join("\n");
  return header + rows;
}

export async function updateTelebirrOrderStatus(id: string, status: TelebirrOrderStatus) {
  const supabase = await adminAction();
  const { error } = await supabase.from("telebirr_orders").update({ status }).eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/telebirr-orders");
  return { success: true };
}

export async function deleteTelebirrOrder(id: string) {
  const supabase = await adminAction();
  const { error } = await supabase.from("telebirr_orders").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/telebirr-orders");
  return { success: true };
}
