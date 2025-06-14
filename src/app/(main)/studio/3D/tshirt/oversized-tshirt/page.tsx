import ModelStatsPage from "@/components/ModelStatsPage";
import StatsPage from "@/components/StatsPage";
import UnityWebGL from "@/components/UnityWebGL";
import { models3D } from "@/lib/data/models";
import planVerify from "@/lib/utils/planVerify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const cookiesData = await cookies();

  const token = cookiesData.get('token')?.value;

  if (!token) {
    redirect('/signin');
  }

  const status = await planVerify(token);

  if (!status) {
    redirect('/studio/upgrade');
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <main className="w-full flex flex-col items-center justify-start">
        <UnityWebGL model={models3D.oversizedTshirt} />
        <StatsPage/>
        <ModelStatsPage model="oversizedTshirt"/>
      </main>
    </div>
  );
}

