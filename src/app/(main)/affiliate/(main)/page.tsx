"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {

  useEffect(() => {
    redirect("/affiliate-signin")
  })
  
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      
    </div>
  );
}
