import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { StoreProvider } from "./store/StoreProvider";
import Theme from "./themeProvider";
import Navbar from "./components/Navbar/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Token Traxx",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} dark:bg-blue900`}>
        <StoreProvider>
          <Theme>
            <Navbar />
            {children}
          </Theme>
        </StoreProvider>
      </body>
    </html>
  );
}
