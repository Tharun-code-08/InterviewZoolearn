import { useEffect, useRef, useState } from 'react';
import { X, Menu, ArrowUp } from 'lucide-react';
import patternsData from '../data/patternsData';
import { generatedArt } from '../utils/generatedArt';
import wikiImages from '../data/patternsWikiImages.json';

const THEME_CLASS = {
  digestive: 'theme-digestive',
  respiratory: 'theme-respiratory',
  circulatory: 'theme-circulatory',
  excretory: 'theme-excretory',
  nervous: 'theme-nervous',
  reproductive: 'theme-reproductive',
  fertilization: 'theme-fertilization',
  development: 'theme-development',
  temperature: 'theme-temperature',
  metamerism: 'theme-metamerism',
};

function DidYouKnow({ text }) {
  return (
    <div className="patt-did-you-know">
      <div className="patt-did-you-know-title">Did You Know?</div>
      <div className="patt-did-you-know-content">{text}</div>
    </div>
  );
}

function OpenClosedComparison({ data }) {
  return (
    <>
      <div className="patt-comparison-grid">
        <div className="patt-comparison-col">
          <strong>{data.open.title}</strong>
          <ul>
            {data.open.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <div className="patt-comparison-examples">
            <em>Examples:</em> {data.open.examples}
          </div>
        </div>
        <div className="patt-comparison-col">
          <strong>{data.closed.title}</strong>
          <ul>
            {data.closed.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <div className="patt-comparison-examples">
            <em>Examples:</em> {data.closed.examples}
          </div>
        </div>
      </div>
      <figure className="patt-section-image-wrapper patt-comparison-image-large">
        <img src={data.image} alt="Visual comparison of Open vs Closed systems" className="patt-section-image" />
        <figcaption className="patt-comparison-caption">{data.caption}</figcaption>
      </figure>
    </>
  );
}

function TwoColComparison({ data }) {
  return (
    <div className="patt-comparison-grid">
      {[data.left, data.right].map((col, idx) => (
        <div className="patt-comparison-col" key={idx}>
          <strong>{col.title}</strong>
          <p className="patt-section-text" style={{ borderLeft: 'none', paddingLeft: 0 }}>
            {col.text}
          </p>
          <ul>
            {col.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <div className="patt-comparison-examples" style={{ marginBottom: '1rem' }}>
            <strong>Examples:</strong> {col.examples}
          </div>
          <img
            src={col.image}
            alt={col.title}
            style={{ width: '100%', height: 'auto', border: 'none', boxShadow: 'none', marginTop: 'auto', objectFit: 'contain' }}
          />
        </div>
      ))}
    </div>
  );
}

function CustomContent({ section }) {
  if (section.customType === 'didYouKnow') return <DidYouKnow text={section.customText} />;
  if (section.customType === 'openClosed') return <OpenClosedComparison data={section.customData} />;
  if (section.customType === 'twoCol') return <TwoColComparison data={section.customData} />;
  return null;
}

function Section({ section, onImageClick }) {
  const indent = section.isSubSubtopic ? '2.5rem' : section.isSubtopic ? '1.25rem' : '0';
  const hasIndent = section.isSubtopic || section.isSubSubtopic;
  return (
    <div className="scroll-reveal">
      <div
        className="patt-content-section"
        style={{
          marginLeft: indent,
          borderLeft: hasIndent ? '3px solid #e5e7eb' : 'none',
          paddingLeft: hasIndent ? '1.25rem' : '1.75rem',
        }}
      >
        {section.heading && (
          <h3 className="patt-section-title" style={hasIndent ? { fontSize: '1.05rem', color: '#4b5563' } : {}}>
            <span className="patt-section-marker" style={hasIndent ? { height: '0.875rem', background: '#9ca3af' } : {}} />
            {section.heading}
          </h3>
        )}

        {section.image && section.imageRight && (
          <figure className="patt-section-image-wrapper patt-image-right">
            <img
              src={section.image}
              alt={section.heading}
              className="patt-section-image patt-clickable-image"
              loading="lazy"
              onClick={() => onImageClick({ src: section.image, alt: section.heading, caption: section.imageCaption || section.heading })}
            />
            <figcaption className="patt-image-caption">
              {section.imageCaption || (section.heading && (
                <>
                  <span className="patt-figure-label">Figure:</span> {section.heading}
                </>
              ))}
            </figcaption>
          </figure>
        )}

        {section.text && <p className="patt-section-text">{section.text}</p>}

        {section.content && (
          <ul className="patt-section-list">
            {section.content.map((item, i) => (
              <li className="patt-list-item" key={i}>
                <span className="patt-bullet-dot" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {section.customType && (
          <div className="patt-section-custom">
            <CustomContent section={section} />
          </div>
        )}

        {section.image && !section.imageRight && (
          <figure className="patt-section-image-wrapper">
            <img
              src={section.image}
              alt={section.heading}
              className="patt-section-image patt-clickable-image"
              loading="lazy"
              onClick={() => onImageClick({ src: section.image, alt: section.heading, caption: section.imageCaption || section.heading })}
            />
            <figcaption className="patt-image-caption">
              {section.imageCaption || (section.heading && (
                <>
                  <span className="patt-figure-label">Figure:</span> {section.heading}
                </>
              ))}
            </figcaption>
          </figure>
        )}

        {section.imageRight && <div style={{ clear: 'both' }} />}

        {section.table && (
          <div className="patt-table-container">
            <div className="patt-table-swipe-hint">
              <span>← Swipe to see more →</span>
            </div>
            <table className="patt-zoo-table">
              <thead>
                <tr>
                  {section.table.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {section.examples && (
          <div className="patt-example-block">
            <span className="patt-example-label">Examples</span>
            <ul className="patt-example-list">
              {section.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Patterns() {
  const [active, setActive] = useState('digestive');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = document.querySelector('.patt-zoo-main-content');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [active]);

  const keys = Object.keys(patternsData);
  const currentIndex = keys.indexOf(active);
  const prevKey = currentIndex > 0 ? keys[currentIndex - 1] : null;
  const nextKey = currentIndex < keys.length - 1 ? keys[currentIndex + 1] : null;
  const themeClass = THEME_CLASS[active] || '';
  const current = patternsData[active];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToContent = () => {
    const el = document.querySelector('.patt-zoo-main-content');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className={`patt-zoo-page ${themeClass}`} id="patt-patterns">
      <section className="patt-hero-banner">
        <div className="patt-hero-orb patt-hero-orb-1" />
        <div className="patt-hero-orb patt-hero-orb-2" />
        <div className="patt-hero-orb patt-hero-orb-3" />
        <div className="patt-hero-noise" />
        <div className="patt-hero-container">
          <div className="patt-hero-content">
            <div className="patt-hero-tag">📚 Comparative Zoology</div>
            <h1 className="patt-hero-title">Patterns of Complexity in Animal Organ Systems</h1>
            <p className="patt-hero-description">
              Explore how organ systems evolved from <strong>simple diffusion</strong> in sponges to
              <strong> highly centralised networks</strong> in mammals. Trace the journey across
              <strong> 11 major organ systems</strong> — digestive, respiratory, circulatory, excretory, skeletal,
              nervous, reproductive, and more — comparing every phylum from Porifera to Chordata.
            </p>
            <div className="patt-hero-stats">
              <div className="patt-hero-stat">
                <span className="patt-hero-stat-num">11</span>
                <span className="patt-hero-stat-label">Topics</span>
              </div>
              <div className="patt-hero-stat">
                <span className="patt-hero-stat-num">60+</span>
                <span className="patt-hero-stat-label">Diagrams</span>
              </div>
              <div className="patt-hero-stat">
                <span className="patt-hero-stat-num">All</span>
                <span className="patt-hero-stat-label">Phyla Covered</span>
              </div>
            </div>
            <div className="patt-hero-actions" />
          </div>
          <div className="patt-hero-visual">
            <div className="patt-hero-glow-ring" />
            <img
              src={wikiImages['patterns.organ-system-complexity'] || generatedArt('organ-system-complexity', 'Organ System Complexity')}
              alt="Organ system complexity"
              className="patt-hero-image"
              loading="eager"
            />
            <div className="patt-hero-image-decoration" />
          </div>
        </div>
        <div className="patt-scroll-indicator" onClick={scrollToContent}>
          <div className="patt-mouse">
            <div className="patt-wheel" />
          </div>
          <div className="patt-arrow-down" />
        </div>
      </section>

      <div className="patt-zoo-app-container">
        <div className={`patt-sidebar-overlay ${sidebarOpen ? 'patt-open' : ''}`} onClick={() => setSidebarOpen(false)} />
        <div ref={sidebarRef} className={`patt-zoo-sidebar ${sidebarOpen ? 'patt-open' : ''}`}>
          <div className="patt-sidebar-header">
            <button className="patt-mobile-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close navigation menu">
              <X size={24} />
            </button>
          </div>
          <div className="patt-progress-bar">
            <div className="patt-progress-label">Learning Progress</div>
            <div className="patt-progress-track">
              <div className="patt-progress-fill" style={{ width: `${((currentIndex + 1) / keys.length) * 100}%` }} />
            </div>
            <div className="patt-progress-text">
              Topic {currentIndex + 1} of {keys.length}
            </div>
          </div>
          <nav className="patt-sidebar-nav" aria-label="Topic navigation">
            {keys.map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActive(key);
                  setSidebarOpen(false);
                }}
                className={`patt-nav-btn ${active === key ? 'patt-active' : ''}`}
                aria-label={`Navigate to ${patternsData[key].title}`}
                aria-current={active === key ? 'page' : undefined}
              >
                <span>{patternsData[key].title}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="patt-zoo-main-content">
          <button className="patt-mobile-fab" onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu">
            <Menu size={24} />
          </button>
          <div className="patt-content-card">
            <div className="patt-content-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 className="patt-header-title">{current.title}</h2>
              </div>
              <div className="patt-header-nav-buttons" style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
                {prevKey && (
                  <button
                    className="patt-nav-action-btn patt-prev-btn"
                    onClick={() => setActive(prevKey)}
                    title="Previous Topic"
                    aria-label={`Previous: ${patternsData[prevKey].title}`}
                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                  >
                    ← Prev
                  </button>
                )}
                {nextKey && (
                  <button
                    className="patt-nav-action-btn patt-next-btn"
                    onClick={() => setActive(nextKey)}
                    title="Next Topic"
                    aria-label={`Next: ${patternsData[nextKey].title}`}
                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>

            <div className="patt-sections-wrapper">
              {current.sections.map((section, i) => (
                <Section section={section} key={i} onImageClick={setLightbox} />
              ))}
            </div>

            <div className="patt-navigation-footer">
              {prevKey ? (
                <button className="patt-nav-action-btn patt-prev-btn" onClick={() => setActive(prevKey)}>
                  ← Previous
                </button>
              ) : (
                <div />
              )}
              {nextKey && (
                <button className="patt-nav-action-btn patt-next-btn" onClick={() => setActive(nextKey)}>
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        className={`patt-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to Top"
      >
        <ArrowUp size={24} />
      </button>

      {lightbox && (
        <div className="patt-lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="patt-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close lightbox">
            <X size={28} />
          </button>
          <div className="patt-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className="patt-lightbox-image" />
            {lightbox.caption && <p className="patt-lightbox-caption">{lightbox.caption}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
