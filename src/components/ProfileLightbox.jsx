import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn } from "lucide-react";

function ProfileLightbox({ open, onClose, src, alt }) {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return undefined;
    }

    const timer = window.setTimeout(() => setMounted(false), 220);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-200 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl"
        aria-label="Close photo viewer"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Profile photo viewer"
        className={`relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/65 shadow-2xl shadow-cyan-950/40 transition-all duration-300 render-stable ${
          open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.16),_transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_36%,rgba(255,255,255,0.03))]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 icon-btn motion-sheen"
          aria-label="Close photo viewer"
        >
          <X size={16} />
        </button>

        <div className="relative z-10 flex flex-col lg:flex-row">
          <div className="flex-1 flex items-center justify-center p-5 sm:p-8 lg:p-10">
            <div className="relative w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/20 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="absolute inset-0 motion-sheen" />
              <img
                src={src}
                alt={alt}
                className="relative z-10 w-full max-h-[78vh] object-contain object-center"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 p-5 sm:p-7 flex flex-col justify-between gap-6">
            <div>
              <p className="section-tag mb-4 inline-flex">
                <ZoomIn size={11} />
                Full Resolution
              </p>
              <h3 className="font-display font-semibold text-2xl text-white mb-3">
                Portrait preview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Click outside or press Esc to close. This view shows the uploaded
                image at full resolution with a soft cinematic reveal.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              <div className="font-mono text-cyan-300 mb-1">Tip</div>
              Use this same image for downloads, social preview shots, or your
              professional headshot section.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ProfileLightbox;
