export default function getSlideClassName(
  index: number,
  active: number,
  prevIndex: number,
  nextIndex: number,
) {
  const base =
    "absolute left-1/2 top-1/2 w-[82vw] max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface shadow-md transition-all duration-500";

  if (index === active) {
    return `${base} z-30 scale-100 opacity-100`;
  }

  if (index === prevIndex) {
    return `${base} z-20 scale-90 opacity-0 sm:opacity-35 sm:-translate-x-[112%] md:-translate-x-[132%]`;
  }

  if (index === nextIndex) {
    return `${base} z-20 scale-90 opacity-0 sm:opacity-35 sm:translate-x-[12%] md:translate-x-[32%]`;
  }

  return `${base} z-0 scale-75 opacity-0 pointer-events-none`;
}
