"use client"
import StatsPage from "@/components/StatsPage";
import { Types3D } from "@/data/website";
import Link from "next/link";
import { useState } from "react";
import { FaArrowCircleRight, FaTshirt } from "react-icons/fa";
import { PiPantsFill } from "react-icons/pi";

export default function ThreeD() {

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
            <button title="shirts" onClick={() => changeType(Types3D.shirt)} className={"w-[60px] h-[60px] bg-primary rounded-[20px] flex justify-center items-center cursor-pointer"}>
              <FaTshirt size={24}/>
            </button>
            <button title="pants" onClick={() => changeType(Types3D.pants)} className={"w-[60px] h-[60px] bg-primary rounded-[20px] flex justify-center items-center cursor-pointer"}>
              <PiPantsFill size={24}/>
            </button>
          </div>
          <div className="w-full h-full flex flex-wrap justify-start items-start text-background p-[20px]">
            <Link href={"/studio/3D/tshirt/model1"} className="w-[300px] h-[300px] relative flex justify-between items-end rounded-[20px] p-[20px] cursor-pointer hover:scale-105 transition-all duration-300 group" style={{backgroundImage: "url('/images/tshirt-model1.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-100 rounded-[20px]"></div>
              <span className="text-[36px] font-semibold z-20 group-hover:scale-105 transition-all duration-300">T-Shirt</span>
              <FaArrowCircleRight size={48} className="z-20 group-hover:scale-105 transition-all duration-300"/>
            </Link>
          </div>
        </div>
        <StatsPage/>
      </main>
    </div>
  );
}

