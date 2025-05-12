import StatsPage from "@/components/StatsPage";
import planVerify from "@/lib/utils/planVerify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const cookiesData = await cookies();

  const token = cookiesData.get('token')?.value;

  if (!token) {
    redirect('/studio/3D');
  }

  const status = await planVerify(token);

  if (!status) {
    redirect('/studio/3D');
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <main className="w-full flex flex-col items-center justify-start">
        <UnityWebGL/>
        <StatsPage/>
      </main>
    </div>
  );
}

const UnityWebGL = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)]">
      <iframe
        src="/webgl/index.html"
        width="100%"
        height="100%"
        allowFullScreen
        className="border-0"
      />
    </div>
  );
};

