import { cn } from "@/lib/utils";

type OperationalSnapshotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  title: string;
  description: string;
  className?: string;
  mediaClassName?: string;
  imageClassName?: string;
};

const OperationalSnapshot = ({
  src,
  alt,
  width,
  height,
  label,
  title,
  description,
  className,
  mediaClassName,
  imageClassName,
}: OperationalSnapshotProps) => (
  <figure
    className={cn(
      "overflow-hidden border border-border/80 bg-terrain-deep shadow-[var(--shadow-elevated)]",
      className,
    )}
  >
    <div className={cn("relative overflow-hidden bg-[#05080f]", mediaClassName)}>
      <img
        src={src}
        alt={alt}
        className={cn("size-full object-cover", imageClassName)}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden="true" />
    </div>
    <figcaption className="grid gap-3 border-t border-border/80 px-5 py-5 sm:grid-cols-[0.42fr_1fr] sm:gap-6 sm:px-6">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">{label}</p>
        <h4 className="mt-2 font-display text-xl font-bold uppercase leading-none text-foreground sm:text-2xl">
          {title}<span className="text-primary">.</span>
        </h4>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground sm:self-end">{description}</p>
    </figcaption>
  </figure>
);

export default OperationalSnapshot;

