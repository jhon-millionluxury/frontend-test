"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface LuxuryErrorProps {
  message?: string;
  showGoHome?: boolean;
}

export default function LuxuryError({
  message = "Ha ocurrido un error inesperado.",
  showGoHome = true,
}: LuxuryErrorProps) {
  const goToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-4 rounded-full bg-gradient-to-br from-gray-200/50 to-gray-400/30 dark:from-gray-800/50 dark:to-gray-700/30 shadow-inner"
      >
        <AlertTriangle className="w-10 h-10 text-gray-700 dark:text-gray-200" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-100"
      >
        Something went wrong
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-gray-600 dark:text-gray-400 max-w-md"
      >
        {message}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="mt-4 w-24 h-[1px] bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 origin-left"
      />

      {showGoHome && (
        <motion.button
          onClick={goToHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-100 dark:to-gray-300 text-white dark:text-gray-900 font-medium shadow-md transition"
        >
          Go to Home
        </motion.button>
      )}
    </div>
  );
}
