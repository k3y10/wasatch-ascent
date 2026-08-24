import { cn } from "@/lib/utils";

const heights = [8, 15, 24, 12, 31, 19, 38, 22, 14, 30, 18, 9];

type RadioWaveformProps = {
  active?: boolean;
  className?: string;
};

const RadioWaveform = ({ active = false, className }: RadioWaveformProps) => (
  <div
    className={cn("flex h-10 items-center justify-center gap-1", className)}
    aria-label={active ? "Live radio waveform" : "Channel standing by"}
    role="img"
  >
    {heights.map((height, index) => (
      <span
        key={`${height}-${index}`}
        className={cn(
          "w-0.5 rounded-full",
          active ? "radio-wave-bar bg-radio" : "bg-muted-foreground/40",
        )}
        style={{ height, animationDelay: `${index * 70}ms` }}
      />
    ))}
  </div>
);

export default RadioWaveform;
