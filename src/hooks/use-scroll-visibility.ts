"use client";

import { useEffect, useState } from "react";

/**
 * 스크롤 위치에 따라 요소 노출 여부를 제어
 * @param threshold 스크롤이 이 값(px)을 넘으면 true 반환
 * @example
 * const isVisible = useScrollVisibility({ threshold: 200 });
 */

type UseScrollVisibilityProps = {
  threshold?: number;
};

const useScrollVisibility = ({ threshold = 100 }: UseScrollVisibilityProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScroll = window.scrollY || window.pageYOffset;
      const shouldBeVisible = currentScroll > threshold;

      setIsVisible(prev => (prev !== shouldBeVisible ? shouldBeVisible : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isVisible;
};
export default useScrollVisibility;
