"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LuxuryLoaderProps {
  text?: string;
}

export default function LuxuryLoader({
  text = "Loading exclusive properties...",
}: LuxuryLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        <Loader2 className="w-10 h-10 text-gray-700 dark:text-gray-200" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-gray-600 dark:text-gray-300 text-lg tracking-wide"
      >
        {text}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
        className="mt-3 w-24 h-[1px] bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 origin-left"
      />
    </div>
  );
}
