const Bar = ({ className }: { className: string }) => (
  <div className={`rounded bg-neutral-200 dark:bg-neutral-800 ${className}`} />
);

// The body fills the remaining height with a repeating stripe, so the number of
// lines follows the viewport instead of being hard-coded. A second mask fades
// the lower half out so a tall viewport doesn't turn into a wall of bars.
const bodyMask = [
  'repeating-linear-gradient(to bottom, black 0 1rem, transparent 1rem 2.75rem)',
  'linear-gradient(to bottom, black 25%, transparent 85%)',
].join(', ');

const Loading = () => (
  // Fill past the viewport so the footer stays offscreen, matching how a real
  // post reads while it loads
  <div
    className="flex flex-col w-full grow min-h-dvh animate-pulse"
    aria-hidden
  >
    {/* Mirrors PostHeader: gap-1.5 py-4, each bar at its rendered height */}
    <div className="flex flex-col gap-1.5 py-4">
      <Bar className="h-4 w-44" />
      <Bar className="h-7 w-1/2" />
      <Bar className="h-5 w-1/3" />
    </div>

    <div
      className="mt-8 grow bg-neutral-200 dark:bg-neutral-800"
      style={{
        maskImage: bodyMask,
        maskComposite: 'intersect',
        WebkitMaskImage: bodyMask,
        WebkitMaskComposite: 'source-in',
      }}
    />
  </div>
);

export default Loading;
