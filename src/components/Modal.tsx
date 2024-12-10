import { useEffect } from "react";
import Image from "next/image";

interface ModalProps {
  image: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ image, isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] max-w-3xl h-[80vh] flex items-center justify-center" // 부모 컨테이너 크기 제한 및 상대 위치 설정
        onClick={(e) => e.stopPropagation()} // 내부 클릭 이벤트 전파 방지
      >
        <Image
          src={image}
          alt="Selected"
          layout="fill" // 부모 컨테이너에 맞춤
          className="object-contain rounded-lg" // 비율 유지 및 잘리지 않게 표시
        />
        <button
          onClick={onClose}
          className="absolute bottom-2 inset-x-0 bg-slate-600 text-black rounded-full p-2 shadow-md hover:bg-gray-200 transition leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;