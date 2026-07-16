import { useState } from 'react';
import PhylumSection from '../components/PhylumSection';
import { PHYLUM_META } from '../data/phylumMeta';

export default function ZooHub() {
  const [query, setQuery] = useState('');

  return (
    <div className="zoohub-page">
      <div className="zoohub-banner">
        <div className="zoohub-banner-overlay"></div>
        <div className="zoohub-banner-content">
          <div className="scroll-reveal">
            <div className="zoohub-banner-center">
              <img
                alt="ZooLearn Logo"
                className="zoohub-banner-logo"
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"
              />
              <h1 className="zoohub-banner-brand">ZooHub</h1>
            </div>
          </div>
        </div>
        <div className="zoohub-scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow-down"></div>
        </div>
      </div>

      <div className="zoohub-sticky-bar">
        <div className="class-navbar">
          <div className="class-scroll">
            {PHYLUM_META.map((p) => (
              <span key={p.slug}>
                {p.emoji} {p.slug}
              </span>
            ))}
          </div>
        </div>
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon-text">🔍</span>
              <input
                placeholder="Search species or phylum (e.g., hydra, chordata, octopus...)"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>

      {PHYLUM_META.map((meta) => (
        <PhylumSection meta={meta} key={meta.slug} />
      ))}
    </div>
  );
}
