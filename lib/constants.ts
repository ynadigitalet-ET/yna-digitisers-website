export const SITE_NAME = "YNA Digitisers";
export const SITE_TAGLINE = "Professional Web Design Solutions";
export const SITE_EMAIL = "ynadigital.et@gmail.com";
export const OWNER_EMAIL = "ynadigital.et@gmail.com";

export const WEBSITE_TYPES = [
  "Business Website",
  "E-commerce Store",
  "Portfolio Website",
  "Website Redesign",
  "Website Maintenance",
  "SEO Optimization",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Below $500",
  "$500-$1000",
  "$1000-$2500",
  "$2500-$5000",
  "$5000+",
  "Not Sure Yet",
] as const;

export const DEFAULT_SERVICES = [
  {
    title: "Business Websites",
    slug: "business-websites",
    description: "Professional websites that establish your brand online and convert visitors into customers.",
    benefits: ["Custom design", "Mobile responsive", "Contact forms", "Fast loading"],
    price: "From $499",
    icon: "Globe",
  },
  {
    title: "E-commerce Stores",
    slug: "ecommerce-stores",
    description: "Full-featured online stores with secure payments and inventory management.",
    benefits: ["Product catalog", "Secure checkout", "Order management", "Analytics"],
    price: "From $999",
    icon: "ShoppingCart",
  },
  {
    title: "Portfolio Websites",
    slug: "portfolio-websites",
    description: "Showcase your work beautifully with stunning portfolio designs.",
    benefits: ["Gallery layouts", "Project showcases", "Client testimonials", "SEO ready"],
    price: "From $299",
    icon: "Briefcase",
  },
  {
    title: "Website Redesign",
    slug: "website-redesign",
    description: "Transform your outdated website into a modern, high-converting digital presence.",
    benefits: ["Modern UI/UX", "Improved performance", "Better conversions", "Mobile first"],
    price: "From $399",
    icon: "RefreshCw",
  },
  {
    title: "Website Maintenance",
    slug: "website-maintenance",
    description: "Keep your website secure, updated, and running smoothly with ongoing support.",
    benefits: ["Regular updates", "Security monitoring", "Backup management", "Content updates"],
    price: "From $99/month",
    icon: "Wrench",
  },
  {
    title: "SEO Optimization",
    slug: "seo-optimization",
    description: "Improve your search rankings and drive more organic traffic to your website.",
    benefits: ["Keyword research", "On-page SEO", "Performance audit", "Monthly reports"],
    price: "From $199/month",
    icon: "TrendingUp",
  },
];

export const DEFAULT_PRICING = [
  {
    name: "Starter",
    slug: "starter",
    price: 299,
    features: [
      "1-5 pages",
      "Mobile responsive",
      "Basic SEO",
      "Contact form",
      "1 revision",
      "7 days delivery",
    ],
  },
  {
    name: "Professional",
    slug: "professional",
    price: 799,
    features: [
      "Up to 10 pages",
      "Full SEO",
      "Blog setup",
      "3 revisions",
      "14 days delivery",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    price: 1499,
    features: [
      "Unlimited pages",
      "Advanced SEO",
      "E-commerce",
      "Custom features",
      "Unlimited revisions",
      "21 days delivery",
      "Dedicated support",
    ],
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Fast Delivery",
    description: "We deliver quality websites on time, every time.",
    icon: "Zap",
  },
  {
    title: "Modern Designs",
    description: "Cutting-edge designs that make your brand stand out.",
    icon: "Palette",
  },
  {
    title: "SEO Optimised",
    description: "Built with search engines in mind from day one.",
    icon: "Search",
  },
  {
    title: "Mobile Responsive",
    description: "Perfect experience on every device and screen size.",
    icon: "Smartphone",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
