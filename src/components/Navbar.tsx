"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="flex justify-center items-center h-16 bg-gray-800 text-white fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-lg sm:text-2xl font-bold">H</div>
    </motion.nav>
  );
}