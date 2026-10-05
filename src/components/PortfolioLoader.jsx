import React, { useEffect, useState } from "react";
import { personal } from "../data/portfolio";
import "./PortfolioLoader.css";

function getLoaderVariant() {
  const requested = new URLSearchParams(window.location.search).get("loader");
  return ["2", "3"].includes(requested) ? requested : "1";
}

export default function PortfolioLoader({ onComplete }) {
  const [leaving, setLeaving] = useState(false);
  const variant = getLoaderVariant();

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setLeaving(true), 2200);
    const removeTimer = window.setTimeout(onComplete, 2480);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`portfolio-loader portfolio-loader--${variant}${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      <div className="portfolio-loader__texture" />
      <div className="portfolio-loader__card">
        <div className="portfolio-loader__portrait">
          <img src={personal.photo} alt={personal.photoAlt} />
          <span className="portfolio-loader__portrait-mark" aria-hidden="true" />
        </div>

        <div className="portfolio-loader__identity">
          <p className="portfolio-loader__eyebrow">{variant === "3" ? "INITIALIZING PORTFOLIO" : "PORTFOLIO / 2026"}</p>
          <h1>{personal.name}</h1>
          <p className="portfolio-loader__role">PHP / Laravel Developer</p>
          {variant === "3" && (
            <p className="portfolio-loader__console" aria-hidden="true">
              <span>&gt;</span> loading_projects<span className="portfolio-loader__cursor">_</span>
            </p>
          )}
        </div>

        <div className="portfolio-loader__progress" aria-hidden="true">
          <span />
        </div>
        <p className="portfolio-loader__status" aria-hidden="true">
          <span>BUILDING THE EXPERIENCE</span>
          <span>PLEASE WAIT</span>
        </p>
      </div>
    </div>
  );
}