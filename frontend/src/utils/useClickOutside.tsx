import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onOutsideClick]);
}
