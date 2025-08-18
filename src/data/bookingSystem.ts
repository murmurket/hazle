import type { CarouselItem } from "@/types/portfolio";

// Booking system portfolio items
const bookingSystem: CarouselItem[] = [
  {
    title: "Golf Booking System",
    src: "/portfolio/udr.jpg",
    alt: "Golf booking platform screenshot",
    links: [
      { url: "https://udrgolf.com/", text: "UDR Golf" },
    ],
  },
  {
    title: "Room, Tee Time Book",
    src: "/portfolio/sportech.png",
    alt: "Tee time and room booking page",
    links: [
      { url: "https://www.mflexgolf.ca/booknow/room/", text: "Booking Page" },
    ],
  },
  {
    title: "Clarifying UX/UI",
    src: "/portfolio/rad.png",
    alt: "Clarifying UX/UI design example",
  },
  {
    title: "PHP, MySQL, Responsive",
    src: "/portfolio/udr_mobile.jpeg",
    alt: "Mobile responsive booking system screenshot",
    links: [
      { url: "https://udrgolf.com/", text: "UDR Golf" },
    ],
  },
];

export default bookingSystem;