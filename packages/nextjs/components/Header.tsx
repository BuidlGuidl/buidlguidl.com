import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="navbar min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2 absolute">
      <div className="navbar-start w-auto lg:w-1/2">
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6">
          <div className="flex relative w-[206px] h-[49px]">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <a href="https://app.buidlguidl.com" target="_blank" className="btn btn-primary btn-sm" rel="noreferrer">
          Go to App
        </a>
      </div>
    </div>
  );
};
