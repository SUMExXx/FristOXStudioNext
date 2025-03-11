import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import ModelOptions from "@/components/ModelOptions";
import Pricing from "@/components/Pricing";
import QNA from "@/components/QNA";
import ReferHome from "@/components/ReferHome";
import StatsPage from "@/components/StatsPage";
import Testimonials from "@/components/Testimonials";
import UniqueFeatures from "@/components/UniqueFeatures";
import UseCases from "@/components/UseCases";

export default function Home() {
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <main className="w-full flex flex-col items-center justify-start">
        <section className="w-full">
          <HeroSection/>
        </section>
        <section className="w-full">
          <Features/>
        </section>
        <section className="w-full">
          <ModelOptions/>
        </section>
        <section className="w-full">
          <UniqueFeatures/>
        </section>
        <section className="w-full">
          <UseCases/>
        </section>
        <section className="w-full">
          <Pricing/>
        </section>
        <section className="w-full">
          <Testimonials/>
        </section>
        <section className="w-full">
          <QNA/>
        </section>
        <StatsPage/>
        <ReferHome/>
      </main>
    </div>
  );
}
