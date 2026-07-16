import { useEffect, useRef, useState } from 'react';
import { Menu, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import cockroachContent from '../data/cockroachContent.json';
import { generatedArt } from '../utils/generatedArt';

export default function Cockroach() {
  const [active, setActive] = useState('general');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 80px)');
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const sidebarRef = useRef(null);

  const keys = Object.keys(cockroachContent);
  const activeIndex = keys.indexOf(active);
  const prevKey = activeIndex > 0 ? keys[activeIndex - 1] : null;
  const nextKey = activeIndex < keys.length - 1 ? keys[activeIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('.foo-zl-footer');
      const heroBanner = document.querySelector('.coc-hero-banner');
      const y = window.scrollY;
      if (heroBanner) {
        setPastHero(y > heroBanner.offsetHeight * 0.7);
      }
      setScrolled(y > 400);
      if (!footer || !sidebarRef.current) return;
      const headerH = 80;
      const rect = footer.getBoundingClientRect();
      const viewportH = window.innerHeight;
      if (rect.top < viewportH) {
        const h = Math.max(rect.top - headerH, 100);
        setSidebarHeight(`${h}px`);
      } else {
        setSidebarHeight(`calc(100vh - ${headerH}px)`);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const main = document.querySelector('.coc-zoo-main-content');
    if (main) {
      const top = main.getBoundingClientRect().top + window.pageYOffset - 80;
      if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, [active]);

  return (
    <div className="coc-zoo-page">
      <section className="coc-hero-banner">
        <div className="coc-hero-container">
          <div className="coc-hero-content">
            <span className="coc-taxonomy-tag">Phylum Arthropoda · Class Insecta</span>
            <h1 className="coc-hero-title">American Cockroach</h1>
            <p className="coc-hero-subtitle">Periplaneta americana</p>
            <div className="coc-taxonomy-grid">
              <div className="coc-tax-item">
                <span className="coc-tax-label">Phylum</span>
                <span className="coc-tax-value">Arthropoda</span>
              </div>
              <div className="coc-tax-item">
                <span className="coc-tax-label">Class</span>
                <span className="coc-tax-value">Insecta</span>
              </div>
              <div className="coc-tax-item">
                <span className="coc-tax-label">Order</span>
                <span className="coc-tax-value">Blattodea</span>
              </div>
            </div>
          </div>
          <div className="coc-hero-visual">
            <div className="coc-hero-image-wrapper">
              <img
                src={generatedArt('cockroach-hero', 'American Cockroach')}
                alt="Cockroach"
                className="coc-hero-img"
              />
            </div>
          </div>
        </div>
        <div
          className="coc-scroll-indicator"
          onClick={() => document.querySelector('.coc-zoo-main-content')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="coc-mouse">
            <div className="coc-wheel" />
          </div>
          <div className="coc-arrow-down" />
        </div>
      </section>

      <div className="coc-zoo-app-container">
        <div className={`coc-mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
        <aside
          ref={sidebarRef}
          className={`coc-zoo-sidebar ${mobileOpen ? 'open' : ''} ${pastHero ? '' : 'hidden'}`}
          style={{ height: sidebarHeight }}
        >
          <div className="coc-sidebar-header">
            <div className="coc-progress-label">Progress</div>
            <div className="coc-progress-track">
              <div className="coc-progress-fill" style={{ width: `${((activeIndex + 1) / keys.length) * 100}%` }} />
            </div>
          </div>
          <nav className="coc-sidebar-nav">
            {keys.map((k) => (
              <button
                key={k}
                className={`coc-nav-btn ${active === k ? 'active' : ''}`}
                onClick={() => setActive(k)}
              >
                <span>{cockroachContent[k].title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="coc-zoo-main-content">
          <button className="coc-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open Menu">
            <Menu size={24} />
          </button>

          <div className="coc-content-card">
            <div className="coc-content-header">
              <h2 className="coc-header-title">{cockroachContent[active].title}</h2>
              <div className="coc-header-nav-buttons">
                {prevKey && (
                  <button className="coc-nav-action-btn coc-prev-btn" onClick={() => setActive(prevKey)}>
                    <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Prev
                  </button>
                )}
                {nextKey && (
                  <button className="coc-nav-action-btn coc-next-btn" onClick={() => setActive(nextKey)}>
                    Next <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                  </button>
                )}
              </div>
            </div>

            <div className="coc-content-section">
              {cockroachContent[active].sections.map((s, i) => (
                <div
                  className="coc-section-block"
                  key={i}
                  style={{
                    marginLeft: s.isSubSubtopic ? '3rem' : s.isSubtopic ? '1.5rem' : '0',
                    borderLeft: s.isSubtopic || s.isSubSubtopic ? '3px solid rgba(13, 148, 136, 0.15)' : 'none',
                    paddingLeft: s.isSubtopic || s.isSubSubtopic ? '1.5rem' : '0',
                  }}
                >
                  <div className="coc-section-title">
                    <span
                      className="coc-section-marker"
                      style={s.isSubtopic || s.isSubSubtopic ? { height: '1rem', background: '#94a3b8' } : {}}
                    />
                    <span style={s.isSubtopic || s.isSubSubtopic ? { fontSize: '1.1rem', color: '#475569' } : {}}>
                      {s.heading}
                    </span>
                  </div>
                  {s.content && (
                    <ul className="coc-point-list">
                      {s.content.map((line, j) => (
                        <li className="coc-list-item" key={j}>
                          <span className="coc-bullet" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.image && (
                    <figure className="coc-image-wrapper">
                      <img src={generatedArt(s.heading, s.heading)} alt={s.heading} className="coc-section-image" loading="lazy" />
                      {s.imageCaption && <figcaption className="coc-image-caption">{s.imageCaption}</figcaption>}
                    </figure>
                  )}
                  {s.table && (
                    <div className="coc-table-container">
                      <table className="coc-zoo-table">
                        <thead>
                          <tr>
                            {s.table.headers.map((h, j) => (
                              <th key={j}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.table.rows.map((row, j) => (
                            <tr key={j}>
                              {row.map((cell, k) => (
                                <td key={k}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="coc-navigation-footer">
              {prevKey ? (
                <button className="coc-nav-action-btn coc-prev-btn" onClick={() => setActive(prevKey)}>
                  <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Previous
                </button>
              ) : (
                <div />
              )}
              {nextKey && (
                <button className="coc-nav-action-btn coc-next-btn" onClick={() => setActive(nextKey)}>
                  Next <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      <button
        className={`coc-back-to-top ${scrolled ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
