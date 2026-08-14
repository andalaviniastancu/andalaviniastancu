import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteHeader } from "./components/site-header";
import { getSettings } from "../lib/sanity";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: `${settings?.name ?? ""}, ${settings?.role ?? ""}`,
    description: `Selected work by ${settings?.name ?? ""}.`,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();

  return (
    <html lang="en" className={geist.variable}>
      <body>
        <SiteHeader
          siteName={settings?.name ?? ""}
          email={settings?.email ?? ""}
          indexEntries={settings?.indexOrder ?? []}
        />
        {children}
      </body>
    </html>
  );
}
