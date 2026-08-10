import { useEffect, useRef, useState } from "react";
import { RECAP_SECTIONS } from "./sections";

const SECTIONS = RECAP_SECTIONS.map(({ id, title, navTitle }) => ({ id, title: navTitle ?? title }));

// Sticky side navigation for the 2025 recap, styled like the blog TOC
export const SectionNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    SECTIONS.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* Mobile nav */}
      <div className="xl:hidden px-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="flex items-center gap-2.5 text-sm font-mono text-base-content/50 hover:text-base-content/80 transition-colors"
        >
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
          <span className="uppercase tracking-wider text-xs">Contents</span>
        </button>
        {isOpen && (
          <nav className="mt-4 ml-1 border-l border-base-content/10 animate-fade-in">
            <ul className="space-y-1.5 py-1 list-none pl-0 my-0">
              {SECTIONS.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm py-0.5 pl-3 transition-colors ${
                      activeId === section.id
                        ? "text-primary border-l-2 border-primary -ml-px font-medium"
                        : "text-base-content/60 hover:text-base-content"
                    }`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop sticky nav */}
      <aside className="hidden xl:block w-52 shrink-0">
        <nav className="sticky top-8">
          <p className="text-[10px] font-mono text-base-content/40 uppercase tracking-[0.2em] mb-4">On this page</p>
          <ul className="space-y-0.5 border-l border-base-content/10 list-none pl-0 my-0">
            {SECTIONS.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block text-[12.5px] leading-snug py-1 pl-3 transition-all duration-200 ${
                    activeId === section.id
                      ? "text-primary border-l-2 border-primary -ml-px font-medium"
                      : "text-base-content/50 hover:text-base-content/80"
                  }`}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
