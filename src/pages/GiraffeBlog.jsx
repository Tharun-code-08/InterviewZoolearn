import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Compass,
  Sparkles,
  Repeat,
  Layers,
  Tag,
  GitBranch,
  Menu,
  ArrowUp,
} from 'lucide-react';
import { generatedArt } from '../utils/generatedArt';
import wikiImages from '../data/blogWikiImages.json';

const NAV_ITEMS = [
  { id: 'giraffe-day', label: 'World Giraffe Day', icon: <Compass size={18} /> },
  { id: 'meet-giraffe', label: 'Meet the Giraffe', icon: <BookOpen size={18} /> },
  { id: 'adaptations', label: 'Biological Marvels', icon: <Sparkles size={18} /> },
  { id: 'coat-patterns', label: 'Spot Patterns', icon: <Tag size={18} /> },
  { id: 'neck-science', label: 'Science of the Neck', icon: <GitBranch size={18} /> },
  { id: 'transformation', label: 'Interactive Transformation', icon: <Repeat size={18} /> },
  { id: 'taxonomy', label: 'Taxonomy (2025)', icon: <Tag size={18} /> },
  { id: 'diversity', label: 'Living Diversity', icon: <Layers size={18} /> },
  { id: 'ancestry', label: '24-Million-Year Ancestry', icon: <GitBranch size={18} /> },
  { id: 'timeline', label: 'Evolution Timeline', icon: <Repeat size={18} /> },
];

const ANCESTRY = [
  {
    year: '25 - 20 Mya',
    name: 'Palaeomerycidae (Ancestral Family)',
    description:
      'The base family from which all giraffids arose. They lived across Europe, Asia, and Africa, sharing the landscape with the ancestors of modern pronghorns. This is the earliest ancestor, arising from the gelocid ancestral assemblage.',
    img: wikiImages['ancestry-palaeomerycidae'] || generatedArt('ancestry-palaeomerycidae', 'Palaeomerycidae'),
  },
  {
    year: '16 Mya',
    name: 'Canthumeryx (The First Giraffid)',
    description:
      'The earliest known true member of the giraffe family. Fossil evidence from Libya and Kenya shows the very first signs of neck vertebrae elongating compared to their width.',
    img: wikiImages['ancestry-canthumeryx'] || generatedArt('ancestry-canthumeryx', 'Canthumeryx'),
  },
  {
    year: '12 Mya',
    name: 'Giraffokeryx (The Short-Neck Branch)',
    description:
      'An intermediate offshoot that thrived on low vegetation in Eurasia. This branch represents lineages that reverted to short necks to graze on low shrubs.',
    img: wikiImages['ancestry-giraffokeryx'] || generatedArt('ancestry-giraffokeryx', 'Giraffokeryx'),
  },
  {
    year: '7 - 3 Mya',
    name: 'Samotherium (The Transitional Link)',
    description:
      "A crucial transitional form with a neck roughly 1 meter long (half that of a modern giraffe). This species underwent the very first 'elongation boost' — the cranial end of the C3 vertebra stretched out.",
    img: wikiImages['ancestry-samotherium'] || generatedArt('ancestry-samotherium', 'Samotherium'),
  },
  {
    year: '7 - 9 Mya',
    name: 'Bohlinia (The Direct Ancestor)',
    description:
      'The terminal ancestor before modern giraffes. Roughly the same size as modern giraffes, their progeny migrated from Eurasia into Africa via Ethiopia.',
    img: wikiImages['ancestry-bohlinia'] || generatedArt('ancestry-bohlinia', 'Bohlinia'),
  },
  {
    year: '1 Mya',
    name: 'Giraffa camelopardalis (The Modern Era)',
    description:
      'The first fossils of the fully modern, completely long-necked giraffe appear in East Africa, marking the completion of the second elongation boost — the caudal end of the vertebrae lengthened.',
    img: wikiImages['ancestry-modern-giraffe'] || generatedArt('ancestry-modern-giraffe', 'Giraffa camelopardalis'),
  },
];

const CHRONOLOGY = [
  { period: '20–25 Mya', ancestor: 'Palaeomerycidae (family)', characteristics: 'First ancestor; arose from gelocid ancestral assemblage' },
  { period: '16–20 Mya', ancestor: 'Canthumeryx', characteristics: 'Primitive giraffid, slightly elongated neck bones, long tongue' },
  { period: '20–2 Mya', ancestor: 'Paleotragus', characteristics: 'Short-necked, complete skin-covered horns' },
  { period: '12 Mya', ancestor: 'Giraffokeryx', characteristics: 'Short-necked, thrived on low vegetation (India/Eurasia)' },
  { period: '7–3 Mya', ancestor: 'Samotherium', characteristics: 'Short-necked transitional giraffe; Eurasia & Africa (Miocene–Pliocene)' },
  { period: '7–5 Mya', ancestor: 'Bohlinia', characteristics: 'Terminal Climacoceratid genus; progeny entered China & India' },
  { period: '~7.5 Mya', ancestor: 'True long-necked giraffes', characteristics: 'First appearance of extended necks' },
  { period: '7 Mya', ancestor: 'Giraffa enters Africa', characteristics: 'Via Ethiopia; radiated into multiple species' },
  { period: '4 Mya', ancestor: 'Giraffa extinction in Asia', characteristics: 'Climate change caused Asian counterparts to die off' },
  { period: '2 Mya', ancestor: 'Neck elongation advances', characteristics: 'Lineage further elongated neck vertebrae, enhancing reach' },
  { period: '1 Mya', ancestor: 'G. camelopardalis appears', characteristics: 'First fossils of modern giraffe in East Africa' },
  { period: 'Present', ancestor: '4 species (Masai, Northern, Reticulated, Southern)', characteristics: '5 subspecies; ~140,000 total remaining' },
];

