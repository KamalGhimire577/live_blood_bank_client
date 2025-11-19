


import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import { ReduxProvider } from "@/lib/store/provider";
import AppInitializer from "@/app/Components/AppInitializer";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Live Blood App",
  description: "Blood donation management system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <ReduxProvider>
          {/*This will restore token + user from localStorage on refresh */}
          <AppInitializer>
            <Navbar />
            {children}
            <Footer />
          </AppInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
