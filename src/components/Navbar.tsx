"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "./Logo";

export default function Navbar() {
  return (
    <motion.nav
      className="flex justify-between items-center px-8 py-4 h-20 backdrop-blur-md fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Main site navigation"
    >
      {/* 왼쪽: 로고 */}
      <Link href="/" aria-label="Go to homepage">
        <Logo size="40" />
      </Link>

      {/* 오른쪽: 메뉴 */}
      <div className="flex gap-8 text-lg text-white">
        <Link href="/lab" className="hover:opacity-70 transition-opacity">
          Lab
        </Link>
      </div>
    </motion.nav>
  );
}