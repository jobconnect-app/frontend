import React from "react";

export default function GlobalLoader({
  visible = false,
}: {
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
        <span className="text-white text-lg font-semibold">Chargement...</span>
      </div>
    </div>
  );
}
