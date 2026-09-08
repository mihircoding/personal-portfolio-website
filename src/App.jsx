import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Education } from "@/sections/Education";
import { Skills } from "@/sections/Skills";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Contact } from "@/sections/Contact";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar active="home" />
      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-20">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <FeaturedProjects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
