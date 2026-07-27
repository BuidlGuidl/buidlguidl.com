import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { slugify } from "~~/utils/blog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTextContent(node: any): string {
  if (node.type === "text") return node.value;
  if (node.children) return node.children.map(getTextContent).join("");
  return "";
}

// Rehype plugin: add slug IDs to h2/h3 so the table of contents can link to them.
function rehypeSlugify() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function visit(node: any) {
      if (node.type === "element" && /^h[23]$/.test(node.tagName)) {
        node.properties = node.properties || {};
        node.properties.id = slugify(getTextContent(node));
      }
      if (node.children) node.children.forEach(visit);
    }
    visit(tree);
  };
}

// Serialize markdown into MDX source with the shared remark/rehype plugin set.
export async function serializeMdx(content: string): Promise<MDXRemoteSerializeResult> {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlugify, [rehypePrism, { ignoreMissing: true }]],
    },
  });
}

// Word count used for read-time estimates, ignoring fenced code blocks.
export function countWords(content: string): number {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
}
