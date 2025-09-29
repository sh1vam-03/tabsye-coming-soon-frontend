'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

export default function Header({ onWaitlistClick, onLinkClick }: { onWaitlistClick: () => void, onLinkClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const navLinks = ["About Us", "Contact Us", "Report a Fraud", "Blog"];

  return (
    <>
      <header className="w-full bg-white/80 dark:bg-black/20 backdrop-blur-lg border-b border-black/10 dark:border-white/10 px-4 py-3 sm:px-6 fixed top-0 left-0 z-50">
        {/* Mobile View */}
        <div className="flex items-center justify-between sm:hidden relative">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors z-20"
          >
            <Menu size={24} />
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image
                src={resolvedTheme === 'dark' ? "/w_logo.svg" : "/logo.svg"}
                alt="Tabsye Logo"
                width={100}
                height={24}
                className="h-6 w-auto"
              />
            </Link>
          </div>
          <div className="z-20">
             <ThemeToggle />
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex items-center">
          <div className="flex-1 flex items-center">
            <Link href="/">
              <Image
                src={resolvedTheme === 'dark' ? "/w_logo.svg" : "/logo.svg"}
                alt="Tabsye Logo"
                width={120}
                height={30}
                className="h-7 w-auto"
              />
            </Link>
          </div>
          
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <button key={link} onClick={onLinkClick} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                {link}
              </button>
            ))}
          </nav>

          <div className="flex-1 flex items-center justify-end gap-4">
            <button
              onClick={onWaitlistClick}
              className="px-4 py-2 rounded-lg font-semibold text-white text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Join Waitlist
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 w-[75%] h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 shadow-2xl animate-slideIn border-r border-black/10 dark:border-white/10">
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="flex justify-center mb-8">
              <Link href="/">
                <Image
                  src={resolvedTheme === 'dark' ? "/w_logo.svg" : "/logo.svg"}
                  alt="Tabsye Logo"
                  width={120}
                  height={30}
                  className="h-6 w-auto"
                />
              </Link>
            </div>
            <nav className="flex flex-col gap-5 text-center">
              {navLinks.map((link) => (
                <button key={link} onClick={onLinkClick} className="text-gray-700 dark:text-gray-200 text-lg font-medium hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  {link}
                </button>
              ))}
            </nav>
            <div className="mt-8 border-t border-black/10 dark:border-white/10 pt-6 flex justify-center">
              <button
                onClick={onWaitlistClick}
                className="w-full px-6 py-3 rounded-xl font-bold text-white text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
