import CTA from "@/components/landing/CTA";
import DemoPreview from "@/components/landing/DemoPreview";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import UseCases from "@/components/landing/UseCases";
import WorkflowVisualization from "@/components/landing/WorkflowVisualization";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <WorkflowVisualization />
        <DemoPreview />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