const EPOCHS = [
  { stage: 'Palaeomerycidae to Canthumeryx', time: '25 → 16 Mya', duration: '9 Million Years', icon: '🌲' },
  { stage: 'Canthumeryx to Giraffokeryx', time: '16 → 12 Mya', duration: '4 Million Years', icon: '🌿' },
  { stage: 'Giraffokeryx to Bohlinia', time: '12 → 7 Mya', duration: '5 Million Years', icon: '🌳' },
  { stage: 'Bohlinia to Modern', time: '7 → 1 Mya', duration: '6 Million Years', icon: '🦒' },
];

const ADAPTATIONS = [
  {
    id: 'neck',
    icon: '🦒',
    title: 'The Extraordinary Neck',
    subtitle: '2.4 m long',
    points: ['Same 7 vertebrae as humans', 'Each bone over 25 cm long', 'Rivals any other herbivore for food access', "Used as a weapon in 'necking' combat"],
    color: '#b45309',
  },
  {
    id: 'heart',
    icon: '❤️',
    title: 'The 11 kg Heart',
    subtitle: '11 kg weight',
    points: ['Twice human blood pressure', 'Pumps blood nearly 2 m upward', '60 cm in diameter', 'Beats ~65 times per minute'],
    color: '#dc2626',
  },
  {
    id: 'tongue',
    icon: '👅',
    title: 'The 50 cm Tongue',
    subtitle: '50 cm length',
    points: ['Dark blue-black pigmentation', 'Blocks UV radiation in open sun', 'Wraps around thorny acacia branches', 'Prehensile — works like a hand'],
    color: '#ea580c',
  },
  {
    id: 'spots',
    icon: '🌟',
    title: 'Unique Spot Patterns',
    subtitle: 'No two alike',
    points: ['Individual as a fingerprint', 'Acts as a thermal radiator', 'Blood vessels release heat at patch edges', 'Spot shape is species-specific'],
    color: '#ca8a04',
  },
];

const COAT_SPECIES = [
  {
    id: 'reticulated',
    name: 'Reticulated Giraffe',
    scientific: 'Giraffa reticulata',
    image: wikiImages['reticulated-giraffe-pattern'] || generatedArt('reticulated-giraffe-pattern', 'Reticulated Giraffe'),
    color: '#ea580c',
    description:
      'Perhaps the most visually striking, the Reticulated giraffe is defined by sharp, uniform, reddish-brown polygons separated by stark, bright white lines. This creates a highly distinct "cobweb" or net-like effect. Found primarily in northeastern Kenya.',
    features: ['Smooth, well-defined polygon shapes', 'Bright, high-contrast white lines', 'Deep reddish-brown patches'],
  },
  {
    id: 'masai',
    name: 'Masai Giraffe',
    scientific: 'Giraffa tippelskirchi',
    image: wikiImages['masai-giraffe-pattern'] || generatedArt('masai-giraffe-pattern', 'Masai Giraffe'),
    color: '#b45309',
    description:
      'The Masai giraffe is easily identified by its extremely dark, almost chocolate-brown spots that are highly irregular, jagged, and vine-like. The edges look like splattered stars or oak leaves. They dominate the landscapes of Kenya and Tanzania.',
    features: ['Irregular, jagged, star-like edges', 'Darkest coloration of all species', 'Creamy tan background lines'],
  },
  {
    id: 'southern',
    name: 'Southern Giraffe',
    scientific: 'Giraffa giraffa',
    image: wikiImages['southern-giraffe-pattern'] || generatedArt('southern-giraffe-pattern', 'Southern Giraffe'),
    color: '#16a34a',
    description:
      'Characterized by star-shaped patches that are less sharply defined than the Reticulated, but more rounded than the Masai. Crucially, their spots extend all the way down their legs to the hooves. Found in Namibia, South Africa, and Botswana.',
    features: ['Rounded, star-shaped patches', 'Spots extend down to the hooves', 'Warm tawny brown on light tan'],
  },
  {
    id: 'northern',
    name: 'Northern Giraffe',
    scientific: 'Giraffa camelopardalis',
    image: wikiImages['northern-giraffe-pattern'] || generatedArt('northern-giraffe-pattern', 'Northern Giraffe'),
    color: '#dc2626',
    description:
      'The Northern giraffe generally has large, paler chestnut-brown spots with relatively smooth edges, set against a pale cream background. Unlike the Southern giraffe, their lower legs are noticeably pale and mostly spot-free.',
    features: ['Pale, chestnut-brown patches', 'Smooth edges', 'Lower legs are stark white/spotless'],
  },
];

