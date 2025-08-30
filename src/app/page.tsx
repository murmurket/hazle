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
  { sectionId: "hero", title: "", carousel: [] },
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

  // Hero
  if (sectionId === "hero") {
    return (
      <section className="px-10" id={sectionId} aria-labelledby={`${sectionId}-section`}>
        <Hero />
      </section>
    );
  }

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // smooth in/out scroll effect
  });
  const y = useParallax(scrollYProgress, parallaxDistance);

  const titleIsLong = title.length > 18;

  return (
    <section className="px-10" id={sectionId} aria-labelledby={`${sectionId}-section`}>
      <div  className="w-full max-h-[90vh] bg-transparent overflow-hidden" ref={ref}>
        <PortfolioCarousel items={carousel} />
      </div>

      <motion.h2
        id={`${sectionId}-title`}
        style={{ y }}
        className={clsx(
          baseStyles.h2,
          "text-center",
          titleIsLong && "text-3xl"
        )}
      >
        {title}
      </motion.h2>
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
    <div>
      {/* Unique page-level heading (screen-reader only) */}
      <HomeSectionObserver />
      <main className="pt-16" id="home_main">
        <h1 className={clsx(baseStyles.h1, "sr-only")}>Portfolio</h1>
        {PF_ITEMS.map((item) => (
          <PfSection key={item.sectionId} {...item} />
        ))}

        {/* Progress bar */}
        <motion.div className="progress" style={{ scaleX }} />
      </main>
    </div>
  );
}