"use client";
import { useState, useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Bell, Clock, Sparkles, Rocket, Star, Users, Zap, Shield, Heart, ChefHat, CalendarDays, Timer, Gift } from "lucide-react";
import Link from "next/link";
import NotificationModal from '@/components/NotificationModal';
import { getWaitlistCount } from '@/utils/waitlist';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [notificationType, setNotificationType] = useState<'email' | 'mobile'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscriberCount, setSubscriberCount] = useState<number>(0);
  const [showNotifyModal, setShowNotifyModal] = useState(false);

  // Countdown timer
  function getTimeLeft() {
    const target = new Date('2026-02-01T00:00:00+05:30'); // IST
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    return { days, hours, minutes, seconds };
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());


  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch subscriber count from API
  useEffect(() => {
    async function fetchSubscriberCount() {
      try {
        console.log('Fetching subscriber count...');
        const count = await getWaitlistCount();
        console.log('Subscriber count received:', count);
        setSubscriberCount(count);
      } catch (err) {
        console.error("Error fetching subscriber count:", err);
        setSubscriberCount(0);
      }
    }
    fetchSubscriberCount();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      
      {/* Notification Modal */}
      <NotificationModal
        open={showNotifyModal}
        onClose={() => setShowNotifyModal(false)}
        notificationType={notificationType}
        setNotificationType={setNotificationType}
        email={email}
        setEmail={setEmail}
        mobile={mobile}
        setMobile={setMobile}
        error={error}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        setError={setError}
        setIsSubscribed={setIsSubscribed}
        setSubscriberCount={setSubscriberCount}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 md:py-16 mt-14 sm:mt-16 md:mt-20">
        <div className="w-full max-w-4xl">
          {/* Subscriber Count */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 shadow-md border border-orange-200">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">{subscriberCount !== null ? subscriberCount.toLocaleString() : '...'}+ waiting</span>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-orange-100 mb-8 sm:mb-10">
            <div className="p-5 sm:p-8 md:p-12 text-center">
              {/* Logo/Title */}
              <div className="mb-6 sm:mb-8 flex justify-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                  <span className="text-xl sm:text-2xl font-bold text-orange-800">RestroTech</span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-br from-[#FF7D00] via-[#FF7D00] to-orange-400 bg-clip-text text-transparent">
                  Coming Soon
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                We&apos;re building something revolutionary for restaurants and hotels.
                Get ready for a smarter way to manage your hospitality business.
              </p>

              {/* Countdown Timer */}
              <div className="mb-8 sm:mb-10">
                <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 text-orange-600">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base font-medium">Launching this Winter – Between Dec 2025 & Feb 2026</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs sm:max-w-md mx-auto">
                  {[
                    { label: 'Days', value: timeLeft.days, icon: <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" /> },
                    { label: 'Hours', value: timeLeft.hours, icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" /> },
                    { label: 'Mins', value: timeLeft.minutes, icon: <Timer className="w-4 h-4 sm:w-5 sm:h-5" /> },
                    { label: 'Secs', value: timeLeft.seconds, icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" /> }
                  ].map((item) => (
                    <div key={item.label} className="bg-gradient-to-br from-[#FF7D00] via-[#FF7D00] to-orange-400 rounded-lg p-2 sm:p-3 text-white">
                      <div className="text-xl sm:text-2xl font-bold">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-[10px] sm:text-xs opacity-90">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Waitlist Button */}
              <div className="mb-6 sm:mb-8">
                <button
                  onClick={() => setShowNotifyModal(true)}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-white text-sm sm:text-base bg-gradient-to-br from-[#FF7D00] via-[#FF7D00] to-orange-400 hover:from-orange-500 hover:to-orange-500 shadow-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  Join Waitlist for Early Access
                </button>
              </div>

              {isSubscribed && (
                <div className="bg-green-50 text-green-700 p-2.5 sm:p-3 rounded-lg max-w-md mx-auto mb-4 sm:mb-6 text-sm sm:text-base">
                  Thank you! We&apos;ll notify you when we launch.
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Follow us for updates</p>
            <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link href="https://www.instagram.com/tabsye_official" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/company/tabsye" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
            
            {/* Additional Info Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-orange-100 max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-orange-800">Reimagining Hospitality Management</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Our platform brings together cutting-edge technology and hospitality expertise to create a seamless experience for both businesses and customers.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-orange-700">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Smart Solutions</span>
                  </div>
                  <p className="text-gray-600">Intelligent tools designed specifically for the hospitality industry</p>
                </div>
                <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1 text-orange-700">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Seamless Experience</span>
                  </div>
                  <p className="text-gray-600">A unified platform for both staff and customers</p>
                </div>
              </div>
            </div>
            
            {/* Why Choose Tabsye Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl overflow-hidden shadow-md border border-orange-100 max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 sm:p-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
                  Why Choose Tabsye?
                </h3>
              </div>
              
              <div className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-600 text-center mb-6 max-w-lg mx-auto">
                  We&apos;re revolutionizing how restaurants and hotels operate with intuitive technology designed for the modern hospitality industry
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm flex flex-col items-center text-center transform transition-all hover:scale-105">
                    <div className="bg-gradient-to-br from-[#FF7D00] to-orange-400 p-3 rounded-full mb-3 text-white">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-orange-800 mb-2">Efficiency Boost</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Streamline operations and increase productivity with our intuitive tools</p>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm flex flex-col items-center text-center transform transition-all hover:scale-105">
                    <div className="bg-gradient-to-br from-[#FF7D00] to-orange-400 p-3 rounded-full mb-3 text-white">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-orange-800 mb-2">Customer Delight</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Create memorable experiences that bring guests back again and again</p>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm flex flex-col items-center text-center transform transition-all hover:scale-105">
                    <div className="bg-gradient-to-br from-[#FF7D00] to-orange-400 p-3 rounded-full mb-3 text-white">
                      <Star className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-orange-800 mb-2">Intuitive Design</h4>
                    <p className="text-xs sm:text-sm text-gray-600">User-friendly interface requiring minimal training for your staff</p>
                  </div>
                </div>
                
                {/* How to Start Steps */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-orange-100">
                  <h4 className="text-center font-semibold text-orange-800 mb-5 text-lg">Getting Started is Easy</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-orange-50 rounded-lg p-4 text-center transform transition-all hover:shadow-md">
                      <div className="bg-gradient-to-br from-[#FF7D00] to-orange-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3">1</div>
                      <h5 className="font-medium text-orange-800 mb-2">Create Account</h5>
                      <p className="text-xs text-gray-600">Sign up in minutes after our launch</p>
                    </div>
                    
                    <div className="flex-1 bg-orange-50 rounded-lg p-4 text-center transform transition-all hover:shadow-md">
                      <div className="bg-gradient-to-br from-[#FF7D00] to-orange-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3">2</div>
                      <h5 className="font-medium text-orange-800 mb-2">21-Day Free Trial</h5>
                      <p className="text-xs text-gray-600">Experience all premium features</p>
                    </div>
                    
                    <div className="flex-1 bg-orange-50 rounded-lg p-4 text-center transform transition-all hover:shadow-md">
                      <div className="bg-gradient-to-br from-[#FF7D00] to-orange-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mx-auto mb-3">3</div>
                      <h5 className="font-medium text-orange-800 mb-2">Transform Business</h5>
                      <p className="text-xs text-gray-600">Watch your efficiency soar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Feature Preview Section */}
            <div className="bg-white/90 rounded-xl overflow-hidden shadow-lg border border-orange-100 max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-white text-center">
                  Unlock the Future of Hospitality
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { icon: <Bell className="w-5 h-5" />, label: "Smart Alerts" },
                    { icon: <ChefHat className="w-5 h-5" />, label: "Kitchen Hub" },
                    { icon: <Users className="w-5 h-5" />, label: "User Friendly" },
                    { icon: <Gift className="w-5 h-5" />, label: "Loyalty System" }
                  ].map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-2">
                        {feature.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{feature.label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => setShowNotifyModal(true)}
                    className="px-6 py-2.5 rounded-lg font-semibold text-white text-sm bg-gradient-to-br from-[#FF7D00] to-orange-400 hover:from-orange-500 hover:to-orange-500 shadow-md transition-all transform hover:scale-105 active:scale-95"
                  >
                    Be First to Know
                  </button>
                  
                  <p className="mt-3 text-xs text-gray-500 max-w-sm mx-auto">
                    Join our waiting list and be among the first to experience the future of hospitality management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}