const NECK_FORCES = [
  { icon: '🌿', title: 'Reaching Higher Food', desc: 'As African forests gave way to savanna, acacia trees became the primary food source. Only taller individuals could browse beyond the reach of every other herbivore.' },
  { icon: '🧬', title: 'Natural Selection', desc: 'Each generation, longer-necked giraffes survived lean seasons better and reproduced more successfully. Across millions of years, this compounded into extraordinary elongation.' },
  { icon: '🌡️', title: 'Climate Change', desc: 'The drying of Africa 5–8 million years ago replaced dense forest with open savanna — creating both the ecological pressure and the opportunity for upward browsing.' },
  { icon: '🥊', title: 'Food Competition', desc: 'As herbivore diversity exploded on the savanna, competition at ground level intensified dramatically. A taller browser had a monopoly on leaves no one else could reach.' },
  { icon: '💪', title: 'Sexual Selection', desc: "Male giraffes use their necks as weapons in ritualized 'necking' combat. Longer-necked males win more fights, claim more mates, and pass their genes to more offspring." },
];

const TRANSFORMATION = [
  {
    id: 1,
    name: 'Palaeomerycidae',
    era: '25 Million Years Ago',
    neck: 'Short (Deer-like)',
    environment: 'Dense prehistoric forests',
    desc: 'The earliest known ancestor. With a thick build and short neck, it was perfectly adapted to browsing low-lying forest vegetation.',
    image: wikiImages['transformation-stage-1'] || generatedArt('transformation-stage-1', 'Ancestral Short-Neck Stage'),
  },
  {
    id: 2,
    name: 'Canthumeryx',
    era: '16 Million Years Ago',
    neck: 'Slightly Elongated',
    environment: 'Transitional woodland',
    desc: 'As the forests began to thin, the first subtle signs of elongation appeared in the cervical vertebrae, allowing it to reach slightly higher leaves.',
    image: wikiImages['transformation-stage-2'] || generatedArt('transformation-stage-2', 'Transitional Woodland Stage'),
  },
  {
    id: 3,
    name: 'Samotherium',
    era: '7 Million Years Ago',
    neck: 'Medium (~1 meter)',
    environment: 'Early dry savanna',
    desc: 'A crucial transitional form. The cranial end of the C3 vertebra stretched out (the first elongation boost), giving it a distinctive mid-length neck.',
    image: wikiImages['transformation-stage-3'] || generatedArt('transformation-stage-3', 'Early Dry Savanna Stage'),
  },
  {
    id: 4,
    name: 'Giraffa camelopardalis',
    era: 'Modern Era',
    neck: 'Extreme (~2.4 meters)',
    environment: 'Open African savanna',
    desc: 'The second elongation boost occurred (lengthening the caudal end of the vertebrae). Fully adapted to dominate the high canopy of the open savanna.',
    image: wikiImages['transformation-stage-4'] || generatedArt('transformation-stage-4', 'Open African Savanna Stage'),
  },
];

const DIVERSITY = [
  { name: 'Masai Giraffe', scientific: 'Giraffa tippelskirchi', status: 'Vulnerable', statusColor: '#eab308', image: wikiImages['diversity-masai-giraffe'] || generatedArt('diversity-masai-giraffe', 'Masai Giraffe') },
  { name: 'Northern Giraffe', scientific: 'Giraffa camelopardalis', status: 'Critically Endangered', statusColor: '#dc2626', image: wikiImages['diversity-northern-giraffe'] || generatedArt('diversity-northern-giraffe', 'Northern Giraffe') },
  { name: 'Reticulated Giraffe', scientific: 'Giraffa reticulata', status: 'Endangered', statusColor: '#ea580c', image: wikiImages['diversity-reticulated-giraffe'] || generatedArt('diversity-reticulated-giraffe', 'Reticulated Giraffe') },
  { name: 'Southern Giraffe', scientific: 'Giraffa giraffa', status: 'Least Concern', statusColor: '#16a34a', image: wikiImages['diversity-southern-giraffe'] || generatedArt('diversity-southern-giraffe', 'Southern Giraffe') },
];

