type ColorVariants = "white" | "black";

const LoadingDots = ({ color }: { color?: ColorVariants }) => {
  const colorVariants: Record<ColorVariants, string> = {
    white: "bg-white",
    black: "bg-black",
  };
  return (
    <div className="flex justify-center">
      <span
        className={`circle ${
          color ? colorVariants[color] : ""
        } animate-blink animation-duration animation-infinite animation-fill-both`}
      ></span>
      <span
        className={`circle ${
          color ? colorVariants[color] : ""
        } animate-blink animation-delay-200 animation-duration animation-infinite animation-fill-both`}
      ></span>
      <span
        className={`circle ${
          color ? colorVariants[color] : ""
        } animate-blink animation-delay-400 animation-duration animation-infinite animation-fill-both`}
      ></span>
    </div>
  );
};

export default LoadingDots;
