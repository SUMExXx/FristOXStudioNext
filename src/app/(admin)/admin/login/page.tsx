"use client";
import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Frist'Ox Studio
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block bg-primary">
        {/* <Image
          src="/"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  )
}


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [spin, setSpin] = useState(false)
  
  const router = useRouter()

  const submit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpin(true);
    const res = await fetch('/api/admin/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: pass }),
    })

    if(res.status === 401){
      setSpin(false);
      toast.error('Invalid Credentials!')
    }
    
    if(res.status === 200){
      setSpin(false);
      toast.success('🎉 Successfully Signed In!')
      setTimeout(() => {
        router.push('/admin/main');
      }, 3000);
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={(e) => submit(e)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" value={pass}
                onChange={(e) => setPass(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 ease-in-out">
          {
            spin? 
            <div className="w-6 h-6 border-4 border-foreground border-t-transparent rounded-full animate-spin"></div>
            :
            "Login"
          }
        </Button>
      </div>
    </form>
  )
}
