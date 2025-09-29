'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import ComingSoonCard from './ComingSoonCard';
import { useState } from 'react';

export default function Footer({ onWaitlistClick }: { onWaitlistClick: () => void }) {
    const [showComingSoon, setShowComingSoon] = useState(false);


  const FooterLink = ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <li>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
          {children}
        </a>
      ) : (
        <button onClick={onWaitlistClick} className="hover:text-white transition-colors duration-300 text-left w-full">
          {children}
        </button>
      )}
    </li>
  );

  return (
    <>
      <footer className="bg-black/50 backdrop-blur-2xl text-gray-400 border-t border-white/10 mt-32 font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* CTA Section */}
          <div className="py-12 border-b border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-medium text-white max-w-lg">
                  A new era of dining is on the horizon. Be the first to know.
              </h3>
              <button
                onClick={onWaitlistClick}
                className="bg-white/10 border border-white/20 rounded-lg px-5 py-3 text-sm text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300 group shrink-0"
              >
                Join The Waitlist <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform"/>
              </button>
          </div>

          <div className="py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            
            <div className="sm:col-span-2 md:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <Link href="/" className="inline-block mb-4">
                <Image src="/w_logo.svg" alt="Tabsye Logo" width={120} height={30} />
              </Link>
              <div className="flex items-center gap-5 mb-4">
                <a href="https://www.instagram.com/tabsye_official" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-transform hover:scale-110">
                  <FaInstagram size={20} />
                </a>
                <a href="https://www.linkedin.com/company/tabsye" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-transform hover:scale-110">
                  <FaLinkedin size={20} />
                </a>
              </div>
               <p className="text-xs text-gray-500">
                Proudly Made with ❤️ in <span className="font-medium text-gray-400">Bharat</span>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-white tracking-wider">About</h4>
              <ul className="space-y-4 text-sm">
                <FooterLink>About Us</FooterLink>
                <FooterLink>Careers</FooterLink>
                <FooterLink href="https://blog.tabsye.com">Blog</FooterLink>
                <FooterLink>Contact Us</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-white tracking-wider">For Restaurants</h4>
              <ul className="space-y-4 text-sm">
                <FooterLink>Register</FooterLink>
                <FooterLink>Terms & Conditions</FooterLink>
                <FooterLink>Privacy Policy</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-white tracking-wider">For You</h4>
              <ul className="space-y-4 text-sm">
                <FooterLink>Privacy Policy</FooterLink>
                <FooterLink>Terms of Use</FooterLink>
                <FooterLink>Report Fraud</FooterLink>
                <FooterLink>Apps</FooterLink>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Tabsye Technologies Pvt. Ltd. All Rights Reserved.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
