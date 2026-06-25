import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { generateSEO } from "@/lib/seo";
import { getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

export const metadata = generateSEO({
  title: "Blog",
  description: "Web design tips, industry insights, and updates from the YNA Digitisers team.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="mb-16 text-center">
          <h1 className="heading-1 mb-4">Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Insights, tips, and updates from our web design experts.
          </p>
        </AnimatedSection>

        {posts.length === 0 ? (
          <div className="text-center text-muted py-12">
            <p>No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <Link href={`/blog/${post.slug}`} className="card group block h-full">
                  <div className="mb-4 flex items-center gap-2 text-xs text-muted">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.created_at)}
                  </div>
                  <h2 className="heading-3 mb-3 group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-muted line-clamp-3 mb-4">{post.excerpt}</p>
                  )}
                  <span className="flex items-center gap-1 text-sm font-medium text-brand-blue">
                    Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
