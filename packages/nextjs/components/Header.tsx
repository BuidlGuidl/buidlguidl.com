"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

const MENU_LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Team", href: "/#team" },
  { label: "Blog", href: "/blog" },
  { label: "Guides", href: "/guides" },
  { label: "Contact", href: "/#build-with-us" },
];

/**
 * Site header. `transparent` lets the page background show through (homepage hero).
 */
export const Header = ({ transparent = false }: { transparent?: boolean }) => {
  return (
    <div
      className={`navbar relative z-20 min-h-0 flex-shrink-0 justify-between px-0 py-4 pb-8 md:pb-4 sm:px-2 ${
        transparent ? "bg-transparent" : "bg-[#EFFBCA]"
      }`}
    >
      <div className="navbar-start w-auto lg:w-1/2 items-end">
        <Link href="/" passHref className="flex items-center gap-2 ml-3 md:ml-4 mr-8 md:mr-12">
          <div className="flex relative w-[110px] md:w-[150px] h-[36px]">
            <Image alt="BuidlGuidl logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
        </Link>
        {/* Desktop menu, bottom-aligned with the logo wordmark */}
        <ul className="hidden md:flex items-end gap-6 list-none m-0 p-0">
          {MENU_LINKS.map(link => (
            <li key={link.label}>
              <Link href={link.href} className="text-base leading-none hover:underline underline-offset-4">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile burger menu */}
      <div className="navbar-end w-auto md:hidden mr-3">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-sm px-2" aria-label="Open menu">
            <Bars3Icon className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-2 p-2 shadow-lg bg-white rounded-box w-44 list-none z-50"
          >
            {MENU_LINKS.map(link => (
              <li key={link.label}>
                <Link href={link.href} onClick={() => (document.activeElement as HTMLElement)?.blur()}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
