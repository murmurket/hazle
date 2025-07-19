import { useEffect } from "react";
import Image from "next/image";

interface ModalProps {
  image: string | null;
  isOpen: boolean;
  onClose: () => void;
  links?: { url: string; text: string }[];
}

const Modal = ({ image, isOpen, onClose, links }: ModalProps) => {
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
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-60"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] max-w-3xl h-[80vh] flex items-center justify-center" // 부모 컨테이너 크기 제한 및 상대 위치 설정
        onClick={(e) => e.stopPropagation()} // 내부 클릭 이벤트 전파 방지
      >
        <div>
          <Image
            src={image}
            alt={`Selected ${image}`}
            layout="fill" // 부모 컨테이너에 맞춤
            className="object-contain rounded-lg" // 비율 유지 및 잘리지 않게 표시
          />
        </div>
        <div className="absolute top-0 inset-x-0">
          {links && links.length > 0 && (
            <div className="bg-slate-100 rounded-full p-2 shadow-md hover:bg-gray-500 transition leading-none">
              {links.map(({ url, text }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-blue-600 hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {text}
                </a>
              ))}
            </div>
          )}
          <button
            onClick={onClose}
            className=" bg-slate-600 text-black rounded-full p-2 shadow-md hover:bg-gray-300 transition leading-none"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;