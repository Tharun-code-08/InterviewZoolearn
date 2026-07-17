import { useEffect, useRef, useState, Fragment } from 'react';
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Lightbulb,
  RefreshCw,
  Layers,
  Globe,
  Dna,
  Sun,
  Leaf,
  Shield,
  Eye,
  Utensils,
  HeartPulse,
  Brain,
  Droplet,
  TrendingUp,
  Thermometer,
  Home,
  Snowflake,
  Waves,
  Pill,
  History,
  BookOpen,
  Activity,
  Loader,
  Image as ImageIcon,
} from 'lucide-react';
import frogSections from '../data/frogData.json';
import { generatedArt } from '../utils/generatedArt';
import frogWikiImages from '../data/frogWikiImages.json';

const TAXONOMY = { phylum: 'Chordata', class: 'Amphibia', order: 'Anura', tag: 'Amphibia | Anura' };
const HERO = {
  title: 'Frog',
  subtitle: 'Rana tigrina',
  image: frogWikiImages['frog-hero'] || generatedArt('frog-hero', 'Frog'),
};

const ICONS = {
  classification: BookOpen,
  morphology: Eye,
  digestive: Utensils,
  respiratory: Activity,
  circulatory: HeartPulse,
  nervous: Brain,
  excretory: Droplet,
  reproductive: Dna,
  economic: TrendingUp,
  Thermometer,
  Home,
  Sun,
  Snowflake,
  Waves,
  Droplet,
  Sprout: Leaf,
  Leaf,
  Utensils,
  Pill,
  Shield,
  Dna,
  RefreshCw,
  History,
  Globe,
  Layers,
  Lightbulb,
  Image: ImageIcon,
};

function Icon({ name, size = 20, className = '', style = {} }) {
  const Cmp = ICONS[name];
  return Cmp ? <Cmp size={size} className={className} style={style} /> : null;
}

function SectionTitle({ title, icon }) {
  return (
    <div className="frog-section-title">
      <span className="frog-section-marker" />
      {icon && (
        <span style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
          <Icon name={icon} size={22} />
        </span>
      )}
      <span>{title}</span>
    </div>
  );
}

function InfoCard({ title, children, className = '' }) {
  return (
    <div className={`frog-info-card ${className}`}>
      {title && <div className="frog-card-title">{title}</div>}
      {children}
    </div>
  );
}

function ModelPlaceholder({ title, className = '', style = {} }) {
  return (
    <div className={`frog-model-container frog-model-loading-state ${className}`} style={style}>
      <div className="frog-model-loading-inner">
        <div className="frog-model-loading-icon">
          <Loader size={32} className="frog-spinner" />
        </div>
        <p className="frog-model-loading-text">Loading 3D model</p>
        <div className="frog-model-loading-bar">
          <div className="frog-model-loading-bar-fill" />
        </div>
        <p className="frog-model-loading-subtext">{title}</p>
      </div>
    </div>
  );
}

function ImagePlaceholder({ label }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: '120px',
        height: '350px',
        background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        border: '2px dashed rgba(22, 163, 74, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        color: 'rgba(22, 163, 74, 0.6)',
        fontSize: '0.9rem',
        fontWeight: '600',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', color: '#16a34a' }}>
        <Icon name="Image" size={48} />
      </span>
      <span>{label}</span>
      <span style={{ fontSize: '0.75rem', fontWeight: '400', color: '#94a3b8' }}>Image will be added here</span>
    </div>
  );
}

function FigureImage({ src, label, className = '', style = {} }) {
  if (!src) return <ImagePlaceholder label={label} />;
  return (
    <div className={`frog-image-card ${className}`} style={style}>
      <div className="frog-image-container">
        <img src={src} alt={label} className="frog-content-img" loading="lazy" decoding="async" />
      </div>
      <div className="frog-image-caption">
        <span className="frog-image-caption-prefix">Figure: </span>
        <span className="frog-image-caption-text">{label}</span>
      </div>
    </div>
  );
}

