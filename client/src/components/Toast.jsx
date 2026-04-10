import { useEffect } from "react";

export default function Toast({ message, type = "success", show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-down">
      <div
        className={`px-5 py-3 rounded-xl shadow-lg text-white font-medium flex items-center gap-3
          ${type === "success" && "bg-green-600"}
          ${type === "error" && "bg-red-600"}
          ${type === "info" && "bg-blue-600"}
        `}
      >
        {message}
      </div>
    </div>
  );
}