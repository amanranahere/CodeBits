import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
}

const TypingTextAnimation: React.FC<TypingTextProps> = ({
  text,
  speed = 100,
}) => {
  const [letters, setLetters] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [typingDone, setTypingDone] = useState<boolean>(false);

  useEffect(() => {
    const chars = text.split("");
    setLetters(chars);
    setVisibleCount(0);
    setTypingDone(false);

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= chars.length) {
          clearInterval(interval);
          setTypingDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p>
      {letters.slice(0, visibleCount).join("")}
      {!typingDone && <span className="animate-blink">|</span>}
    </p>
  );
};

export default TypingTextAnimation;
