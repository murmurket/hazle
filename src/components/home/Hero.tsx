'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedGradientText from '@/components/home/AnimatedGradientText';
import Magnet from '@/jsrepo/Magnet/Magnet'

export default function Hero() {
  return (
    <div className="w-full h-full absolute top-0">
      <AnimatedGradientText
        text="  Hazle  "
        className=""
        gradientProps={{
          gradientColors: ['#003147', '#170033'],
          angle: 116,
          noise: 0.3,
          blindCount: 64,
          blindMinWidth: 10,
          spotlightRadius: 0.7,
          spotlightSoftness: 1,
          spotlightOpacity: 0.7,
          mouseDampening: 0.3,
          distortAmount: 2,
          shineDirection: 'left',
          mixBlendMode: 'lighten',
        }}
        textProps={{
          flex: true,
          alpha: false,
          stroke: false,
          width: true,
          weight: true,
          italic: true,
          textColor: '#ffffff',
          minFontSize: 24,
          className: 'absolute top-1/4 inset-x-0',
        }}
      />
      
      <h2 id="hero-title" className="sr-only">Welcome to Hazle</h2>

      <div className='w-full absolute top-1/2 left-0 flex justify-center items-center gap-6 mt-14'>
        <Magnet padding={5} disabled={false} magnetStrength={5}>
          <Link href="#cepDental">
            <Button type="button" aria-label="Open Commercial page" variant="outline" size="lg">Commercial</Button>
          </Link>
        </Magnet>
        <Magnet padding={5} disabled={false} magnetStrength={5}>
          <Link href="/lab">
            <Button type="button" aria-label="Open Lab page" variant="default" size="lg">Lab</Button>
          </Link>
        </Magnet>
      </div>

    </div>
  );
}