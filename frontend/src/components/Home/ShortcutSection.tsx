import { useState, useRef } from "react";
import {
  IoIosArrowUp,
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

export default function ShortcutSection() {
  const [highlightedKeys, setHighlightedKeys] = useState<string[]>([
    "ControlLeft",
    "KeyK",
  ]);
  const [activeShortcutIndex, setActiveShortcutIndex] = useState<number | null>(
    0
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const keyboardRows = [
    // Row 0 – F1,F2,...
    [
      { label: "Esc", code: "Escape" },
      { label: "F1", code: "F1" },
      { label: "F2", code: "F2" },
      { label: "F3", code: "F3" },
      { label: "F4", code: "F4" },
      { label: "F5", code: "F5" },
      { label: "F6", code: "F6" },
      { label: "F7", code: "F7" },
      { label: "F8", code: "F8" },
      { label: "F9", code: "F9" },
      { label: "F10", code: "F10" },
      { label: "F11", code: "F11" },
      { label: "F12", code: "F12" },
      { label: "Ins", code: "Insert" },
      { label: "Home", code: "Home" },
    ],

    // Row 1 – 1,2,...
    [
      { label: "`", code: "Backquote" },
      { label: "1", code: "Digit1" },
      { label: "2", code: "Digit2" },
      { label: "3", code: "Digit3" },
      { label: "4", code: "Digit4" },
      { label: "5", code: "Digit5" },
      { label: "6", code: "Digit6" },
      { label: "7", code: "Digit7" },
      { label: "8", code: "Digit8" },
      { label: "9", code: "Digit9" },
      { label: "0", code: "Digit0" },
      { label: "-", code: "Minus" },
      { label: "=", code: "Equal" },
      { label: "Backspace", code: "Backspace", flex: 2 },
      { label: "End", code: "End" },
    ],

    // Row 2 – QWERTY
    [
      { label: "Tab", code: "Tab", flex: 1.5 },
      { label: "Q", code: "KeyQ" },
      { label: "W", code: "KeyW" },
      { label: "E", code: "KeyE" },
      { label: "R", code: "KeyR" },
      { label: "T", code: "KeyT" },
      { label: "Y", code: "KeyY" },
      { label: "U", code: "KeyU" },
      { label: "I", code: "KeyI" },
      { label: "O", code: "KeyO" },
      { label: "P", code: "KeyP" },
      { label: "[", code: "BracketLeft" },
      { label: "]", code: "BracketRight" },
      { label: "\\", code: "Backslash", flex: 1.5 },
      { label: "PgUp", code: "PageUp" },
    ],

    // Row 3 – ASDF
    [
      { label: "Caps", code: "CapsLock", flex: 1.8 },
      { label: "A", code: "KeyA" },
      { label: "S", code: "KeyS" },
      { label: "D", code: "KeyD" },
      { label: "F", code: "KeyF" },
      { label: "G", code: "KeyG" },
      { label: "H", code: "KeyH" },
      { label: "J", code: "KeyJ" },
      { label: "K", code: "KeyK" },
      { label: "L", code: "KeyL" },
      { label: ";", code: "Semicolon" },
      { label: "'", code: "Quote" },
      { label: "Enter", code: "Enter", flex: 2 },
      { label: "PgDn", code: "PageDown" },
    ],

    // Row 4 – ZXCV
    [
      { label: "Shift", code: "ShiftLeft", flex: 2.2 },
      { label: "Z", code: "KeyZ" },
      { label: "X", code: "KeyX" },
      { label: "C", code: "KeyC" },
      { label: "V", code: "KeyV" },
      { label: "B", code: "KeyB" },
      { label: "N", code: "KeyN" },
      { label: "M", code: "KeyM" },
      { label: ",", code: "Comma" },
      { label: ".", code: "Period" },
      { label: "/", code: "Slash" },
      { label: "Shift", code: "ShiftRight", flex: 1.2 },
      { label: <IoIosArrowUp />, code: "ArrowUp" },
      { label: "Del", code: "Delete" },
    ],

    // Row 5 – ctrl,fn,alt,...
    [
      { label: "Ctrl", code: "ControlLeft" },
      { label: "Fn", code: "Fn" },
      { label: "Win", code: "MetaLeft" },
      { label: "Alt", code: "AltLeft" },
      { label: "Space", code: "Space", flex: 7 },
      { label: "Alt", code: "AltRight" },
      { label: "Ctrl", code: "ControlRight" },
      { label: <IoIosArrowBack />, code: "ArrowLeft" },
      { label: <IoIosArrowDown />, code: "ArrowDown" },
      { label: <IoIosArrowForward />, code: "ArrowRight" },
    ],
  ];

  const shortcuts = [
    {
      combo: "Ctrl K",
      action: "Open search modal",
      keys: ["ControlLeft", "KeyK"],
    },
    { combo: "Esc", action: "Close current modal", keys: ["Escape"] },
    {
      combo: "Ctrl P",
      action: "Toggle file panel",
      keys: ["ControlLeft", "KeyP"],
    },
    {
      combo: "Ctrl B",
      action: "Toggle sidebar",
      keys: ["ControlLeft", "KeyB"],
    },
    { combo: "Ctrl /", action: "New file", keys: ["ControlLeft", "Slash"] },
    {
      combo: "Ctrl ;",
      action: "Open shortcut modal",
      keys: ["ControlLeft", "Semicolon"],
    },
  ];

  const Key = ({
    label,
    flex = 1,
    highlighted,
  }: {
    label: React.ReactNode;
    flex?: number;
    code?: string;
    highlighted?: boolean;
  }) => {
    const isWideKey = flex > 1;

    return (
      <div
        className={`h-4 md:h-9 text-[5px] md:text-[8px] rounded-[4px] text-center select-none flex items-center justify-center font-medium ${
          !isWideKey ? "aspect-square " : ""
        } ${
          highlighted
            ? "bg-[#7a7a7a] text-white"
            : "text-zinc-700 dark:text-[#bababa] bg-zinc-100 dark:bg-[#2a2a2a]"
        }`}
        style={{ flex }}
      >
        {label}
      </div>
    );
  };

  const handleShortcutClick = (idx: number) => {
    setHighlightedKeys(shortcuts[idx].keys);
    setActiveShortcutIndex(idx);

    const container = scrollRef.current;
    if (!container) return;

    const button = container.children[idx] as HTMLElement;
    const containerCenter = container.offsetWidth / 2;
    const buttonCenter = button.offsetLeft + button.offsetWidth / 2;

    container.scrollTo({
      left: buttonCenter - containerCenter,
      behavior: "smooth",
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-8">
      {/* keyboard */}
      <div className="space-y-[2px] md:space-y-1 p-1 md:p-2 bg-zinc-50 dark:bg-[#1e1e1e] rounded-lg w-full max-w-[95vw] md:max-w-2xl mx-auto shadow-md">
        {keyboardRows.map((row, i) => (
          <div key={i} className="flex gap-[2px] md:gap-1">
            {row.map((key) => (
              <Key
                key={key.code}
                label={key.label}
                flex={key.flex || 1}
                code={key.code}
                highlighted={highlightedKeys.includes(key.code)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* list of shortcuts */}
      <div className="relative max-w-[80vw] md:max-w-lg overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth px-12 md:px-28"
        >
          {shortcuts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleShortcutClick(idx)}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-full dark:hover:bg-[#4a4a4a] text-zinc-700 dark:text-[#bababa] text-xs md:text-sm font-medium duration-150 text-nowrap select-none ${
                activeShortcutIndex === idx
                  ? "bg-zinc-200 dark:bg-[#3a3a3a]"
                  : "bg-zinc-100 dark:bg-[#2a2a2a]"
              }`}
            >
              {s.combo} - {s.action}
            </button>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-16 pointer-events-none bg-gradient-to-r from-[#151515] to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-16 pointer-events-none bg-gradient-to-l from-[#151515] to-transparent"></div>
      </div>

      {/* title and subtext */}
      <div className="flex flex-col justify-center items-center max-w-[70vw] md:max-w-md">
        <h1 className="text-2xl md:text-4xl font-semibold pb-2 md:pb-4">
          Built for Your Flow
        </h1>
        <p className="text-xs md:text-base text-[#bababa] font-medium text-center">
          Move through CodeBits with intuitive shortcuts that keep your hands on
          the keys and your mind on the work.
        </p>
      </div>
    </div>
  );
}
