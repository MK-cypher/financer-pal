import Aside from "@/components/Aside";
import {ThemeProvider} from "@/components/theme-provider";
import type {Metadata} from "next";
import localFont from "next/font/local";
import "../globals.css";
import {Toaster} from "@/components/ui/toaster";
import {getUser} from "../actions/users";
import Navbar from "@/components/Navbar/Navbar";
import {UserProvider} from "@/components/UserContext";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FinancerPal",
  description: "Manage your finances",
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const user = await getUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`} id="main-page">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <UserProvider user={user}>
            <Navbar user={user} />
            <main className="mt-20 max-sm:mt-24">{children}</main>
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
