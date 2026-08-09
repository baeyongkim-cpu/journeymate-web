import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/LanguageContext";
import { AuthProvider } from "@/lib/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingChat } from "@/components/FloatingChat";

export const metadata: Metadata = {
  title: "JourneyMate | Capture Your Trip Like a Movie",
  description: "We don't sell itineraries. We craft moments that linger in your heart forever.",
  openGraph: {
    title: "JourneyMate | Capture Your Trip Like a Movie",
    description: "We don't sell itineraries. We craft moments that linger in your heart forever.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingChat />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
