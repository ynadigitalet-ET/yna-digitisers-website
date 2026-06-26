// Database entity types for YNA Digitisers

export type ProjectStatus = "New" | "In Progress" | "Completed";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface ProjectRequest {
  id: string;
  name: string;
  business_name: string;
  email: string;
  phone?: string | null;
  website_type: string;
  budget: string;
  description: string;
  status: ProjectStatus;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string | null;
  content: string;
  rating: number;
  image_url?: string | null;
  is_visible: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface SocialLinks {
  id: string;
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
  telegram?: string | null;
  whatsapp?: string | null;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  image_url?: string | null;
  sort_order: number;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  benefits: string[];
  price: string;
  icon: string;
  is_visible: boolean;
  sort_order: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  slug: string;
  price: number;
  features: string[];
  stripe_price_id?: string | null;
  is_visible: boolean;
  sort_order: number;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string | null;
  is_visible: boolean;
  sort_order: number;
}

export interface Payment {
  id: string;
  stripe_session_id: string;
  stripe_payment_intent_id?: string | null;
  customer_email: string;
  amount: number;
  currency: string;
  package_name: string;
  status: PaymentStatus;
  created_at: string;
}

// Form input types
export interface ProjectRequestInput {
  full_name: string;
  business_name: string;
  email: string;
  phone?: string;
  website_type: string;
  budget_range: string;
  project_description: string;
  honeypot?: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ActionResult {
  success: boolean;
  message: string;
}

export type TelebirrOrderStatus = "pending" | "verified" | "completed" | "rejected";

export interface TelebirrOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  package_name: string;
  amount: string;
  telebirr_number_used: string;
  transaction_reference: string;
  status: TelebirrOrderStatus;
  notes?: string | null;
  created_at: string;
}

export interface TelebirrOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  package_name: string;
  amount: string;
  telebirr_number_used: string;
  transaction_reference: string;
}
