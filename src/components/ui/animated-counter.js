"use client";

import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

export function AnimatedCounter({ value, inView = true, label = "Views" }) {
  const count = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      const animation = animate(count, value, {
        duration: 3,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (latest) => {
          // Add acceleration effect
          const progress = latest / value;
          const acceleratedValue = value * Math.pow(progress, 2);
          count.set(acceleratedValue);
        },
      });

      return animation.stop;
    }
  }, [inView, value, count]);

  const rounded = useTransform(count, (latest) => {
    return Math.round(latest);
  });

  const displayValue = useTransform(rounded, (latest) => {
    return latest.toLocaleString();
  });

  return (
    <div
      style={{ fontSize }}
      className="flex items-center space-x-1 overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm px-4 py-2 leading-none text-white border border-white/10"
    >
      <motion.div>{displayValue}</motion.div>
      <span className="ml-2 text-sm text-gray-400">{label}</span>
    </div>
  );
} 