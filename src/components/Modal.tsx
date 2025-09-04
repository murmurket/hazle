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
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] max-w-3xl h-[80vh] flex flex-col items-center justify-center gap-3 pb-10"
        onClick={(e) => e.stopPropagation()} // Prevent internal click event propagation
      >
        <div className="relative w-full h-full top-0">
          <Image
            src={image}
            alt={`Selected ${image}`}
            fill
            className="object-contain rounded-lg" // retain ratio
          />
        </div>
        <div className="flex flex-row">
          {links && links.length > 0 && (
            <div className="bg-slate-100 rounded-full px-6 py-2 mr-3 shadow-md hover:bg-gray-500 transition leading-none">
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
            className="bg-slate-600 text-black rounded-full px-6 py-2 shadow-md hover:bg-gray-300 transition leading-none"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;