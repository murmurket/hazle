'use client';

import { useEffect } from 'react';

export default function HomeSectionObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('#home_main section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          entry.target.classList.add('shrink');
        } else {
          entry.target.classList.remove('shrink');
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return null;
}