const TAXONOMY_TREE = {
  family: 'Family: Giraffidae',
  genus: 'Genus: Giraffa',
  species: [
    { name: 'Southern Giraffe', scientific: '(G. giraffa)', color: '#16a34a', bg: '#dcfce7', subspecies: ['Angolan giraffe', 'South African giraffe'] },
    { name: 'Masai Giraffe', scientific: '(G. tippelskirchi)', color: '#ea580c', bg: '#ffedd5', subspecies: ['Masai sensu stricto', 'Luangwa giraffe'] },
    { name: 'Reticulated Giraffe', scientific: '(G. reticulata)', color: '#ea580c', bg: '#ffedd5', subspecies: [] },
    { name: 'Northern Giraffe', scientific: '(G. camelopardalis)', color: '#dc2626', bg: '#fee2e2', subspecies: ['Nubian giraffe', 'Kordofan giraffe', 'West African giraffe'] },
  ],
};

function AdaptationsSection() {
  const [active, setActive] = useState(null);
  return (
    <div className="gir-adaptations-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Biological Marvels: Amazing Adaptations</h3>
        <p className="gir-section-text">Evolution sculpted the giraffe into a marvel of engineering. Click a card to explore each adaptation.</p>
      </div>
      <div className="gir-adaptations-grid">
        {ADAPTATIONS.map((a) => (
          <div
            key={a.id}
            className={`gir-adapt-flip-card ${active === a.id ? 'flipped' : ''}`}
            onClick={() => setActive(active === a.id ? null : a.id)}
          >
            <div className="gir-adapt-flip-inner">
              <div className="gir-adapt-flip-front" style={{ borderBottomColor: a.color }}>
                <span className="gir-adapt-icon-large">{a.icon}</span>
                <h4>{a.title}</h4>
                <span className="gir-adapt-subtitle" style={{ color: a.color }}>{a.subtitle}</span>
                <div className="gir-click-hint">Click to explore</div>
              </div>
              <div className="gir-adapt-flip-back" style={{ background: a.color }}>
                <h4>{a.title}</h4>
                <ul>
                  {a.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoatPatternsSection() {
  const [active, setActive] = useState(COAT_SPECIES[0]);
  return (
    <div className="gir-coat-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Unique Spot Patterns: An Interactive Guide</h3>
        <p className="gir-section-text">
          Just like a human fingerprint, no two giraffes have the exact same coat. However, the <strong>shape, color, and spacing</strong> of the
          spots are the primary visual indicators for distinguishing the four distinct species in the wild.
        </p>
      </div>
      <div className="gir-coat-interactive-wrapper">
        <div className="gir-coat-thumbnails">
          {COAT_SPECIES.map((s) => (
            <button
              key={s.id}
              className={`gir-coat-thumb-btn ${active.id === s.id ? 'active' : ''}`}
              onClick={() => setActive(s)}
              style={{ '--coat-color': s.color }}
            >
              <div className="gir-coat-thumb-img-wrapper">
                <img src={s.image} alt={`${s.name} pattern`} />
              </div>
              <span className="gir-coat-thumb-label">{s.name}</span>
            </button>
          ))}
        </div>
        <div className="gir-coat-main-display">
          <div className="gir-coat-large-image">
            <img src={active.image} alt={active.name} />
            <div className="gir-coat-overlay">
              <div className="gir-coat-info">
                <div className="gir-coat-header" style={{ borderLeftColor: active.color }}>
                  <h4 style={{ color: active.color }}>{active.name}</h4>
                  <em>{active.scientific}</em>
                </div>
                <p className="gir-coat-desc">{active.description}</p>
                <ul className="gir-coat-features">
                  {active.features.map((f, i) => (
                    <li key={i}>
                      <span style={{ color: active.color }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NeckScienceSection() {
  return (
    <div className="gir-neck-science-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">The Science Behind the Neck</h3>
        <p className="gir-section-text">
          <strong>Why Necks Became Longer:</strong> Evolution is never a single story. The giraffe's neck emerged from the intersection of five
          powerful forces.
        </p>
      </div>
      <div className="gir-forces-grid">
        {NECK_FORCES.map((f, i) => (
          <div className="gir-force-card" key={i}>
            <div className="gir-force-icon">{f.icon}</div>
            <div className="gir-force-content">
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransformationSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const go = (idx) => {
    setPrev(active);
    setActive(idx);
  };
  return (
    <div className="gir-transformation-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Interactive Transformation</h3>
        <p className="gir-section-text">
          Follow the 25-million-year journey. Click the timeline stages below to witness how shifting ecosystems drove the most extreme
          anatomical transformation in mammalian history.
        </p>
      </div>
      <div className="gir-evo-interactive">
        <div className="gir-evo-main-view">
          {TRANSFORMATION.map((t, i) => {
            let cls = 'gir-evo-slide';
            if (i === active) cls += ' active';
            else if (i === prev) cls += ' previous';
            if (i === active && active > prev) cls += ' wipe-forward';
            if (i === active && active < prev) cls += ' wipe-backward';
            return (
              <div className={cls} key={t.id}>
                <img src={t.image} alt={t.name} />
                <div className="gir-evo-overlay">
                  <div className="gir-evo-data-box">
                    <div className="gir-evo-era">{t.era}</div>
                    <h4>{t.name}</h4>
                    <p>{t.desc}</p>
                    <div className="gir-evo-stats">
                      <div className="gir-evo-stat">
                        <span className="stat-icon">🦴</span>
                        <div className="stat-info">
                          <strong>Neck Length</strong>
                          <span>{t.neck}</span>
                        </div>
                      </div>
                      <div className="gir-evo-stat">
                        <span className="stat-icon">🌍</span>
                        <div className="stat-info">
                          <strong>Environment</strong>
                          <span>{t.environment}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="gir-evo-timeline-controls">
          <div className="gir-evo-progress-track">
            <div className="gir-evo-progress-fill" style={{ width: `${(active / (TRANSFORMATION.length - 1)) * 100}%` }} />
          </div>
          <div className="gir-evo-steps">
            {TRANSFORMATION.map((t, i) => (
              <button key={t.id} className={`gir-evo-step-btn ${i <= active ? 'completed' : ''} ${i === active ? 'active' : ''}`} onClick={() => go(i)}>
                <div className="gir-evo-step-dot" />
                <div className="gir-evo-step-label">{t.era.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxonomySection() {
  return (
    <div className="gir-taxonomy-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">The 2025 Reclassification</h3>
        <p className="gir-section-text">
          For over a century, science operated under a single assumption: there was only one species of giraffe. In <strong>2016</strong>, genetic
          data revealed a biological earthquake — formally adopted by the <strong>IUCN in August 2025</strong>. There are{' '}
          <strong>four distinct species</strong> and <strong>five subspecies</strong> (the Reticulated Giraffe has no subspecies).
        </p>
      </div>
      <div className="gir-reactflow-wrapper" style={{ width: '100%', padding: '2rem', background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="tax-node root-node" style={{ background: '#fef3c7', border: '2px solid #b45309', width: 220 }}>
            {TAXONOMY_TREE.family}
          </div>
          <div className="tax-node genus-node" style={{ background: '#ffedd5', border: '2px solid #ea580c', width: 220 }}>
            {TAXONOMY_TREE.genus}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
            {TAXONOMY_TREE.species.map((sp) => (
              <div key={sp.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                <div className="tax-node species-node" style={{ background: sp.bg, border: `2px solid ${sp.color}`, width: 180 }}>
                  {sp.name}
                  <br />
                  <small>{sp.scientific}</small>
                </div>
                {sp.subspecies.map((sub) => (
                  <div key={sub} className="tax-node subspecies-node" style={{ background: '#fff', border: `1px solid ${sp.color}`, width: 150, fontSize: '0.8rem' }}>
                    {sub}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DiversitySection() {
  return (
    <div className="gir-living-diversity-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Living Diversity: The Four Living Species</h3>
        <p className="gir-section-text">
          Genomic science revealed what the eye long suspected — these are not one species, but four distinct lineages with unique identities.
        </p>
      </div>
      <div className="gir-diversity-grid">
        {DIVERSITY.map((d, i) => (
          <div className="gir-div-card" key={i}>
            <div className="gir-div-image-container">
              <img src={d.image} alt={`${d.name} — ${d.scientific}`} className="gir-div-img" loading="lazy" />
            </div>
            <div className="gir-div-overlay">
              <span className="gir-div-status" style={{ backgroundColor: d.statusColor }}>{d.status}</span>
              <div className="gir-div-content">
                <h4>{d.name}</h4>
                <em>{d.scientific}</em>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AncestrySection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const pct = ((window.innerHeight / 2 - top) / height) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="gir-ancestry-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">The 24-Million-Year Ancestry</h3>
        <p className="gir-section-text">
          The evolutionary path of the giraffe is not a straight line of necks progressively stretching toward the canopy. It is a complex web of
          environmental adaptations, branching lineages, and evolutionary dead-ends.
        </p>
      </div>
      <div className="timeline-container-wrapper" style={{ marginTop: '3rem' }}>
        <div className="timeline-container" ref={containerRef}>
          <div className="timeline-line">
            <div className="timeline-progress" style={{ height: `${progress}%`, background: 'var(--gir-primary)' }} />
          </div>
          {ANCESTRY.map((a, i) => {
            const leftHasImage = i % 2 === 0;
            return (
              <div className="timeline-item" key={a.name}>
                <div className="timeline-pane pane-left">
                  {leftHasImage ? (
                    <div className="content-group align-right">
                      <h3 className="phylum-name" style={{ color: 'var(--gir-primary-dark)' }}>{a.name}</h3>
                      <div className="phylum-image-wrapper" style={{ borderColor: 'var(--gir-primary)' }}>
                        <img src={a.img} alt={a.name} loading="lazy" />
                      </div>
                    </div>
                  ) : (
                    <div className="content-group text-only align-right">
                      <p className="phylum-desc">{a.description}</p>
                    </div>
                  )}
                </div>
                <div className="timeline-marker" style={{ background: 'var(--gir-primary)', color: 'white' }}>{a.year}</div>
                <div className="timeline-pane pane-right">
                  {leftHasImage ? (
                    <div className="content-group text-only align-left">
                      <p className="phylum-desc">{a.description}</p>
                    </div>
                  ) : (
                    <div className="content-group align-left">
                      <h3 className="phylum-name" style={{ color: 'var(--gir-primary-dark)' }}>{a.name}</h3>
                      <div className="phylum-image-wrapper" style={{ borderColor: 'var(--gir-primary)' }}>
                        <img src={a.img} alt={a.name} loading="lazy" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EvolutionTimelineSection() {
  return (
    <div className="gir-evo-timeline-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Evolutionary Epochs</h3>
        <p className="gir-section-text">The 24-million-year journey broken down into critical chapters of transformation.</p>
        <div className="gir-epoch-grid">
          {EPOCHS.map((e, i) => (
            <div className="gir-epoch-card" key={i}>
              <div className="gir-epoch-icon">{e.icon}</div>
              <div className="gir-epoch-content">
                <div className="gir-epoch-time">{e.time}</div>
                <h4>{e.stage}</h4>
                <div className="gir-epoch-duration">Takes {e.duration}</div>
              </div>
            </div>
          ))}
          <div className="gir-epoch-card total">
            <div className="gir-epoch-icon">⏳</div>
            <div className="gir-epoch-content">
              <div className="gir-epoch-time">25 → 1 Mya</div>
              <h4>Total Evolution</h4>
              <div className="gir-epoch-duration">24 Million Years</div>
            </div>
          </div>
        </div>
      </div>

      <div className="gir-section-box" style={{ marginTop: '3rem' }}>
        <h3 className="gir-section-title">The Exact Ancestors</h3>
        <div className="gir-ancestors-grid">
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: '#ca8a04' }}>Earliest</div>
            <div className="gir-anc-header">
              <h4>Helladotherium</h4>
              <span>23 Mya</span>
            </div>
            <p>3 meters tall, antelope-like. Forefather of both modern giraffe AND okapi.</p>
          </div>
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: '#b45309' }}>First Giraffid</div>
            <div className="gir-anc-header">
              <h4>Canthumeryx</h4>
              <span>16 Mya</span>
            </div>
            <p>Earliest known giraffid. Start of the giraffid family with slightly elongated neck vertebrae.</p>
          </div>
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: '#ea580c' }}>Transitional</div>
            <div className="gir-anc-header">
              <h4>Samotherium</h4>
              <span>7 Mya</span>
            </div>
            <p>~1 meter neck. First elongation boost (cranial end stretched). Crucial evolutionary link.</p>
          </div>
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: '#dc2626' }}>Most Direct</div>
            <div className="gir-anc-header">
              <h4>Bohlinia</h4>
              <span>7–9 Mya</span>
            </div>
            <p>Almost same size as modern giraffe. Direct ancestor of modern G. camelopardalis.</p>
          </div>
        </div>
      </div>

      <div className="gir-section-box" style={{ marginTop: '3rem' }}>
        <h3 className="gir-section-title">Comprehensive Chronology</h3>
        <div className="gir-chrono-list">
          {CHRONOLOGY.map((c, i) => (
            <div className={`gir-chrono-item ${c.period === '1 Mya' || c.period === 'Present' ? 'gir-chrono-highlight' : ''}`} key={i}>
              <div className="gir-chrono-time">{c.period}</div>
              <div className="gir-chrono-node" />
              <div className="gir-chrono-details">
                <h4>{c.ancestor}</h4>
                <p>{c.characteristics}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="gir-callout gir-callout-fact" style={{ marginTop: '2rem' }}>
          <strong>🦒 Unique Achievement:</strong> Modern giraffe represents the only form that underwent BOTH elongation stages, making it
          uniquely long-necked among all living and extinct mammals.
        </div>
      </div>
    </div>
  );
}

export default function GiraffeBlog() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 80px)');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('giraffe-day');
  const sidebarRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: top - 90, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('.foo-zl-footer');
      const hero = document.querySelector('.gir-hero-banner');
      const scrollY = window.scrollY;
      if (hero) {
        setSidebarVisible(scrollY > hero.offsetHeight * 0.7);
      }
      setShowBackToTop(scrollY > 400);

      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= 150) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }

      if (!footer || !sidebarRef.current) return;
      const offset = 80;
      const rect = footer.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      if (rect.top < viewHeight) {
        const h = Math.max(rect.top - offset, 100);
        setSidebarHeight(`${h}px`);
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

  const progressPct = ((NAV_ITEMS.findIndex((n) => n.id === activeSection) + 1) / NAV_ITEMS.length) * 100;

  return (
    <div className="gir-zoopage">
      <section className="gir-hero-banner" id="giraffe-day">
        <div className="gir-hero-container">
          <div className="gir-hero-content">
            <span className="gir-taxonomy-tag">June 21 · World Giraffe Day</span>
            <h1 className="gir-hero-title">World Giraffe Day</h1>
            <p className="gir-hero-subtitle">Celebrating the tallest animal on the longest day of the year</p>
            <div className="gir-taxonomy-grid">
              <div className="gir-tax-item">
                <span className="gir-tax-label">Neck</span>
                <span className="gir-tax-value">2.4 m</span>
              </div>
              <div className="gir-tax-item">
                <span className="gir-tax-label">Heart</span>
                <span className="gir-tax-value">11 kg</span>
              </div>
              <div className="gir-tax-item">
                <span className="gir-tax-label">Speed</span>
                <span className="gir-tax-value">65 km/h</span>
              </div>
              <div className="gir-tax-item">
                <span className="gir-tax-label">Population</span>
                <span className="gir-tax-value">~140,000</span>
              </div>
            </div>
            <p className="gir-hero-description">
              An evolutionary marvel, an ecosystem engineer, and a creature undergoing a silent extinction. Discover the 24-million-year journey
              of the savanna's gentle giant.
            </p>
          </div>
          <div className="gir-hero-visual">
            <div className="gir-hero-image-wrapper">
              <img
                src={wikiImages['hero-modern-giraffe'] || generatedArt('hero-modern-giraffe', 'Giraffa camelopardalis')}
                alt="Giraffa camelopardalis — Modern Giraffe"
                className="gir-hero-img"
              />
            </div>
          </div>
        </div>
        <div className="gir-hero-bottom-fade" />
        <div className="gir-scroll-indicator" onClick={() => scrollToSection('meet-giraffe')}>
          <div className="gir-mouse">
            <div className="gir-wheel" />
          </div>
          <div className="gir-arrow-down" />
        </div>
      </section>

      <div className="gir-zoo-app-container">
        <div className={`gir-mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
        <aside ref={sidebarRef} className={`gir-zoo-sidebar ${mobileOpen ? 'open' : ''} ${sidebarVisible ? '' : 'hidden'}`} style={{ height: sidebarHeight }}>
          <div className="gir-sidebar-header">
            <div className="gir-progress-label">Reading Progress</div>
            <div className="gir-progress-track">
              <div className="gir-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
          <nav className="gir-sidebar-nav">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} className={`gir-nav-btn ${activeSection === item.id ? 'active' : ''}`} onClick={() => scrollToSection(item.id)}>
                <span className="gir-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="gir-zoo-main-content">
          <button className="gir-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open Menu">
            <Menu size={24} />
          </button>

          <div className="gir-content-card">
            <section className="gir-blog-section">
              <h2 className="gir-section-heading">🦒 Why World Giraffe Day?</h2>
              <div className="gir-section-box">
                <h3 className="gir-section-title">June 21 — The Longest Day for the Tallest Animal</h3>
                <p className="gir-section-text">
                  <strong>World Giraffe Day</strong> is celebrated annually on <strong>June 21st</strong> — the longest day (or night) of the
                  year, depending on the hemisphere. This date was intentionally chosen to match the <strong>tallest animal on Earth</strong> with
                  the <strong>longest day of the year</strong> in the Northern Hemisphere (summer solstice).
                </p>
                <p className="gir-section-text">
                  Initiated by the <strong>Giraffe Conservation Foundation (GCF)</strong>, this annual event aims to raise awareness, shed light on
                  the challenges giraffes face in the wild, and celebrate these gentle giants that have roamed the African savanna for millions of
                  years.
                </p>
                <div className="gir-day-highlights">
                  <div className="gir-day-card">
                    <span className="gir-day-icon">📅</span>
                    <h4>When?</h4>
                    <p>June 21st every year — the summer solstice in the Northern Hemisphere</p>
                  </div>
                  <div className="gir-day-card">
                    <span className="gir-day-icon">🤔</span>
                    <h4>Why This Date?</h4>
                    <p>The longest day of the year celebrates the tallest animal — a poetic match by the GCF</p>
                  </div>
                  <div className="gir-day-card">
                    <span className="gir-day-icon">🎯</span>
                    <h4>Purpose</h4>
                    <p>Raise awareness about declining populations & support conservation initiatives worldwide</p>
                  </div>
                </div>
              </div>

              <div className="gir-section-box">
                <h3 className="gir-section-title">Why Giraffes Matter to Ecosystems</h3>
                <p className="gir-section-text">
                  Giraffes are far more than a tourist attraction — they are <strong>keystone browsers</strong> that play a vital role in
                  maintaining the ecological balance of African savannas and woodlands.
                </p>
                <ul className="gir-section-list">
                  <li>
                    <strong>Seed Dispersal:</strong> Giraffes consume fruits, seeds, and pods from treetops, spreading seeds across vast distances
                    through their dung — promoting forest regeneration.
                  </li>
                  <li>
                    <strong>Tree Pruning:</strong> By browsing the high canopy, giraffes naturally prune trees, stimulating new growth and
                    allowing sunlight to reach the understory.
                  </li>
                  <li>
                    <strong>Predator Sentinels:</strong> Their height gives them an unmatched vantage point. Other animals like zebras and
                    wildebeest often graze near giraffes, using them as early-warning lookouts for predators.
                  </li>
                  <li>
                    <strong>Nutrient Cycling:</strong> Their large-scale foliage consumption and excretion return vital nutrients to the soil,
                    enriching the savanna ecosystem.
                  </li>
                  <li>
                    <strong>Biodiversity Indicators:</strong> Healthy giraffe populations signal well-managed habitats. Their decline warns of
                    broader ecosystem degradation.
                  </li>
                </ul>
                <div className="gir-callout gir-callout-fact">
                  <strong>⚠️ Silent Extinction</strong> Giraffe numbers have plummeted by nearly <strong>40% in just 30 years</strong>. With fewer
                  than 140,000 remaining, they are undergoing what conservationists call a <strong>"silent extinction"</strong> — declining
                  rapidly with far less public attention than elephants or rhinos.
                </div>
              </div>
            </section>

            <div className="gir-section-divider" />

            <section id="meet-giraffe" className="gir-blog-section">
              <h2 className="gir-section-heading">🌍 Meet the Giraffe</h2>
              <div className="gir-section-box">
                <h3 className="gir-section-title">The 24-Million-Year Masterpiece</h3>
                <p className="gir-section-text">
                  For over a century, science operated under a single assumption regarding the world's tallest terrestrial animal: there was only
                  one species of giraffe, divided into several regional subspecies. This monolithic view remained unchallenged in textbooks
                  around the globe.
                </p>
                <p className="gir-section-text">
                  However, in <strong>2016</strong>, genetic data revealed a biological earthquake — a reality formally adopted by the{' '}
                  <strong>International Union for Conservation of Nature (IUCN) in August 2025</strong>. There is not one species of giraffe, but{' '}
                  <strong>four distinct species</strong>, possessing genetic differences as vast and profound as those between polar bears and
                  brown bears.
                </p>
                <p className="gir-section-text">
                  Today, fewer than <strong>140,000 giraffes</strong> remain in the wild. To understand them requires looking past their height
                  and examining a <strong>24-million-year evolutionary journey</strong> marked by massive climate shifts, anatomical anomalies,
                  and two highly distinct biological "boosts."
                </p>
              </div>
              <div className="gir-meet-stats">
                <div className="gir-stat-card">
                  <span className="gir-stat-number">18 ft</span>
                  <span className="gir-stat-desc">Maximum Height</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">1,900 kg</span>
                  <span className="gir-stat-desc">Maximum Weight</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">7</span>
                  <span className="gir-stat-desc">Neck Vertebrae (same as humans!)</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">25 lbs</span>
                  <span className="gir-stat-desc">Heart Weight</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">18 in</span>
                  <span className="gir-stat-desc">Tongue Length</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">24 M</span>
                  <span className="gir-stat-desc">Years of Evolution</span>
                </div>
              </div>
            </section>

            <div className="gir-section-divider" />

            <section id="adaptations" className="gir-blog-section">
              <h2 className="gir-section-heading">🌟 Biological Marvels</h2>
              <AdaptationsSection />
            </section>

            <div className="gir-section-divider" />

            <section id="coat-patterns" className="gir-blog-section">
              <h2 className="gir-section-heading">🐆 Coat Patterns</h2>
              <CoatPatternsSection />
            </section>

            <div className="gir-section-divider" />

            <section id="neck-science" className="gir-blog-section">
              <h2 className="gir-section-heading">🔬 The Science Behind the Neck</h2>
              <NeckScienceSection />
            </section>

            <div className="gir-section-divider" />

            <section id="transformation" className="gir-blog-section">
              <h2 className="gir-section-heading">🔄 Interactive Transformation</h2>
              <TransformationSection />
            </section>

            <div className="gir-section-divider" />

            <section id="taxonomy" className="gir-blog-section">
              <h2 className="gir-section-heading">🏷️ Taxonomy — The 2025 Reclassification</h2>
              <TaxonomySection />
            </section>

            <div className="gir-section-divider" />

            <section id="diversity" className="gir-blog-section">
              <h2 className="gir-section-heading">🌍 Living Diversity</h2>
              <DiversitySection />
            </section>

            <div className="gir-section-divider" />

            <section id="ancestry" className="gir-blog-section">
              <h2 className="gir-section-heading">🌿 The 24-Million-Year Ancestry</h2>
              <AncestrySection />
            </section>

            <div className="gir-section-divider" />

            <section id="timeline" className="gir-blog-section">
              <h2 className="gir-section-heading">⏳ Complete Evolution Timeline</h2>
              <EvolutionTimelineSection />
            </section>
          </div>
        </main>
      </div>

      <button className={`gir-back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUp size={22} />
      </button>
    </div>
  );
}
