import { useEffect, useRef, useState, Fragment } from 'react';
import { Menu, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import rabbitData from '../data/species/rabbit_page_data.json';
import { generatedArt } from '../utils/generatedArt';
import rabbitWikiImages from '../data/rabbitWikiImages.json';

function SectionTitle({ title, icon }) {
  return (
    <div className="rab-section-title">
      <span className="rab-section-marker" />
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <span>{title}</span>
    </div>
  );
}

function InfoCard({ title, children, className = '' }) {
  return (
    <div className={`rab-info-card ${className}`}>
      {title && <div className="rab-card-title">{title}</div>}
      {children}
    </div>
  );
}

function Model({ src, title }) {
  return (
    <div className="rab-model-container">
      <iframe
        key={src}
        title={title}
        className="rab-sketchfab-embed"
        src={src}
        allow="autoplay; fullscreen; vr"
        allowFullScreen
      />
    </div>
  );
}

function FlowChart({ steps }) {
  return (
    <div className="rab-flow-container">
      {steps.map((step, i) => (
        <Fragment key={i}>
          <div className="rab-flow-step">{step}</div>
          {i < steps.length - 1 && <div className="rab-flow-arrow">↓</div>}
        </Fragment>
      ))}
    </div>
  );
}

function PointList({ items }) {
  return (
    <ul className="rab-point-list">
      {items.map((item, i) => {
        let content = item;
        if (typeof item === 'object' && item.text) {
          if (item.strong) {
            const parts = item.text.split(item.strong);
            content = (
              <>
                {parts[0]}
                <strong>{item.strong}</strong>
                {parts[1]}
              </>
            );
          } else {
            content = item.text;
          }
        }
        return (
          <li className="rab-list-item" key={i}>
            <span className="rab-bullet" />
            {content}
          </li>
        );
      })}
    </ul>
  );
}

export default function Rabbit() {
  const [active, setActive] = useState('habit');
  const [sex, setSex] = useState('female');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 80px)');
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const sidebarRef = useRef(null);
  const { taxonomy, hero, models, sections } = rabbitData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const activeIndex = sections.findIndex((s) => s.id === active);
  const prevSection = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const nextSection = activeIndex < sections.length - 1 ? sections[activeIndex + 1] : null;
  const goPrev = () => prevSection && setActive(prevSection.id);
  const goNext = () => nextSection && setActive(nextSection.id);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('.foo-zl-footer');
      const heroBanner = document.querySelector('.rab-hero-banner');
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
    const main = document.querySelector('.rab-zoo-main-content');
    if (main) {
      const top = main.getBoundingClientRect().top + window.pageYOffset - 80;
      if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, [active]);

  return (
    <div className="rab-zoo-page">
      <section className="rab-hero-banner">
        <div className="rab-hero-container">
          <div className="rab-hero-content">
            <span className="rab-taxonomy-tag">{taxonomy.tag}</span>
            <h1 className="rab-hero-title">{hero.title}</h1>
            <p className="rab-hero-subtitle">{hero.subtitle}</p>
            <div className="rab-taxonomy-grid">
              <div className="rab-tax-item">
                <span className="rab-tax-label">Phylum</span>
                <span className="rab-tax-value">{taxonomy.phylum}</span>
              </div>
              <div className="rab-tax-item">
                <span className="rab-tax-label">Class</span>
                <span className="rab-tax-value">{taxonomy.class}</span>
              </div>
              <div className="rab-tax-item">
                <span className="rab-tax-label">Order</span>
                <span className="rab-tax-value">{taxonomy.order}</span>
              </div>
            </div>
          </div>
          <div className="rab-hero-visual">
            <div className="rab-hero-image-wrapper">
              <img src={rabbitWikiImages['rabbit-hero'] || generatedArt('rabbit-hero', hero.title)} alt="Rabbit" className="rab-hero-img" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
        <div
          className="rab-scroll-indicator"
          onClick={() => document.querySelector('.rab-zoo-main-content')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="rab-mouse">
            <div className="rab-wheel" />
          </div>
          <div className="rab-arrow-down" />
        </div>
      </section>

      <div className="rab-zoo-app-container">
        <div className={`rab-mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
        <aside
          ref={sidebarRef}
          className={`rab-zoo-sidebar ${mobileOpen ? 'open' : ''} ${pastHero ? '' : 'hidden'}`}
          style={{ height: sidebarHeight }}
        >
          <div className="rab-sidebar-header">
            <div className="rab-progress-label">Progress</div>
            <div className="rab-progress-track">
              <div className="rab-progress-fill" style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }} />
            </div>
          </div>
          <nav className="rab-sidebar-nav">
            {sections.map((s) => (
              <button
                key={s.id}
                className={`rab-nav-btn ${active === s.id ? 'active' : ''}`}
                onClick={() => setActive(s.id)}
              >
                <span className="rab-nav-icon">{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="rab-zoo-main-content">
          <button className="rab-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open Menu">
            <Menu size={24} />
          </button>

          <div className="rab-content-card">
            <div className="rab-content-header">
              <h2 className="rab-header-title">{sections[activeIndex].label}</h2>
              <div className="rab-header-nav-buttons">
                {prevSection && (
                  <button className="rab-nav-action-btn rab-prev-btn" onClick={goPrev}>
                    <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Prev
                  </button>
                )}
                {nextSection && (
                  <button className="rab-nav-action-btn rab-next-btn" onClick={goNext}>
                    Next <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                  </button>
                )}
              </div>
            </div>

            {active === 'habit' && (
              <div className="rab-content-section">
                <SectionTitle title="Overview" icon="" />
                <InfoCard>
                  <PointList items={sections[0].overview} />
                </InfoCard>
                <div className="rab-facts-grid">
                  {sections[0].facts.map((f, i) => (
                    <div className="rab-fact-card" key={i}>
                      <span className="rab-fact-icon">{f.icon}</span>
                      <span className="rab-fact-label">{f.label}</span>
                      <span className="rab-fact-val">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === 'morphology' && (
              <div className="rab-content-section">
                <SectionTitle title="Body Structure" icon="" />
                <div className="rab-split-view">
                  <div className="rab-text-column">
                    <InfoCard title="Shape & Size">
                      <PointList items={sections[1].content.shapeSize} />
                    </InfoCard>
                    <InfoCard title="Colour">
                      <p className="rab-list-item">{sections[1].content.colour}</p>
                    </InfoCard>
                    <InfoCard title="Body-division">
                      <p className="rab-list-item">{sections[1].content.bodyDivision}</p>
                    </InfoCard>
                  </div>
                  <Model src={models.morphology} title="Rabbit Morphology" />
                </div>
                <InfoCard title="Head">
                  <PointList items={sections[1].content.head} />
                </InfoCard>
                <InfoCard title="Neck">
                  <p className="rab-list-item">{sections[1].content.neck}</p>
                </InfoCard>
                <InfoCard title="Trunk">
                  <PointList items={sections[1].content.trunk} />
                </InfoCard>
                <InfoCard title="Tail">
                  <p className="rab-list-item">{sections[1].content.tail}</p>
                </InfoCard>
                <InfoCard title="Integument (Skin)">
                  <p className="rab-list-item">{sections[1].content.integument}</p>
                </InfoCard>
                <InfoCard title="Coelom (Body Cavity)" className="rab-highlight-card">
                  <PointList items={sections[1].content.coelom} />
                </InfoCard>
              </div>
            )}

            {active === 'digestive' && (
              <div className="rab-content-section">
                <SectionTitle title="Digestive System" icon="" />
                <InfoCard title="Overview">
                  <PointList items={sections[2].content.overview} />
                </InfoCard>
                <div className="rab-split-view">
                  <div className="rab-text-column">
                    <InfoCard title="Alimentary Canal">
                      <FlowChart steps={sections[2].content.alimentaryCanal} />
                    </InfoCard>
                    <InfoCard title="Caecum">
                      <p className="rab-list-item">{sections[2].content.caecum}</p>
                    </InfoCard>
                  </div>
                  <Model src={models.digestive} title="Digestive System" />
                </div>
                <InfoCard title="Digestive Glands">
                  <PointList items={sections[2].content.digestiveGlands} />
                </InfoCard>
                <InfoCard title="Dentition in Rabbit">
                  <PointList items={sections[2].content.dentition.details} />
                  <div className="rab-formula-box">
                    {sections[2].content.dentition.visual.map((t, i) => (
                      <Fragment key={i}>
                        <span>{t.label}</span>
                        <div className="rab-fraction">
                          <span>{t.top}</span>
                          <span>{t.bottom}</span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <p style={{ textAlign: 'center', color: 'var(--rab-text-secondary)' }}>
                    Rabbit - {sections[2].content.dentition.formula}
                  </p>
                  <p className="rab-list-item">{sections[2].content.dentition.description}</p>
                </InfoCard>
              </div>
            )}

            {active === 'respiratory' && (
              <div className="rab-content-section">
                <SectionTitle title="Respiratory System" icon="" />
                <InfoCard title="Overview">
                  <PointList items={sections[3].content.overview} />
                </InfoCard>
                <div className="rab-split-view">
                  <div className="rab-text-column">
                    <InfoCard title="Lungs">
                      <div className="rab-facts-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        {sections[3].content.lungs.map((t, i) => (
                          <div className="rab-fact-card" key={i}>
                            <span className="rab-fact-label">{t.label}</span>
                            <span className="rab-fact-val">{t.value}</span>
                          </div>
                        ))}
                      </div>
                    </InfoCard>
                    <InfoCard title="Pleura">
                      <p className="rab-list-item">{sections[3].content.pleura}</p>
                    </InfoCard>
                  </div>
                  <Model src={models.respiratory} title="Respiratory System" />
                </div>
                <InfoCard title="Air Pathway">
                  <div className="rab-flow-container rab-flow-horizontal">
                    {sections[3].content.pathway.map((t, i) => (
                      <Fragment key={i}>
                        <div className="rab-flow-step">{t}</div>
                        {i < sections[3].content.pathway.length - 1 && (
                          <div className="rab-flow-arrow rab-flow-arrow-h">→</div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </InfoCard>
                <InfoCard title="Respiratory Structures">
                  <PointList items={sections[3].content.details} />
                </InfoCard>
                <InfoCard title="The Breathing Process">
                  <PointList items={sections[3].content.breathing} />
                </InfoCard>
              </div>
            )}

            {active === 'circulatory' && (
              <div className="rab-content-section">
                <SectionTitle title="Circulatory System" icon="" />
                <div className="rab-split-view">
                  <div className="rab-text-column">
                    <InfoCard title="Overview">
                      <p className="rab-list-item">{sections[4].content.overview}</p>
                    </InfoCard>
                    <InfoCard title="Valves & Openings">
                      <PointList items={sections[4].content.valves} />
                    </InfoCard>
                  </div>
                  <Model src={models.circulatory} title="Circulatory System" />
                </div>
                <InfoCard title="Blood Circulation">
                  <PointList items={sections[4].content.circulation} />
                </InfoCard>
              </div>
            )}

            {active === 'nervous' && (
              <div className="rab-content-section">
                <SectionTitle title="Nervous System" icon="" />
                <InfoCard title="Overview">
                  <PointList items={sections[5].overview} />
                </InfoCard>
                <div className="rab-facts-grid">
                  {sections[5].facts.map((t, i) => (
                    <div className="rab-fact-card" key={i}>
                      <span className="rab-fact-label">{t.label}</span>
                      <span className="rab-fact-val">{t.value}</span>
                    </div>
                  ))}
                </div>
                <InfoCard title="Brain - Structure & Protection">
                  <PointList items={sections[5].brainDetails} />
                </InfoCard>
                <InfoCard title="Major Regions & Components">
                  <PointList items={sections[5].brainRegions} />
                </InfoCard>
              </div>
            )}

            {active === 'urinogenital' && (
              <div className="rab-content-section">
                <SectionTitle title="Urinogenital System" icon="" />
                <InfoCard title="Overview">
                  <PointList items={sections[6].content.overview} />
                </InfoCard>
                <div className="rab-split-view">
                  <div className="rab-text-column">
                    <InfoCard title="Excretory System">
                      <p className="rab-list-item">{sections[6].content.excretory}</p>
                    </InfoCard>
                    <InfoCard title="The Reproductive System">
                      <p className="rab-list-item" style={{ marginBottom: '1rem' }}>
                        {sections[6].content.reproGeneral}
                      </p>
                      <div className="rab-toggle-group">
                        <button
                          className={`rab-toggle-btn ${sex === 'male' ? 'active' : ''}`}
                          onClick={() => setSex('male')}
                        >
                          <span>♂ Male</span>
                        </button>
                        <button
                          className={`rab-toggle-btn ${sex === 'female' ? 'active' : ''}`}
                          onClick={() => setSex('female')}
                        >
                          <span>♀ Female</span>
                        </button>
                      </div>
                      {sex === 'male' && <PointList items={sections[6].content.reproductive.male} />}
                    </InfoCard>
                  </div>
                  <Model
                    src={sex === 'male' ? models.reproMale : models.reproFemale}
                    title={`Reproductive System (${sex})`}
                  />
                </div>
                {sex === 'female' && (
                  <>
                    <InfoCard title="Anatomy & Structure">
                      <PointList items={sections[6].content.reproductive.female} />
                    </InfoCard>
                    <InfoCard title="Common Passageways">
                      <PointList items={sections[6].content.commonPassageways} />
                    </InfoCard>
                    <InfoCard title="Accessory Glands">
                      <PointList items={sections[6].content.femaleGlands} />
                    </InfoCard>
                  </>
                )}
                <InfoCard title="General Biological Facts" className="rab-highlight-card">
                  <PointList items={sections[6].content.generalFacts} />
                </InfoCard>
              </div>
            )}
          </div>
        </main>
      </div>

      <button
        className={`patt-back-to-top ${scrolled ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'var(--rab-primary)',
          color: 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 90,
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
