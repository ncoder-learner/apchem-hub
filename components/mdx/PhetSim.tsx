interface PhetSimProps {
  src: string;
  title: string;
  height?: number;
  caption?: string;
}

/**
 * Embeds a PhET Interactive Simulation (University of Colorado Boulder).
 * PhET's HTML5 sims are built to be run standalone via their direct
 * `sims/html/{sim-id}/latest/{sim-id}_en.html` URL, which is iframe-safe.
 * Always pass that direct URL, not the simulation's landing/detail page
 * (phet.colorado.edu/en/simulations/...), which is a page about the sim,
 * not the runnable sim itself.
 */
export function PhetSim({ src, title, height = 560, caption }: PhetSimProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-white/[0.03] px-4 py-2 text-xs text-ink-dim">
          <span>PhET Interactive Simulation — University of Colorado Boulder</span>
          <a href={src} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Open full screen ↗
          </a>
        </div>
        <iframe
          src={src}
          title={title}
          className="w-full"
          style={{ height, border: "none" }}
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption && <figcaption className="mt-2 text-sm text-ink-dim">{caption}</figcaption>}
    </figure>
  );
}
