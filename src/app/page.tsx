"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";
import clsx from "clsx";
import { baseStyles } from "@/components/ui/Typography";

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
    },
  ];
  const { sectionId, carousel, title } = pfInfo[id];

  return (
    <section className="px-10">
      <div ref={ref} id={sectionId}>
        <PortfolioCarousel items={carousel} />
      </div>
      <motion.h1
        style={{ y, textAlign: "center" }}
        className={clsx(
          baseStyles.h1,
          title.length > 20 && "text-3xl"
        )}
      >
        {title}
      </motion.h1>
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
      <main className="pt-16 space-y-10" id="home_main">
        <>
          {[0, 1, 2, 3, 4, 5].map((pfType) => (
            <PfType key={pfType} id={pfType} />
          ))}
          <motion.div className="progress" style={{ scaleX }} />
        </>  
      </main>
    </div>
  );
}