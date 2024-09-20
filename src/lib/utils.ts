import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSessionId = (): string => {
  return Math.random().toString(36).substr(2, 9); // Generate a random 9-character string
};
