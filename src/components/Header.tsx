"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ComingSoonCard from "./ComingSoonCard";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const navLinks = ["About Us", "Contact Us", "Report a Fraud", "Blog"];

  return (
    <>
      <header className="w-full bg-black/20 backdrop-blur-lg border-b border-white/10 px-4 py-3 sm:px-6 fixed top-0 left-0 z-50">
        {/* Mobile View */}
        <div className="flex items-center justify-between sm:hidden relative">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-300 hover:text-white transition-colors z-20"
          >
            <Menu size={24} />
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image
                src="/w_logo.svg"
                alt="Tabsye Logo"
                width={100}
                height={25}
                className="h-5 w-auto"
              />
            </Link>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex items-center justify-between">
          <Link href="/">
            <Image
              src="/w_logo.svg"
              alt="Tabsye Logo"
              width={120}
              height={30}
              className="h-6 w-auto sm:h-7"
            />
          </Link>
          <nav className="flex items-center gap-6 font-light text-gray-400 text-sm sm:text-base">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setShowComingSoon(true)}
                className="hover:text-white transition-colors duration-300"
                type="button"
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Side Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 w-[75%] h-full bg-gray-900/80 backdrop-blur-xl p-6 shadow-2xl animate-slideIn border-r border-white/10">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="flex justify-center mb-8">
              <Link href="/">
                <Image
                  src="/w_logo.svg"
                  alt="Tabsye Logo"
                  width={120}
                  height={30}
                  className="h-6 w-auto"
                />
              </Link>
            </div>
            <ul className="space-y-5 text-left text-gray-300 font-light">
              {navLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShowComingSoon(true);
                    }}
                    className="hover:text-white transition-colors duration-300 w-full text-left text-lg"
                    type="button"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {showComingSoon && <ComingSoonCard onClose={() => setShowComingSoon(false)} />}
    </>
  );
}
