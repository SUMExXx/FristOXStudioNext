'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from "next/navigation";

function ReferPageContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const requestSent = useRef(false); // Track if request is already sent

  useEffect(() => {
    if (!ref || requestSent.current) return; // Prevent multiple requests

    requestSent.current = true; // Mark request as sent

    const addVisit = async () => {
      try {
        await fetch('/api/affiliate/add-ref', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ referrer: ref }),
        });
      } catch (error) {
        console.error("Error adding visit:", error);
      }
    };

    addVisit();
  }, [ref]); // Runs only when `ref` is available

  return null; // Ensures the component renders but doesn't display anything
}

export default function ReferHome() {
  return (
    <Suspense fallback={null}>
      <ReferPageContent />
    </Suspense>
  );
}

