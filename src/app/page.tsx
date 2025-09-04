"use client";

import { useRef, memo } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { baseStyles } from "@/components/ui/Typography";

import type { CarouselItem } from "@/types/portfolio";
import cepBranding from "@/data/cepBranding";
import pangeaBranding from "@/data/pangeaBranding";
import cmsSiteItems from "@/data/cmsSiteItems";
import bookingSystem from "@/data/bookingSystem";
import customDevelopment from "@/data/customDevelopment";

import Hero from '@/components/home/Hero';
import HomeSectionObserver from '@/components/home/HomeSectionObserver';

// ============================================================
// Portfolio section data (stable across renders)
// ============================================================
type PfItem = {
  sectionId: string;
  title: string;
  carousel: CarouselItem[];
};

const PF_ITEMS: PfItem[] = [
  { sectionId: "cepDental", title: "CEP Education", carousel: cepBranding },
  { sectionId: "pangeaDentalWorld", title: "Pangea Platform", carousel: pangeaBranding },
  { sectionId: "bookingSystem", title: "Booking System", carousel: bookingSystem },
  { sectionId: "customDevelopment", title: "Custom Development", carousel: customDevelopment },
  { sectionId: "cmsSiteItems", title: "CMS Sites", carousel: cmsSiteItems },
  // { sectionId: "graphicDesign", title: "Graphic Design", carousel: graphicDesign },
];

// ============================================================
// Dynamic import for heavy component (code splitting)
// ============================================================
const PortfolioCarousel = dynamic(() => import("@/components/PortfolioCarousel"), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse rounded-2xl bg-gray-100" />,
});

// ============================================================
// Hook for parallax effect
// ============================================================
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// ============================================================
// Portfolio Section Component
// ============================================================
type PfSectionProps = PfItem & { parallaxDistance?: number };

const PfSection = memo(function PfSection({
  sectionId,
  title,
  carousel,
  parallaxDistance = 200,
}: PfSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });

    const y = useParallax(scrollYProgress, parallaxDistance);
    
  return (
    <section 
      ref={ref}
      className="relative px-10 py-32 min-h-screen" 
      id={sectionId} 
      aria-labelledby={`${sectionId}-title`}
    >
      <PortfolioCarousel items={carousel}/>

      <motion.div className="absolute inset-x-0 top-1/4 text-foreground z-1" style={{ y }}>
        <h2
          id={`${sectionId}-title`}
          className={clsx(
            baseStyles.h2,
            "text-center text-3xl md:text-4xl"
          )}
        >
          {title}
        </h2>
      </motion.div>
    </section>
  );
});

// ============================================================
// Page Component
// ============================================================
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <main id="home_main">
      {/* Unique page-level heading (screen-reader only) */}
      <HomeSectionObserver />
      <h1 className="sr-only">Commercial Portfolio</h1>
      <div className="relative pt-16">
        <section className="px-10" id="hero" aria-labelledby="hero-title">
          <Hero />
        </section>
        {PF_ITEMS.map((item) => (
          <PfSection key={item.sectionId} {...item} />
        ))}

        {/* Progress bar */}
        <motion.div className="fixed left-0 right-0 bottom-[100px] h-1 bg-foreground z-1" style={{ scaleX }} />
      </div>
    </main>
  );
}