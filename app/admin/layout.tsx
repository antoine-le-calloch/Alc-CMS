import React from 'react';
import "./globals.css";

export default function PrivateLayout({children}: {
    children: React.ReactNode
}) {  
    return (
    <html lang="en">
      <body className="relative min-h-screen">
      {children}
      </body>
    </html>
  );
}