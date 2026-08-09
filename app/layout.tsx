import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteHeader } from "./components/site-header";
import { SITE_NAME, SITE_ROLE } from "./site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME}, ${SITE_ROLE}`,
  description: `Selected work by ${SITE_NAME}, ${SITE_ROLE.toLowerCase()}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
