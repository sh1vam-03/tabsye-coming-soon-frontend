import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface WaitlistStatusProps {
  status: "idle" | "success" | "error";
  message: string;
  onClose: () => void;
}

const WaitlistStatus: React.FC<WaitlistStatusProps> = ({ status, message, onClose }) => {
  if (status === "idle") return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-fadeIn relative border-2 border-orange-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col items-center mb-4">
          <span className={`rounded-full p-3 shadow-lg mb-2 ${status === "success" ? "bg-green-100" : "bg-red-100"}`}>
            {status === "success" ? (
              <CheckCircle2 className="w-14 h-14 text-green-500" />
            ) : (
              <XCircle className="w-14 h-14 text-red-500" />
            )}
          </span>
          <div className={`text-2xl font-bold mb-1 ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {status === "success" ? "Successfully Registered!" : "Registration Failed"}
          </div>
        </div>
        <div className="text-gray-700 mb-6 text-base font-medium min-h-[32px]">{message}</div>
        <button
          className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-md transition-all text-lg"
          onClick={onClose}
        >
          Close
        </button>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400 rounded-full blur-sm opacity-60"></div>
      </div>
    </div>
  );
};

export default WaitlistStatus;
