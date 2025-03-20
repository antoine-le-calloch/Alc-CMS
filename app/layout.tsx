import React from "react";
import "./globals.css";
import {ToastContainer} from "react-toastify";

export const metadata = {
  title: 'CMS',
  description: 'Content Management System developed by Antoine Le Calloch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
      {children}
      <ToastContainer position="top-right"/>
      </body>
    </html>
  )
}
