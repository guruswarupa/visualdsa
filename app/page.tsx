'use client'
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-[#E0E0E0] font-sans">
      <motion.main
        className="text-center px-8 py-12 sm:px-16 sm:py-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-6 text-[#F5F5F5]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          Welcome to Visual DSA
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Learn Data Structures and Algorithms through engaging visualizations.
          Dive into an interactive, intuitive learning experience designed to
          help you master DSA concepts.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/get-started">
            <div className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]">
              Get Started
            </div>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}
