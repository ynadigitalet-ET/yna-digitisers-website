import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils";
import { getBlogPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const posts = await getBlogPosts();

  const staticPages = [
    "",
    "/services",
    "/pricing",
    "/about",
    "/blog",
    "/contact",
    "/get-a-website",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
