import { useRef, useEffect } from "react";

/**
 * 무한 스크롤 감지 훅
 * ref - 옵저버 요소의 ref 반환
 * @author yeonsu
 * @param onIntersect 콜백 함수, 요소가 교차할 때 실행
 * @param isEnabled  옵저버 활성화 여부
 */

type UseInfiniteObserverProps = {
  onIntersect: () => void;
  isEnabled: boolean;
};

const useInfiniteObserver = ({ onIntersect, isEnabled }: UseInfiniteObserverProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) onIntersect();
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersect, isEnabled]);

  return ref;
};

export default useInfiniteObserver;
