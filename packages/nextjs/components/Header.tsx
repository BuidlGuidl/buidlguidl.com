import React from "react";
import Image from "next/image";
import Link from "next/link";

const MENU_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Team", href: "/#team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#build-with-us" },
];

/**
 * Site header. `transparent` lets the page background show through (homepage hero).
 */
export const Header = ({ transparent = false }: { transparent?: boolean }) => {
  return (
    <div
      className={`navbar relative z-10 min-h-0 flex-shrink-0 justify-between px-0 py-4 pb-8 md:pb-4 sm:px-2 ${
        transparent ? "bg-transparent" : "bg-[#EFFBCA]"
      }`}
    >
      <div className="navbar-start w-auto lg:w-1/2 items-center">
        <Link href="/" passHref className="flex items-center gap-2 ml-3 mr-4 md:ml-4 md:mr-6">
          <div className="flex relative w-[110px] md:w-[150px] h-[36px]">
            <Image alt="BuidlGuidl logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
        </Link>
        <ul className="flex items-center gap-3 md:gap-6 list-none m-0 p-0 mt-1.5">
          {MENU_LINKS.map(link => (
            <li key={link.label}>
              <Link href={link.href} className="text-xs sm:text-sm md:text-base hover:underline underline-offset-4">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
