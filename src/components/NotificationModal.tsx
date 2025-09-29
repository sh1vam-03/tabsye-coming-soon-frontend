'use client';

import React from "react";
import Image from "next/image";
import { Mail, Phone, X } from "lucide-react";

import { checkWaitlistExists, addToWaitlist } from "../utils/waitlist";
import WaitlistStatus from "./WaitlistStatus";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  notificationType: "email" | "mobile";
  setNotificationType: (t: "email" | "mobile") => void;
  email: string;
  setEmail: (e: string) => void;
  mobile: string;
  setMobile: (m: string) => void;
  error: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (b: boolean) => void;
  setError: (e: string | null) => void;
  setIsSubscribed: (b: boolean) => void;
  setSubscriberCount: (fn: (prev: number) => number) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  onClose,
  notificationType,
  setNotificationType,
  email,
  setEmail,
  mobile,
  setMobile,
  error,
  isSubmitting,
  setIsSubmitting,
  setError,
  setIsSubscribed,
  setSubscriberCount,
}) => {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  if (!open) return null;

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setStatus("idle");
    setStatusMessage("");

    try {
      if (!firstName.trim()) throw new Error("First name is required.");
      if (!lastName.trim()) throw new Error("Last name is required.");

      const contact = notificationType === 'email' ? email : mobile;
      const exists = await checkWaitlistExists(notificationType, contact);
      
      if (exists) {
        setStatus("error");
        setStatusMessage(`This ${notificationType} is already on the waitlist.`);
        return;
      }

      await addToWaitlist(notificationType, contact, firstName, lastName);
      
      setStatus("success");
      setStatusMessage("You have been successfully added to the waitlist!");
      setIsSubscribed(true);
      setSubscriberCount(prev => prev + 1);
      setEmail('');
      setMobile('');
      setFirstName('');
      setLastName('');

    } catch (err) {
      console.error("Error in submit:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusClose = () => {
    setStatus("idle");
    setStatusMessage("");
    setError(null);
    if(status === 'success') onClose(); // Close main modal only on success
  };
  
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="bg-gray-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md m-4 sm:m-0 animate-slideUp sm:animate-fadeIn"
          onClick={e => e.stopPropagation()}
        >
           <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>

          <div className="flex justify-center mb-5">
             <Image src="/w_logo.svg" alt="Tabsye Logo" width={100} height={30} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Be the First to Know
          </h3>
          
          <div className="flex mb-6 bg-gray-800/60 rounded-lg p-1">
            <button
              onClick={() => setNotificationType('mobile')}
              className={`w-full py-2 rounded-md transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 ${notificationType === 'mobile' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'text-gray-400 hover:bg-gray-700/50'}`}>
                <Phone size={16} />
                Mobile
            </button>
            <button
              onClick={() => setNotificationType('email')}
              className={`w-full py-2 rounded-md transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 ${notificationType === 'email' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'text-gray-400 hover:bg-gray-700/50'}`}>
              <Mail size={16} />
              Email
            </button>
          </div>

          <form onSubmit={handleNotifySubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" className="w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/60 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" autoComplete="given-name" disabled={isSubmitting} />
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" className="w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/60 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" autoComplete="family-name" disabled={isSubmitting} />
            </div>

            {notificationType === 'mobile' ? (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 select-none">+91</span>
                <input type="tel" value={mobile} onChange={e => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) setMobile(val);
                  }} placeholder="Enter mobile number" className="w-full pl-12 pr-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/60 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" maxLength={10} inputMode="numeric" disabled={isSubmitting} />
              </div>
            ) : (
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your.email@example.com" className="w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/60 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" disabled={isSubmitting} />
            )}

            {error && (
              <div className="p-3 text-sm text-red-300 bg-red-900/40 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}

            <button type="submit" disabled={isSubmitting || !firstName.trim() || !lastName.trim() || !(notificationType === 'email' ? email.trim() : mobile.trim())}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform enabled:hover:scale-105 enabled:active:scale-95 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:shadow-lg enabled:hover:shadow-purple-500/20">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining...
                </>
              ) : (
                'Join Waitlist'
              )}
            </button>
          </form>
          
          <p className="text-center text-xs mt-5 text-gray-500">
            Join the waitlist to get exclusive early access and updates.
          </p>
        </div>
      </div>
      {status !== 'idle' && <WaitlistStatus status={status} message={statusMessage} onClose={handleStatusClose} />}
    </>
  );
};

export default NotificationModal;
