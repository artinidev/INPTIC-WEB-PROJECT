import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "INPTIC – Building Algeria's Next Generation of Digital Leaders",
  description: "Engineering education, professional certifications, continuous training, and digital innovation programs at INPTIC — the National Higher School of Information and Communication Technologies.",
  keywords: ["INPTIC", "Algeria", "Digital Transformation", "Engineering", "Telecom", "IT Education", "Professional Training"],
  openGraph: {
    title: "INPTIC – Algeria's Digital Education Institution",
    description: "Engineering education, professional certifications, and digital innovation for Algeria's future.",
    url: "https://inptic.edu.dz",
    siteName: "INPTIC",
    locale: "en_US",
    type: "website",
  },
};

import { LanguageProvider } from "../i18n/LanguageContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
