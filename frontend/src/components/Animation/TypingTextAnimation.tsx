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

  useEffect(() => {
    const chars = text.split("");
    setLetters(chars);
    setVisibleCount(0);

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= chars.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <p>{letters.slice(0, visibleCount).join("")}</p>;
};

export default TypingTextAnimation;
