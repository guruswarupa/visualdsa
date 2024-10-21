"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GetStarted() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-[#E0E0E0] font-sans">
      <motion.main
        className="text-center px-8 py-12 sm:px-16 sm:py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-6 text-[#F5F5F5]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          Get Started with Visual DSA
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Ready to dive into Data Structures and Algorithms? Start exploring visual simulations of key concepts, from sorting algorithms to complex data structures.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/learn/sorting-algorithms">
            <div className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]">
              Sorting Algorithms
            </div>
          </Link>
          <Link href="/learn/searching-algorithms">
            <div className="bg-[#1F1F1F] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#383838]">
              Searching Algorithms
            </div>
          </Link>
          <Link href="/learn/stack">
            <div className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]">
              Stack
            </div>
          </Link>
          <Link href="/learn/queue">
            <div className="bg-[#1F1F1F] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#383838]">
              Queue
            </div>
          </Link>
          <Link href="/learn/linked-list">
            <div className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]">
              Linked List
            </div>
          </Link>
          <Link href="/learn/trees">
            <div className="bg-[#1F1F1F] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#383838]">
              Trees
            </div>
          </Link>
          <Link href="/learn/graphs">
            <div className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]">
              Graphs
            </div>
          </Link>
          <Link href="/learn/recursion">
            <div className="bg-[#1F1F1F] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#383838]">
              Recursion
            </div>
          </Link>
          <Link href="/learn/dynamic-programming">
            <div className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]">
              Dynamic Programming
            </div>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}
