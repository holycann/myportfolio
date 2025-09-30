"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>() as CardRef),
    [childArr.length]
  );

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    order.current = Array.from({ length: refs.length }, (_, i) => i);
  }, [refs.length]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = refs.length;

      // Initial card placement
      const initializeCards = () => {
        refs.forEach((r, i) => {
          const slot = makeSlot(i, cardDistance, verticalDistance, total);
          placeNow(r.current!, slot, skewAmount);
        });
      };

      // Card swap logic
      const swap = () => {
        if (order.current.length < 2) return;

        const [front, ...rest] = order.current;
        const elFront = refs[front].current!;
        const tl = gsap.timeline();
        tlRef.current = tl;

        // Drop front card
        tl.to(elFront, {
          y: "+=500",
          duration: config.durDrop,
          ease: config.ease,
        });

        // Promote and move remaining cards
        tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
        rest.forEach((idx, i) => {
          const el = refs[idx].current!;
          const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
          tl.set(el, { zIndex: slot.zIndex }, "promote");
          tl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              duration: config.durMove,
              ease: config.ease,
            },
            `promote+=${i * 0.15}`
          );
        });

        // Return front card to back
        const backSlot = makeSlot(
          refs.length - 1,
          cardDistance,
          verticalDistance,
          refs.length
        );
        tl.addLabel(
          "return",
          `promote+=${config.durMove * config.returnDelay}`
        );
        tl.call(
          () => {
            gsap.set(elFront, { zIndex: backSlot.zIndex });
          },
          undefined,
          "return"
        );
        tl.to(
          elFront,
          {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            duration: config.durReturn,
            ease: config.ease,
          },
          "return"
        );

        // Update card order
        tl.call(() => {
          order.current = [...rest, front];
        });
      };

      // Setup hover pause functionality
      const setupHoverPause = () => {
        if (!pauseOnHover) return () => {};

        const node = container.current!;
        const pause = () => {
          tlRef.current?.pause();
          clearInterval(intervalRef.current);
        };
        const resume = () => {
          tlRef.current?.play();
          if (typeof window !== "undefined") {
            intervalRef.current = window.setInterval(swap, delay);
          }
        };

        node.addEventListener("mouseenter", pause);
        node.addEventListener("mouseleave", resume);
        return () => {
          node.removeEventListener("mouseenter", pause);
          node.removeEventListener("mouseleave", resume);
        };
      };

      // Initial setup
      initializeCards();
      swap();
      if (typeof window !== 'undefined') {
        intervalRef.current = window.setInterval(swap, delay);
      }
      const cleanupHoverPause = setupHoverPause();

      return () => {
        cleanupHoverPause();
      };
    });

    return () => {
      ctx.revert();
      clearInterval(intervalRef.current);
    };
  }, [
    refs.length,
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
