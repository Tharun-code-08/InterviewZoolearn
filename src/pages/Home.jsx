import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from '../components/CountUp';
import Logo from '../components/Logo';
import scientists from '../data/scientists.json';
import learningPath from '../data/learningPath.json';
import deepDive from '../data/deepDive.json';
import { generatedArt } from '../utils/generatedArt';

const CAROUSEL_NAMES = ['Pleurobrachia', 'Dugesia', 'Chalina', 'Tubifex', 'Naja naja', 'Ascaris', 'Hydra', 'Araneus', 'Unio'];
const CAROUSEL_IMAGES = CAROUSEL_NAMES.map((n) => generatedArt(n, n));

function HeroBanner() {
  const [active] = useState(0);
  return (
    <section className="banner-hero" aria-label="Zoology Learning Platform Hero Banner">
      <div className="banner-container">
        <div className="banner-left">
          <div className="banner-logo-wrapper">
            <Logo className="banner-logo-img" size={64} />
            <span className="banner-logo-text-img" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--zl-primary)' }}>
              ZooLearn
            </span>
          </div>
          <div className="banner-spacer" style={{ height: '3rem' }}></div>
          <div className="banner-desc-container">
            <span className="desc-badge">Learn Visually</span>
            <h2 className="banner-typing-heading">
              Build strong <span>zoology concepts</span>
              <br />
              through <span className="typing-text">visual learning</span>
            </h2>
            <p className="banner-desc-subtext">Designed exclusively for students and researchers.</p>
          </div>
        </div>
        <div className="banner-right">
          <div className="banner-slider carousel-container">
            {CAROUSEL_IMAGES.map((src, i) => (
              <img
                key={src}
                alt={`Species ${i + 1}`}
                className={`banner-image carousel-img ${i === active ? 'active' : 'hidden'}`}
                draggable="false"
                src={src}
              />
            ))}
            <div className="banner-stats">
              <div className="banner-stat-item">
                <span className="banner-stat-number">
                  <CountUp end={100} duration={2000} />+
                </span>
                <span className="banner-stat-label">3D Models</span>
              </div>
              <div className="banner-stat-divider"></div>
              <div className="banner-stat-item">
                <span className="banner-stat-number">
                  <CountUp end={200} duration={2000} />+
                </span>
                <span className="banner-stat-label">Species</span>
              </div>
              <div className="banner-stat-divider"></div>
              <div className="banner-stat-item">
                <span className="banner-stat-number">
                  <CountUp end={300} duration={2000} />+
                </span>
                <span className="banner-stat-label">Images</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScientistsSection() {
  const categories = useMemo(() => [...new Set(scientists.map((s) => s.field))], []);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [flippedIdx, setFlippedIdx] = useState(null);

  const filtered = scientists.filter((s) => s.field === activeCategory);
  const visible = filtered.slice(activeIdx, activeIdx + 3);

  return (
    <section className="sci-scientist-section">
      <div className="sci-section-header">
        <h2>Legendary Scientists</h2>
        <p>Explore the minds that shaped our understanding of the world.</p>
      </div>
      <div className="sci-sort-bar-wrapper">
        <button className="sci-sort-nav-btn sci-left" aria-label="Scroll categories left">‹</button>
        <div className="sci-sort-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`sci-sort-btn ${activeCategory === cat ? 'sci-active' : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setActiveIdx(0);
                setFlippedIdx(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="sci-sort-nav-btn sci-right" aria-label="Scroll categories right">›</button>
      </div>
      <div className="sci-carousel-shell">
        <button
          className="sci-nav-btn"
          onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
        >
          ‹
        </button>
        <div className="sci-snap-carousel">
          {visible.map((s, p) => (
            <div className="sci-snap-card sci-active" key={s.id}>
              <div
                className={`sci-flip-card ${flippedIdx === s.id ? 'sci-is-flipped' : ''}`}
                onClick={() => setFlippedIdx(flippedIdx === s.id ? null : s.id)}
              >
                <div className="sci-flip-inner">
                  <div className="sci-flip-front">
                    <div className="sci-image-box">
                      <img src={generatedArt(s.name, s.name)} alt={s.name} />
                    </div>
                    <div className="sci-card-info">
                      <h3>{s.name}</h3>
                      <p className="sci-period">{s.period}</p>
                      <span className="sci-badge">{s.field}</span>
                    </div>
                  </div>
                  <div className="sci-flip-back">
                    <h3>{s.name}</h3>
                    <div className="sci-details">
                      <p>{s.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="sci-nav-btn"
          onClick={() => setActiveIdx((i) => Math.min(filtered.length - 3, i + 1))}
        >
          ›
        </button>
      </div>
    </section>
  );
}

function LearningSection() {
  const navigate = useNavigate();
  return (
    <div className="learn-learning-page">
      <section className="learn-section-wrapper learn-bg-light">
        <div className="learn-container">
          <div className="learn-section-header">
            <span className="learn-section-tag">Fundamentals</span>
            <h2 className="learn-section-title">Conceptual Learning Path</h2>
            <p className="learn-section-subtitle">Build strong zoology foundations with concept-first modules.</p>
          </div>
          <div className="learn-conceptual-grid">
            {learningPath.map((item) => (
              <div
                className="learn-conceptual-card"
                key={item.title}
                onClick={() => item.route && navigate(item.route)}
                style={{ cursor: item.route ? 'pointer' : 'default' }}
              >
                <div>
                  <div className="learn-icon-box">
                    <img src={generatedArt(item.title, item.title)} alt={item.title} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <button
                  className="learn-btn-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    item.route && navigate(item.route);
                  }}
                >
                  Start Module →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-section-wrapper">
        <div className="learn-container">
          <div className="learn-section-header">
            <span className="learn-section-tag">Master Key Organisms</span>
            <h2 className="learn-section-title">Deep Dive</h2>
            <p className="learn-section-subtitle">Detailed anatomy and physiology of important organisms.</p>
          </div>
          <div className="learn-organisms-grid">
            {deepDive.map((item) => (
              <div
                className="learn-organism-card"
                key={item.id}
                onClick={() => navigate(item.route)}
                style={{ cursor: 'pointer' }}
              >
                <div className="learn-card-details">
                  <div className="learn-organism-head">
                    <div className="learn-org-icon">
                      <img src={generatedArt(item.id, item.name)} alt={item.name} />
                    </div>
                    <div className="learn-org-title-group">
                      <h3>{item.name}</h3>
                      <span className="learn-scientific-name">{item.scientificName}</span>
                    </div>
                  </div>
                  <div className="learn-classification-badge">{item.classification}</div>
                  <div className="learn-stats-row"></div>
                </div>
                <button
                  className="learn-btn-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.route);
                  }}
                >
                  Start Learning →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroBanner />
      <ScientistsSection />
      <LearningSection />
    </>
  );
}
