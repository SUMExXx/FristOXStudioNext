'use client';
import React, { Suspense, useEffect, useRef } from 'react'
import { useSearchParams, usePathname } from "next/navigation";

function StatsPage() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const ref = searchParams.get("ref");
  const hasRun = useRef(false); // Track if function has run

  const addVisit = async () => {
    if (hasRun.current) return; // Prevent second execution
      hasRun.current = true; 
    
    try{
      const data = await fetch('/api/stats/get-ip');
      const ipResponse = await data.json();
      const ipAddress = ipResponse.ip;

        // Send Visit Data
      await fetch('/api/stats/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pathname, referrer: ref || '', ipAddress }),
      });
    } catch (error) {
      console.error("Error adding visit:", error);
    }
  }

  useEffect(() => {
    addVisit()
  }, []);

  return (
    <Suspense>
    </Suspense>
  )
}

export default StatsPage