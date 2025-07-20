import { useState, useRef } from "react";
import {
  IoIosArrowUp,
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

export default function KeyboardShortcuts() {
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

    const baseWidth = window.innerWidth >= 1024 ? 36 : 23;
    const baseHeight = window.innerWidth >= 1024 ? 36 : 23;

    return (
      <div
        className={`rounded-[2px] lg:rounded-[4px] text-[0.4rem] lg:text-[0.5rem] text-center select-none flex items-center justify-center font-medium hover:bg-[#2a2a2a] active:scale-95 duration-150 ${
          highlighted
            ? "bg-[#2a2a2a] text-white"
            : "text-[#bababa] bg-[#1e1e1e]"
        }`}
        style={{
          minWidth: isWideKey ? baseWidth * flex : baseWidth,
          width: isWideKey ? baseWidth * flex : baseWidth,
          height: baseHeight,
          flexShrink: 0,
        }}
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
    <div className="h-full flex flex-col justify-center items-center gap-y-5 overflow-hidden">
      {/*  keyboard  */}
      <div className="space-y-[2px] md:space-y-1 p-1 md:p-2 bg-[#121212] rounded-lg w-full mx-auto shadow-md lg:translate-x-16 -translate-y-2 lg:-translate-y-4">
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

      {/*  list of shortcuts  */}
      <div className="w-full lg:w-[65%] relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth px-10"
        >
          {shortcuts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleShortcutClick(idx)}
              className={`px-3 py-2 md:px-4 rounded-full hover:bg-[#121212] text-[#bababa] text-xs font-medium duration-150 text-nowrap select-none outline-none ${
                activeShortcutIndex === idx
                  ? "shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] bg-[#121212]"
                  : "shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)]"
              }`}
            >
              {s.combo} - {s.action}
            </button>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-10 pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-10 pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
      </div>

      {/*  title and subtext  */}
      <div className="flex flex-col gap-y-2 w-full pr-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Built for Your Flow
        </h1>

        <p className="pr-6 md:pr-3 lg:pr-10 text-xs md:text-base text-[#bababa] font-semibold tracking-tight leading-tight md:leading-tight lg:leading-tight">
          Move through CodeBits with intuitive shortcuts that keep your hands on
          the keys and your mind on the work.
        </p>
      </div>
    </div>
  );
}
