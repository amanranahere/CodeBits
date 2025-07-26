export default function Loading02() {
  return (
    <div className="">
      <svg
        width="15"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="pink"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="white"
          strokeWidth="10"
          fill="none"
          strokeDasharray="283"
          strokeDashoffset="75"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
