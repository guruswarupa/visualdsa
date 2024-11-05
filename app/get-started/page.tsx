"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GetStarted() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-[#E0E0E0] font-sans overflow-hidden">
      <motion.main
        className="text-center px-8 py-12 sm:px-16 sm:py-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-6 text-[#F5F5F5]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Get Started with Visual DSA
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Ready to dive into Data Structures and Algorithms? Start exploring visual simulations of key concepts, from sorting algorithms to complex data structures.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Link href="/learn/sorting-algorithms">
            <motion.div
              className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sorting Algorithms
            </motion.div>
          </Link>
          <Link href="/learn/searching-algorithms">
            <motion.div
              className="bg-[#1F1F1F] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#383838]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Searching Algorithms
            </motion.div>
          </Link>
          <Link href="/learn/stack">
            <motion.div
              className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Stack
            </motion.div>
          </Link>
          <Link href="/learn/queue">
            <motion.div
              className="bg-[#1F1F1F] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#383838]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Queue
            </motion.div>
          </Link>
          <Link href="/learn/linked-list">
            <motion.div
              className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Linked List
            </motion.div>
          </Link>
          <Link href="/learn/trees">
            <motion.div
              className="bg-[#1F1F1F] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#383838]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Trees
            </motion.div>
          </Link>
          <Link href="/learn/graphs">
            <motion.div
              className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Graphs
            </motion.div>
          </Link>
          <Link href="/learn/recursion">
            <motion.div
              className="bg-[#1F1F1F] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#383838]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Recursion
            </motion.div>
          </Link>
          <Link href="/learn/dynamic-programming">
            <motion.div
              className="bg-[#E62B1E] text-white py-3 px-6 rounded-full text-lg transition hover:bg-[#C6261A]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dynamic Programming
            </motion.div>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}
