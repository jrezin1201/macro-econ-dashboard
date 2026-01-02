"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

export function Button({ variant = "primary", size = "md", className = "", asChild, children, onClick, disabled, type = "button" }: Props) {
  const sizeStyles = {
    sm: "px-2 py-1 text-xs min-h-[36px] md:min-h-0",
    md: "px-3 py-2 text-sm min-h-[44px] md:min-h-0",
    lg: "px-6 py-3 text-base min-h-[52px] md:min-h-0"
  };

  const base =
    `${sizeStyles[size]} rounded-xl font-medium border transition-all duration-200 ` +
    "focus:outline-none focus:ring-2 focus:ring-white/10 flex items-center justify-center " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-fuchsia-500/25 to-pink-500/15 border-white/15 hover:border-pink-300/30 hover:shadow-[0_4px_20px_rgba(236,72,153,0.3)] text-white"
      : variant === "danger"
      ? "bg-white/5 border-red-300/20 hover:border-red-300/40 hover:shadow-[0_4px_18px_rgba(248,113,113,0.25)] text-red-200"
      : "bg-white/5 border-white/12 hover:border-white/20 hover:bg-white/7 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] text-white/90";

  // Support asChild pattern for Next.js Link components
  if (asChild) {
    return <>{children}</>;
  }

  return (
    <motion.button
      className={`${base} ${styles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{
        scale: 1.02,
        y: -2,
      }}
      whileTap={{
        scale: 0.98,
        y: 0,
      }}
      transition={{
        type: "spring" as const,
        stiffness: 400,
        damping: 17
      }}
    >
      {children}
    </motion.button>
  );
}
