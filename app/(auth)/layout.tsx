import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-red-300 items-center h-full justify-center">
      {children}
    </div>
  );
}
