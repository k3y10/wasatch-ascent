import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function useScrollAnimation(threshold = 0.12, once = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && once) {
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  return { ref, isVisible };
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 28,
  once = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  distance?: number;
  once?: boolean;
}) {
  const { ref, isVisible } = useScrollAnimation(0.12, once);
  const hiddenTransform = {
    up: `translate3d(0, ${distance}px, 0)`,
    left: `translate3d(-${distance}px, 0, 0)`,
    right: `translate3d(${distance}px, 0, 0)`,
  }[direction];

  return (
    <div
      ref={ref}
      className={cn("motion-reduce:transform-none motion-reduce:opacity-100", className)}
      data-scroll-reveal=""
      data-visible={isVisible}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : hiddenTransform,
        transition: `opacity 0.72s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.72s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

