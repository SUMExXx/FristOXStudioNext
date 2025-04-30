"use client"
import StatsPage from "@/components/StatsPage";
import { Types3D } from "@/data/website";
import { useState } from "react";

export default function TwoD() {

  const [type, setType] = useState(Types3D.shirt);

  const changeType = (type: Types3D) => {
    setType((prev) => {
      if (prev === type) {
        return Types3D.shirt;
      }
      return type;
    })
  };
    

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <main className="w-full flex flex-col items-center justify-start">
        <div className="w-full flex justify-center items-start h-[calc(100vh-80px)]">
          <div className="w-[100px] h-full flex flex-col justify-start items-center p-[20px] gap-[20px] border-r-[1px] border-primary">
            <button title="shirts" onClick={() => changeType(Types3D.shirt)} className={"w-[60px] h-[60px] bg-primary rounded-[20px]"}>
            
            </button>
            <button title="pants" onClick={() => changeType(Types3D.pants)} className={"w-[60px] h-[60px] bg-primary rounded-[20px]"}>
            
            </button>
          </div>
          <div className="w-full h-full flex justify-center items-start">

          </div>
        </div>
        <StatsPage/>
      </main>
    </div>
  );
}

