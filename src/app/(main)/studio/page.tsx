import StatsPage from "@/components/StatsPage";

export default function Home() {
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

