import type { Metadata } from "next";
import "@/app/globals.css";
import { webData } from "@/lib/data/website";
import { inter, poppins } from "@/lib/data/fonts";
import Script from "next/script";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const subdomain = "sumexxx";

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <Script
          src="https://app.pocketsflow.com/pocketsflow-popup.js"
          data-subdomain={subdomain}
          strategy="afterInteractive"
        />
        {/* <StateProvider>
          <AuthContextProvider> */}
            {children}
            {/* <Footer/> */}
            {/* <Spinner/> */}
          {/* </AuthContextProvider>
        </StateProvider> */}
      </body>
    </html>
  );
}
