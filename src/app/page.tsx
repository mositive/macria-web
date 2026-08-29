import { Backdrop } from "@/components/Backdrop";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Features } from "@/components/Features";
import { ExportDemo } from "@/components/ExportDemo";
import { CostDemo } from "@/components/CostDemo";
import { Download } from "@/components/Download";
import { Security } from "@/components/Security";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Pipeline />
        <ExportDemo />
        <Features />
        <CostDemo />
        <Download />
        <Security />
      </main>
      <Footer />
    </>
  );
}
