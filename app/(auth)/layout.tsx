import {ThemeProvider} from "@/components/theme-provider";
import {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import Logo from "./components/Logo";

export const metadata: Metadata = {
  title: "authentication",
  description: "",
};

const inter = Inter({subsets: ["latin"]});

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " dashboard"}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <nav className="py-5 fixed mx-auto w-full">
            <Logo />
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
