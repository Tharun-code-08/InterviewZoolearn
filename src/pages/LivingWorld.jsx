import { useState } from 'react';
import { generatedArt } from '../utils/generatedArt';

const KINGDOMS = [
  {
    id: 'monera',
    title: 'Kingdom Monera',
    label: 'BACTERIA',
    color: '#A8DADC',
    icon: generatedArt('kingdom-monera', 'Kingdom Monera'),
    short: 'Prokaryotic, unicellular organisms',
    characteristics: ['Prokaryotic cells', 'No true nucleus', 'Binary fission', 'Cell wall present', 'Oldest life forms'],
    examples: ['Bacteria', 'Cyanobacteria', 'Archaebacteria'],
  },
  {
    id: 'protista',
    title: 'Kingdom Protista',
    label: 'PROTISTS',
    color: '#F4A261',
    icon: generatedArt('kingdom-protista', 'Kingdom Protista'),
    short: 'Eukaryotic, mostly unicellular',
    characteristics: ['True nucleus', 'Flagella/cilia for movement', 'Autotrophic or heterotrophic', 'Sexual & asexual reproduction'],
    examples: ['Amoeba', 'Paramecium', 'Euglena'],
  },
  {
    id: 'fungi',
    title: 'Kingdom Fungi',
    label: 'FUNGI',
    color: '#B7E4C7',
    icon: generatedArt('kingdom-fungi', 'Kingdom Fungi'),
    short: 'Saprophytic, spore-forming',
    characteristics: ['Cell wall made of chitin', 'Absorptive nutrition', 'No chlorophyll', 'Mostly multicellular'],
    examples: ['Mushrooms', 'Yeast', 'Rhizopus'],
  },
  {
    id: 'plantae',
    title: 'Kingdom Plantae',
    label: 'PLANTS',
    color: '#F9C6D3',
    icon: generatedArt('kingdom-plantae', 'Kingdom Plantae'),
    short: 'Photosynthetic, multicellular',
    characteristics: ['Chloroplast present', 'Cell wall of cellulose', 'Autotrophic', 'Alternation of generations'],
    examples: ['Ferns', 'Gymnosperms', 'Angiosperms'],
  },
  {
    id: 'animalia',
    title: 'Kingdom Animalia',
    label: 'ANIMALS',
    color: '#CDB4DB',
    icon: generatedArt('kingdom-animalia', 'Kingdom Animalia'),
    short: 'Multicellular, ingestive heterotrophs',
    characteristics: ['No cell wall', 'Nervous system developed', 'Sexual reproduction', 'High specialization'],
    examples: ['Insects', 'Birds', 'Mammals (Humans)'],
  },
];

const polarToXY = (cx, cy, r, angleDeg) => {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};
const arcSlicePath = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToXY(cx, cy, r, endAngle);
  const end = polarToXY(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
};
const arcCurvePath = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToXY(cx, cy, r, endAngle);
  const end = polarToXY(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
};

