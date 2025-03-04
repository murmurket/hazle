"use client";

import { useState, useCallback } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  links?: { url: string; text: string }[]; // 여러 개의 링크 가능
}

interface CarouselProps {
  items: CarouselItem[];
}

const PortfolioCarousel = ({ items }: CarouselProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ image: string; links?: { url: string; text: string }[] } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openModal = useCallback((image: string, links?: { url: string; text: string }[]) => {
    if (!isDragging) { // 드래그 중일 때는 클릭 무시
      setSelectedImage({ image, links });
      setIsModalOpen(true);
    }
  }, [isDragging]);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
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
      {
        breakpoint: 768, // 768px 이하일 때 (모바일)
        settings: {
          slidesToShow: 1, // 모바일에서 1개 슬라이드 표시
        },
      },{
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },{
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
        },
      },{
        breakpoint: 3000,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
    beforeChange: () => setIsDragging(true), // 드래그 시작 시
    afterChange: () => setTimeout(() => setIsDragging(false), 100), // 드래그 끝난 후 잠시 후 해제
  };

  return (
    <motion.div className="mt-20 w-full max-w-[100vw] perspective-1000">
      <Slider {...settings} className="custom-carousel">
        {items.map((item) => (
          <div key={item.id} className="p-4">
            <div
              className="h-64 flex justify-center items-center relative cursor-pointer"
              onClick={() => openModal(item.image, item.links)} // 이미지 클릭 시 드래그 여부 확인 후 모달 열기
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
      {selectedImage && (
        <Modal 
          image={selectedImage.image} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          links={selectedImage.links} // 선택된 이미지의 링크 전달
        />
      )}
    </motion.div>
  );
};

export default PortfolioCarousel;