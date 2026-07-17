import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import VNode from '../components/VNodeRenderer';
import content from '../data/kingdomAnimaliaContent.json';
import { generatedArt } from '../utils/generatedArt';
import wikiImages from '../data/basicFeaturesWikiImages.json';

const { sidebar, timeline, ...phyla } = content;

const PHYLUM_ORDER = [
  'porifera',
  'coelenterata',
  'ctenophora',
  'platyhelminthes',
  'aschelminthes',
  'annelida',
  'arthropoda',
  'mollusca',
  'echinodermata',
  'hemichordata',
  'chordata',
];

function BasicFeatures() {
  return (
    <div className="basic-features-container">
      <section className="intro-hero">
        <div className="intro-hero-bg intro-hero-bg-green"></div>
        <div className="intro-hero-bg intro-hero-bg-blue"></div>
        <div className="intro-hero-container">
          <div className="intro-hero-content">
            <h1 className="intro-hero-title">Basic Features of Classification</h1>
            <p className="intro-hero-text">
              The kingdom <strong>Animalia</strong> is characterised by
              <strong> heterotrophic</strong>,<strong> eukaryotic</strong>,<strong> multicellular</strong> organisms
              whose cells<strong> lack a cell wall</strong>.
            </p>
            <p className="intro-hero-text">
              All animals are <strong>heterotrophic</strong> and are directly or indirectly dependent on plants for
              food.
            </p>
            <p className="intro-hero-text">
              Nutrition involving the engulfment of whole or part of a plant or animal, in solid or liquid form, is
              called<strong> holozoic nutrition</strong>.
            </p>
          </div>
          <div className="intro-hero-image">
            <img
              alt="Basic Features of Classification"
              src={wikiImages['basic-features-classification'] || generatedArt('basic-features-classification', 'Basic Features of Classification')}
            />
          </div>
        </div>
      </section>

      <section className="nutrition-section">
        <div className="nutrition-content">
          <div className="nutrition-text-group">
            <h2 className="nutrition-heading">Heterotrophic Nutrition</h2>
            <p className="nutrition-text">
              All animals are heterotrophic. They are directly or indirectly dependent on plants for food
              (herbivores, carnivores, and omnivores).
            </p>
          </div>
          <div className="nutrition-text-group">
            <h2 className="nutrition-heading">Holozoic Mode of Nutrition</h2>
            <p className="nutrition-text">
              Nutrition involving the engulfment of whole or part of a plant or animal, either in solid or liquid
              state, is called animal-like or holozoic nutrition.
            </p>
          </div>
          <div className="nutrition-image-container">
            <img
              src={wikiImages['holozoic-nutrition-amoeba'] || generatedArt('holozoic-nutrition-amoeba', 'Holozoic Nutrition Amoeba')}
              alt="Holozoic nutrition in Amoeba"
              title="Click to zoom"
            />
          </div>
        </div>
      </section>

      <section className="metazoa-section" aria-labelledby="metazoa-heading">
        <div className="metazoa-container">
          <header className="metazoa-header">
            <h2 id="metazoa-heading" className="metazoa-title">
              Metazoa
            </h2>
            <p className="metazoa-description">
              Metazoa are multicellular, eukaryotic animals that show tissue-level or higher organization and
              generally exhibit holozoic nutrition.
            </p>
          </header>
          <div className="metazoa-content">
            <h3 className="metazoa-subkingdoms-label">Sub-kingdoms based on complexity</h3>
            <div className="metazoa-cards-grid">
              <article className="metazoa-info-card">
                <div className="metazoa-card-header">
                  <h4 className="metazoa-card-title">Parazoa</h4>
                </div>
                <p className="metazoa-card-text">
                  Includes primitive organisms like sponges. In this group, cells are loosely aggregated and do not
                  form true tissues or organs.
                </p>
              </article>
              <article className="metazoa-info-card">
                <div className="metazoa-card-header">
                  <h4 className="metazoa-card-title">Eumetazoa</h4>
                </div>
                <p className="metazoa-card-text">
                  Includes all animals other than sponges. Cells are organized into distinct structural and
                  functional units called tissues, organs, and organ systems.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="loo-section">
        <div className="loo-container">
          <h2 className="loo-heading">Level of Organization</h2>
          <div className="loo-diagram-row">
            {[
              { title: 'CELLULAR LEVEL', label: 'Loose cell aggregates', examples: 'Porifera (Sponges)' },
              { title: 'TISSUE LEVEL', label: 'Cells form Tissue', examples: 'Coelenterates, Ctenophores' },
              { title: 'ORGAN LEVEL', label: 'Tissues form Organs', examples: 'Platyhelminthes' },
              { title: 'ORGAN-SYSTEM LEVEL', label: 'Organs form Systems', examples: 'Aschelminthes, Chordates' },
            ].map((lvl) => (
              <div className="loo-hover-card" key={lvl.title}>
                <div className="loo-card-inner">
                  <div className="loo-card-front">
                    <div className="loo-visual-header">
                      <p>{lvl.label}</p>
                    </div>
                    <footer className="loo-visual-footer">{lvl.title}</footer>
                  </div>
                  <div className="loo-card-back">
                    <h3>{lvl.title}</h3>
                    <span>
                      <strong>Ex:</strong> {lvl.examples}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bs-section">
        <div className="bs-container">
          <header className="bs-header">
            <h2 id="body-symmetry-title" className="bs-title">
              Body Symmetry
            </h2>
            <div className="bs-underline" aria-hidden="true"></div>
          </header>
          <div className="bs-content-grid">
            {[
              { title: 'Asymmetrical', description: 'The body cannot be divided into two similar parts from any plane or direction.' },
              { title: 'Radial Symmetry', description: 'A plane passing through the central axis divides it into two equal halves.' },
              { title: 'Bilateral Symmetry', description: 'The body can be divided into identical left and right halves in only one plane.' },
            ].map((sym) => (
              <div className="bs-flip-card" key={sym.title}>
                <div className="bs-card-inner">
                  <div className="bs-card-front">
                    <div className="bs-card-label">{sym.title}</div>
                  </div>
                  <div className="bs-card-back">
                    <h3 className="bs-card-title">{sym.title}</h3>
                    <div className="bs-card-body">
                      <p className="bs-text">{sym.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="coelom-section" aria-label="Coelom and Body Cavities">
        <div className="coelom-container">
          <header className="coelom-header">
            <h2 className="coelom-main-title">Coelom (Body Cavity)</h2>
            <div className="coelom-underline"></div>
            <p className="coelom-intro">
              A body cavity arises from the embryonic mesoderm. The mesoderm provides a cellular lining called the{' '}
              <strong>coelomic epithelium</strong> or <strong>peritoneum</strong>.
            </p>
          </header>
          <div className="coelom-grid">
            {[
              { title: 'Triploblastic Acoelomate', description: 'These animals do not contain any space between their body wall and gut.' },
              { title: 'Triploblastic Pseudocoelomate', description: 'These animals have a false body cavity, a fluid-filled space separating the gut from the body wall.' },
              { title: 'Triploblastic Eucoelomate', description: 'These animals have a true coelom lined by mesoderm on both sides.' },
            ].map((c) => (
              <article className="coelom-card" key={c.title}>
                <div className="coelom-content">
                  <h3 className="coelom-card-title">{c.title}</h3>
                  <p className="coelom-text">{c.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="development-note">
        <h2>Evolutionary Note (Explained Simply)</h2>
        <p>Although humans look very different from starfish, we share a common developmental pattern with them.</p>
        <p>
          Both humans and echinoderms are <strong>deuterostomes</strong>, meaning that during early embryonic
          development, the blastopore forms the anus first and the mouth develops later.
        </p>
        <p>
          Because of this similar pattern of development, humans are evolutionarily closer to echinoderms than to
          insects or molluscs, which are <strong>protostomes</strong>.
        </p>
      </section>
    </div>
  );
}

function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      <div className={`w3-sidebar-overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`w3-sidebar ${open ? 'open' : ''}`}>
        <div className="w3-sidebar-progress">
          <div className="w3-progress-label">Exploration Progress</div>
          <div className="w3-progress-track">
            <div
              className="w3-progress-fill"
              style={{ width: `${(active / (sidebar.length - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="w3-progress-text">
            {active === 0 ? 'Basic Features' : active === 1 ? 'Classification History' : `Phylum ${active - 1} of 11`}
          </div>
        </div>
        <ul className="w3-sidebar-list">
          {sidebar.map((item) => (
            <li key={item.id}>
              <button
                className={`w3-sidebar-btn ${item.id <= 1 ? 'w3-sidebar-btn--history' : ''} ${
                  active === item.id ? 'w3-active-side' : ''
                }`}
                onClick={() => setActive(item.id)}
              >
                <span className="w3-sidebar-dot" style={{ background: item.theme }}></span>
                {item.id <= 1 ? item.title : item.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default function KingdomAnimalia() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [active]);

  const renderContent = () => {
    if (active === 0) return <BasicFeatures />;
    if (active === 1) return <VNode node={timeline} />;
    const phylumKey = PHYLUM_ORDER[active - 2];
    return <VNode node={phyla[phylumKey]} />;
  };

  return (
    <div className="w3-layout-wrapper">
      <div className="w3-main-container">
        <Sidebar active={active} setActive={setActive} open={menuOpen} setOpen={setMenuOpen} />
        <main className="w3-content">
          {active === 1 && (
            <div className="timeline-header-section">
              <span className="timeline-site-tag">ZOOLERN.IN</span>
              <h1 className="timeline-main-title">Kingdom Animalia</h1>
              <p className="timeline-subtitle">Classification of Animal Kingdom</p>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
      <button
        className={`zl-mobile-menu-fab ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle Navigation Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}
