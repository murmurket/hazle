"use client";

import { useState, useCallback } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  items: { id: number; title: string; image: string }[];
}

const PortfolioCarousel = ({ items }: CarouselProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = useCallback((image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setIsModalOpen(false);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <motion.div className="mt-20 w-full max-w-[100vw] perspective-1000">
      <Slider {...settings} className="custom-carousel">
        {items.map((item) => (
          <div key={item.id} className="p-4">
            <div
              className="h-64 flex justify-center items-center relative cursor-pointer"
              onClick={() => openModal(item.image)} // 이미지 클릭 시 모달 열기
            >
              <Image
                src={item.image}
                alt={`Portfolio ${item.id}`}
                fill
                className="object-cover object-top rounded-lg"
                priority={item.id === 1} // 첫 번째 이미지는 우선 로드
                loading={item.id === 1 ? "eager" : "lazy"} // 나머지는 lazy 로드
                sizes="(max-width: 768px) 100vw, 50vw" // 반응형 이미지 설정
              />
              <div className="absolute inset-0 flex justify-center items-center text-white text-lg font-bold bg-black bg-opacity-30">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Modal 컴포넌트 */}
      <Modal image={selectedImage} isOpen={isModalOpen} onClose={closeModal} />
    </motion.div>
  );
};

export default PortfolioCarousel;