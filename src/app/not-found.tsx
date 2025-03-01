import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { webData, website } from "@/data/website";
import { inter, lillyScriptOne, michroma } from "@/data/fonts";

export const metadata: Metadata = {
  title: webData.title,
  description: webData.description,
  keywords: webData.keywords,
  authors: [
    {
      name: "Suman Debnath",
      url: "https://sumandebnath.site",
    },
  ],
  creator: "Suman Debnath",
  // other: {
  //   "google-adsense-account": "ca-pub-2246017499375159",
  //   "google-site-verification": "u_ExZBcFIU6jz7OJ4L7bORzuQbPqF3MRksHVsMlWQv4"
  // },
  // openGraph: {
  //   title: webData.title,
  //   description: webData.description,
  //   url: website.url,
  //   siteName: webData.title,
  //   images: [
  //     {
  //       url: website.url+'/images/opengraph-image.png',
  //       width: 1920,
  //       height: 1080,
  //       alt: 'Image description',
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: webData.title,
  //   description: webData.description,
  //   images: [website.url+'/files/opengraph-image.png'],
  //   creator: "@SUMExXx666"
  // },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function NotFound({
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lillyScriptOne.variable} ${michroma.variable} ${inter.variable}antialiased`}>
        {/* <StateProvider>
          <AuthContextProvider> */}
            <Navbar/>
            <div className='mt-[60px] md:mt-[80px] text-black flex flex-col justify-center items-center md:gap-10 md:h-[640px]'>
                <h1 className="text-4xl custom-heading1 text-foreground font-bold">404 - Page Not Found</h1>
                <p className="text-foreground custom-display2 mt-2">Oops! The page you’re looking for doesn’t exist.</p>
            </div>
            <Footer/>
            {/* <Spinner/> */}
          {/* </AuthContextProvider>
        </StateProvider> */}
      </body>
    </html>
  );
}
