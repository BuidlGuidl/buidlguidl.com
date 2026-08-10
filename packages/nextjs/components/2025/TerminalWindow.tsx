import { ReactNode, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export interface TerminalTab {
  id: string;
  title: string;
  content: ReactNode;
  links?: { url: string; label: string }[];
}

interface TerminalWindowProps {
  tabs: TerminalTab[];
}

const TabLinks = ({ links }: { links?: { url: string; label: string }[] }) => {
  if (!links || links.length === 0) return null;
  return (
    <div className="flex items-center gap-5 mt-6">
      {links.map(link => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-white text-sm transition-colors"
        >
          → {link.label}
        </a>
      ))}
    </div>
  );
};

const CatPrompt = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 font-mono text-sm text-secondary mb-4">
    <span>$</span>
    <span>cat {title.toLowerCase().replace(/\s+/g, "-")}.md</span>
  </div>
);

// Desktop version with tabs
const DesktopTerminal = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: TerminalTab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}) => {
  const activeContent = tabs.find(t => t.id === activeTab);

  return (
    <div className="hidden md:block rounded-xl overflow-hidden bg-[#212638] shadow-md">
      {/* Title bar */}
      <div className="flex items-stretch bg-white/[0.06] border-b border-white/[0.08]">
        {/* Window controls (decorative) */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>

        {/* Tab headers: natural width, scroll sideways when they don't fit */}
        <div role="tablist" className="flex items-stretch flex-1 overflow-x-auto [scrollbar-width:thin]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 flex items-center px-4 font-mono text-xs whitespace-nowrap border-l border-white/[0.08] transition-colors duration-200 ${
                activeTab === tab.id ? "bg-white/10 text-white font-medium" : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="p-6">
        {activeContent && (
          <div>
            <CatPrompt title={activeContent.title} />
            {activeContent.content}
            <TabLinks links={activeContent.links} />
          </div>
        )}
      </div>
    </div>
  );
};

// Mobile version with accordion inside a single terminal frame
const MobileTerminal = ({
  tabs,
  expandedTab,
  toggleTab,
}: {
  tabs: TerminalTab[];
  expandedTab: string | null;
  toggleTab: (id: string) => void;
}) => (
  <div className="md:hidden rounded-xl overflow-hidden bg-[#212638] shadow-md">
    {/* Title bar with window controls */}
    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.06] border-b border-white/[0.08]">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
    </div>

    {/* Accordion items */}
    <div>
      {tabs.map((tab, index) => {
        const isExpanded = expandedTab === tab.id;
        const isLast = index === tabs.length - 1;
        return (
          <div key={tab.id} className={!isLast ? "border-b border-white/[0.08]" : ""}>
            <button
              type="button"
              onClick={() => toggleTab(tab.id)}
              aria-expanded={isExpanded}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <span className="font-mono text-sm text-white font-medium">{tab.title}</span>
              <ChevronDownIcon
                className={`w-5 h-5 text-white/40 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0 invisible"
              }`}
            >
              <div className="px-4 pb-4">
                <CatPrompt title={tab.title} />
                {tab.content}
                <TabLinks links={tab.links} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export const TerminalWindow = ({ tabs }: TerminalWindowProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id);
  const [expandedTab, setExpandedTab] = useState<string | null>(tabs[0]?.id);

  const toggleTab = (id: string) => {
    setExpandedTab(expandedTab === id ? null : id);
  };

  return (
    <>
      <DesktopTerminal tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <MobileTerminal tabs={tabs} expandedTab={expandedTab} toggleTab={toggleTab} />
    </>
  );
};
