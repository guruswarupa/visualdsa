'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Import for using logos
import { useEffect, useState } from "react";

// Define a type for screen sizes
type ScreenSize = 'small' | 'medium' | 'large';

export default function Home() {
  // Use the defined type for screenSize state
  const [screenSize, setScreenSize] = useState<ScreenSize>('small');

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('small');
      } else if (window.innerWidth < 1024) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };

    window.addEventListener('resize', updateScreenSize);
    updateScreenSize(); // Call on mount to set initial size

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  // Define x values based on screen size
  const animationX: Record<ScreenSize, string> = {
    small: '-480%',
    medium: '-240%',
    large: '-135%',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-[#E0E0E0] font-sans">
      <motion.main
        className="flex flex-col justify-center items-center text-center h-screen px-6 py-12 sm:px-16 sm:py-20"
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
          className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto px-4"
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

      {/* Buy Me a Coffee Section */}
      <motion.div
        className="flex flex-col justify-center items-center mt-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#F5F5F5]">
          Support Us
        </h2>
        <Link href="https://www.buymeacoffee.com/guruswarupa">
          <Image
            src="/icons/buymeacoffee.png"
            alt="Buy Me a Coffee"
            width={200}
            height={50}
            className="hover:opacity-80 transition"
          />
        </Link>
      </motion.div>

      {/* Sliding Credits Section */}
      <div className="relative w-full mt-12 overflow-hidden text-center bg-[#1F1F1F] py-6">
        {/* Thank You Message */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#E62B1E] mb-2">
          Special Thanks
        </h2>
        <p className="text-lg sm:text-xl text-[#F5F5F5] max-w-2xl mx-auto mb-6">
          A big thank you to the following software providers that made this project possible:
        </p>

        {/* Sliding Icons */}
        <motion.div
          className="flex justify-start items-center whitespace-nowrap mt-8"
          initial={{ translateX: '100%' }} 
          animate={{ translateX: animationX[screenSize] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="flex space-x-12"> 
            <Image
              src="/icons/geeksforgeeks.png"
              alt="GeeksforGeeks"
              width={180}
              height={80}
              className="object-contain"
            />
            <Image
              src="/icons/google.png"
              alt="Google Search"
              width={100}
              height={80}
              className="object-contain"
            />
            <Image
              src="/icons/stackoverflow.png"
              alt="Stack Overflow"
              width={280}
              height={120}
              className="object-contain"
            />
            <Image
              src="/icons/openai.png"
              alt="ChatGPT"
              width={240}
              height={80}
              className="object-contain"
            />
            <Image
              src="/icons/nextjs.png"
              alt="Next.js"
              width={220}
              height={100}
              className="object-contain"
            />
            <Image
              src="/icons/vercel.png"
              alt="Vercel"
              width={290}
              height={194}
              className="object-contain"
            />
            <Image
              src="/icons/github.png"
              alt="GitHub"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
