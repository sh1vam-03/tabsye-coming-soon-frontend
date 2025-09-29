import { X, Sparkles } from "lucide-react";

export default function ComingSoonCard({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-gray-800/50 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className="mb-5 flex justify-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full text-white shadow-lg">
                <Sparkles size={32} />
            </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Coming Soon!</h2>
        <p className="text-gray-300 text-base mb-2">This feature is under construction.</p>
        <p className="text-gray-400 text-sm">We&apos;re working hard to bring you something amazing. Stay tuned!</p>
      </div>
    </div>
  );
}
