'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, usePathname } from "next/navigation";

function StatsPageContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const ref = searchParams.get("ref");

  useEffect(() => {
    const addVisit = async () => {
      try {
        const data = await fetch('/api/stats/get-ip');
        const ipResponse = await data.json();
        const ipAddress = ipResponse.ip;

        await fetch('/api/stats/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: pathname, referrer: ref || '', ipAddress }),
        });
      } catch (error) {
        console.error("Error adding visit:", error);
      }
    };

    addVisit();
  }, [pathname, ref]);

  return null; // Ensures the component renders but doesn't display anything
}

export default function StatsPage() {
  return (
    <Suspense fallback={null}>
      <StatsPageContent />
    </Suspense>
  );
}
