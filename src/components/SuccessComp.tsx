'use client';

import { contents } from '@/lib/data/website';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const SuccessComp = (
    {text}: {text: string}
) => {

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
            <h1 className="custom-heading1 text-foreground">{text}</h1>
            <p className="custom-display text-primary">{contents.text26}</p>
          </section>
        </main>
      </div>
    );
}

export default SuccessComp