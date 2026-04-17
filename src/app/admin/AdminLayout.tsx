"use client";
import React from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Sidebar />
      <main style={{
        flex:      1,
        marginLeft: 236,
        padding:   "32px",
        minHeight: "100vh",
        maxWidth:  "calc(100vw - 236px)",
        overflowX: "hidden",
      }}
        className="admin-main"
      >
        {children}
      </main>

      <style>{`
        @media (max-width: 767px) {
          .admin-main {
            margin-left: 0 !important;
            max-width: 100vw !important;
            padding: 60px 16px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}