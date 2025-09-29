'use client';

import React from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface WaitlistStatusProps {
  status: "idle" | "success" | "error";
  message: string;
  onClose: () => void;
}

const WaitlistStatus: React.FC<WaitlistStatusProps> = ({ status, message, onClose }) => {
  if (status === "idle") return null;

  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn" onClick={onClose}>
      <div
        className="bg-gray-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative m-4"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="flex flex-col items-center justify-center mb-6">
          <div className={`flex items-center justify-center w-20 h-20 rounded-full mb-5 border-4 ${isSuccess ? 'border-green-500/30' : 'border-red-500/30'}`}>
            <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${isSuccess ? 'from-green-500/20 to-transparent' : 'from-red-500/20 to-transparent'}`}>
              {isSuccess ? (
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              ) : (
                <XCircle className="w-10 h-10 text-red-400" />
              )}
            </div>
          </div>
          
          <h2 className={`text-2xl font-bold mb-2 ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {isSuccess ? "Success!" : "An Error Occurred"}
          </h2>
          <p className="text-gray-300 text-sm">{message}</p>
        </div>

        <button
          className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300 border border-white/20"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WaitlistStatus;
