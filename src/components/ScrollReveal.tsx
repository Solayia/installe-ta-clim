"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const baseStyles: React.CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: "0.7s",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delay}ms`,
  };

  const hiddenStyles: Record<string, React.CSSProperties> = {
    up: { opacity: 0, transform: "translateY(40px)" },
    left: { opacity: 0, transform: "translateX(-40px)" },
    right: { opacity: 0, transform: "translateX(40px)" },
    scale: { opacity: 0, transform: "scale(0.92)" },
  };

  const visibleStyle: React.CSSProperties = { opacity: 1, transform: "translateY(0) translateX(0) scale(1)" };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...baseStyles,
        ...(isVisible ? visibleStyle : hiddenStyles[direction]),
      }}
    >
      {children}
    </div>
  );
}

// Stagger children utility
export function ScrollRevealGroup({
  children,
  className = "",
  staggerDelay = 100,
  direction = "up",
}: {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  return (
    <>
      {children.map((child, i) => (
        <ScrollReveal key={i} delay={i * staggerDelay} direction={direction} className={className}>
          {child}
        </ScrollReveal>
      ))}
    </>
  );
}
