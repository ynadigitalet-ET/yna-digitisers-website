import { createClient } from "@/lib/supabase/server";
import { OWNER_EMAIL } from "@/lib/constants";
import type {
  BlogPost,
  ClientLogo,
  FAQ,
  PricingPackage,
  Service,
  SocialLinks,
  TeamMember,
  Testimonial,
} from "@/types";

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("client_logos")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getFAQs(): Promise<FAQ[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faq")
    .select("*")
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getSocialLinks(): Promise<SocialLinks | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("social_links").select("*").limit(1).single();
  return data;
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getPricingPackages(): Promise<PricingPackage[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pricing_packages")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}

export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== OWNER_EMAIL) return null;
  return user;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
