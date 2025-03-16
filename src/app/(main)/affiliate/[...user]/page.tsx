"use client"

import { AffiliateSidebar } from "@/components/AffiliateSidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AffiliateData {
  total_refers: number;
  success_refers: number;
}

export default function SignIn() {

  const params = useParams();

  const [isValid, setValidity] = useState<boolean | null>();

  const [data, setData] = useState<AffiliateData>()

  const checkValidity = async () => {
    const res = await fetch('/api/affiliate/check-validity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: params.user }),
        })
    
        if(res.status === 401){
          setValidity(false)
          return false
        }

        if(res.status === 200){
          setValidity(true)
          return true
        }
  }

  const getData = async () => {
    const res = await fetch('/api/affiliate/get-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: params.user}),
    })

    if(res.status === 401){
      alert('Error!')
    }
    
    if(res.status === 200){
      const resData = await res.json()
      setData(resData)
    }
  }

  useEffect(() => {
    checkValidity().then(() => {
      getData()
    })
  }, [])

  return (
    <>
      <AffiliateSidebar username={params.user as string} />
      <div className="w-full h-full flex flex-col items-center justify-start">
        {
          isValid ? 

          <main className="w-full flex flex-col items-center justify-start">
            <section className="w-full text-foreground">
              <div className="flex flex-1 flex-col gap-4 p-4 h-full overflow-y-scroll">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/50">
                    <div className="bg-black text-white p-5 rounded-2xl w-full h-full border border-white shadow-md">
                      <div className="text-sm text-gray-400 flex justify-between items-center">
                        <span>Total Referrals</span>
                        <span className="text-lg">➤</span>
                      </div>
                      <div className="text-2xl font-bold mt-1">{data?.total_refers}</div>
                    </div>
                  </div>
                  <div className="aspect-video rounded-xl bg-muted/50">
                    <div className="bg-black text-white p-5 rounded-2xl w-full h-full border border-white shadow-md">
                      <div className="text-sm text-gray-400 flex justify-between items-center">
                        <span>Successful Referrals</span>
                        <span className="text-lg">➤</span>
                      </div>
                      <div className="text-2xl font-bold mt-1">{data?.success_refers}</div>
                    </div>
                  </div>
                  <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">

                </div>
              </div>
            </section>
          </main>

          :

          isValid == false?

          <main className="w-full h-full text-foreground text-xl">
            Forbidden
          </main>

          :
          
          <main className="w-full h-full text-foreground text-xl">
            
          </main>
        }
      </div>
    </>
  );
}
