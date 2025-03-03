import StatsPage from "@/components/StatsPage";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <main className="w-full flex flex-col items-center justify-start">
        This is the sudio page
        <StatsPage/>
      </main>
    </div>
  );
}
