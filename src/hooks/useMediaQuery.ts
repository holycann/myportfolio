import { useState, useEffect } from 'react';

/**
 * Custom hook to detect media query matches
 * Provides a responsive way to track media query states
 * 
 * @param {string} query - Media query to match
 * @returns {boolean} Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Initial check
    setMatches(media.matches);

    // Update state when media query changes
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add event listener
    media.addEventListener('change', listener);

    // Cleanup listener
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
} 