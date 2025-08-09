"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Menu, X } from "lucide-react";
import ComingSoonCard from "./ComingSoonCard";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  return (
    <>
      <header className="w-full bg-white shadow-md px-4 py-2 sm:px-6 fixed top-0 left-0 z-50">
        {/* Mobile View */}
        <div className="flex items-center justify-between sm:hidden relative">
          {/* Menu Icon on Left */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-black z-20"
          >
            <Menu size={24} />
          </button>

          {/* Logo in Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image 
                src="/logo.svg" 
                alt="Tabsye Logo" 
                width={120} 
                height={30} 
                className="h-5 w-auto" 
              />
            </Link>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Logo on Left */}
          <Link href="/">
              <Image 
                src="/logo.svg" 
                alt="Tabsye Logo" 
                width={120} 
                height={30} 
                className="h-6 w-auto sm:h-7" 
              />
            </Link>

          {/* Nav Links on Right */}
          <nav className="flex items-center gap-6 font-light text-gray-600 text-sm sm:text-[18px]">
            <button
              onClick={() => setShowComingSoon(true)}
              className="hover:text-orange-500 transition bg-transparent border-none outline-none cursor-pointer"
              type="button"
            >
              About Us
            </button>
            <button
              onClick={() => setShowComingSoon(true)}
              className="hover:text-orange-500 transition bg-transparent border-none outline-none cursor-pointer"
              type="button"
            >
              Contact Us
            </button>
            <button
              onClick={() => setShowComingSoon(true)}
              className="hover:text-orange-500 transition bg-transparent border-none outline-none cursor-pointer"
              type="button"
            >
              Report a Fraud
            </button>
            <button
              onClick={() => setShowComingSoon(true)}
              className="hover:text-orange-500 transition bg-transparent border-none outline-none cursor-pointer"
              type="button"
            >
              Blog
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Side Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="absolute left-0 top-0 w-[75%] h-full bg-white p-6 shadow-lg animate-slideIn">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Logo Centered in Drawer */}
            <div className="flex justify-center mb-6">
              <Link href="/">
                <Image 
                  src="/logo.svg" 
                  alt="Tabsye Logo" 
                  width={120} 
                  height={30} 
                  className="h-5 w-auto" 
                />
              </Link>
            </div>

            {/* Links */}
            <ul className="space-y-4 text-left text-black font-light">
              <li>
                <button
                  onClick={() => { setMenuOpen(false); setShowComingSoon(true); }}
                  className="hover:text-orange-500 transition bg-transparent border-none outline-none cursor-pointer w-full text-left"
                  type="button"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setMenuOpen(false); setShowComingSoon(true); }}
                  className="hover:text-orange-500 transition bg-transparent border-none outline-none cursor-pointer w-full text-left"
                  type="button"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setMenuOpen(false); setShowComingSoon(true); }}
                  className="hover:text-orange-500 transition bg-transparent border-none outline-none cursor-pointer w-full text-left"
                  type="button"
                >
                  Report a Fraud
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setMenuOpen(false); setShowComingSoon(true); }}
                  className="hover:text-orange-500 transition bg-transparent border-none outline-none cursor-pointer w-full text-left"
                  type="button"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {showComingSoon && (
        <ComingSoonCard onClose={() => setShowComingSoon(false)} />
      )}
    </>
  );
}
