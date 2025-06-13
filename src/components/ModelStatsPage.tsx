'use client';

import { Suspense, useEffect } from 'react';

function ModelStatsPageContent(
    { model }: { model: string }
) {

  useEffect(() => {
    const addVisit = async () => {
      try {
        const data = await fetch('/api/stats/get-ip');
        const ipResponse = await data.json();
        const ipAddress = ipResponse.ip;

        await fetch('/api/stats/model-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ objectModel: model, ipAddress }),
        });
      } catch (error) {
        console.error("Error adding visit:", error);
      }
    };

    addVisit();
  }, [model]);

  return null; // Ensures the component renders but doesn't display anything
}

export default function ModelStatsPage(
    {model}: {model: string}
) {
  return (
    <Suspense fallback={null}>
      <ModelStatsPageContent model={model}/>
    </Suspense>
  );
}