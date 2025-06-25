"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/studio"); // Redirect to /signin after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [router]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <main className="w-full h-full flex flex-col items-center justify-center">
        <section className="w-full h-full flex flex-col justify-center items-center md:gap-20">
          <h1 className="custom-heading1 text-foreground">Your Subscription is Activated!</h1>
          <p className="custom-display text-primary">Redirecting to studio</p>
        </section>
      </main>
    </div>
  );
}
