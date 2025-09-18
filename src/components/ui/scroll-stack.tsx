import React, {
  ReactNode,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  customTransition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
  customTransition,
}) => (
  <div
    className={`scroll-stack-card relative w-full h-full rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] p-8 box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
    data-transition={
      customTransition ? JSON.stringify(customTransition) : undefined
    }
  >
    {children}
  </div>
);

interface ResponsiveConfig {
  mobile?: Partial<ScrollStackConfig>;
  tablet?: Partial<ScrollStackConfig>;
  desktop?: Partial<ScrollStackConfig>;
}

interface ScrollStackConfig {
  itemDistance: number;
  itemScale: number;
  itemStackDistance: number;
  stackPosition: string;
  scaleEndPosition: string;
  baseScale: number;
  rotationAmount: number;
  blurAmount: number;
  perspective: number;
  animationConfig: {
    duration: number;
    ease: string;
    stagger: number;
  };
}

interface ScrollStackProps {
  className?: string;
  children: ReactNode;

  // Enhanced customization options
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  perspective?: number;

  // GSAP animation controls
  animationConfig?: {
    duration?: number;
    ease?: string;
    stagger?: number;
  };

  // Responsive configuration
  responsive?: ResponsiveConfig;

  // Advanced features
  isShowIndicator?: boolean;
  preloadNext?: boolean;
  onStackComplete?: () => void;
  onCardChange?: (index: number) => void;

  // Performance options
  useGPUAcceleration?: boolean;
  refreshRate?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",

  // Default configurations
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  perspective = 1000,

  // GSAP animation defaults
  animationConfig = { duration: 0.8, ease: "power2.out", stagger: 0.05 },

  // Responsive config
  responsive,

  // Advanced features
  isShowIndicator = false,
  preloadNext = true,
  onStackComplete,
  onCardChange,

  // Performance
  useGPUAcceleration = true,
  refreshRate = 60,
}) => {
  const childrenArray = React.Children.toArray(children);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [activeCard, setActiveCard] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const stackCompletedRef = useRef(false);
  const previousActiveCard = useRef(activeCard);

  const contentHeight =
    typeof window !== "undefined" ? window.innerHeight : 1000;

  // Responsive breakpoint detection
  useEffect(() => {
    const updateScreenSize = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1024;
      if (width < 768) setScreenSize("mobile");
      else if (width < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };

    updateScreenSize();
    const debouncedResize = debounce(updateScreenSize, 100);
    window.addEventListener("resize", debouncedResize);

    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  // Get responsive configuration
  const activeConfig = useMemo((): ScrollStackConfig => {
    const baseConfig: ScrollStackConfig = {
      itemDistance,
      itemScale,
      itemStackDistance,
      stackPosition,
      scaleEndPosition,
      baseScale,
      rotationAmount,
      blurAmount,
      perspective,
      animationConfig: {
        duration: animationConfig.duration || 0.8,
        ease: animationConfig.ease || "power2.out",
        stagger: animationConfig.stagger || 0.05,
      },
    };

    if (responsive?.[screenSize]) {
      const responsiveConfig = responsive[screenSize] || {};
      return {
        ...baseConfig,
        ...responsiveConfig,
        animationConfig: {
          duration:
            responsiveConfig.animationConfig?.duration ??
            baseConfig.animationConfig.duration,
          ease:
            responsiveConfig.animationConfig?.ease ??
            baseConfig.animationConfig.ease,
          stagger:
            responsiveConfig.animationConfig?.stagger ??
            baseConfig.animationConfig.stagger,
        },
      };
    }

    return baseConfig;
  }, [
    screenSize,
    responsive,
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    perspective,
    animationConfig,
  ]);

  // Handle card change callback
  useLayoutEffect(() => {
    if (previousActiveCard.current !== activeCard) {
      onCardChange?.(activeCard);
      previousActiveCard.current = activeCard;
    }
  }, [activeCard, onCardChange]);

  // Handle stack completion callback
  useLayoutEffect(() => {
    const lastCardIndex = childrenArray.length - 1;
    const isLastCardVisible = activeCard === lastCardIndex;

    if (isLastCardVisible && !stackCompletedRef.current) {
      stackCompletedRef.current = true;
      onStackComplete?.();
    } else if (!isLastCardVisible && stackCompletedRef.current) {
      stackCompletedRef.current = false;
    }
  }, [activeCard, childrenArray.length, onStackComplete]);

  const calculateCardTransforms = useCallback(
    (cardIndex: number, progress: number = 0) => {
      const isActive = cardIndex === activeCard;
      const isPastActive = cardIndex < activeCard;
      const isFutureActive = cardIndex > activeCard;

      // Enhanced scale calculation with smoother transitions
      const scaleBase = Math.max(
        0.3,
        activeConfig.baseScale - cardIndex * activeConfig.itemScale
      );
      const scaleMultiplier = isPastActive ? 0.95 : isActive ? 1 : 0.9;
      const scale = scaleBase * scaleMultiplier;

      // Enhanced rotation with depth-based calculation
      let rotation = 0;
      if (activeConfig.rotationAmount) {
        if (isPastActive) {
          const depthFactor = Math.max(0.1, 1 - (activeCard - cardIndex) * 0.2);
          rotation = cardIndex * activeConfig.rotationAmount * depthFactor;
        }
      }

      // Enhanced translateY for better stacking
      let translateY = 0;
      if (isPastActive) {
        const depthInStack = activeCard - cardIndex;
        const stackFactor = Math.pow(0.9, depthInStack - 1);
        translateY = -(
          activeConfig.itemStackDistance *
          stackFactor *
          depthInStack
        );
      } else if (isFutureActive) {
        translateY = 50; // Slight offset for future cards
      }

      // Enhanced blur calculation
      let blur = 0;
      if (activeConfig.blurAmount && isPastActive) {
        const depthInStack = activeCard - cardIndex;
        const blurFactor = Math.min(1, depthInStack * 0.3);
        blur = activeConfig.blurAmount * 3 * blurFactor;
      }

      // Opacity for better depth perception
      let opacity = 1;
      if (isPastActive) {
        const depthInStack = activeCard - cardIndex;
        opacity = Math.max(0.6, 1 - depthInStack * 0.1);
      } else if (isFutureActive) {
        opacity = preloadNext ? 0.8 : 0;
      }

      return {
        scale,
        rotation,
        translateY,
        translateX: 0,
        blur,
        opacity,
        zIndex: childrenArray.length - cardIndex + (isActive ? 100 : 0),
      };
    },
    [activeCard, activeConfig, childrenArray.length, preloadNext]
  );

  // Initialize GSAP ScrollTrigger animations
  useLayoutEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    // Clear existing ScrollTriggers
    scrollTriggerRefs.current.forEach((trigger) => trigger.kill());
    scrollTriggerRefs.current = [];

    // Create master timeline
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: stickyRef.current,
        pinSpacing: false,
        refreshPriority: -1,
        onUpdate: (self) => {
          const progress = self.progress;
          const newActiveCard = Math.min(
            Math.floor(progress * childrenArray.length),
            childrenArray.length - 1
          );

          if (newActiveCard !== activeCard) {
            setActiveCard(newActiveCard);
          }

          setIsScrolling(self.isActive && self.direction !== 0);
        },
        onRefresh: () => {
          ScrollTrigger.refresh();
        },
      },
    });

    timelineRef.current = masterTimeline;

    // Animate each card
    childrenArray.forEach((_, index) => {
      const cardElement = cardRefs.current[index];
      if (!cardElement) return;

      const startProgress = index / childrenArray.length;
      const endProgress = (index + 1) / childrenArray.length;

      // Initial state
      gsap.set(cardElement, {
        scale: 0.8,
        y: 100,
        rotationX: 15,
        opacity: 0,
        transformOrigin: "center center",
        force3D: useGPUAcceleration,
      });

      // Create individual card animation
      const cardTimeline = gsap.timeline();

      // Entry animation
      cardTimeline.to(cardElement, {
        scale: 1,
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: activeConfig.animationConfig.duration,
        ease: activeConfig.animationConfig.ease,
        delay: index * activeConfig.animationConfig.stagger,
      });

      // Stack animation
      cardTimeline.to(
        cardElement,
        {
          scale: () => {
            const transforms = calculateCardTransforms(index);
            return transforms.scale;
          },
          y: () => {
            const transforms = calculateCardTransforms(index);
            return transforms.translateY;
          },
          rotation: () => {
            const transforms = calculateCardTransforms(index);
            return transforms.rotation;
          },
          opacity: () => {
            const transforms = calculateCardTransforms(index);
            return transforms.opacity;
          },
          filter: () => {
            const transforms = calculateCardTransforms(index);
            return transforms.blur > 0 ? `blur(${transforms.blur}px)` : "none";
          },
          zIndex: () => {
            const transforms = calculateCardTransforms(index);
            return transforms.zIndex;
          },
          duration: activeConfig.animationConfig.duration,
          ease: activeConfig.animationConfig.ease,
        },
        ">-0.5"
      );

      // Exit animation
      if (index < childrenArray.length - 1) {
        cardTimeline.to(cardElement, {
          scale: 0.8,
          y: -100,
          rotationX: -15,
          opacity: 0,
          duration: activeConfig.animationConfig.duration * 0.7,
          ease: "power2.in",
        });
      }

      // Add to master timeline
      masterTimeline.add(cardTimeline, startProgress * 100 + "%");

      // Add hover effects
      const handleMouseEnter = () => {
        if (index === activeCard) {
          gsap.to(cardElement, {
            scale: "+=0.02",
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const handleMouseLeave = () => {
        if (index === activeCard) {
          const transforms = calculateCardTransforms(index);
          gsap.to(cardElement, {
            scale: transforms.scale,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      cardElement.addEventListener("mouseenter", handleMouseEnter);
      cardElement.addEventListener("mouseleave", handleMouseLeave);

      // Store cleanup function
      const cleanup = () => {
        cardElement.removeEventListener("mouseenter", handleMouseEnter);
        cardElement.removeEventListener("mouseleave", handleMouseLeave);
      };

      return cleanup;
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    return () => {
      scrollTriggerRefs.current.forEach((trigger) => trigger.kill());
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.refresh();
    };
  }, [
    childrenArray.length,
    activeConfig,
    calculateCardTransforms,
    activeCard,
    useGPUAcceleration,
  ]);

  // Set card refs
  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scroll-stack-wrapper relative w-full ${className}`.trim()}
      style={{
        height: `${contentHeight * childrenArray.length}px`,
        position: "relative",
        perspective: `${activeConfig.perspective}px`,
        ...(useGPUAcceleration && {
          willChange: "transform",
          transform: "translateZ(0)",
        }),
      }}
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        className="sticky w-full h-screen"
        style={{
          position: "sticky",
          top: 0,
          perspective: `${activeConfig.perspective}px`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="w-full h-full py-25 flex items-center justify-center">
          <div className="relative w-full h-full max-w-7xl mx-auto">
            {childrenArray.map((child, index) => {
              const shouldShow = preloadNext
                ? index <= activeCard + 1
                : index <= activeCard;

              if (!shouldShow && index > activeCard + 2) return null;

              return (
                <div
                  key={`stack-item-${index}`}
                  ref={(el) => setCardRef(el, index)}
                  className={cn(
                    "absolute inset-0 rounded-2xl transition-all duration-300",
                    "origin-center will-change-transform",
                    useGPUAcceleration && "transform-gpu"
                  )}
                  style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    ...(useGPUAcceleration && {
                      transform: "translateZ(0)",
                    }),
                  }}
                >
                  <div
                    className="w-full h-full flex justify-center items-center"
                    style={{
                      marginBottom:
                        index < childrenArray.length - 1
                          ? `${activeConfig.itemDistance}px`
                          : 0,
                    }}
                  >
                    {child}
                  </div>
                </div>
              );
            })}

            {/* Enhanced scroll indicator */}
            {isShowIndicator && (
              <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-lg">
                <div className="flex items-center gap-2">
                  <span>
                    {activeCard + 1} / {childrenArray.length}
                  </span>
                  <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${((activeCard + 1) / childrenArray.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Loading indicator for smooth transitions */}
            {isScrolling && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                Scrolling...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced styles with responsive considerations */}
      <style>{`
        .scroll-stack-wrapper *::-webkit-scrollbar {
          display: none;
        }
        .scroll-stack-wrapper {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        /* GPU acceleration for better performance */
        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .scroll-stack-card {
            border-radius: 24px;
            padding: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .scroll-stack-card {
            border-radius: 16px;
            padding: 0.75rem;
          }
        }
        
        /* Smooth scroll behavior */
        @media (prefers-reduced-motion: no-preference) {
          .scroll-stack-wrapper {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
};

// Utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default ScrollStack;