function KingdomCircleChart() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const size = 600;
  const center = size / 2;
  const outerR = size * 0.48;
  const hubR = size * 0.18;
  const labelR = outerR * 0.82;
  const iconR = outerR * 0.55;
  const iconSize = 50;
  const anglePer = 360 / KINGDOMS.length;
  const active = KINGDOMS.find((k) => k.id === selected) || KINGDOMS.find((k) => k.id === hovered);

  return (
    <div className="kc-kingdom-container">
      <div className="kc-chart-wrapper">
        <div className="kc-chart-responsive">
          <svg viewBox={`0 0 ${size} ${size}`} className="kc-chart-svg">
            <defs>
              {KINGDOMS.map((k, i) => (
                <path id={`curve-${k.id}`} d={arcCurvePath(center, center, labelR, i * anglePer, (i + 1) * anglePer)} key={`path-${k.id}`} />
              ))}
            </defs>
            {KINGDOMS.map((k, i) => {
              const start = i * anglePer;
              const end = (i + 1) * anglePer;
              const mid = start + anglePer / 2;
              const isActive = selected === k.id;
              const isHovered = hovered === k.id;
              const dimmed = (selected && !isActive) || (hovered && !isHovered && !selected);
              const iconPos = polarToXY(center, center, iconR, mid);
              return (
                <g
                  className={`kc-slice-group ${isActive ? 'kc-active' : ''} ${dimmed ? 'kc-dimmed' : ''}`}
                  onClick={() => setSelected(isActive ? null : k.id)}
                  onMouseEnter={() => setHovered(k.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer' }}
                  key={k.id}
                >
                  <path
                    className="kc-slice-path"
                    d={arcSlicePath(center, center, outerR, start, end)}
                    fill={k.color}
                    stroke="#ffffff"
                    strokeWidth={isActive ? 6 : 2}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  <text className="kc-slice-label" dy="-10" style={{ fill: '#fff', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase' }}>
                    <textPath href={`#curve-${k.id}`} startOffset="50%" textAnchor="middle">
                      {k.label}
                    </textPath>
                  </text>
                  <image
                    href={k.icon}
                    x={iconPos.x - iconSize / 2}
                    y={iconPos.y - iconSize / 2}
                    height={iconSize}
                    width={iconSize}
                    style={{
                      pointerEvents: 'none',
                      transition: 'transform 0.3s ease',
                      transformOrigin: `${iconPos.x}px ${iconPos.y}px`,
                      transform: isHovered || isActive ? 'scale(1.2)' : 'scale(1)',
                    }}
                  />
                </g>
              );
            })}
            <circle cx={center} cy={center} r={hubR} className="kc-hub-bg" fill="#fff" />
            <text x={center} y={center - 5} textAnchor="middle" className="kc-hub-count" style={{ fontSize: '2rem', fontWeight: 'bold', fill: '#334155' }}>
              {KINGDOMS.length}
            </text>
            <text x={center} y={center + 20} textAnchor="middle" className="kc-hub-label" style={{ fontSize: '0.8rem', fontWeight: '600', fill: '#64748b', letterSpacing: '1px' }}>
              KINGDOMS
            </text>
          </svg>
        </div>
      </div>
      <div className="kc-card-wrapper">
        {active ? (
          <div className="kc-glass-card">
            <div className="kc-card-header">
              <div className="kc-card-bg-icon">
                <img src={active.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.2 }} />
              </div>
              <span className="kc-badge">{selected ? 'Selected' : 'Preview'}</span>
              <h2 className="kc-title" style={{ color: active.color }}>
                {active.title}
              </h2>
              <p className="kc-subtitle">&quot;{active.short}&quot;</p>
            </div>
            <div className="kc-card-body">
              <div className="kc-section-head">Key Characteristics</div>
              <ul className="kc-char-list">
                {active.characteristics.map((c, i) => (
                  <li className="kc-char-item" key={i}>
                    <span className="kc-bullet" style={{ background: active.color }}></span>
                    {c}
                  </li>
                ))}
              </ul>
              <div className="kc-section-head">Common Examples</div>
              <div className="kc-tags-group">
                {active.examples.map((ex, i) => (
                  <span className="kc-tag" style={{ borderLeft: `3px solid ${active.color}` }} key={i}>
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="kc-glass-card kc-empty-box">
            <div className="kc-empty-icon">🖱️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#64748b' }}>Explore Taxonomy</h3>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8' }}>Hover or click a kingdom to see details.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function WhatIsLife() {
  return (
    <div className="lp-zoology-page">
      <section className="lp-content-section">
        <h1 className="lp-main-heading">What is Life?</h1>
        <p>
          The Earth is filled with an unbelievable variety of living organisms — from tiny bacteria to giant blue
          whales. Life exists everywhere: icy mountains, hot deserts, deep oceans, lakes, forests, and even boiling
          hot springs.
        </p>
        <p className="lp-guiding-question">But what makes something alive?</p>
        <p>
          Life is made of a complex, organized system of molecules that constantly perform chemical reactions to
          maintain essential activities such as growth, movement, metabolism, and reproduction.
        </p>
        <p>
          A key feature inside all living cells is <strong>protoplasm</strong> — the jelly-like living material.
          Biologist T.H. Huxley (1863) described it as the &#8220;physical basis of life.&#8221;
        </p>
        <div className="lp-key-concept">
          Life is basically &#8220;organized chemistry&#8221; happening inside protoplasm.
        </div>
      </section>
    </div>
  );
}

function BinomialNomenclature() {
  const [modalOpen, setModalOpen] = useState(false);
  const tigerImg = generatedArt('binomial-nomenclature-tiger', 'Panthera Tigris');
  return (
    <section className="binomial-section">
      <div className="binomial-wrapper">
        <h1 className="binomial-main-heading">Binomial Nomenclature</h1>
        <div className="binomial-intro-highlight">
          <p style={{ margin: 0, color: '#1e3a8a' }}>
            Binomial nomenclature was introduced by <strong>Carolus Linnaeus</strong> (1753–1758). It is a scientific
            system of naming organisms to ensure universal identification.
          </p>
        </div>
        <img src={tigerImg} alt="Tiger Thumbnail" className="binomial-modal-img" onClick={() => setModalOpen(true)} />
        <p>
          Every organism is given <strong>two Latin names</strong>:
        </p>
        <ul className="binomial-custom-list">
          <li>
            <strong>First word:</strong> Genus (Capitalized)
          </li>
          <li>
            <strong>Second word:</strong> Species (lowercase)
          </li>
        </ul>
        <div className="binomial-example-box">
          <span className="binomial-box-label" style={{ color: '#15803d' }}>
            Examples:
          </span>
          <ul className="binomial-custom-list" style={{ marginBottom: 0 }}>
            <li>
              <em>Mangifera indica</em> → Mango
            </li>
            <li>
              <em>Solanum tuberosum</em> → Potato
            </li>
          </ul>
        </div>
        <div className="binomial-work-box">
          <span className="binomial-box-label" style={{ color: '#4338ca' }}>
            Key Works by Linnaeus:
          </span>
          <ul className="binomial-custom-list" style={{ marginBottom: 0 }}>
            <li>
              <strong>Species Plantarum</strong> – 5,900 plant species
            </li>
            <li>
              <strong>Systema Naturae</strong> – 4,326 animal species
            </li>
          </ul>
        </div>
        <div className="binomial-honor-text">
          Hence, Carolus Linnaeus is known as the <br />
          <strong>&#8220;Father of Taxonomy&#8221;</strong>
        </div>
      </div>
      {modalOpen && (
        <div className="binomial-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="binomial-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="binomial-close-btn" onClick={() => setModalOpen(false)}>
              ✕
            </button>
            <img src={tigerImg} alt="Enlarged Tiger" className="binomial-modal-full-img" />
          </div>
        </div>
      )}
    </section>
  );
}

const TAXONOMY_LEVELS = [
  {
    id: 'domain',
    name: 'Domain',
    shortDescription: 'Broadest category of life',
    longDescription: 'The highest taxonomic rank of organisms in the three-domain system. There are three domains: Archaea, Bacteria, and Eukarya.',
    examples: ['Eukarya', 'Bacteria', 'Archaea'],
    keyPoint: 'The broadest classification level, grouping organisms based on fundamental cellular differences.',
    color: '#8b5cf6',
  },
  {
    id: 'kingdom',
    name: 'Kingdom',
    shortDescription: 'Major groups of organisms',
    longDescription: 'The second highest taxonomic rank. Organisms are grouped into kingdoms based on general characteristics like cell structure and nutrition.',
    examples: ['Animalia', 'Plantae', 'Fungi', 'Protista', 'Monera'],
    keyPoint: 'Divides organisms into major groups like animals, plants, and fungi.',
    color: '#ec4899',
  },
  {
    id: 'phylum',
    name: 'Phylum',
    shortDescription: 'Major body plans',
    longDescription: 'Groups organisms based on general body plan or organization. Contains one or more classes.',
    examples: ['Chordata', 'Arthropoda', 'Mollusca', 'Annelida', 'Echinodermata'],
    keyPoint: 'Focuses on fundamental anatomical and developmental characteristics.',
    color: '#3b82f6',
  },
  {
    id: 'class',
    name: 'Class',
    shortDescription: 'Groups within phylum',
    longDescription: 'A taxonomic rank below phylum and above order. Groups together orders of organisms with common characteristics.',
    examples: ['Mammalia', 'Aves', 'Reptilia', 'Amphibia', 'Insecta'],
    keyPoint: 'Further divides phyla into more specific groups with shared traits.',
    color: '#06b6d4',
  },
  {
    id: 'order',
    name: 'Order',
    shortDescription: 'Groups within class',
    longDescription: 'A taxonomic rank below class and above family. Groups together families of organisms with common characteristics.',
    examples: ['Primates', 'Carnivora', 'Rodentia', 'Chiroptera', 'Artiodactyla'],
    keyPoint: 'Organizes classes into groups with similar behavioral and morphological traits.',
    color: '#4ade80',
  },
  {
    id: 'family',
    name: 'Family',
    shortDescription: 'Groups of related genera',
    longDescription: 'A taxonomic rank below order and above genus. Contains one or more genera that share a set of common characteristics.',
    examples: ['Hominidae', 'Felidae', 'Canidae', 'Ursidae', 'Cervidae'],
    keyPoint: 'Groups together genera that share a relatively recent common ancestor.',
    color: '#fbbf24',
  },
  {
    id: 'genus',
    name: 'Genus',
    shortDescription: 'Groups of related species',
    longDescription: 'A taxonomic rank below family and above species. Contains one or more species that are closely related.',
    examples: ['Homo', 'Panthera', 'Canis', 'Ursus', 'Quercus'],
    keyPoint: 'The first part of a scientific name (binomial nomenclature).',
    color: '#f97316',
  },
  {
    id: 'species',
    name: 'Species',
    shortDescription: 'Specific organisms',
    longDescription: 'The basic unit of biological classification. A group of organisms that can interbreed and produce fertile offspring.',
    examples: ['Homo sapiens', 'Panthera leo', 'Canis lupus', 'Ursus arctos', 'Quercus alba'],
    keyPoint: 'The most specific classification level. Uses binomial nomenclature (Genus + species).',
    color: '#ef4444',
  },
];

const MNEMONIC_WORDS = [
  { letter: 'D', rest: 'ear', color: '#8b5cf6' },
  { letter: 'K', rest: 'ing', color: '#ec4899' },
  { letter: 'P', rest: 'hilip', color: '#3b82f6' },
  { letter: 'C', rest: 'ame', color: '#06b6d4' },
  { letter: 'O', rest: 'ver', color: '#4ade80' },
  { letter: 'F', rest: 'or', color: '#fbbf24' },
  { letter: 'G', rest: 'ood', color: '#f97316' },
  { letter: 'S', rest: 'oup', color: '#ef4444' },
];

function TaxonomicHierarchyPyramid() {
  const [active, setActive] = useState('domain');
  const level = TAXONOMY_LEVELS.find((l) => l.id === active);

  return (
    <div className="tp-taxonomy-page">
      <div className="tp-container">
        <header className="tp-page-header">
          <h1 className="tp-page-title">Taxonomic Hierarchy</h1>
          <p className="tp-page-subtitle">Interactive Classification Pyramid</p>
        </header>
        <div className="tp-content-wrapper">
          <div className="tp-pyramid-section">
            <div className="tp-pyramid-wrapper">
              <div className="tp-pyramid-visual">
                {TAXONOMY_LEVELS.map((l, i) => (
                  <div
                    className={`tp-pyramid-tier ${active === l.id ? 'tp-tier-active' : ''}`}
                    onClick={() => setActive(l.id)}
                    style={{ '--tier-color': l.color, '--width-percent': `${100 - i * 9}%`, '--z-index': 10 - i }}
                    key={l.id}
                  >
                    <div className="tp-tier-glass">
                      <span className="tp-tier-name">{l.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="tp-mnemonic-card">
                <div className="tp-mnemonic-header">
                  <span className="tp-mnemonic-icon">💡</span> Remember with Mnemonic
                </div>
                <div className="tp-mnemonic-sentence">
                  {MNEMONIC_WORDS.map((w) => (
                    <span className="tp-m-word" key={w.letter}>
                      <b style={{ color: w.color }}>{w.letter}</b>
                      {w.rest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="tp-detail-section">
            <div className="tp-level-detail-card" style={{ '--accent-color': level.color }}>
              <div className="tp-detail-header">
                <div className="tp-header-content">
                  <span className="tp-level-badge">Level {TAXONOMY_LEVELS.indexOf(level) + 1}</span>
                  <h2 className="tp-level-title">{level.name}</h2>
                  <p className="tp-level-short">{level.shortDescription}</p>
                </div>
                <div className="tp-header-bg-letter">{level.name.charAt(0)}</div>
              </div>
              <div className="tp-detail-body">
                <div className="tp-info-block">
                  <h4 className="tp-info-label">Definition</h4>
                  <p className="tp-info-text">{level.longDescription}</p>
                </div>
                <div className="tp-info-block">
                  <h4 className="tp-info-label">Key Point</h4>
                  <div className="tp-key-point-box">{level.keyPoint}</div>
                </div>
                <div className="tp-info-block">
                  <h4 className="tp-info-label">Common Examples</h4>
                  <div className="tp-tags-container">
                    {level.examples.map((ex, i) => (
                      <span className="tp-example-pill" key={i}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxonomyAndSystematics() {
  return (
    <section className="ts-section">
      <div className="ts-container">
        <header className="ts-header">
          <h2 className="ts-section-title">Taxonomy &amp; Systematics</h2>
        </header>
        <div className="ts-concept-grid">
          <div className="ts-concept-card ts-card-taxonomy">
            <div className="ts-card-icon">
              <img src={generatedArt('taxonomy-icon', 'Taxonomy')} alt="Taxonomy Icon" />
            </div>
            <h3>Taxonomy</h3>
            <p>
              The scientific process of <strong>identifying, naming, and classifying</strong> organisms.
            </p>
          </div>
          <div className="ts-concept-card ts-card-systematics">
            <div className="ts-card-icon">
              <img
                src={generatedArt('systematics-illustration', 'Systematics')}
                alt="Systematics Illustration"
                style={{ filter: 'hue-rotate(260deg)' }}
              />
            </div>
            <h3>Systematics</h3>
            <p>
              Involves classification along with the study of <strong>evolutionary relationships</strong>.
            </p>
          </div>
        </div>
        <div className="ts-aspects-section">
          <p className="ts-purpose-line">Classification helps biologists predict:</p>
          <div className="ts-pill-grid">
            {['Structure', 'Behavior', 'Biochemistry', 'Evolutionary History', 'Similarities & Differences'].map((p, i) => (
              <span className="ts-pill" style={{ '--delay': `${(i + 1) * 0.1}s` }} key={p}>
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="ts-summary-banner">
          <div className="ts-summary-content">
            <span className="ts-highlight-green">Taxonomy</span> tells <em>&#8220;who it is,&#8221;</em> while{' '}
            <span className="ts-highlight-purple">Systematics</span> explains <em>&#8220;how it is related.&#8221;</em>
          </div>
        </div>
      </div>
    </section>
  );
}

function LivingWorldHero() {
  return (
    <section className="lwi-hero">
      <div className="lwi-hero-bg lwi-hero-bg-green"></div>
      <div className="lwi-hero-bg lwi-hero-bg-blue"></div>
      <div className="lwi-hero-container">
        <div className="lwi-hero-content">
          <h1 className="lwi-hero-title">The Living World</h1>
          <p className="lwi-hero-text">
            The living world encompasses all organisms on Earth, from microscopic bacteria to massive blue whales.
            Understanding what makes something<strong> &#8220;living&#8221;</strong> and how we classify this
            incredible diversity is fundamental to the study of biology.
          </p>
          <p className="lwi-hero-text">
            This chapter explores the characteristics of life, biodiversity, and the systematic organization of
            organisms through taxonomy.
          </p>
        </div>
        <div className="lwi-hero-image-wrapper">
          <img src={generatedArt('living-world-hero', 'The Living World')} alt="The Living World Illustration" />
          <div className="lwi-image-decoration"></div>
        </div>
      </div>
    </section>
  );
}

export default function LivingWorld() {
  return (
    <main className="living-world-page">
      <div className="banner-wrapper">
        <LivingWorldHero />
      </div>
      <div className="content-area">
        <section id="learn-section">
          <WhatIsLife />
        </section>
        <section id="circle-section">
          <KingdomCircleChart />
        </section>
        <section id="nomenclature-section">
          <BinomialNomenclature />
        </section>
        <section id="binomial-section">
          <TaxonomyAndSystematics />
        </section>
        <section id="pyramid-section">
          <TaxonomicHierarchyPyramid />
        </section>
      </div>
    </main>
  );
}
