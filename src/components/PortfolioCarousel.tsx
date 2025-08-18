"use client";

import { useState, useCallback } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import clsx from "clsx";
import Modal from "@/components/Modal";
import type { CarouselItem } from "@/types/portfolio";

interface CarouselProps {
  items: CarouselItem[];
  className?: string;
}

const PortfolioCarousel = ({ items, className }: CarouselProps) => {
  // Modal state (adapted to Modal's current props: `image` + `links`)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ src: string; links?: { url: string; text: string }[] } | null>(null);

  // Track dragging to avoid click while swiping
  const [isDragging, setIsDragging] = useState(false);

  const openModal = useCallback(
    (src: string, links?: { url: string; text: string }[]) => {
      if (isDragging) return; // ignore click while dragging
      setSelected({ src, links });
      setIsModalOpen(true);
    },
    [isDragging]
  );

  const closeModal = useCallback(() => {
    setSelected(null);
    setIsModalOpen(false);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      // Mobile first: show 1 slide
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 1920, settings: { slidesToShow: 3 } },
      { breakpoint: 3000, settings: { slidesToShow: 4 } },
    ],
    beforeChange: () => setIsDragging(true),
    afterChange: () => setTimeout(() => setIsDragging(false), 100),
    // Consider `lazyLoad: "ondemand"` if images are heavy
  };

  return (
    <motion.div
      className={clsx("mt-20 w-full max-w-[100vw] perspective-[1000px]", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Portfolio items"
    >
      <Slider {...settings} className="custom-carousel">
        {items.map((item, idx) => {
          const key = `${item.title}-${idx}`;
          const hasLongTitle = item.title.length > 20;

          return (
            <div key={key} className="p-4" aria-roledescription="slide" aria-label={`${idx + 1} of ${items.length}`}>
              <div
                className="relative flex h-64 cursor-pointer items-center justify-center"
                onClick={() => openModal(item.src, item.links)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(item.src, item.links);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open details for ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt ?? item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover object-top"
                  // Prioritize first couple of images for faster LCP
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                />

                {/* Gradient overlay with centered title */}
                <div className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-lg bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3">
                  <h2
                    className={clsx(
                      "top-3/4 text-center font-medium text-white",
                      hasLongTitle ? "text-sm" : "text-md"
                    )}
                  >
                    {item.title}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      {/* Modal */}
      {selected && (
        <Modal
          image={selected.src}     // Modal still expects `image` prop
          isOpen={isModalOpen}
          onClose={closeModal}
          links={selected.links}
        />
      )}
    </motion.div>
  );
};

export default PortfolioCarousel;