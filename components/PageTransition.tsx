"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (window.location.pathname === "/") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.28,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
