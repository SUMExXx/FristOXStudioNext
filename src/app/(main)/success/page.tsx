"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { contents } from "@/data/website";

export default function Success() {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/signin"); // Redirect to /signin after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [router]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <main className="w-full h-full flex flex-col items-center justify-center">
        <section className="w-full h-full flex flex-col justify-center items-center md:gap-20">
          <h1 className="custom-heading1 text-foreground">{contents.text25}</h1>
          <p className="custom-display text-primary">{contents.text26}</p>
        </section>
      </main>
    </div>
  );
}
