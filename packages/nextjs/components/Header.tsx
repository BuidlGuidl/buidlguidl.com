import React from "react";
import Image from "next/image";
import Link from "next/link";
import TrackedLink from "~~/components/TrackedLink";

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="navbar min-h-0 flex-shrink-0 justify-between px-0 py-4 pb-8 md:pb-4 sm:px-2 bg-[#EFFBCA]">
      <div className="navbar-start w-auto lg:w-1/2">
        <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6">
          <div className="flex relative w-[130px] md:w-[150px] h-[36px]">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4 space-x-6 z-10">
        <TrackedLink
          id="buidlguidl:app"
          href="https://app.buidlguidl.com"
          className="btn btn-neutral hover:bg-info hover:border-info text-accent-content btn-xs md:btn-sm px-4 font-light"
        >
          Go to App
        </TrackedLink>
      </div>
    </div>
  );
};
