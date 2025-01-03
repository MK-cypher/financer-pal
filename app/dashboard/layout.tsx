import type {Metadata} from "next";
import localFont from "next/font/local";
import "../globals.css";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/toaster";
import {UserProvider} from "@/components/UserContext";
import {getUser} from "../actions/users";
import {getAllData} from "../actions/overview";
import {FinanceProvider} from "@/components/FinanceContext";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const financeData = await getAllData();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} id="dashboard-page">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <FinanceProvider financeData={financeData}>
            <UserProvider user={user}>
              <Aside />
              <div>
                <Header />
                <main className="overflow-y-auto h-[calc(100svh-70px)]">{children}</main>
              </div>
              <Toaster />
            </UserProvider>
          </FinanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
