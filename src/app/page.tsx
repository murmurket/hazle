import Navbar from "@/components/Navbar";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import cepBranding from "@/data/cepBranding";
import pangeaBranding from "@/data/pangeaBranding";
import cmsSiteItems from "@/data/cmsSiteItems";
import bookingSystem from "@/data/bookingSystem";
import customDevelopment from "@/data/customDevelopment";
import graphicDesign from "@/data/graphicDesign";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="pt-16 px-10">
        <PortfolioCarousel items={cepBranding} />
        <PortfolioCarousel items={pangeaBranding} />
        <PortfolioCarousel items={cmsSiteItems} />
        <PortfolioCarousel items={bookingSystem} />
        <PortfolioCarousel items={customDevelopment} />
        <PortfolioCarousel items={graphicDesign} />
      </main>
    </div>
  );
}