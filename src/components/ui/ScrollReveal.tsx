import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  textFormat?: "h1" | "p";
  direction?: "bottom_to_top" | "right_to_left" | "left_to_right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 40,
  textFormat = "h1",
  id,
  direction = "bottom_to_top",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  // Determine classes based on direction
  const getClasses = () => {
    switch (direction) {
      case "right_to_left":
        return { hidden: "reveal-to-left", visible: "reveal-to-left-visible" };
      case "left_to_right":
        return {
          hidden: "reveal-to-right",
          visible: "reveal-to-right-visible",
        };
      default:
        return { hidden: "reveal-to-top", visible: "reveal-to-top-visible" };
    }
  };

  const { hidden, visible } = getClasses();

  useEffect(() => {
    const element = ref.current;
    if (!element || hasRevealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setHasRevealed(true);
              entry.target.classList.remove(hidden);
              entry.target.classList.add(visible);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, hidden, visible, hasRevealed]);

  return (
    <div
      ref={ref}
      id={id}
      className={`${
        !hasRevealed ? hidden : visible
      } ${textFormat} ${className}`}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
}
