// components/home/AnimatedGradientText.tsx

import React, { useRef } from "react";
import TextPressure from '@/jsrepo/TextPressure/TextPressure';
import GradientBlinds from '@/jsrepo/GradientBlinds/GradientBlinds';

interface AnimatedGradientTextProps {
  text?: string;
  gradientProps?: Partial<Parameters<typeof GradientBlinds>[0]>;
  textProps?: Partial<Parameters<typeof TextPressure>[0]>;
  className?: string;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  text = " Hee Ji  ",
  gradientProps = {},
  textProps = {},
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {/* Background Layer: WebGL Gradient */}
      <div className="absolute inset-0 z-0">
        <GradientBlinds {...gradientProps} />
      </div>

      {/* Foreground Layer: Interactive Text */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <TextPressure text={text} {...textProps} />
      </div>
    </div>
  );
};

export default AnimatedGradientText;