import { Poppins, Inter } from "next/font/google";

export const poppins = Poppins({ 
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"],
});

export const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});