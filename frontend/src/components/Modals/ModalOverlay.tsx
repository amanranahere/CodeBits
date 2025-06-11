import { useEffect, useRef, type ReactNode } from "react";
import { useClickOutside } from "../../utils/useClickOutside";

interface ModalOverlayProps {
  children: ReactNode;
  onClose: () => void;
}

export default function ModalOverlay({ children, onClose }: ModalOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useClickOutside(overlayRef, onClose);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[950]">
      <div ref={overlayRef}>{children}</div>
    </div>
  );
}
