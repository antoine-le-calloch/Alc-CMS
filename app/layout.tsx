import React from "react";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  )
}
