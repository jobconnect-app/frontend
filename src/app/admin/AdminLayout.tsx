"use client";
import React from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 p-8 md:p-12 transition-all duration-200 space-y-8">
        {children}
      </main>
    </div>
  );
}
