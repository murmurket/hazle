// next.config.ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// 기존 MDX 관련 설정 ...
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {},
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    domains: [
      "example.com", // 썸네일 외부 도메인
      "another-cdn.com" // 필요한 만큼 추가
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default withMDX(nextConfig);