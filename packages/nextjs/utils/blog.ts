export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function formatBlogDate(date: string): string {
  const [year, month] = date.split("-").map(Number);
  return new Date(year, month - 1).toLocaleString("en-US", { month: "long", year: "numeric" });
}
