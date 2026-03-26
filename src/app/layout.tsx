import type { Metadata } from "next";
import { Fira_Code, Geist, Lora } from "next/font/google";
import { Header } from "@/components/layouts/header";
import { EnsureDefaultIcon, Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { preLoadResources, rootMetadata } from "./metadata";
import "@/styles/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif"
});

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  preLoadResources();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full font-sans antialiased ${geist.variable} ${fontSerif.variable} ${fontMono.variable}`}
    >
      <body className="min-h-full" style={{ marginRight: "unset !important" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main id="main-app">
            <div className="min-h-screen">
              <Header />
              {children}
            </div>
            <EnsureDefaultIcon />
            <Toaster closeButton />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
