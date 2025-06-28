import ModelStatsPage from "@/components/ModelStatsPage";
import NavbarStudio from "@/components/NavbarStudio";
import StatsPage from "@/components/StatsPage";
import UnityWebGL from "@/components/UnityWebGL";
import { models2D } from "@/lib/data/models";
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
    <>
      <NavbarStudio style={1} />
      <div className='mt-[60px] md:mt-[80px] md:min-h-[calc(100vh-80px)] h-full text-black'>
        <div className="w-full h-full flex flex-col items-center justify-start">
          <main className="w-full flex flex-col items-center justify-start">
            <UnityWebGL model={models2D.all}/>
            <StatsPage/>
            <ModelStatsPage model="all2D"/>
          </main>
        </div>
      </div>
    </>
  );
}

// const UnityWebGL = () => {
//   return (
//     <div className="w-full h-[calc(100vh-80px)]">
//       <iframe
//         src="/webgl/beanie/index.html"
//         width="100%"
//         height="100%"
//         allowFullScreen
//         className="border-0"
//       />
//     </div>
//   );
// };

