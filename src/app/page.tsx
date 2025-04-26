// import Homepage from "@/components/Homepage";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { NavbarDemo } from "@/components/Navbar";
export default function Home() {
  return (
    <main>
      <NavbarDemo />
      {/* Ambient light effect */}
      <Header />
      <About />
      <Footer />
    </main>
  );
}
