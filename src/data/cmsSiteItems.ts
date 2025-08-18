import type { CarouselItem } from "@/types/portfolio";

// CMS site portfolio items
const cmsSiteItems: CarouselItem[] = [
  {
    title: "Squarespace",
    src: "/portfolio/ryuko.jpg",
    alt: "Ryuko Squarespace website screenshot",
    links: [
      { url: "https://www.ryuko.ca/", text: "Ryuko" },
    ],
  },
  {
    title: "Lightspeed",
    src: "/portfolio/treehousetoys.jpg",
    alt: "Treehouse Toys Lightspeed website screenshot",
    links: [
      { url: "https://www.treehousetoys.ca/", text: "Treehouse Toys" },
    ],
  },
  {
    title: "WordPress",
    src: "/portfolio/ogam.jpg",
    alt: "Ogam WordPress website screenshot",
  },
  {
    title: "Shopify",
    src: "/portfolio/chillax.jpg",
    alt: "Chillax Vape Shopify website screenshot",
    links: [
      { url: "https://chillaxvape.ca/", text: "Chillax Vape" },
    ],
  },
  {
    title: "Liquid",
    src: "/portfolio/chillax_mobile.jpg",
    alt: "Chillax Vape mobile view screenshot",
    links: [
      { url: "https://chillaxvape.ca/", text: "Chillax Vape" },
    ],
  },
];

export default cmsSiteItems;