import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { slugify } from "~~/utils/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  url: string;
}

export function getAllBlogSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => f.replace(/\.md$/, ""));
}

export function getAllBlogs(): BlogMeta[] {
  return getAllBlogSlugs()
    .map(slug => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return {
        title: data.title,
        date: data.date,
        description: data.description,
        slug,
        url: `/blog/${slug}`,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function getBlogBySlug(slug: string): { meta: BlogMeta; content: string; headings: BlogHeading[] } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);

  const headings: BlogHeading[] = [];
  // Strip fenced code blocks before extracting headings
  const contentWithoutCode = content.replace(/```[\s\S]*?```/g, "");
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(contentWithoutCode)) !== null) {
    const text = match[2].trim();
    headings.push({ id: slugify(text), text, level: match[1].length as 2 | 3 });
  }

  return {
    meta: {
      title: data.title,
      date: data.date,
      description: data.description,
      slug,
      url: `/blog/${slug}`,
    },
    content,
    headings,
  };
}
