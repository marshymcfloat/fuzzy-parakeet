import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizerName(name: string) {
  if (!name.trim() || typeof name !== "string") {
    return null;
  }

  return name
    .trim()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