function CardImage({ src, alt }) {
  if (!src) return null;
  return (
    <div className="frog-card-image-container">
      <img src={src} alt={alt} className="frog-card-content-img" loading="lazy" decoding="async" />
      <div className="frog-card-image-caption">
        <span className="frog-card-image-caption-prefix">Figure: </span>
        <span className="frog-card-image-caption-text">{alt}</span>
      </div>
    </div>
  );
}

function FlowDiagram({ steps }) {
  if (!steps || !steps.length) return null;
  return (
    <div className="frog-flow-container">
      {steps.map((step, i) => (
        <Fragment key={i}>
          <div className="frog-flow-step">{step}</div>
          {i < steps.length - 1 && <div className="frog-flow-arrow">↓</div>}
        </Fragment>
      ))}
    </div>
  );
}

function PointList({ items }) {
  if (!items || !items.length) return null;
  return (
    <ul className="frog-point-list">
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
          <li className="frog-list-item" key={i}>
            <span className="frog-bullet" />
            {content}
          </li>
        );
      })}
    </ul>
  );
}

function SubsectionGrid({ subsections, cols = true }) {
  if (!subsections) return null;
  return (
    <div style={cols ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' } : undefined}>
      {subsections.map((s, i) => (
        <InfoCard title={s.subtitle} key={i}>
          <PointList items={s.points} />
        </InfoCard>
      ))}
    </div>
  );
}

export default function Frog() {
  const [activeId, setActiveId] = useState('classification');
  const [reproTab, setReproTab] = useState('male');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 80px)');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const activeIndex = frogSections.findIndex((s) => s.id === activeId);
  const prevSection = activeIndex > 0 ? frogSections[activeIndex - 1] : null;
  const nextSection = activeIndex < frogSections.length - 1 ? frogSections[activeIndex + 1] : null;

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('.foo-zl-footer');
      const hero = document.querySelector('.frog-hero-banner');
      const y = window.scrollY;
      if (hero) {
        setSidebarVisible(y > hero.offsetHeight * 0.7);
      }
      setShowBackToTop(y > 400);
      if (!footer || !sidebarRef.current) return;
      const offset = 80;
      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh) {
        setSidebarHeight(`${Math.max(rect.top - offset, 100)}px`);
      } else {
        setSidebarHeight(`calc(100vh - ${offset}px)`);
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
    const main = document.querySelector('.frog-zoo-main-content');
    if (main) {
      const targetY = main.getBoundingClientRect().top + window.pageYOffset - 80;
      if (window.scrollY > targetY) window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, [activeId]);

  const t = frogSections[activeIndex];

  function renderContent() {
    switch (activeId) {
      case 'classification':
        return (
          <div className="frog-content-section">
            <SectionTitle title="Classification of Rana tigrina" icon="classification" />
            <InfoCard title="Systematic Position">
              <p className="frog-list-item" style={{ marginBottom: '1rem' }}>
                {t.classificationIntro}
              </p>
              <div className="frog-facts-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                {t.systematicPosition?.map((s, i) => (
                  <div className="frog-fact-card" key={i}>
                    <span className="frog-fact-label">{s.rank}</span>
                    <span className="frog-fact-val">{s.value}</span>
                  </div>
                ))}
              </div>
            </InfoCard>
            <SectionTitle title="Habitat & Environment" icon="" />
            <InfoCard>
              <ul className="frog-point-list" style={{ gap: '1.25rem' }}>
                {t.habitat?.map((s, i) => {
                  let content = s;
                  if (typeof s === 'object' && s.text) {
                    if (s.strong) {
                      const parts = s.text.split(s.strong);
                      content = (
                        <>
                          {parts[0]}
                          <strong>{s.strong}</strong>
                          {parts[1]}
                        </>
                      );
                    } else content = s.text;
                  }
                  return (
                    <li className="frog-list-item" key={i}>
                      <span className="frog-bullet" />
                      <span>{content}</span>
                    </li>
                  );
                })}
              </ul>
            </InfoCard>
            <InfoCard title="Skin & Water Absorption" className="frog-highlight-card">
              <p className="frog-list-item">
                <span className="frog-bullet" />
                {t.skinNote}
              </p>
            </InfoCard>
            <div className="frog-facts-grid">
              {t.facts?.map((s, i) => (
                <div className="frog-fact-card" key={i}>
                  <span className="frog-fact-icon">
                    <Icon name={s.icon} size={22} style={{ color: 'var(--frog-primary)' }} />
                  </span>
                  <span className="frog-fact-label">{s.label}</span>
                  <span className="frog-fact-val">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'morphology':
        return (
          <div className="frog-content-section">
            <SectionTitle title="External Morphology" icon="morphology" />
            <InfoCard>
              <p className="frog-list-item">{t.intro}</p>
            </InfoCard>
            <div className="frog-split-view">
              <div className="frog-text-column">
                <SectionTitle title={t.bodyDivision.title} />
                {t.bodyDivision.subsections.map((s, i) => (
                  <InfoCard title={s.subtitle} key={i}>
                    <PointList items={s.points} />
                  </InfoCard>
                ))}
              </div>
              <FigureImage src={frogWikiImages['frog-morphologyMain'] || generatedArt('frog-morphologyMain', 'External Morphology of Frog')} label="External Morphology of Frog" />
            </div>
            <SectionTitle title={t.skin.title} />
            {t.skin.subsections.map((s, i) => (
              <InfoCard title={s.subtitle} key={i}>
                <PointList items={s.points} />
              </InfoCard>
            ))}
            <SectionTitle title={t.head.title} />
            <InfoCard>
              <div className="frog-card-split-layout">
                <div className="frog-card-text-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {t.head.subsections.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        borderBottom: i < t.head.subsections.length - 1 ? '1px dashed var(--frog-border-color)' : 'none',
                        paddingBottom: i < t.head.subsections.length - 1 ? '0.75rem' : 0,
                      }}
                    >
                      <div
                        className="frog-card-title"
                        style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.4rem' }}
                      >
                        {s.subtitle}
                      </div>
                      <PointList items={s.points} />
                    </div>
                  ))}
                </div>
                <div className="frog-card-img-col">
                  <FigureImage src={frogWikiImages['frog-headFeatures'] || generatedArt('frog-headFeatures', 'Head Features')} label="Head Features" />
                </div>
              </div>
            </InfoCard>
            <SectionTitle title={t.appendages.title} />
            {t.appendages.subsections.map((s, i) => (
              <InfoCard title={s.subtitle} key={i}>
                <PointList items={s.points} />
              </InfoCard>
            ))}
            <SectionTitle title={t.sexualDimorphism.title} />
            <InfoCard>
              <p className="frog-list-item">{t.sexualDimorphism.intro}</p>
            </InfoCard>
            {t.sexualDimorphism.subsections.map((s, i) =>
              s.imageKey ? (
                <InfoCard title={s.subtitle} key={i}>
                  <div className="frog-card-split-layout">
                    <div className="frog-card-text-col">
                      <PointList items={s.points} />
                    </div>
                    <div className="frog-card-img-col">
                      <FigureImage src={frogWikiImages[`frog-${s.imageKey}`] || generatedArt(`frog-${s.imageKey}`, s.subtitle)} label={s.subtitle} />
                    </div>
                  </div>
                </InfoCard>
              ) : (
                <InfoCard title={s.subtitle} key={i}>
                  <PointList items={s.points} />
                </InfoCard>
              )
            )}
          </div>
        );

      case 'digestive':
        return (
          <div className="frog-content-section">
            <SectionTitle title="Digestive System" icon="digestive" />
            <InfoCard>
              <p className="frog-list-item">{t.intro}</p>
            </InfoCard>
            <div className="frog-split-view">
              <div className="frog-text-column">
                <SectionTitle title={t.alimentaryCanal?.title} />
                <InfoCard>
                  <p className="frog-list-item" style={{ marginBottom: '1.25rem' }}>
                    {t.alimentaryCanal?.description}
                  </p>
                  {t.alimentaryCanal?.subsections.map((s, i) => (
                    <div style={{ marginBottom: '1.25rem' }} key={i}>
                      <div
                        className="frog-card-title"
                        style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.5rem' }}
                      >
                        {s.subtitle}
                      </div>
                      <PointList items={s.points} />
                    </div>
                  ))}
                </InfoCard>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <FigureImage src={frogWikiImages['frog-digestive'] || generatedArt('frog-digestive', 'Digestive System')} label="Digestive System" />
                <InfoCard title="Alimentary Canal Path">
                  <FlowDiagram steps={t.alimentaryCanal?.flow} />
                </InfoCard>
              </div>
            </div>
            <SectionTitle title={t.glands?.title} />
            <InfoCard>
              {t.glands?.subsections.map((s, i) => (
                <div style={{ marginBottom: i < t.glands.subsections.length - 1 ? '1.25rem' : 0 }} key={i}>
                  <div
                    className="frog-card-title"
                    style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.5rem' }}
                  >
                    {s.subtitle}
                  </div>
                  <PointList items={s.points} />
                </div>
              ))}
            </InfoCard>
            <SectionTitle title={t.digestionProcess?.title} />
            <InfoCard>
              {t.digestionProcess?.subsections.map((s, i) => (
                <div style={{ marginBottom: i < t.digestionProcess.subsections.length - 1 ? '1.25rem' : 0 }} key={i}>
                  <div
                    className="frog-card-title"
                    style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.5rem' }}
                  >
                    {s.subtitle}
                  </div>
                  <PointList items={s.points} />
                </div>
              ))}
            </InfoCard>
          </div>
        );

      case 'respiratory':
        return (
          <div className="frog-content-section">
            <SectionTitle title="Respiratory System" icon="respiratory" />
            <InfoCard>
              <p className="frog-list-item">{t.intro}</p>
            </InfoCard>
            {t.modes?.map((s, i) =>
              s.title.includes('Pulmonary') ? (
                <div style={{ marginTop: '2rem' }} key={i}>
                  <SectionTitle title={s.title} />
                  <p className="frog-list-item" style={{ marginBottom: '1rem', fontStyle: 'italic', color: 'var(--frog-text-secondary)' }}>
                    {s.description}
                  </p>
                  <div className="frog-split-view">
                    <div className="frog-text-column">
                      {s.subsections.map((sub, j) => (
                        <InfoCard title={sub.subtitle} key={j}>
                          <PointList items={sub.points} />
                        </InfoCard>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <InfoCard title="Air Pathway">
                        <FlowDiagram steps={s.pathway} />
                      </InfoCard>
                      <FigureImage src={frogWikiImages['frog-respiratory'] || generatedArt('frog-respiratory', 'Pulmonary Respiration')} label="Pulmonary Respiration" />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '2rem' }} key={i}>
                  <SectionTitle title={s.title} />
                  <p className="frog-list-item" style={{ marginBottom: '1rem', fontStyle: 'italic', color: 'var(--frog-text-secondary)' }}>
                    {s.description}
                  </p>
                  <SubsectionGrid subsections={s.subsections} />
                </div>
              )
            )}
          </div>
        );

      case 'circulatory':
        return (
          <div className="frog-content-section">
            <SectionTitle title="Circulatory System" icon="circulatory" />
            <InfoCard>
              <p className="frog-list-item">{t.intro}</p>
            </InfoCard>
            <div className="frog-split-view">
              <div className="frog-text-column">
                <SectionTitle title={t.heart?.title} />
                <InfoCard>
                  <p className="frog-list-item" style={{ marginBottom: '1.25rem' }}>
                    {t.heart?.description}
                  </p>
                  {t.heart?.subsections.map((s, i) => (
                    <div style={{ marginBottom: '1.25rem' }} key={i}>
                      <div
                        className="frog-card-title"
                        style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.5rem' }}
                      >
                        {s.subtitle}
                      </div>
                      <PointList items={s.points} />
                    </div>
                  ))}
                </InfoCard>
              </div>
              <div className="frog-sticky-column">
                <ModelPlaceholder title="Frog Circulatory System" />
              </div>
            </div>
            <SectionTitle title={t.vascular?.title} />
            {t.vascular?.subsections.map((s, i) => (
              <InfoCard title={s.subtitle} key={i}>
                <PointList items={s.points} />
              </InfoCard>
            ))}
            <InfoCard title="Portal Systems">
              <p className="frog-list-item" style={{ marginBottom: '1rem' }}>
                {t.vascular?.portalSystems?.intro}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {t.vascular?.portalSystems?.systems.map((s, i) => (
                  <InfoCard title={s.subtitle} className="frog-highlight-card" key={i}>
                    <PointList items={s.points} />
                  </InfoCard>
                ))}
              </div>
            </InfoCard>
            <SectionTitle title={t.blood?.title} />
            <div className="frog-split-view">
              <div className="frog-text-column">
                {t.blood?.subsections.map((s, i) => (
                  <InfoCard title={s.subtitle} key={i}>
                    <PointList items={s.points} />
                  </InfoCard>
                ))}
              </div>
              <div className="frog-sticky-column">
                <FigureImage src={frogWikiImages['frog-blood'] || generatedArt('frog-blood', 'Blood Cells and Lymph')} label="Blood Cells and Lymph" />
              </div>
            </div>
            <SectionTitle title={t.circulation?.title} />
            <InfoCard className="frog-highlight-card">
              <PointList items={t.circulation?.points} />
              <CardImage src={frogWikiImages['frog-circulation'] || generatedArt('frog-circulation', 'Circulation Path')} alt="Circulation Path" />
            </InfoCard>
          </div>
        );

      case 'nervous':
        return (
          <div className="frog-content-section">
            <SectionTitle title="Nervous System" icon="nervous" />
            <InfoCard>
              <p className="frog-list-item">{t.intro}</p>
            </InfoCard>
            <SectionTitle title={t.cns?.title} />
            <InfoCard>
              <p className="frog-list-item">{t.cns?.description}</p>
            </InfoCard>
            <InfoCard title={t.cns?.brain?.title}>
              <PointList items={t.cns?.brain?.points} />
            </InfoCard>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {t.cns?.brain?.regions.map((s, i) => (
                <InfoCard title={s.subtitle} key={i}>
                  <PointList items={s.points} />
                </InfoCard>
              ))}
            </div>
            <InfoCard title={t.cns?.spinalCord?.title}>
              <PointList items={t.cns?.spinalCord?.points} />
            </InfoCard>
            <SectionTitle title={t.peripheral?.title} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start' }}>
              {t.peripheral?.subsections.map((s, i) => (
                <InfoCard title={s.subtitle} key={i}>
                  <PointList items={s.points} />
                  {s.subtitle.includes('Peripheral') && (
                    <CardImage src={frogWikiImages['frog-peripheral'] || generatedArt('frog-peripheral', 'Peripheral Nervous System (PNS)')} alt="Peripheral Nervous System (PNS)" />
                  )}
                </InfoCard>
              ))}
            </div>
            <SectionTitle title={t.senseOrgans?.title} />
            <InfoCard>
              <p className="frog-list-item">{t.senseOrgans?.description}</p>
            </InfoCard>
            <div className="frog-split-view">
              <div className="frog-text-column">
                {t.senseOrgans?.subsections.slice(0, 2).map((s, i) => (
                  <InfoCard title={s.subtitle} key={i}>
                    <PointList items={s.points} />
                  </InfoCard>
                ))}
              </div>
              <div>
                {t.senseOrgans?.subsections.slice(2).map((s, i) => (
                  <InfoCard title={s.subtitle} key={i}>
                    <PointList items={s.points} />
                    <CardImage src={frogWikiImages['frog-senses'] || generatedArt('frog-senses', 'Chemical and Physical Senses')} alt="Chemical and Physical Senses" />
                  </InfoCard>
                ))}
              </div>
            </div>
          </div>
        );

      case 'excretory':
        return (
          <div className="frog-content-section">
            <SectionTitle title="Excretory System" icon="excretory" />
            <InfoCard>
              <p className="frog-list-item">{t.intro}</p>
            </InfoCard>
            <div className="frog-split-view">
              <div className="frog-text-column">
                <SectionTitle title={t.kidneys?.title} />
                {t.kidneys?.subsections.map((s, i) => (
                  <InfoCard title={s.subtitle} key={i}>
                    <PointList items={s.points} />
                  </InfoCard>
                ))}
              </div>
              <FigureImage src={frogWikiImages['frog-excretory'] || generatedArt('frog-excretory', 'Excretory System')} label="Excretory System" />
            </div>
            <SectionTitle title={t.ureters?.title} />
            <InfoCard>
              <p className="frog-list-item" style={{ marginBottom: '1rem' }}>
                {t.ureters?.description}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {t.ureters?.subsections.map((s, i) => (
                  <InfoCard title={s.subtitle} className="frog-highlight-card" key={i}>
                    <PointList items={s.points} />
                  </InfoCard>
                ))}
              </div>
            </InfoCard>
            <SectionTitle title={t.storage?.title} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {t.storage?.subsections.map((s, i) => (
                <InfoCard title={s.subtitle} key={i}>
                  <PointList items={s.points} />
                </InfoCard>
              ))}
            </div>
            <SectionTitle title={t.nitrogenousWaste?.title} />
            <InfoCard className="frog-highlight-card">
              <PointList items={t.nitrogenousWaste?.points} />
            </InfoCard>
          </div>
        );

      case 'reproductive':
        return (
          <div className="frog-content-section">
            <SectionTitle title="Reproductive System" icon="reproductive" />
            <InfoCard>
              <p className="frog-list-item">{t.intro}</p>
            </InfoCard>
            <div className="frog-toggle-group" style={{ margin: '1.5rem 0 2rem' }}>
              <button className={`frog-toggle-btn ${reproTab === 'male' ? 'active' : ''}`} onClick={() => setReproTab('male')}>
                <span>♂ Male Reproductive System</span>
              </button>
              <button className={`frog-toggle-btn ${reproTab === 'female' ? 'active' : ''}`} onClick={() => setReproTab('female')}>
                <span>♀ Female Reproductive System</span>
              </button>
            </div>
            {reproTab === 'male' && (
              <div className="frog-split-view">
                <div className="frog-text-column">
                  <SectionTitle title={t.male?.title} />
                  <div>
                    {t.male?.subsections.map((s, i) => (
                      <InfoCard title={s.subtitle} key={i}>
                        <PointList items={s.points} />
                      </InfoCard>
                    ))}
                  </div>
                </div>
                <div className="frog-sticky-column">
                  <ModelPlaceholder title="Male Reproductive System" />
                </div>
              </div>
            )}
            {reproTab === 'female' && (
              <div className="frog-split-view">
                <div className="frog-text-column">
                  <SectionTitle title={t.female?.title} />
                  <div>
                    {t.female?.subsections.map((s, i) => (
                      <InfoCard title={s.subtitle} key={i}>
                        <PointList items={s.points} />
                      </InfoCard>
                    ))}
                  </div>
                </div>
                <div className="frog-sticky-column">
                  <ModelPlaceholder title="Female Reproductive System" />
                </div>
              </div>
            )}
            <SectionTitle title={t.fertilization?.title} />
            <div className="frog-split-view">
              <div className="frog-text-column">
                {t.fertilization?.subsections.slice(0, 3).map((s, i) => (
                  <InfoCard
                    title={s.subtitle}
                    className={s.subtitle.includes('Metamorphosis') && !s.subtitle.includes('Changes') ? 'frog-highlight-card' : ''}
                    key={i}
                  >
                    <PointList items={s.points} />
                  </InfoCard>
                ))}
              </div>
              <div>
                {t.fertilization?.subsections.slice(3).map((s, i) => (
                  <InfoCard title={s.subtitle} key={i}>
                    <PointList items={s.points} />
                    <CardImage src={frogWikiImages['frog-metamorphosis'] || generatedArt('frog-metamorphosis', 'Changes During Metamorphosis')} alt="Changes During Metamorphosis" />
                  </InfoCard>
                ))}
              </div>
            </div>
          </div>
        );

      case 'economic':
        return (
          <div className="frog-content-section">
            <SectionTitle title="Economic Importance of Frogs" icon="economic" />
            <InfoCard>
              <p className="frog-list-item">{t.intro}</p>
            </InfoCard>
            {t.categories?.map((s, i) => (
              <InfoCard
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name={s.icon} size={18} style={{ color: 'var(--frog-primary)' }} />
                    <span>{s.title}</span>
                  </div>
                }
                key={i}
              >
                <PointList items={s.points} />
              </InfoCard>
            ))}
            <SectionTitle title="Did You Know?" icon="Lightbulb" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {t.facts?.map((s, i) => (
                <InfoCard className="frog-highlight-card" key={i}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span
                      style={{
                        flexShrink: 0,
                        marginTop: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(22, 163, 74, 0.1)',
                      }}
                    >
                      <Icon name={s.icon} size={18} style={{ color: 'var(--frog-primary)' }} />
                    </span>
                    <div>
                      <div className="frog-card-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '0.35rem' }}>
                        {s.label}
                      </div>
                      <p className="frog-list-item" style={{ margin: 0 }}>
                        {s.text}
                      </p>
                    </div>
                  </div>
                </InfoCard>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="frog-content-section">
            <SectionTitle title={t.label} />
            <InfoCard>
              <p>{t.content?.overview || 'Content placeholder.'}</p>
            </InfoCard>
          </div>
        );
    }
  }

  return (
    <div className="frog-zoo-page">
      <section className="frog-hero-banner">
        <div className="frog-hero-container">
          <div className="frog-hero-content">
            <span className="frog-taxonomy-tag">{TAXONOMY.tag}</span>
            <h1 className="frog-hero-title">{HERO.title}</h1>
            <p className="frog-hero-subtitle">{HERO.subtitle}</p>
            <div className="frog-taxonomy-grid">
              <div className="frog-tax-item">
                <span className="frog-tax-label">Phylum</span>
                <span className="frog-tax-value">{TAXONOMY.phylum}</span>
              </div>
              <div className="frog-tax-item">
                <span className="frog-tax-label">Class</span>
                <span className="frog-tax-value">{TAXONOMY.class}</span>
              </div>
              <div className="frog-tax-item">
                <span className="frog-tax-label">Order</span>
                <span className="frog-tax-value">{TAXONOMY.order}</span>
              </div>
            </div>
          </div>
          <div className="frog-hero-visual">
            <div className="frog-hero-image-wrapper">
              <img src={HERO.image} alt="Frog" className="frog-hero-img" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
        <div
          className="frog-scroll-indicator"
          onClick={() => {
            const main = document.querySelector('.frog-zoo-main-content');
            if (main) main.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="frog-mouse">
            <div className="frog-wheel" />
          </div>
          <div className="frog-arrow-down" />
        </div>
      </section>

      <div className="frog-zoo-app-container">
        <div className={`frog-mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
        <aside
          ref={sidebarRef}
          className={`frog-zoo-sidebar ${mobileOpen ? 'open' : ''} ${sidebarVisible ? '' : 'hidden'}`}
          style={{ height: sidebarHeight }}
        >
          <div className="frog-sidebar-header">
            <div className="frog-progress-label">Progress</div>
            <div className="frog-progress-track">
              <div className="frog-progress-fill" style={{ width: `${((activeIndex + 1) / frogSections.length) * 100}%` }} />
            </div>
          </div>
          <nav className="frog-sidebar-nav">
            {frogSections.map((s) => (
              <button
                key={s.id}
                className={`frog-nav-btn ${activeId === s.id ? 'active' : ''}`}
                onClick={() => setActiveId(s.id)}
              >
                <span className="frog-nav-icon">
                  <Icon name={s.icon} size={18} />
                </span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="frog-zoo-main-content">
          <button className="frog-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open Menu">
            <Menu size={24} />
          </button>
          <div className="frog-content-card">
            <div className="frog-content-header">
              <h2 className="frog-header-title">{frogSections[activeIndex].label}</h2>
              <div className="frog-header-nav-buttons">
                {prevSection && (
                  <button className="frog-nav-action-btn frog-prev-btn" onClick={() => setActiveId(prevSection.id)}>
                    <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Prev
                  </button>
                )}
                {nextSection && (
                  <button className="frog-nav-action-btn frog-next-btn" onClick={() => setActiveId(nextSection.id)}>
                    Next <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                  </button>
                )}
              </div>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>

      <button
        className={`frog-back-to-top ${showBackToTop ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'var(--frog-primary)',
          color: 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? 'auto' : 'none',
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
