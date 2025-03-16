import SignInAffiliate from "@/components/SignInAffiliate";

export default function SignIn() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <main className="w-full flex flex-col items-center justify-start">
        <section className="w-full">
          <SignInAffiliate/>
        </section>
      </main>
    </div>
  );
}
