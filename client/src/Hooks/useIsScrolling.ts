import { useEffect, useState } from 'react';

export const useIsScrolling = () => {
  const [Scrolling, setScrolling] = useState(false);
  const [PreviousPosition, PreviousSetPosition] = useState(0);
  useEffect(() => {
    document.addEventListener('scroll', () => {
      // let previousScrollYPosition = window.scrollY
      PreviousSetPosition(new Date().getTime());
    });

    return () => {
      document.addEventListener('scroll', () => PreviousSetPosition(0));
    };
  }, [Scrolling]);

  useEffect(() => {
    if (PreviousPosition && new Date().getTime() < PreviousPosition + 500) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  }, [PreviousPosition]);

  return {
    Scrolling,
  };
};
