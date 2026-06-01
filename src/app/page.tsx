import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Compliance from "@/components/Compliance";
import Faq from "@/components/Faq";
import Leadership from "@/components/Leadership";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#121212] text-slate-300">
      <Nav />
      <main className="flex-1">
        <Hero />
        <ProblemStatement />
        <HowItWorks />
        <Features />
        <Compliance />
        <Faq />
        <Leadership />
      </main>
      <Footer />
    </div>
  );
}
