import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { slugify } from "~~/utils/blog";

const GUIDES_DIR = path.join(process.cwd(), "content/guides");

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  url: string;
  faqs?: GuideFaq[];
}

export function getAllGuideSlugs(): string[] {
  return fs
    .readdirSync(GUIDES_DIR)
    .filter(f => f.endsWith(".md"))
    .map(f => f.replace(/\.md$/, ""));
}

export function getAllGuides(): GuideMeta[] {
  return getAllGuideSlugs()
    .map(slug => {
      const raw = fs.readFileSync(path.join(GUIDES_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return {
        title: data.title,
        date: data.date,
        description: data.description,
        slug,
        url: `/guides/${slug}`,
        faqs: data.faqs,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export interface GuideHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function getGuideBySlug(slug: string): { meta: GuideMeta; content: string; headings: GuideHeading[] } {
  const raw = fs.readFileSync(path.join(GUIDES_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);

  const headings: GuideHeading[] = [];
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
      url: `/guides/${slug}`,
      faqs: data.faqs,
    },
    content,
    headings,
  };
}
