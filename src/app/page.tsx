"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";

import PortfolioCarousel from "@/components/PortfolioCarousel";
import cepBranding from "@/data/cepBranding";
import pangeaBranding from "@/data/pangeaBranding";
import cmsSiteItems from "@/data/cmsSiteItems";
import bookingSystem from "@/data/bookingSystem";
import customDevelopment from "@/data/customDevelopment";
import graphicDesign from "@/data/graphicDesign";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function PfType({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  const pfInfo = [
    {
      sectionId: "cepDental",
      title: "CEP Education",
      carousel: cepBranding
    },
    {
      sectionId: "pangeaDentalWorld",
      title: "Pangea Platform",
      carousel: pangeaBranding
    },
    {
      sectionId: "cmsSiteItems",
      title: "CMS Sites",
      carousel: cmsSiteItems
    },
    {
      sectionId: "bookingSystem",
      title: "Booking System",
      carousel: bookingSystem
    },
    {
      sectionId: "customDevelopment",
      title: "Custom Development",
      carousel: customDevelopment
    },
    {
      sectionId: "graphicDesign",
      title: "Graphic Design",
      carousel: graphicDesign
    }
  ];
  const { sectionId, carousel, title } = pfInfo[id];

  return (
    <section className="px-10">
      <div ref={ref} id={sectionId}>
        <PortfolioCarousel items={carousel} />
      </div>
      <motion.h2 style={{ y, textAlign: "center"  }}>{title}</motion.h2>
    </section>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div>
      <main className="pt-16 space-y-10">
        <>
          {[0, 1, 2, 3, 4, 5].map((pfType) => (
            <PfType key={pfType} id={pfType} />
          ))}
          <motion.div className="progress" style={{ scaleX }} />
        </>
        
        {/* <section>
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
        </section> */}
      </main>
    </div>
  );
}