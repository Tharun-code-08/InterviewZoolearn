import { useState } from 'react';
import { Maximize2, ArrowLeft } from 'lucide-react';
import { generatedArt } from '../utils/generatedArt';
import wikiImages from '../data/basicFeaturesWikiImages.json';

/* ---------------- Intro Hero ---------------- */

function IntroHero() {
  return (
    <section className="intro-hero">
      <div className="intro-hero-bg intro-hero-bg-green" />
      <div className="intro-hero-bg intro-hero-bg-blue" />
      <div className="intro-hero-container">
        <div className="intro-hero-content">
          <h1 className="intro-hero-title">Basic Features of Classification</h1>
          <p className="intro-hero-text">
            The kingdom <strong>Animalia</strong> is characterised by<strong> heterotrophic</strong>,
            <strong> eukaryotic</strong>,<strong> multicellular</strong> organisms whose cells
            <strong> lack a cell wall</strong>.
          </p>
          <p className="intro-hero-text">
            All animals are <strong>heterotrophic</strong> and are directly or indirectly dependent on plants for
            food.
          </p>
          <p className="intro-hero-text">
            Nutrition involving the engulfment of whole or part of a plant or animal, in solid or liquid form, is
            called
            <strong> holozoic nutrition</strong>.
          </p>
          <div className="intro-hero-actions" />
        </div>
        <div className="intro-hero-image">
          <img
            alt="Basic Features of Classification"
            src={wikiImages['basic-features-classification'] || generatedArt('basic-features-classification', 'Basic Features of Classification')}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Nutrition ---------------- */

function NutritionSection() {
  const [zoomed, setZoomed] = useState(false);
  const imgSrc = wikiImages['holozoic-nutrition-amoeba'] || generatedArt('holozoic-nutrition-amoeba', 'Holozoic Nutrition Amoeba');
  return (
    <>
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
            <img src={imgSrc} alt="Holozoic nutrition in Amoeba" onClick={() => setZoomed(true)} title="Click to zoom" />
          </div>
        </div>
      </section>
      {zoomed && (
        <div className="nutrition-modal-overlay" onClick={() => setZoomed(false)}>
          <div className="nutrition-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="nutrition-close-btn" onClick={() => setZoomed(false)}>
              ×
            </span>
            <img src={imgSrc} alt="Expanded nutrition diagram" className="nutrition-full-img" />
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- Metazoa ---------------- */

const METAZOA_DATA = {
  title: 'Metazoa',
  description:
    'Metazoa are multicellular, eukaryotic animals that show tissue-level or higher organization and generally exhibit holozoic nutrition.',
  subLabel: 'Sub-kingdoms based on complexity',
  subKingdoms: [
    {
      id: 'parazoa',
      title: 'Parazoa',
      description:
        'Includes primitive organisms like sponges. In this group, cells are loosely aggregated and do not form true tissues or organs.',
    },
    {
      id: 'eumetazoa',
      title: 'Eumetazoa',
      description:
        'Includes all animals other than sponges. Cells are organized into distinct structural and functional units called tissues, organs, and organ systems.',
    },
  ],
};

function Metazoa() {
  return (
    <section className="metazoa-section" aria-labelledby="metazoa-heading">
      <div className="metazoa-container">
        <header className="metazoa-header">
          <h2 id="metazoa-heading" className="metazoa-title">
            {METAZOA_DATA.title}
          </h2>
          <p className="metazoa-description">{METAZOA_DATA.description}</p>
        </header>
        <div className="metazoa-content">
          <h3 className="metazoa-subkingdoms-label">{METAZOA_DATA.subLabel}</h3>
          <div className="metazoa-cards-grid">
            {METAZOA_DATA.subKingdoms.map((sk) => (
              <article className="metazoa-info-card" key={sk.id}>
                <div className="metazoa-card-header">
                  <h4 className="metazoa-card-title">{sk.title}</h4>
                </div>
                <p className="metazoa-card-text">{sk.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Level of Organization ---------------- */

const LOO_DATA = [
  {
    id: 'cellular',
    cardTitle: 'CELLULAR LEVEL',
    cardLabel: 'Loose cell aggregates',
    imageUrl: wikiImages['loo-cellular'] || generatedArt('loo-cellular', 'Cellular Level'),
    alt: 'Diagram of loose cell aggregates',
    description: 'Cells are the basic unit. In this level, cells are arranged as loose aggregates but do not form tissues.',
    examples: ['Porifera (Sponges)'],
  },
  {
    id: 'tissue',
    cardTitle: 'TISSUE LEVEL',
    cardLabel: 'Cells form Tissue',
    imageUrl: wikiImages['loo-tissue'] || generatedArt('loo-tissue', 'Tissue Level'),
    alt: 'Microscopic view of epithelial tissue',
    description: 'Similar cells performing the same function are arranged into tissues, allowing for division of labor.',
    examples: ['Coelenterates', 'Ctenophores'],
  },
  {
    id: 'organ',
    cardTitle: 'ORGAN LEVEL',
    cardLabel: 'Tissues form Organs',
    imageUrl: wikiImages['loo-organ'] || generatedArt('loo-organ', 'Organ Level'),
    alt: 'Diagram of the heart organ',
    description: 'Tissues are grouped together to form organs, which are specialized for specific functions.',
    examples: ['Platyhelminthes'],
  },
  {
    id: 'system',
    cardTitle: 'ORGAN-SYSTEM LEVEL',
    cardLabel: 'Organs form Systems',
    imageUrl: wikiImages['loo-system'] || generatedArt('loo-system', 'Organ System Level'),
    alt: 'Diagram of the digestive system',
    description: 'Organs associate to form functional systems, each concerned with a specific physiological function.',
    examples: ['Aschelminthes', 'Chordates'],
  },
];

function HoverCard({ label, title, imageUrl, alt, description, examples }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <article className={`loo-hover-card ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
      <div className="loo-card-inner">
        <div className="loo-card-front">
          <div className="loo-visual-header">
            <p>{label}</p>
          </div>
          <figure className="loo-visual-figure">
            <img src={imageUrl} alt={alt} className="loo-visual-img" />
          </figure>
          <footer className="loo-visual-footer">{title}</footer>
        </div>
        <div className="loo-card-back">
          <h3>{title}</h3>
          <p>{description}</p>
          <span>
            <strong>Ex:</strong> {examples.join(', ')}
          </span>
        </div>
      </div>
    </article>
  );
}

function LooArrow() {
  return (
    <div className="loo-arrow">
      <svg viewBox="0 0 24 24">
        <path d="M4 12H18M18 12L13 7M18 12L13 17" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function LevelOfOrganization() {
  return (
    <section className="loo-section">
      <div className="loo-container">
        <h2 className="loo-heading">Level of Organization</h2>
        <div className="loo-diagram-row">
          {LOO_DATA.map((item, i) => (
            <div key={item.id} style={{ display: 'contents' }}>
              <HoverCard
                label={item.cardLabel}
                title={item.cardTitle}
                imageUrl={item.imageUrl}
                alt={item.alt}
                description={item.description}
                examples={item.examples}
              />
              {i < LOO_DATA.length - 1 && <LooArrow />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Body Symmetry ---------------- */

const SYMMETRY_DATA = [
  {
    id: 'asym',
    title: 'Asymmetrical',
    img: wikiImages['symmetry-asymmetrical'] || generatedArt('symmetry-asymmetrical', 'Asymmetrical'),
    description: 'The body cannot be divided into two similar parts from any plane or direction.',
    extra: 'Common in sponges.',
  },
  {
    id: 'radial',
    title: 'Radial Symmetry',
    img: wikiImages['symmetry-radial'] || generatedArt('symmetry-radial', 'Radial Symmetry'),
    description: 'A plane passing through the central axis divides it into two equal halves.',
    extra: 'Advantageous for gathering food from all sides.',
  },
  {
    id: 'bilateral',
    title: 'Bilateral Symmetry',
    img: wikiImages['symmetry-bilateral'] || generatedArt('symmetry-bilateral', 'Bilateral Symmetry'),
    description: 'The body can be divided into identical left and right halves in only one plane.',
    extra: 'Leads to cephalization (development of a head).',
  },
];

function BodySymmetry() {
  const [flippedId, setFlippedId] = useState(null);
  return (
    <section className="bs-section">
      <div className="bs-container">
        <header className="bs-header">
          <h2 id="body-symmetry-title" className="bs-title">
            Body Symmetry
          </h2>
          <div className="bs-underline" aria-hidden="true" />
        </header>
        <div className="bs-content-grid">
          {SYMMETRY_DATA.map((item) => (
            <div className="bs-flip-card" key={item.id} onClick={() => setFlippedId(flippedId === item.id ? null : item.id)}>
              <div className={`bs-card-inner ${flippedId === item.id ? 'is-flipped' : ''}`}>
                <div className="bs-card-front">
                  <img src={item.img} alt={item.title} className="bs-card-img" />
                  <div className="bs-card-label">{item.title}</div>
                </div>
                <div className="bs-card-back">
                  <h3 className="bs-card-title">{item.title}</h3>
                  <div className="bs-card-body">
                    <p className="bs-text">{item.description}</p>
                    {item.extra && (
                      <div className="bs-extra-info">
                        <strong>Significance:</strong> {item.extra}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Germ Layers ---------------- */

const LAYER_INFO = {
  Ectoderm: { color: '#93c5fd', role: 'Forms epidermis and nervous tissue' },
  Mesoderm: { color: '#fca5a5', role: 'Forms skeletal, muscular, connective tissue, and coelom' },
  Endoderm: { color: '#fcd34d', role: 'Forms vital organs and their linings' },
  Mesoglea: { color: '#e9d5ff', role: 'Undifferentiated jelly-like layer between Ectoderm and Endoderm' },
  Cavity: { color: '#fff', role: 'Digestive Cavity (Gut)' },
};

function LayerCircle({ r, className, name, setHovered, onClick }) {
  return (
    <circle
      r={r}
      className={`gl-layer ${className}`}
      onMouseEnter={() => setHovered(name)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => onClick(name)}
    />
  );
}

function CellDots({ r, count }) {
  return Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return <circle key={i} cx={r * Math.cos(angle)} cy={r * Math.sin(angle)} r={2.5} className="gl-cell-dot" />;
  });
}

function Annotation({ cx, cy, angle, innerR, outerR, label, side, onHover, visible }) {
  const rad = (angle * Math.PI) / 180;
  const midR = innerR + (outerR - innerR) / 2;
  const px = cx + midR * Math.cos(rad);
  const py = cy + midR * Math.sin(rad);
  const lineLen = 140;
  const lx = cx + lineLen * Math.cos(rad);
  const ly = cy + lineLen * Math.sin(rad);
  const gap = 40;
  const tx = side === 'right' ? lx + gap : lx - gap;
  const ty = ly;
  return (
    <g className={`gl-annotation-group ${visible ? 'gl-visible' : ''}`} onMouseEnter={() => onHover(label)} onMouseLeave={() => onHover(null)}>
      <polyline points={`${px},${py} ${lx},${ly} ${tx},${ty}`} className="gl-annotation-line" />
      <circle cx={px} cy={py} r="3" className="gl-annotation-dot" />
      <text x={side === 'right' ? tx + 8 : tx - 8} y={ty} textAnchor={side === 'right' ? 'start' : 'end'} className="gl-annotation-text">
        {label}
      </text>
    </g>
  );
}

function GermLayers() {
  const [mode, setMode] = useState('Triploblastic');
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const isTriploblastic = mode === 'Triploblastic';
  const middleLayer = isTriploblastic ? 'Mesoderm' : 'Mesoglea';
  const isVisible = (name) => showAll || hovered === name || selected === name;
  const activeName = hovered || selected;
  const infoTitle = activeName || `${mode} Organization`;
  const infoDesc = activeName
    ? LAYER_INFO[activeName]?.role
    : isTriploblastic
    ? ''
    : '';

  const toggleSelect = (name) => setSelected((s) => (s === name ? null : name));

  return (
    <div className="gl-germ-section">
      <div className="gl-germ-container">
        <div className="gl-germ-definitions-area">
          <div className="gl-def-card gl-main-def">
            <h3 className="gl-def-title">Germ Layers Overview</h3>
            <p className="gl-def-intro">Germ layers arise during embryo formation and differentiate into specific tissues:</p>
            <ul className="gl-def-list">
              <li>
                <span className="gl-dot gl-ecto" />
                <strong>Ectoderm:</strong> Forms epidermis and nervous tissue.
              </li>
              <li>
                <span className="gl-dot gl-meso" />
                <strong>Mesoderm:</strong> Forms skeletal, muscular, connective tissue, and coelom.
              </li>
              <li>
                <span className="gl-dot gl-endo" />
                <strong>Endoderm:</strong> Forms vital organs and their linings.
              </li>
            </ul>
          </div>
          <div className="gl-def-card gl-type-def">
            <h3 className="gl-def-title">Classification by Layers</h3>
            <div className="gl-type-block">
              <h4 className="gl-type-name gl-diplo">Diploblastic Animals</h4>
              <p>
                The gastrula has <strong>two layers</strong>: external ectoderm and internal endoderm, with an
                undifferentiated jelly-like layer (<strong>mesoglea</strong>) between them.
              </p>
            </div>
            <div className="gl-separator" />
            <div className="gl-type-block">
              <h4 className="gl-type-name gl-triplo">Triploblastic Animals</h4>
              <p>
                The gastrula has <strong>three germ layers</strong>: ectoderm, mesoderm, and endoderm.
              </p>
            </div>
          </div>
        </div>

        <div className="gl-germ-visual-area">
          <div className="gl-header" />
          <div className="gl-controls-row">
            <div className="gl-toggle-container">
              <button
                className={`gl-toggle-btn ${!isTriploblastic ? 'gl-active' : ''}`}
                onClick={() => {
                  setMode('Diploblastic');
                  setSelected(null);
                }}
              >
                Diploblastic
              </button>
              <button
                className={`gl-toggle-btn ${isTriploblastic ? 'gl-active' : ''}`}
                onClick={() => {
                  setMode('Triploblastic');
                  setSelected(null);
                }}
              >
                Triploblastic
              </button>
            </div>
            <button className={`gl-show-all-btn ${showAll ? 'gl-active' : ''}`} onClick={() => setShowAll((s) => !s)}>
              {showAll ? 'Hide Labels' : 'Show Labels'}
            </button>
          </div>
          <div className="gl-diagram-card">
            <svg viewBox="0 0 500 350" className="gl-germ-svg">
              <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" style={{ stopColor: 'rgb(255,255,255)', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgb(0,0,0)', stopOpacity: 0.1 }} />
                </radialGradient>
              </defs>
              <g transform="translate(250, 175)">
                <LayerCircle r={120} className={`gl-ectoderm ${selected === 'Ectoderm' ? 'gl-selected-layer' : ''}`} name="Ectoderm" setHovered={setHovered} onClick={toggleSelect} />
                <CellDots r={112} count={28} />
                <LayerCircle
                  r={85}
                  className={`${isTriploblastic ? 'gl-mesoderm' : 'gl-mesoglea'} ${selected === middleLayer ? 'gl-selected-layer' : ''}`}
                  name={middleLayer}
                  setHovered={setHovered}
                  onClick={toggleSelect}
                />
                {isTriploblastic && <CellDots r={75} count={20} />}
                <LayerCircle r={55} className={`gl-endoderm ${selected === 'Endoderm' ? 'gl-selected-layer' : ''}`} name="Endoderm" setHovered={setHovered} onClick={toggleSelect} />
                <CellDots r={48} count={12} />
                <circle cx="0" cy="0" r="25" className="gl-cavity" />
                <text x="0" y="5" textAnchor="middle" fontSize="10" fill="#999" style={{ pointerEvents: 'none' }}>
                  GUT
                </text>
                <circle cx="0" cy="0" r="120" fill="url(#grad1)" pointerEvents="none" />
              </g>
              <Annotation cx={250} cy={175} angle={-45} innerR={90} outerR={120} label="Ectoderm" side="right" onHover={setHovered} visible={isVisible('Ectoderm')} />
              <Annotation cx={250} cy={175} angle={10} innerR={60} outerR={85} label={middleLayer} side="right" onHover={setHovered} visible={isVisible(middleLayer)} />
              <Annotation cx={250} cy={175} angle={190} innerR={30} outerR={55} label="Endoderm" side="left" onHover={setHovered} visible={isVisible('Endoderm')} />
            </svg>
            <div className="gl-info-panel">
              <div className="gl-info-title" style={{ color: LAYER_INFO[activeName]?.color || '#333' }}>
                {infoTitle}
              </div>
              <div className="gl-info-desc">{infoDesc}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Coelom ---------------- */

const COELOM_FALLBACK_IMG = wikiImages['coelom-fallback'] || generatedArt('coelom-fallback', 'Coelom Types');

const COELOM_TYPES = [
  {
    id: 'acoelomate',
    title: 'Triploblastic Acoelomate',
    description: 'These animals do not contain any space between their body wall and gut.',
    image: wikiImages['coelom-acoelomate'] || generatedArt('coelom-acoelomate', 'Triploblastic Acoelomate'),
  },
  {
    id: 'pseudo',
    title: 'Triploblastic Pseudocoelomate',
    description: 'These animals have a false body cavity, a fluid-filled space separating the gut from the body wall.',
    image: wikiImages['coelom-pseudo'] || generatedArt('coelom-pseudo', 'Triploblastic Pseudocoelomate'),
  },
  {
    id: 'eucoelomate',
    title: 'Triploblastic Eucoelomate',
    description: 'These animals have a true coelom lined by mesoderm on both sides.',
    image: wikiImages['coelom-eucoelomate'] || generatedArt('coelom-eucoelomate', 'Triploblastic Eucoelomate'),
  },
];

const COELOM_FORMATIONS = [
  {
    id: 'schizo',
    title: 'Schizocoelom',
    summary: 'Forms by Splitting of Mesoderm',
    image: wikiImages['coelom-schizo'] || generatedArt('coelom-schizo', 'Schizocoelom'),
    points: [
      'In some animals, the middle embryonic layer (mesoderm) first appears as a solid mass.',
      'Later, this solid mesoderm splits from the inside, creating an empty space.',
      'This space becomes the body cavity, called a schizocoelom.',
    ],
    extraNote: {
      title: 'Haemocoel',
      text: 'In animals like arthropods (insects, crabs) and many molluscs, this body cavity is mostly filled with blood. Such a blood-filled cavity is called a haemocoel, and organs float in it.',
    },
  },
  {
    id: 'entero',
    title: 'Enterocoelom',
    summary: 'Forms from Gut Pouches',
    image: wikiImages['coelom-entero'] || generatedArt('coelom-entero', 'Enterocoelom'),
    points: [
      'In some other animals, the body cavity forms in a different and more organized way.',
      'During early development, the primitive gut (archenteron) forms small outward bulges or pouches.',
      'These pouches separate from the gut and develop into the mesoderm, enclosing a space inside.',
      'This space becomes a true coelom, called an enterocoelom, and it is completely lined by mesoderm.',
    ],
    extraNote: null,
  },
];

function CoelomCard({ title, description, image }) {
  return (
    <article className="coelom-card">
      <div className="coelom-visual-box">
        <img src={image || COELOM_FALLBACK_IMG} alt={title} className="coelom-img" onError={(e) => { e.target.src = COELOM_FALLBACK_IMG; }} />
      </div>
      <div className="coelom-content">
        <h3 className="coelom-card-title">{title}</h3>
        <p className="coelom-text">{description}</p>
      </div>
    </article>
  );
}

function FormationCard({ title, summary, image, points, extraNote }) {
  return (
    <article className="coelom-formation-card">
      <div className="coelom-formation-header">
        <h3 className="coelom-formation-title">{title}</h3>
        <span className="coelom-formation-badge">{summary}</span>
      </div>
      <div className="coelom-formation-body">
        <div className="coelom-formation-visual">
          <figure className="coelom-formation-figure">
            <img src={image || COELOM_FALLBACK_IMG} alt={title} className="coelom-formation-img" onError={(e) => { e.target.src = COELOM_FALLBACK_IMG; }} />
          </figure>
        </div>
        <div className="coelom-formation-details">
          <ol className="coelom-formation-steps">
            {points.map((p, i) => (
              <li className="coelom-step-item" key={i}>
                <span className="coelom-step-text">{p}</span>
              </li>
            ))}
          </ol>
          {extraNote && (
            <div className="coelom-formation-note">
              <div className="coelom-note-icon">💡</div>
              <div className="coelom-note-content">
                <strong>{extraNote.title}:</strong> {extraNote.text}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Coelom() {
  return (
    <section className="coelom-section" aria-label="Coelom and Body Cavities">
      <div className="coelom-container">
        <header className="coelom-header">
          <h2 className="coelom-main-title">Coelom (Body Cavity)</h2>
          <div className="coelom-underline" />
          <p className="coelom-intro">
            A body cavity arises from the embryonic mesoderm. The mesoderm provides a cellular lining called the{' '}
            <strong>coelomic epithelium</strong> or <strong>peritoneum</strong>.
          </p>
        </header>
        <div className="coelom-grid">
          {COELOM_TYPES.map((c) => (
            <CoelomCard key={c.id} title={c.title} description={c.description} image={c.image} />
          ))}
        </div>
        <div className="coelom-formation-section">
          <div className="coelom-formation-divider">
            <span>Formation Mechanisms</span>
          </div>
          <div className="coelom-formation-grid">
            {COELOM_FORMATIONS.map((f) => (
              <FormationCard key={f.id} title={f.title} summary={f.summary} image={f.image} points={f.points} extraNote={f.extraNote} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Body Plans ---------------- */

const BODY_PLANS = [
  {
    id: 1,
    title: 'Cell Aggregate Body Plan',
    description: 'Organism made up of loosely arranged cells with no proper coordination',
    features: ['Each cell works independently', 'No tissues or organs formed', 'Very simple body functions'],
    example: 'Sponges',
    color: '#3498db',
    complexity: 'Low',
    diagram: 'cells',
  },
  {
    id: 2,
    title: 'Blind Sac Body Plan',
    description: 'Incomplete digestive system with a single opening',
    features: [
      'One opening acts as both mouth and anus',
      'Food enters and waste leaves through same opening',
      'Digestion in sac-like cavity',
    ],
    example: 'Coelenterates, Platyhelminthes',
    color: '#2ecc71',
    complexity: 'Medium',
    diagram: 'sac',
  },
  {
    id: 3,
    title: 'Tube-Within-a-Tube Body Plan',
    description: 'Complete digestive system with separate openings',
    features: ['Outer tube = body wall', 'Inner tube = digestive tract', 'Mouth and anus are separate'],
    example: 'Annelida, Arthropoda, Mollusca, Echinodermata, Chordata',
    color: '#e74c3c',
    complexity: 'High',
    diagram: 'tube',
  },
];

function BodyPlans() {
  return (
    <div className="bodyplans-body-plans-page">
      <section className="bodyplans-bodyplans-section">
        <div className="bodyplans-section-header">
          <h2 className="bodyplans-section-title">Body Plans</h2>
          <p className="bodyplans-section-subtitle">Understanding the complexity of animal body organization</p>
        </div>
        <div className="bodyplans-bodyplans-gallery">
          {BODY_PLANS.map((plan) => (
            <div className="bodyplans-bodyplan-card" key={plan.id}>
              <div className="bodyplans-card-glow" style={{ background: plan.color }} />
              <div className="bodyplans-card-header" style={{ background: plan.color }}>
                <div className="bodyplans-plan-icon" />
                <h3 className="bodyplans-plan-title">{plan.title}</h3>
                <div className="bodyplans-complexity-tag">
                  <span className="bodyplans-complexity-dot" />
                  {plan.complexity} Complexity
                </div>
              </div>
              <div className="bodyplans-card-body">
                <p className="bodyplans-plan-description">{plan.description}</p>
                <div className={`bodyplans-diagram bodyplans-diagram-${plan.diagram}`}>
                  {plan.diagram === 'cells' && (
                    <div className="bodyplans-cells-diagram">
                      {[...Array(12)].map((_, i) => (
                        <div className="bodyplans-cell" style={{ animationDelay: `${i * 0.1}s` }} key={i} />
                      ))}
                    </div>
                  )}
                  {plan.diagram === 'sac' && (
                    <div className="bodyplans-sac-diagram">
                      <div className="bodyplans-sac-opening">⭕</div>
                      <div className="bodyplans-sac-cavity" />
                    </div>
                  )}
                  {plan.diagram === 'tube' && (
                    <div className="bodyplans-tube-diagram">
                      <div className="bodyplans-outer-tube" />
                      <div className="bodyplans-inner-tube" />
                      <div className="bodyplans-mouth-label">Mouth</div>
                      <div className="bodyplans-anus-label">Anus</div>
                    </div>
                  )}
                </div>
                <div className="bodyplans-features-list">
                  <h4 className="bodyplans-features-title">Key Features:</h4>
                  <ul>
                    {plan.features.map((f, i) => (
                      <li className="bodyplans-feature-item" key={i}>
                        <span className="bodyplans-feature-marker">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bodyplans-example-box">
                  <span className="bodyplans-example-label">Examples:</span>
                  <span className="bodyplans-example-text">{plan.example}</span>
                </div>
              </div>
              <div className="bodyplans-card-footer">
                <span className="bodyplans-plan-number">0{plan.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- Protostome / Deuterostome ---------------- */

function ProtoDeuterostome() {
  return (
    <div className="proto-comparison-wrapper">
      <div className="proto-header-row proto-slide-in">
        <div className="proto-header-col proto-header-protostome">
          <h2>PROTOSTOMOUS</h2>
          <p>(proto: first; stomium: mouth)</p>
        </div>
        <div className="proto-header-col proto-header-deuterostome">
          <h2>DEUTEROSTOMOUS</h2>
          <p>(deuteron: second; stomium: mouth)</p>
        </div>
      </div>

      <div className="proto-content-row proto-slide-in proto-delay-1">
        <div className="proto-row-content proto-bg-protostome proto-hover-card" data-label="PROTOSTOME">
          <div className="proto-info-box">
            In protostomous animals, the first opening formed in the embryo (blastopore) becomes the <strong>mouth</strong>.
            The anus forms later at another place.
          </div>
          <div className="proto-info-box">
            Simple to moderately complex body organization. Mostly belong to one major evolutionary line.
          </div>
          <div className="proto-info-box proto-highlight-text">👉 Blastopore → Mouth first</div>
        </div>
        <div className="proto-row-content proto-bg-deuterostome proto-hover-card" data-label="DEUTEROSTOME">
          <div className="proto-info-box">
            In deuterostomous animals, the blastopore develops into the<strong> anus</strong>. The mouth forms later on
            the opposite side.
          </div>
          <div className="proto-info-box">More advanced animals with complex body organization and internal skeletons.</div>
          <div className="proto-info-box proto-highlight-text">👉 Blastopore → Anus first</div>
        </div>
      </div>

      <div className="proto-content-row proto-slide-in proto-delay-2">
        <div className="proto-row-content proto-bg-protostome proto-hover-card">
          <div className="proto-badge-pill">(a) CLEAVAGE</div>
          <div className="proto-visual-frame">
            <div
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('${wikiImages['proto-cleavage-protostome'] || generatedArt('proto-cleavage-protostome', 'Spiral cleavage in protostomes')}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              title="Spiral cleavage in protostomes"
            />
          </div>
          <span className="proto-stage-title">Eight-cell stage</span>
          <p className="proto-row-desc">Spiral and determinate cleavage</p>
        </div>
        <div className="proto-row-content proto-bg-deuterostome proto-hover-card">
          <div className="proto-badge-pill">(a) CLEAVAGE</div>
          <div className="proto-visual-frame">
            <div
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('${wikiImages['proto-cleavage-deuterostome'] || generatedArt('proto-cleavage-deuterostome', 'Radial cleavage in deuterostomes')}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              title="Radial cleavage in deuterostomes"
            />
          </div>
          <span className="proto-stage-title">Eight-cell stage</span>
          <p className="proto-row-desc">Radial and indeterminate cleavage</p>
        </div>
      </div>

      <div className="proto-content-row proto-slide-in proto-delay-3">
        <div className="proto-row-content proto-bg-protostome proto-hover-card proto-pulse-anim">
          <div className="proto-badge-pill">(b) COELOM FORMATION</div>
          <div className="proto-visual-frame">
            <div
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('${wikiImages['proto-coelom-schizocoelous'] || generatedArt('proto-coelom-schizocoelous', 'Schizocoelous coelom formation')}')`,
                backgroundColor: '#ffffff',
              }}
              title="Schizocoelous coelom formation"
            />
          </div>
          <div className="proto-info-box">
            <strong>SCHIZOCOELOUS FORMATION</strong>
            Solid masses of mesoderm split to form the coelom cavity.
          </div>
        </div>
        <div className="proto-row-content proto-bg-deuterostome proto-hover-card proto-pulse-anim">
          <div className="proto-badge-pill">(b) COELOM FORMATION</div>
          <div className="proto-visual-frame">
            <div
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('${wikiImages['proto-coelom-enterocoelous'] || generatedArt('proto-coelom-enterocoelous', 'Enterocoelous coelom formation')}')`,
                backgroundColor: '#ffffff',
              }}
              title="Enterocoelous coelom formation"
            />
          </div>
          <div className="proto-info-box">
            <strong>ENTEROCOELOUS FORMATION</strong>
            Folds of the archenteron form the coelom cavity.
          </div>
        </div>
      </div>

      <div className="proto-content-row proto-slide-in proto-delay-3">
        <div className="proto-row-content proto-bg-protostome proto-hover-card">
          <div className="proto-badge-pill">(c) FATE OF BLASTOPORE</div>
          <div className="proto-visual-frame">
            <div
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('${wikiImages['proto-blastopore-protostome'] || generatedArt('proto-blastopore-protostome', 'Protostome development process')}')`,
                backgroundColor: '#f0f7fa',
              }}
              title="Protostome development process"
            />
          </div>
          <p className="proto-row-desc">Mouth develops from blastopore</p>
          <p className="proto-row-desc">Digestive tube → Anus forms secondarily</p>
        </div>
        <div className="proto-row-content proto-bg-deuterostome proto-hover-card">
          <div className="proto-badge-pill">(c) FATE OF BLASTOPORE</div>
          <div className="proto-visual-frame">
            <div
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('${wikiImages['proto-blastopore-deuterostome'] || generatedArt('proto-blastopore-deuterostome', 'Deuterostome development process')}')`,
                backgroundColor: '#f1f8e9',
              }}
              title="Deuterostome development process"
            />
          </div>
          <p className="proto-row-desc">Anus develops from blastopore</p>
          <p className="proto-row-desc">Digestive tube → Mouth forms secondarily</p>
        </div>
      </div>

      <div className="proto-content-row proto-slide-in proto-delay-3 proto-compact-examples">
        <div className="proto-row-content proto-bg-protostome proto-hover-card">
          <div className="proto-info-box">
            <strong>PROTOSTOME EXAMPLES</strong>
            Flatworms, Roundworms, Annelids, Arthropods, Molluscs
          </div>
        </div>
        <div className="proto-row-content proto-bg-deuterostome proto-hover-card">
          <div className="proto-info-box">
            <strong>DEUTEROSTOME EXAMPLES</strong>
            Echinoderms, Hemichordates, Chordates (including vertebrates)
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Development Note ---------------- */

function DevelopmentNote() {
  return (
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
  );
}

/* ---------------- Taxonomy Tree ---------------- */

const TAXONOMY_TREE = {
  id: 'animalia',
  label: 'Animalia (K)',
  children: [
    { id: 'parazoa', label: 'Parazoa (SK)', children: [{ id: 'porifera', label: 'Porifera (P)' }] },
    {
      id: 'eumetazoa',
      label: 'Eumetazoa (SK)',
      children: [
        {
          id: 'radial',
          label: 'Radial',
          children: [
            { id: 'coelenterata', label: 'Coelenterata (P)' },
            { id: 'ctenophora', label: 'Ctenophora (P)' },
          ],
        },
        {
          id: 'bilateral',
          label: 'Bilateral',
          children: [
            { id: 'acoelomates', label: 'Acoelomates', children: [{ id: 'platyhelminthes', label: 'Platyhelminthes (P)' }] },
            { id: 'pseudocoelomates', label: 'Pseudocoelomates', children: [{ id: 'aschelminthes', label: 'Aschelminthes (P)' }] },
            {
              id: 'coelomates',
              label: 'Coelomates',
              children: [
                { id: 'annelida', label: 'Annelida (P)' },
                { id: 'arthropoda', label: 'Arthropoda (P)' },
                { id: 'mollusca', label: 'Mollusca (P)' },
                { id: 'echinodermata', label: 'Echinodermata (P)' },
                { id: 'hemichordata', label: 'Hemichordata (P)' },
                { id: 'chordata', label: 'Chordata (P)' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function TreeNode({ node, depth }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  return (
    <li style={{ margin: '6px 0' }}>
      <span
        onClick={() => hasChildren && setOpen((o) => !o)}
        style={{
          display: 'inline-block',
          padding: '8px 14px',
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 600,
          cursor: hasChildren ? 'pointer' : 'default',
          color: '#000',
          background: !hasChildren ? '#ffd54f' : '#64b5f6',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          userSelect: 'none',
        }}
      >
        {hasChildren ? (open ? '▼ ' : '▶ ') : '● '}
        {node.label}
      </span>
      {hasChildren && open && (
        <ul style={{ listStyle: 'none', paddingLeft: 28, borderLeft: '1px dashed #555', marginTop: 6 }}>
          {node.children.map((child) => (
            <TreeNode node={child} depth={depth + 1} key={child.id} />
          ))}
        </ul>
      )}
    </li>
  );
}

function TaxonomyTree() {
  return (
    <div style={{ background: '#121212', borderRadius: 12, padding: '1.5rem', color: '#e0e0e0', overflowX: 'auto' }}>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <TreeNode node={TAXONOMY_TREE} depth={0} />
      </ul>
    </div>
  );
}

function Taxonomy() {
  const [fullscreen, setFullscreen] = useState(false);
  return (
    <>
      <section className="taxonomy-session">
        <h2 className="taxonomy-session-title">
          Animal Classification <span>– Evolutionary Framework</span>
        </h2>
        <p className="taxonomy-session-desc">
          The animal kingdom (<strong>Animalia</strong>) is scientifically classified based on tissue organization,
          body plans, and evolutionary relationships. This framework helps us understand how diverse animal groups are
          connected through evolution.
        </p>
        <div className="taxonomy-tree-box">
          <div className="taxonomy-overlay-controls">
            <button className="taxonomy-open-btn" onClick={() => setFullscreen(true)}>
              <Maximize2 size={16} /> Open Interactive View
            </button>
          </div>
          <div className="taxonomy-static-wrapper">
            <TaxonomyTree />
          </div>
        </div>
      </section>
      {fullscreen && (
        <div className="taxonomy-fullscreen-wrapper">
          <header className="taxonomy-fullscreen-header">
            <button className="taxonomy-back-btn" onClick={() => setFullscreen(false)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={16} /> Back to Page
            </button>
            <span className="taxonomy-fullscreen-title">Evolutionary Framework</span>
          </header>
          <div className="taxonomy-fullscreen-content">
            <TaxonomyTree />
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- Page ---------------- */

export default function BasicFeatures() {
  return (
    <main className="basic-features-page">
      <div className="basic-features-container">
        <IntroHero />
        <NutritionSection />
        <Metazoa />
        <section id="levels-section">
          <LevelOfOrganization />
        </section>
        <section id="symmetry-section">
          <BodySymmetry />
        </section>
        <section id="germ-section">
          <GermLayers />
        </section>
        <section id="coelom-section">
          <Coelom />
        </section>
        <BodyPlans />
        <ProtoDeuterostome />
        <DevelopmentNote />
        <section id="taxonomy-section">
          <Taxonomy />
        </section>
      </div>
    </main>
  );
}
