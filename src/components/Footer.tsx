import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ComingSoonCard from "./ComingSoonCard";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  return (
    <footer className="bg-gray-100 text-sm border-t text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">


        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Tabsye Logo & Language (All screens) */}
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Image
              src="/logo.svg"
              alt="Tabsye Logo"
              width={120}
              height={40}
              className="mb-2"
            />
            <p className="text-xs text-gray-500 text-center mt-2">
              Proudly Made with ❤️ in{' '}
              <span className="font-outfit font-semibold text-gray-700">
                Bharat
              </span>
            </p>
            <div className="flex gap-3 mt-4 justify-center">
              <a
                href="https://www.instagram.com/tabsye_official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:scale-110 transition-transform text-gray-500 hover:text-orange-500"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/tabsye"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:scale-110 transition-transform text-gray-500 hover:text-orange-500"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* About Tabsye */}
          <div className="text-left">
            <h4 className="font-semibold mb-2">About Tabsye</h4>
            <ul className="space-y-1">
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>About Us</button>
              </li>
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Contact Us</button>
              </li>
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Careers</button>
              </li>
              <li>
                <a
                  href="https://blog.tabsye.com"
                  target="_blank"
                  className="hover:underline text-left"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Restaurant Partners */}
          <div className="text-left">
            <h4 className="font-semibold mb-2">For Restaurants</h4>
            <ul className="space-y-1">
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Register Your Restaurant</button>
              </li>
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Terms & Conditions</button>
              </li>
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Privacy Policy</button>
              </li>
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Apps For You</button>
              </li>
            </ul>
          </div>

          {/* Customers */}
          <div className="text-left">
            <h4 className="font-semibold mb-2">For Customers</h4>
            <ul className="space-y-1">
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Report Fraud</button>
              </li>
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Terms & Conditions</button>
              </li>
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Privacy Policy</button>
              </li>
              <li>
                <button className="hover:underline bg-transparent border-none outline-none cursor-pointer p-0 m-0 text-left" onClick={() => setShowComingSoon(true)}>Apps For You</button>
              </li>
            </ul>
          </div>

          
        </div>
      </div>

      <div className="text-center py-4 text-xs text-gray-400 border-t">
        &copy; {new Date().getFullYear()} Tabsye. All rights reserved.
      </div>
      {showComingSoon && (
        <ComingSoonCard onClose={() => setShowComingSoon(false)} />
      )}
    </footer>
  );
}
