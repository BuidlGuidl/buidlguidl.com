import { useEffect, useRef, useState } from "react";

export interface ContentHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export const LightboxImage = ({ src, alt }: { src?: string; alt?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ""}
        className="my-7 rounded-xl cursor-zoom-in w-full shadow-md"
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      />
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-zoom-out overflow-auto p-4 sm:p-8 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 z-10 text-white/50 hover:text-white text-3xl leading-none transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || ""}
            className="max-w-full sm:max-w-[92vw] sm:max-h-[90vh] object-contain rounded-lg animate-scale-in"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

// MDX component overrides shared by blog posts and guides.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, any> = {
  h2: ({ children, id }: { children?: React.ReactNode; id?: string }) => (
    <h2 id={id} className="text-2xl sm:text-3xl mt-12 mb-3 pt-8 border-t border-base-content/10">
      {children}
    </h2>
  ),
  h3: ({ children, id }: { children?: React.ReactNode; id?: string }) => (
    <h3 id={id} className="text-xl sm:text-2xl mt-8 mb-2">
      {children}
    </h3>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="relative border-l-2 border-primary/50 pl-5 py-2 my-6 text-base-content/60 italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        className="text-primary underline decoration-primary/40 underline-offset-[3px] hover:decoration-primary transition-all duration-200"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childProps = (children as any)?.props;
    const className = childProps?.className || "";
    const langMatch = className.match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : null;

    return (
      <div className="relative my-7 rounded-xl overflow-hidden bg-[#212638] shadow-md">
        {/* Terminal-style header bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/[0.06] border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          {lang && <span className="text-[11px] font-mono text-white/30 uppercase tracking-wider">{lang}</span>}
        </div>
        <pre className="p-4 overflow-x-auto whitespace-pre text-[0.84em] font-mono leading-relaxed text-white/80">
          {children}
        </pre>
      </div>
    );
  },
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    if (className) return <code className={className}>{children}</code>;
    return (
      <code className="bg-base-100 text-base-content px-1.5 py-0.5 rounded text-[0.84em] font-mono">{children}</code>
    );
  },
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-5 space-y-2.5 list-disc list-outside pl-5 marker:text-primary/60">{children}</ul>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li className="leading-[1.85] pl-1">{children}</li>,
  img: ({ src, alt }: { src?: string; alt?: string }) => <LightboxImage src={src} alt={alt} />,
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-7 overflow-x-auto rounded-xl border border-base-content/10">
      <table className="w-full border-collapse text-left text-[0.88em]">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => <thead className="bg-base-100">{children}</thead>,
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="whitespace-nowrap border-b border-base-content/10 px-3.5 py-2.5 font-semibold">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border-b border-base-content/5 px-3.5 py-2.5 align-top text-base-content/80">{children}</td>
  ),
};

export function estimateReadTime(wordCount: number): string {
  const minutes = Math.ceil(wordCount / 230);
  return `${minutes} min read`;
}

// Reading progress bar pinned to the top of the viewport.
export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50">
      <div
        className="h-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export const TableOfContents = ({ headings }: { headings: ContentHeading[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        // Find the first heading that is intersecting
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile TOC */}
      <div className="xl:hidden px-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
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
              {headings.map(h => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm py-0.5 transition-colors ${h.level === 3 ? "pl-6" : "pl-3"} ${
                      activeId === h.id
                        ? "text-primary border-l-2 border-primary -ml-px font-medium"
                        : "text-base-content/60 hover:text-base-content"
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop sticky TOC */}
      <aside className="hidden xl:block w-52 shrink-0">
        <nav className="sticky top-8">
          <p className="text-[10px] font-mono text-base-content/40 uppercase tracking-[0.2em] mb-4">On this page</p>
          <ul className="space-y-0.5 border-l border-base-content/10 list-none pl-0 my-0">
            {headings.map(h => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block text-[12.5px] leading-snug py-1 transition-all duration-200 ${
                    h.level === 3 ? "pl-5" : "pl-3"
                  } ${
                    activeId === h.id
                      ? "text-primary border-l-2 border-primary -ml-px font-medium"
                      : "text-base-content/50 hover:text-base-content/80"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
