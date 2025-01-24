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
      <main className="pt-16 px-10 space-y-10">
        <section>
          <div id="cepDental" className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">CEP Dental Education Centre</h2>
            <a href="https://cepdental.com/" className="text-blue-500 hover:underline">
            cepdental.com
            </a>
          </div>
          <PortfolioCarousel items={cepBranding} />
        </section>

        <section>
          <div id="pangeaDentalWorld" className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Pangea Dental World</h2>
            <a href="https://pangeadental.com/" className="text-blue-500 hover:underline">
            pangeadental.com
            </a>
          </div>
          <PortfolioCarousel items={pangeaBranding} />
        </section>

        <section>
          <div id="cmsSiteItems" className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">CMS Site Items</h2>
            <a href="https://www.ryuko.ca/" className="text-blue-500 hover:underline">
              ryuko.ca
            </a>
            <a href="https://www.treehousetoys.ca/" className="text-blue-500 hover:underline">
              treehousetoys.ca
            </a>
            <a href="https://chillaxvape.ca/" className="text-blue-500 hover:underline">
              chillaxvape.ca
            </a>
          </div>
          <PortfolioCarousel items={cmsSiteItems} />
        </section>

        <section>
          <div id="bookingSystem" className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Booking System</h2>
            <a href="https://udrgolf.com/" className="text-blue-500 hover:underline">
              udrgolf.com
            </a>
            <a href="https://www.mflexgolf.ca/booknow/room/" className="text-blue-500 hover:underline">
              booking page
            </a>
          </div>
          <PortfolioCarousel items={bookingSystem} />
        </section>

        <section>
          <div id="customDevelopment" className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Custom Development</h2>
            <a href="https://playcanv.as/b/qxEEezGK/" className="text-blue-500 hover:underline">
              Sportsguard 3D
            </a>
            <a href="https://kimskatsu.ca/" className="text-blue-500 hover:underline">
              kimskatsu.ca
            </a>
            <a href="https://murmurket.com/greedy/" className="text-blue-500 hover:underline">
              greedy Donut
            </a>
          </div>
          <PortfolioCarousel items={customDevelopment} />
        </section>

        <section>
          <div id="graphicDesign" className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Graphic Design</h2>
          </div>
          <PortfolioCarousel items={graphicDesign} />
        </section>
      </main>
    </div>
  );
}