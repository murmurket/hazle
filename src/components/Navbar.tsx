"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";

export default function Navbar() {
  return (
    <motion.nav
      className="flex justify-center items-center h-48 opacity-25 fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Main site navigation"
    >
      <Logo size="90" />
    </motion.nav>
  );
}