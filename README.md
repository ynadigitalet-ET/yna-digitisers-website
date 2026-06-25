# YNA Digitisers Website

Professional web design agency website built with Next.js 14, Supabase, Stripe, and Resend.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (database + auth)
- Stripe (payments)
- Resend (emails)
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your API keys:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_TAWK_PROPERTY_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Supabase setup

Ensure these tables exist in your Supabase project:
`project_requests`, `contact_messages`, `blog_posts`, `testimonials`, `faq`, `social_links`, `newsletter_subscribers`, `team_members`, `services`, `pricing_packages`, `client_logos`, `payments`

Create an admin user in Supabase Auth with email: `ynadigital.et@gmail.com`

### 4. Stripe webhook

Point your Stripe webhook to: `https://yourdomain.com/api/webhooks/stripe`

Events to listen for: `checkout.session.completed`

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Dashboard

Access at `/admin/login` with the owner Supabase Auth credentials.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/get-a-website` | Project request form |
| `/services` | Services listing |
| `/pricing` | Pricing with Stripe checkout |
| `/about` | About page |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog post |
| `/contact` | Contact form |
| `/admin` | Admin dashboard |
