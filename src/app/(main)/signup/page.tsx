import SignUpHero from "@/components/SignUpHero";

export default function SignUp() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <main className="w-full flex flex-col items-center justify-start">
        <section className="w-full">
          <SignUpHero/>
        </section>
      </main>
    </div>
  );
}
