import { X } from "lucide-react";

export default function ComingSoonCard({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full text-center relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className="mb-4">
          <span className="inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full px-4 py-2 text-lg font-bold mb-2">Coming Soon!</span>
        </div>
        <p className="text-gray-700 text-base mb-2 font-medium">This page will be available soon.</p>
        <p className="text-gray-500 text-sm">Stay tuned for updates and exciting features!</p>
      </div>
    </div>
  );
}
