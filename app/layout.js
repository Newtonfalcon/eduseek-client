import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "EduSeek",
  description:
    "EduSeek helps students find the best scholarships and education offers worldwide using AI-powered search.",
  keywords: ["EduSeek", "Scholarships", "Study Abroad", "Grants", "Education", "AI"],
  authors: [{ name: "Netech", url: "https://netechportfolio.vercel.app" }],
  openGraph: {
    title: "EduSeek – AI Scholarship Finder",
    description:
      "Discover scholarships, grants, and study opportunities tailored for you.",
    url: "https://eduseek.vercel.app",
    siteName: "EduSeek",
    images: [
      {
        url: "/logo.png", // path to your image in /public
        width: 1200,
        height: 630,
        alt: "EduSeek AI Scholarship Finder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduSeek – AI Scholarship Finder",
    description:
      "Find scholarships and educational opportunities worldwide with EduSeek.",
    images: ["/logo.png"],
    creator: "@Netech",
  },
  icons: {
    icon: "/logo.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
