const LineNumbers = () => {
  const lines = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="bg-[#f1f1f1] dark:bg-[#282828] text-[#f1f1f1] text-xs w-7 text-right pr-2 border-r border-[#d6e2fb] dark:border-[#5e5e5e]">
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
};

export default LineNumbers;
