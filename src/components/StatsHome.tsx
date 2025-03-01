'use client';
import React, { useEffect, useRef } from 'react'
import { useSearchParams } from "next/navigation";

function StatsHome() {

  const searchParams = useSearchParams();
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
      await fetch('/api/stats/home-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: '/', referrer: ref || '', ipAddress }),
      });
    } catch (error) {
      console.error("Error adding visit:", error);
    }
  }

  useEffect(() => {
    addVisit()
  }, []);

  return (
    <></>
  )
}

export default StatsHome