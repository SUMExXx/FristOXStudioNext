import { Michroma, Lily_Script_One, Inter } from "next/font/google";

export const michroma = Michroma({ 
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"],
});

export const lillyScriptOne = Lily_Script_One({
    variable: "--font-lilly",
    subsets: ["latin"],
    weight: ["400"],
});

export const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});