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
import Game from '@/components/Game';

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function PfType({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  const pfInfo = [
    {
      sectionId: "littleGame",
      title: "Little Game",
      carousel: [],
      contents: <Game />
    },
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
  const { sectionId, carousel, title, contents } = pfInfo[id];

  return (
    <section className="px-10">
      <div ref={ref} id={sectionId}>
        {carousel.length > 0 ? (
          <PortfolioCarousel items={carousel} />
        ) : (
          contents || null
        )}
      </div>
      <motion.h1 style={{ y, textAlign: "center"  }}>{title}</motion.h1>
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
          {[0, 1, 2, 3, 4, 5, 6].map((pfType) => (
            <PfType key={pfType} id={pfType} />
          ))}
          <motion.div className="progress" style={{ scaleX }} />
        </>  
      </main>
    </div>
  );
}