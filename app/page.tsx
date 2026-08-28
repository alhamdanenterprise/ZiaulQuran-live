import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Programmes } from "@/components/Programmes";
import { Facilities } from "@/components/Facilities";
import { CampusGallery } from "@/components/CampusGallery";
import { Events } from "@/components/Events";
import { Achievements } from "@/components/Achievements";
import { Donate } from "@/components/Donate";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Programmes />
        <Facilities />
        <CampusGallery />
        <Events />
        <Achievements />
        <Donate />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
