import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "@/constants/responsive";

export function useResponsive() {
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.mobile });
  const isTablet = useMediaQuery({
    minWidth: BREAKPOINTS.mobile + 1,
    maxWidth: BREAKPOINTS.tablet,
  });
  const isDesktop = useMediaQuery({
    minWidth: BREAKPOINTS.tablet + 1,
    maxWidth: BREAKPOINTS.desktop,
  });
  const isWide = useMediaQuery({ minWidth: BREAKPOINTS.desktop + 1 });
  return { isMobile, isTablet, isDesktop, isWide };
}
