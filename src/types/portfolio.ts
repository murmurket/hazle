// Each portfolio carousel slide
export type CarouselItem = {
  title: string;
  src: string;        // image path
  alt?: string;       // alt text for accessibility
  links?: {           // optional external links
    url: string;
    text: string;
  }[];
};