import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReRedo - Redovisningsbyrå",
  description: "ReRedo - Din engagerade ekonomipartner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased font-urbanist">
        {children}
      </body>
    </html>
  );
}
