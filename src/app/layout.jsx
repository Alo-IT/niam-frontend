"use client";
// import "./globals.css";
import { metadata } from "./global/constants/metadata";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./global/contexts/AuthContext";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </>
  );
}
