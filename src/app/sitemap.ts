import { MetadataRoute } from "next";

const BASE_URL = "https://fristox-studio.vercel.app"; // Replace with your actual domain

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
  ];
};

export default sitemap;

