"use client";

/**
 * Sayfanın arkasında duran sabit katman: izometrik tel kafes, yukarı kayan
 * ızgara ve iki yumuşak ışık lekesi. Tamamı CSS ile çizilir, JS çalışmaz.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink" />

      {/* izometrik tel kafes */}
      <div
        className="absolute inset-0 animate-drift opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(30deg, rgba(46,110,224,0.16) 1px, transparent 1px)," +
            "linear-gradient(150deg, rgba(46,110,224,0.16) 1px, transparent 1px)",
          backgroundSize: "72px 42px, 72px 42px",
          maskImage: "radial-gradient(120% 80% at 50% 0%, #000 20%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 50% 0%, #000 20%, transparent 78%)",
        }}
      />

      {/* ince yatay tarama çizgileri */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(rgba(160,200,255,0.7) 1px, transparent 1px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* ışık lekeleri */}
      <div className="absolute -top-40 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand-600/18 blur-[130px]" />
      <div className="absolute top-[38%] -right-40 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute bottom-0 -left-32 h-[32rem] w-[32rem] rounded-full bg-brand-800/25 blur-[120px]" />

      {/* alt karartma */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
