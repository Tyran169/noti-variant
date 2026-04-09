import type { Metadata } from "next";
import { Header } from "@/components/layouts/header";
import { EnsureDefaultIcon, Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/tweakcn-theme-provider";
import { preLoadResources, rootMetadata } from "./metadata";
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
      className={cn(
        "h-full font-sans antialiased",
        "font-sans",
        geist.variable
      )}
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
