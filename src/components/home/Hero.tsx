'use client';

import TextPressure from '@/jsrepo/TextPressure/TextPressure';

export default function Hero() {
  return (
    <div
      className="w-full h-[500px]"
      style={{ position: 'relative' }}
    >
      <TextPressure
        text="Hazle "
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        textColor="#ffffff"
        strokeColor="#ff0000"
        minFontSize={24}
        className="w-full h-[100px]"
      />
    </div>
  );
}