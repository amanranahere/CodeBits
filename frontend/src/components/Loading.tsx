export default function Loading({ size }: { size: number }) {
  return (
    <div
      className="h-full w-full flex justify-center items-center"
      style={{ fontSize: `${size}px` }}
    >
      <span className="loading-dots px-2 flex gap-x-1">
        <span
          className="rounded-full bg-[#9a9a9a]"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
        <span
          className="rounded-full bg-[#9a9a9a]"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
        <span
          className="rounded-full bg-[#9a9a9a]"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </span>
    </div>
  );
}
