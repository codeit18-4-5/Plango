"use client";
import CircleButton from "./circle-button";
import IcScrollTop from "@/assets/icons/ic-arrow-top.svg";
import useScrollVisibility from "@/hooks/use-scroll-visibility";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
export default function ScrollTopButton() {
  const isVisible = useScrollVisibility();
  if (!isVisible) return null;
  return (
    <CircleButton onClick={scrollToTop} aria-label="최상단으로 이동">
      <IcScrollTop className="h-6 w-6" />
    </CircleButton>
  );
}
