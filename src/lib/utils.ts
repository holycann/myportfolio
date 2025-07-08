import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createPlaceHolder(text: string) {
  return `https://placehold.co/800x600/333/FFF?text=${encodeURIComponent(text)}`;
}