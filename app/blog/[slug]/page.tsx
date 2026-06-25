import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return generateSEO({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Calendar className="h-4 w-4" />
            {formatDate(post.created_at)}
          </div>

          <h1 className="heading-1 mb-8">{post.title}</h1>

          <div
            className="prose-content text-muted leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  );
}
