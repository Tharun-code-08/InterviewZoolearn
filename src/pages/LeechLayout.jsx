import { useEffect, useRef, useState, Fragment } from 'react';
import {
  Menu,
  ArrowUp,
  Tag,
  Layers,
  Footprints,
  HeartPulse,
  Brain,
  Dna,
  Syringe,
  Bug,
  Droplets,
  Trash2,
  Wind,
  Search,
} from 'lucide-react';
import leechTaxonomy from '../data/leechTaxonomy.json';
import { generatedArt } from '../utils/generatedArt';
import leechWikiImages from '../data/leechWikiImages.json';

/* ------------------------------------------------------------------ */
/* Shared data (extracted from the live site's compiled bundle)        */
/* ------------------------------------------------------------------ */

const BODY_WALL_LAYERS = [
  {
    id: 'bw-cuticle',
    name: 'Cuticle',
    description:
      'A thin, non-cellular, protective outer covering that is periodically shed. It acts as the first line of defense against physical injury and pathogens.',
    y: 20,
    height: 15,
    patternId: 'bw-pattern-cuticle',
    color: '#475569',
  },
  {
    id: 'bw-epidermis',
    name: 'Epidermis',
    description:
      'A single layer of living columnar cells that secretes the cuticle. It contains numerous gland cells that produce mucus to keep the skin moist.',
    y: 35,
    height: 40,
    patternId: 'bw-pattern-epidermis',
    color: '#ef4444',
  },
  {
    id: 'bw-dermis',
    name: 'Dermis',
    description:
      'A thick layer of fibrous connective tissue. It houses blood capillaries, pigment cells (chromatophores), and sensory nerve endings.',
    y: 75,
    height: 45,
    patternId: 'bw-pattern-dermis',
    color: '#f97316',
  },
  {
    id: 'bw-muscular',
    name: 'Muscular Layer',
    description:
      'Comprises powerful circular and longitudinal muscles. Their coordinated contractions enable the leech to perform its characteristic looping movement.',
    y: 120,
    height: 60,
    patternId: 'bw-pattern-muscular',
    color: '#b91c1c',
  },
  {
    id: 'bw-botryoidal',
    name: 'Botryoidal Tissue',
    description:
      'A unique connective tissue filling the reduced coelom. It is highly vascularized and plays a vital role in excretion and iron storage.',
    y: 180,
    height: 70,
    patternId: 'bw-pattern-botryoidal',
    color: '#9333ea',
  },
];

const SEGMENT_REGIONS = {
  '1-5': { title: 'Anterior Sucker & Cephalic Region', desc: 'Segments 1–5 include the anterior sucker and eyes for attachment and light detection.', color: '#ec4899' },
  '6-8': { title: 'Pre-clitellar Region', desc: 'Segments 6–8 with pharynx present; transition zone.', color: '#ef4444' },
  '9-11': { title: 'Clitellar Region', desc: 'Glandular region involved in reproduction (cocoon formation).', color: '#f97316' },
  '12-22': { title: 'Middle Body Region', desc: 'Contains crop, intestine, nephridiopores. The longest body zone.', color: '#22c55e' },
  '23-26': { title: 'Posterior Body Region', desc: 'Includes rectum and anus in segments 23–26.', color: '#14b8a6' },
  '27-33': { title: 'Posterior Sucker', desc: 'Organ of attachment and locomotion.', color: '#6366f1' },
};

const BODY_DIVISIONS = [
  { name: 'Cephalic region', segments: '1–5', desc: 'bears eyes and mouth' },
  { name: 'Pre-clitellar region', segments: '6–8', desc: 'narrow region before clitellum' },
  { name: 'Clitellar region', segments: '9–11', desc: 'involved in reproduction' },
  { name: 'Middle region', segments: '12–22', desc: 'longest part, contains digestive and reproductive organs' },
  { name: 'Caudal region', segments: '23–26', desc: 'posterior body part' },
  { name: 'Posterior sucker', segments: '27–33', desc: 'used for attachment and movement' },
];

const SEGMENTS = Array.from({ length: 33 }, (_, n) => {
  const top = (n / 33) * 100;
  const height = 100 / 33;
  return { id: n + 1, top, height, label: `Segment ${n + 1}` };
});

function segmentRange(id) {
  if (!id) return null;
  const n = parseInt(id, 10);
  if (n <= 5) return '1-5';
  if (n <= 8) return '6-8';
  if (n <= 11) return '9-11';
  if (n <= 22) return '12-22';
  if (n <= 26) return '23-26';
  return '27-33';
}

const ANATOMY_IMAGE = leechWikiImages['leech-anatomy'] || generatedArt('leech-anatomy', 'Interactive Anatomy');

const DIGESTIVE_FLOW = [
  { num: '1', label: 'Mouth & Buccal Cavity', badge: 'Entry', text: 'Triradiate (Y-shaped) aperture containing three muscular jaws, each bearing around 60–100 minute teeth. Located within segments 1–5.' },
  { num: '2', label: 'Pharynx', badge: 'Pumping', text: "A muscular pumping chamber surrounded by unicellular salivary glands. Secretes hirudin — an anticoagulant that keeps the host's blood fluid during feeding." },
  { num: '3', label: 'Oesophagus', badge: 'Transit', text: 'A short, narrow tube connecting the pharynx to the crop. Acts as a passage for blood to enter the storage chamber.' },
  { num: '4', label: 'Crop (Largest Part)', badge: 'Storage', text: "Divided into 10 chambers, each with a pair of lateral caeca (diverticula). Stores enormous quantities of blood — up to 5× the leech's body weight." },
  { num: '5', label: 'Stomach & Intestine', badge: 'Digestion', text: 'The stomach is a small, tubular chamber where actual digestion begins. The narrow intestine absorbs the digested nutrients slowly over weeks.' },
  { num: '6', label: 'Rectum & Anus', badge: 'Egestion', text: 'The rectum stores undigested residue. Waste is egested through the mid-dorsal anus located on the 26th segment.' },
];

const FEEDING_MECHANISM = [
  { icon: '🥸', title: 'Attachment', text: 'Locates host using chemoreceptors. Attaches firmly with posterior sucker, then positions anterior sucker on skin.' },
  { icon: '🦷', title: 'Incision', text: 'Three jaws create a Y-shaped wound. The bite is painless due to an anaesthetic in the saliva.' },
  { icon: '💉', title: 'Suction & Injection', text: 'Muscular pharynx creates powerful suction. Simultaneously injects hirudin + vasodilator to increase blood flow.' },
  { icon: '📦', title: 'Storage & Detach', text: 'Blood fills the 10-chambered crop until engorged. Leech then detaches and digests slowly over months.' },
];

const NERVE_CHAIN = [
  { name: 'Suprapharyngeal ganglion (brain)', desc: '– above pharynx' },
  { name: 'Circumpharyngeal connectives' },
  { name: 'Subpharyngeal ganglion' },
  { name: 'Paired ventral nerve cord', desc: 'with 21 segmental ganglia' },
];

const MALE_ORGANS = [
  { name: 'Testis sacs:', text: 'There are 11 pairs of testis sacs located in segment 12 to 22.' },
  { name: 'Vasa Efferentia & Deferentia:', text: 'Short duct (vasa efferentia) lead from each testis sac into a common longitudinal canal called the vas deferens on each side.' },
  { name: 'Epididymis:', text: 'The vas deferens forms a coiled mass in the 10th segment, which stores sperm.' },
  { name: 'Ejaculatory Duct & Atrium:', text: 'These lead to the male genital pore, located mid-ventrally on the 10th segment.' },
];

const FEMALE_ORGANS = [
  { name: 'Ovaries:', text: 'There is one pair of ovaries contained within ovisacs in the 11th segment.' },
  { name: 'Oviducts:', text: 'Short tubes from each ovisac join to form a common oviduct.' },
  { name: 'Vagina:', text: 'The common oviduct opens into a muscular pear-shaped organ called the vagina.' },
  { name: 'Female Genital Pore:', text: 'This opens mid-ventrally on the 11th segment.' },
];

const PARASITIC_ADAPTATIONS = [
  { icon: '🩸', title: 'Feeding Habit of Leech', text: 'A leech sucks blood using three tiny-toothed jaws that make a Y-shaped cut. Its muscular pharynx pumps the blood while saliva is released into the wound.' },
  { icon: '🧲', title: 'Prevention of Pain and Blood Clotting', text: 'Leech saliva contains hirudin, which stops blood from clotting and keeps it flowing. It also releases an anaesthetic, so the host usually feels no pain.' },
  { icon: '🦷', title: 'Food Storage and Digestion', text: 'The blood a leech sucks is stored in large chambers and digested very slowly. Because of this, it can survive for months without feeding and does not need complex digestive enzymes.' },
  { icon: '🧪', title: 'Adaptations for Firm Attachment', text: 'A leech stays attached to its host using two suckers at the front and back, which help it cling firmly while feeding.' },
  { icon: '🚫', title: 'Other Parasitic Adaptations', text: 'Leeches lack setae and parapodia since they aren’t needed for a parasitic life. Their soft, flexible body helps them attach and move on the host.' },
  { icon: '📦', title: 'Food Storage;', text: 'Blood is stored in the crop, allowing the leech to survive for many months without a new meal.' },
  { icon: '🥣', title: 'Easy understanding line', text: 'Every part of a leech, from its jaws and suckers to its saliva, is specially adapted for its blood-sucking parasitic life.', fullWidth: true },
];

const PARASITIC_GALLERY = [
  { id: 1, src: leechWikiImages['leech-parasitic-mode'] || generatedArt('leech-parasitic-mode', 'Parasitic Adaptations'), alt: 'Parasitic Adaptations', caption: 'Parasitic Mode' },
  { id: 2, src: leechWikiImages['leech-digestive-gallery'] || generatedArt('leech-digestive-gallery', 'Digestive System of Leech'), alt: 'Digestive System of Leech', caption: 'Digestive System' },
];

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

function TaxonomyNode({ node, depth = 0 }) {
  return (
    <li className="phyl-tree-item" style={{ marginLeft: depth ? 20 : 0 }}>
      <span
        data-level={node.rank}
        style={{ borderRadius: 50, border: 'none', background: 'white', boxShadow: 'rgba(0,0,0,0.08) 0px 8px 24px' }}
      >
        <strong>{node.rank}:</strong> {node.name}
      </span>
      {node.children && node.children.length > 0 && (
        <ul className="phyl-tree" style={{ marginTop: 10 }}>
          {node.children.map((child) => (
            <TaxonomyNode node={child} depth={depth + 1} key={child.id} />
          ))}
        </ul>
      )}
    </li>
  );
}

function TaxonomySection() {
  return (
    <section className="taxonomy-section">
      <div className="taxonomy-intro">
        <h2 className="taxonomy-title">
          Taxonomic Position <span className="taxonomy-title-accent">– Classification Hierarchy</span>
        </h2>
        <p className="taxonomy-description">
          The Indian Cattle Leech (<em>Hirudinaria granulosa</em>) is scientifically classified based on its
          morphological features and evolutionary relationships.
        </p>
      </div>
      <div className="taxonomy-card desk-interactive">
        <div className="taxonomy-path-header">
          <span className="path-label">Taxonomy:</span>
          <span className="path-value">Annelida › Hirudinea › Arhynchobdellida › Hirudinidae › Hirudinaria › granulosa</span>
        </div>
        <div className="taxonomy-static-wrapper phyl-tree-container">
          <ul className="phyl-tree">
            <TaxonomyNode node={leechTaxonomy} />
          </ul>
        </div>
      </div>
    </section>
  );
}

function MorphologySection() {
  return (
    <section className="em-morphology-section" id="external-morphology">
      <div className="em-morphology-container">
        <div className="em-morphology-header">
          <h2 className="em-morphology-title">External Morphology</h2>
          <div className="em-morphology-underline" />
        </div>
        <div className="em-top-section-grid">
          <div className="em-morphology-card em-image-card">
            <div className="em-image-wrapper">
              <img
                src={leechWikiImages['leech-morphology'] || generatedArt('leech-morphology', 'External Morphology of Leech')}
                alt="External Morphology of Leech"
                className="em-morphology-img"
              />
              <span className="em-image-caption">External Morphology</span>
            </div>
          </div>
          <div className="em-right-stack">
            <div className="em-morphology-card em-text-card">
              <h3 className="em-card-title">Shape and Size</h3>
              <p className="em-card-text">
                The body of the leech is soft, elongated, vermiform, and segmented. It may appear ribbon-shaped or
                cylindrical and can grow up to 35 cm.
              </p>
              <h3 className="em-card-title em-mt-4">Colour</h3>
              <ul className="em-morphology-list">
                <li>
                  <strong>Dorsal:</strong> Olive green
                </li>
                <li>
                  <strong>Ventral:</strong> Orange-yellow to orange-red
                </li>
              </ul>
            </div>
            <div className="em-morphology-card em-text-card">
              <h3 className="em-card-title">Segmentation</h3>
              <p className="em-card-text">Divided into 33 segments. Each segment is subdivided into annuli.</p>
              <h3 className="em-card-title em-mt-4">Sense Receptors</h3>
              <ul className="em-morphology-list">
                <li>
                  <strong>Annular receptors:</strong> On each annulus
                </li>
                <li>
                  <strong>Segmental receptors:</strong> First annulus of each segment
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="em-morphology-card em-full-width em-mt-layout">
          <h3 className="em-card-title">Suckers</h3>
          <p className="em-card-text">Two suckers for attachment and movement.</p>
          <div className="em-sucker-grid">
            <div className="em-sucker-item">
              <div className="em-sucker-badge">1</div>
              <h4>Anterior (oral) sucker</h4>
              <ul>
                <li>Ventral, occupies first 5 segments</li>
                <li>Used for feeding & attachment</li>
              </ul>
              <img
                src={leechWikiImages['leech-anterior-sucker'] || generatedArt('leech-anterior-sucker', 'Anterior Sucker')}
                alt="anterior sucker"
                className="em-sucker-img"
              />
            </div>
            <div className="em-sucker-item">
              <div className="em-sucker-badge">2</div>
              <h4>Posterior sucker</h4>
              <ul>
                <li>Fusion of last 7 segments</li>
                <li>Firm attachment & locomotion</li>
              </ul>
              <img
                src={leechWikiImages['leech-posterior-sucker'] || generatedArt('leech-posterior-sucker', 'Posterior Sucker')}
                alt="posterior sucker"
                className="em-sucker-img"
              />
            </div>
          </div>
        </div>

        <div className="em-split-section em-mt-layout">
          <div className="em-morphology-card em-aperture-column">
            <h3 className="em-card-title">External Apertures</h3>
            <div className="em-aperture-list-container">
              <div className="em-aperture-row">
                <div className="em-aperture-icon">👄</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Mouth</span>
                  <span className="em-aperture-desc">Present at the center of the anterior sucker</span>
                </div>
              </div>
              <div className="em-aperture-row">
                <div className="em-aperture-icon">◎</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Anus</span>
                  <span className="em-aperture-desc">Mid-dorsal side of the 26th segment</span>
                </div>
              </div>
              <div className="em-aperture-row">
                <div className="em-aperture-icon">💧</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Nephridiopores</span>
                  <ul className="em-sub-list">
                    <li>17 pairs, opening ventrally</li>
                    <li>Last annulus of segments 6 to 22</li>
                  </ul>
                </div>
              </div>
              <div className="em-aperture-row">
                <div className="em-aperture-icon">♂</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Male genital pore</span>
                  <ul className="em-sub-list">
                    <li>Mid-ventral, 10th segment</li>
                    <li>Between 2nd and 3rd annuli</li>
                  </ul>
                </div>
              </div>
              <div className="em-aperture-row">
                <div className="em-aperture-icon">♀</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Female genital pore</span>
                  <ul className="em-sub-list">
                    <li>Mid-ventral, 11th segment</li>
                    <li>Between 2nd and 3rd annuli</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="em-morphology-card em-blender-column"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', padding: 0, boxShadow: 'none' }}
          >
            <div
              className="em-blender-card-wrapper"
              style={{
                width: '100%',
                maxWidth: '450px',
                height: 'auto',
                minHeight: '350px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
              }}
            >
              <div className="sketchfab-embed-wrapper" style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
                <iframe
                  title="Indian_cattle_leech_overview"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src="https://sketchfab.com/models/69b3e8feda0d4c11a2e2a9e678fd489d/embed"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: '#64748b', paddingBottom: '5px' }}>
                <a
                  href="https://sketchfab.com/3d-models/indian-cattle-leech-overview-69b3e8feda0d4c11a2e2a9e678fd489d"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontWeight: 'bold', color: '#1caad9', textDecoration: 'none' }}
                >
                  Indian Cattle Leech 3D Model
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DivisionsLegend() {
  return (
    <section className="bd-divisions-section">
      <div className="bd-divisions-container">
        <div className="bd-divisions-header">
          <h2 className="bd-divisions-title">Divisions of the Body</h2>
          <div className="bd-divisions-underline" />
        </div>
        <p className="bd-divisions-intro">
          The body of the leech is divided into six distinct regions, based on function and segmentation:
        </p>
        <div className="bd-divisions-grid">
          {BODY_DIVISIONS.map((d, i) => (
            <div className="bd-division-card" style={{ animationDelay: `${i * 0.1}s` }} key={d.name}>
              <div className="bd-card-header">
                <span className="bd-segment-badge">Segments {d.segments}</span>
              </div>
              <h3 className="bd-region-name">{d.name}</h3>
              <div className="bd-arrow-divider">↓</div>
              <p className="bd-region-desc">{d.desc}</p>
            </div>
          ))}
        </div>
        <div className="bd-divisions-footer-box">
          <p className="bd-footer-text">These regions help in feeding, locomotion, and reproduction.</p>
        </div>
      </div>
    </section>
  );
}

function InteractiveAnatomySection() {
  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);
  const active = locked || hovered;
  const range = segmentRange(active);
  const card = range ? SEGMENT_REGIONS[range] : null;

  return (
    <Fragment>
      <div className="leech-anatomy-container" id="interactive-anatomy">
        <header className="leech-header-section">
          <div className="leech-badge">Interactive Anatomy</div>
          <h2>Ventral View (33 Segments)</h2>
          <p>
            <strong>Hover</strong> to preview. <strong>Click</strong> a segment to lock/unlock details.
          </p>
        </header>
        <div className="leech-layout">
          <div className="leech-visual-container">
            <div className="leech-ruler-col">
              {SEGMENTS.map((s) => (
                <div
                  className={`leech-ruler-mark ${active === s.id ? 'leech-active-mark' : ''}`}
                  style={{ top: `${s.top}%`, height: `${s.height}%` }}
                  key={`ruler-${s.id}`}
                >
                  {s.id % 5 === 0 && <span className="leech-ruler-num">{s.id}</span>}
                </div>
              ))}
            </div>
            <div className="leech-image-wrapper">
              <img src={ANATOMY_IMAGE} alt="Leech Anatomy" className="leech-img" />
              {SEGMENTS.map((s) => {
                const inRange = active && segmentRange(active) === segmentRange(s.id);
                const isActive = active === s.id;
                const isLocked = locked === s.id;
                return (
                  <div
                    className={`leech-segment-overlay ${isActive ? 'leech-seg-highlight' : ''} ${isLocked ? 'leech-seg-locked' : ''}`}
                    style={{
                      top: `${s.top}%`,
                      height: `${s.height}%`,
                      backgroundColor: isActive ? 'rgba(59, 130, 246, 0.4)' : inRange ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    }}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setLocked(locked === s.id ? null : s.id)}
                    title={`Segment ${s.id}`}
                    key={s.id}
                  />
                );
              })}
            </div>
          </div>
          <aside className="leech-info-panel-wrapper">
            <div className={`leech-info-card ${card ? 'leech-card-visible' : 'leech-card-empty'}`}>
              {card ? (
                <Fragment>
                  <div
                    className="leech-card-header"
                    style={{ backgroundColor: card.color, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}
                  >
                    <h3 style={{ margin: 0, color: 'white' }}>{card.title}</h3>
                    <span className="leech-card-seg-range">Segments {range}</span>
                  </div>
                  <div className="leech-card-body">
                    <p>{card.desc}</p>
                    <div className="leech-stat-row">
                      <div className="leech-stat-pill">
                        <span className="leech-label">Current Focus</span>
                        <span className="leech-value">Segment {active}</span>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div className="leech-empty-state">
                  <div className="leech-empty-icon">👆</div>
                  <h3>Explore the Anatomy</h3>
                  <p>Hover over the body segments to see functional regions.</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
      <DivisionsLegend />
    </Fragment>
  );
}

function BodyWallSection() {
  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const active = hovered || locked;
  const detail = BODY_WALL_LAYERS.find((l) => l.id === active);
  const labelled = showAll ? BODY_WALL_LAYERS : active ? [BODY_WALL_LAYERS.find((l) => l.id === active)] : [];

  return (
    <section className="leech-section-content">
      <div className="leech-section-box" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'row', minHeight: '600px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px', padding: '2rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--leech-border)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--leech-primary)', borderRadius: '50%' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--leech-text-muted)' }}>
                  Microscopic Analysis
                </span>
              </div>
              <h2 className="leech-section-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                Integumentary System
              </h2>
              <p className="leech-section-text" style={{ fontSize: '0.9rem' }}>
                Interactive histological cross-section showing the protective body wall layers.
              </p>
            </div>
            <div style={{ background: 'var(--leech-bg-app)', border: '1px solid var(--leech-border)', borderRadius: '1rem', padding: '1rem', flex: 1, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--leech-primary)' }}>Cross-section View</span>
                <button
                  onClick={() => setShowAll(!showAll)}
                  style={{ background: 'white', border: '1px solid var(--leech-border)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  {showAll ? 'Hide Labels' : 'View All Labels'}
                </button>
              </div>
              <div className="bw-svg-container">
                <svg viewBox="0 0 480 280">
                  <defs>
                    <marker id="bw-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#000000" />
                    </marker>
                    <pattern id="bw-pattern-cuticle" x="0" y="0" width="100" height="10" patternUnits="userSpaceOnUse">
                      <rect width="100" height="10" fill="#cbd5e1" />
                      <line x1="0" y1="5" x2="100" y2="5" stroke="#475569" strokeWidth="1.5" />
                    </pattern>
                    <pattern id="bw-pattern-epidermis" x="0" y="0" width="20" height="40" patternUnits="userSpaceOnUse">
                      <rect width="20" height="40" fill="#fecaca" stroke="#ef4444" strokeWidth="0.5" />
                      <circle cx="10" cy="20" r="4" fill="#b91c1c" fillOpacity="0.6" />
                    </pattern>
                    <pattern id="bw-pattern-dermis" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="30" height="30" fill="#fed7aa" />
                      <path d="M0 10 Q 15 0, 30 10 M0 20 Q 15 30, 30 20" fill="none" stroke="#ea580c" strokeWidth="1" />
                    </pattern>
                    <pattern id="bw-pattern-muscular" x="0" y="0" width="100" height="12" patternUnits="userSpaceOnUse">
                      <rect width="100" height="12" fill="#fca5a5" />
                      <line x1="0" y1="4" x2="100" y2="4" stroke="#991b1b" strokeWidth="1.5" strokeOpacity="0.4" />
                    </pattern>
                    <pattern id="bw-pattern-botryoidal" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect width="40" height="40" fill="#d8b4fe" />
                      <circle cx="10" cy="10" r="6" fill="#6b21a8" fillOpacity="0.3" />
                    </pattern>
                  </defs>
                  {BODY_WALL_LAYERS.map((l) => (
                    <rect
                      key={l.id}
                      x="20"
                      y={l.y}
                      width="300"
                      height={l.height}
                      rx="2"
                      fill={`url(#${l.patternId})`}
                      style={{
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                        opacity: active && active !== l.id ? 0.4 : 1,
                        stroke: active === l.id ? 'var(--leech-primary)' : 'none',
                        strokeWidth: active === l.id ? '3px' : '0',
                      }}
                      onClick={() => setLocked(locked === l.id ? null : l.id)}
                      onMouseEnter={() => setHovered(l.id)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  ))}
                  {labelled.map((l) => (
                    <g key={l.id}>
                      <line x1="325" y1={l.y + l.height / 2} x2="365" y2={l.y + l.height / 2} stroke="#000000" strokeWidth="1.5" markerEnd="url(#bw-arrowhead)" />
                      <text
                        x="375"
                        y={l.y + l.height / 2}
                        style={{ fontSize: '11px', fontWeight: '800', fill: '#000000', textTransform: 'uppercase', pointerEvents: 'none' }}
                      >
                        {l.name}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
          <div style={{ width: '35%', minWidth: '260px', background: '#f8fafc', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 className="leech-section-title" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--leech-text-muted)' }}>
              Layer Details
            </h3>
            {detail ? (
              <div style={{ marginTop: '1rem' }}>
                <div style={{ width: '40px', height: '6px', borderRadius: '4px', backgroundColor: detail.color, marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--leech-primary-dark)', marginBottom: '0.5rem' }}>{detail.name}</h4>
                <p className="leech-section-text" style={{ fontSize: '0.95rem' }}>
                  {detail.description}
                </p>
              </div>
            ) : (
              <div style={{ marginTop: '2rem', padding: '2rem', border: '2px dashed var(--leech-border)', borderRadius: '1rem', textAlign: 'center', color: 'var(--leech-text-muted)' }}>
                <p style={{ fontSize: '0.9rem' }}>Tap a layer to view precise structural data.</p>
              </div>
            )}
            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--leech-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--leech-text-muted)' }}>
                <span>Specimen</span>
                <strong style={{ color: 'var(--leech-text-main)' }}>Indian Leech</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--leech-text-muted)', marginTop: '4px' }}>
                <span>View</span>
                <strong style={{ color: 'var(--leech-text-main)' }}>Transverse Section</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocomotionSection() {
  const [mode, setMode] = useState('image');
  const media = {
    looping: leechWikiImages['leech-locomotion-looping'] || generatedArt('leech-locomotion-looping', 'Looping Movement'),
    swimming: leechWikiImages['leech-locomotion-swimming'] || generatedArt('leech-locomotion-swimming', 'Swimming Movement'),
    defaultImage: leechWikiImages['leech-locomotion-default'] || generatedArt('leech-locomotion-default', 'Leech Movement'),
  };
  return (
    <section className="locomotion-section" id="locomotion">
      <div className="locomotion-container">
        <div className="locomotion-header">
          <h2 className="locomotion-title">Locomotion</h2>
          <div className="locomotion-underline" />
        </div>
        <div className="locomotion-grid">
          <div className="locomotion-text-col">
            <p className="locomotion-intro">Leeches move in two ways:</p>
            <div className="movement-cards">
              <div className={`movement-card clickable ${mode === 'looping' ? 'active-card' : ''}`} onClick={() => setMode('looping')}>
                <div className="icon-box">🪣</div>
                <div className="movement-info">
                  <h3 className="movement-name">Looping / crawling</h3>
                  <div className="arrow-separator">→</div>
                  <p className="movement-desc">by alternate attachment of anterior and posterior suckers</p>
                </div>
              </div>
              <div className={`movement-card clickable ${mode === 'swimming' ? 'active-card' : ''}`} onClick={() => setMode('swimming')}>
                <div className="icon-box">🌊</div>
                <div className="movement-info">
                  <h3 className="movement-name">Swimming</h3>
                  <div className="arrow-separator">→</div>
                  <p className="movement-desc">by wave-like (undulating) movements of the body in water</p>
                </div>
              </div>
            </div>
            <div className="locomotion-footer">
              <p className="footer-note">Movement is controlled by muscle contraction and relaxation.</p>
            </div>
          </div>
          <div className="locomotion-image-col">
            <div className="image-frame video-frame">
              <img
                key={mode}
                src={mode === 'image' ? media.defaultImage : media[mode]}
                alt="Leech"
                className="locomotion-img"
              />
              <span className="img-label">{mode === 'image' ? 'Leech Movement' : `Video: ${mode} Mode`}</span>
              {mode !== 'image' && (
                <button className="reset-btn" onClick={() => setMode('image')}>
                  Reset to Image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DigestiveSection() {
  return (
    <section className="dig-section">
      <div className="leech-section-box">
        <h3 className="leech-section-title">Alimentary Canal</h3>
        <p className="leech-section-text">
          The alimentary canal is a <strong>complete, straight tube</strong> running from the mouth to the anus. It
          is highly specialized for blood storage and slow digestion — a key adaptation to the sanguivorous
          (blood-feeding) lifestyle.
        </p>
        <div className="leech-grid-2">
          <div className="dig-flow-column">
            {DIGESTIVE_FLOW.map((s) => (
              <div className="dig-flow-step" key={s.num}>
                <div className="dig-step-number">{s.num}</div>
                <div className="dig-step-content">
                  <div className="dig-step-header">
                    <strong className="dig-step-label">{s.label}</strong>
                    <span className="dig-step-badge">{s.badge}</span>
                  </div>
                  <p className="dig-step-text">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="dig-right-col">
            <div className="dig-image-frame">
              <img
                src={leechWikiImages['leech-digestive'] || generatedArt('leech-digestive', 'Digestive System of Leech')}
                alt="Digestive System of Leech"
                className="dig-img"
              />
              <p className="dig-img-caption">Detailed Alimentary Anatomy</p>
            </div>
            <div className="dig-facts-card">
              <h4 className="leech-section-title" style={{ fontSize: '1rem' }}>
                Sanguivorous Adaptations
              </h4>
              <ul className="leech-section-list">
                <li>
                  <strong>Hirudin:</strong> Powerful anticoagulant that keeps blood liquid during and after
                  feeding. Used in modern medicine for microsurgery.
                </li>
                <li>
                  <strong>Blood storage:</strong> The crop can hold blood equal to <strong>5× the body weight</strong>,
                  allowing the leech to feed just once every few months.
                </li>
                <li>
                  <strong>Slow digestion:</strong> A single full blood meal can take up to{' '}
                  <strong>6–18 months</strong> to fully digest, extracting maximum nutrition.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="leech-section-box">
        <h3 className="leech-section-title">Feeding Mechanism — Step by Step</h3>
        <p className="leech-section-text">The feeding process is a remarkable sequence of attachment, incision, and suction:</p>
        <div className="dig-mechanism-grid">
          {FEEDING_MECHANISM.map((s, i) => (
            <div className="dig-mechanism-card" key={s.title}>
              <div className="dig-mech-icon">{s.icon}</div>
              <div className="dig-mech-step-num">{i + 1}</div>
              <strong className="dig-mech-title">{s.title}</strong>
              <p className="dig-mech-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="leech-callout leech-callout-fact">
        <strong>🏥 Medical Significance</strong>
        Leech therapy (hirudotherapy) has been used for over 2,500 years. Today, medicinal leeches (
        <em>Hirudo medicinalis</em>) are FDA-approved medical devices used after reconstructive surgery to relieve
        venous congestion and promote blood flow in reattached tissues.
      </div>
    </section>
  );
}

function RespiratorySection() {
  return (
    <section className="rs-respiratory-section" id="respiratory-system">
      <div className="rs-respiratory-container">
        <div className="rs-respiratory-header">
          <h2 className="rs-section-title">Respiratory System</h2>
          <div className="rs-underline" />
        </div>
        <div className="rs-respiratory-grid">
          <div className="rs-respiratory-content">
            <div className="rs-respiratory-card rs-intro-card" id="rs-intro">
              <h3 className="rs-card-heading">&nbsp;</h3>
              <p className="rs-card-text">Leech has no special respiratory organs like gills or lungs.</p>
              <div className="rs-divider-line" />
              <p className="rs-scientific-name">Skin acts as the respiratory organ.</p>
            </div>
            <div className="rs-respiratory-card rs-mechanism-card">
              <div className="rs-icon-wrapper">🌬️</div>
              <div className="rs-info-col">
                <h3 className="rs-card-heading">Mechanism</h3>
                <p className="rs-card-text">
                  Exchange of respiratory gases takes place through <strong>diffusion</strong>.
                </p>
                <p className="rs-card-text">
                  The skin is kept moist and slimy by mucus secretion, which allows oxygen dissolved in water to
                  diffuse into the haemocoelic fluid.
                </p>
              </div>
            </div>
            <div className="rs-respiratory-card rs-transport-card">
              <div className="rs-icon-wrapper">🩸</div>
              <div className="rs-info-col">
                <h3 className="rs-card-heading">Gas Transport</h3>
                <p className="rs-card-text">
                  <strong>Haemoglobin</strong> dissolved in the haemocoelic fluid transports oxygen to all body parts.
                </p>
                <span className="rs-highlight-badge">CO₂ diffuses out through skin</span>
              </div>
            </div>
          </div>
          <div className="rs-respiratory-image-col">
            <div className="rs-image-frame">
              <img
                src={leechWikiImages['leech-respiratory'] || generatedArt('leech-respiratory', 'Leech Respiration')}
                alt="Leech Respiration"
                className="rs-respiratory-img"
              />
              <span className="rs-img-caption">Cutaneous Respiration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CirculatorySection() {
  return (
    <section className="cs-circulatory-section">
      <div className="cs-circulatory-container">
        <div className="cs-circulatory-header">
          <h2 className="cs-section-title">Circulatory System</h2>
          <div className="cs-underline" />
        </div>
        <div className="cs-circulatory-grid">
          <div className="cs-circulatory-content">
            <div className="cs-intro-box">
              <h3 className="cs-intro-heading">Haemocoelic System</h3>
              <p className="cs-intro-text">Leech has a haemocoelic circulatory system.</p>
            </div>
            <div className="cs-feature-card cs-vessel-card">
              <div className="cs-icon-circle">🚫</div>
              <p className="cs-feature-text">Blood vessels are absent</p>
            </div>
            <div className="cs-channels-container">
              <h4 className="cs-channels-title">Blood flows through four longitudinal haemocoelic channels:</h4>
              <div className="cs-channels-list">
                <div className="cs-channel-item">
                  <span className="cs-dot" />
                  <p>One dorsal</p>
                </div>
                <div className="cs-channel-item">
                  <span className="cs-dot" />
                  <p>One ventral</p>
                </div>
                <div className="cs-channel-item cs-highlight-item">
                  <span className="cs-heart-icon">❤️</span>
                  <p>
                    Two lateral<span className="cs-sub-note"> (act like hearts)</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="cs-feature-card cs-connection-card">
              <div className="cs-icon-circle">🔗</div>
              <p className="cs-feature-text">Channels connect posteriorly in the 26th segment</p>
            </div>
          </div>
          <div className="cs-circulatory-image-col">
            <div className="cs-image-frame">
              <img
                src={leechWikiImages['leech-circulatory'] || generatedArt('leech-circulatory', 'Circulatory System of Leech')}
                alt="Circulatory System of Leech"
                className="cs-circulatory-img"
              />
              <span className="cs-img-caption">Haemocoelic Channels</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NervousSection() {
  return (
    <section className="nerv-nervous-section" id="leech-nervous-system">
      <div className="nerv-nervous-container">
        <div className="nerv-nervous-header">
          <h2 className="nerv-section-title">Nervous System</h2>
          <div className="nerv-title-underline" />
        </div>
        <div className="nerv-nervous-grid">
          <div className="nerv-nervous-content">
            <p className="nerv-nervous-intro">The nervous system consists of:</p>
            <div className="nerv-nerve-list">
              {NERVE_CHAIN.map((n, i) => (
                <Fragment key={n.name}>
                  <div className="nerv-nerve-card">
                    <div className="nerv-node-point" />
                    <div className="nerv-nerve-info">
                      <h3 className="nerv-nerve-name">{n.name}</h3>
                      {n.desc && <p className="nerv-nerve-desc">{n.desc}</p>}
                    </div>
                  </div>
                  {i < NERVE_CHAIN.length - 1 && <div className="nerv-connector-line" />}
                </Fragment>
              ))}
            </div>
            <div className="nerv-nervous-footer">
              <div className="nerv-pulse-icon">⚡</div>
              <p>This system controls movement, sensation, and feeding.</p>
            </div>
          </div>
          <div className="nerv-nervous-image-col">
            <div className="nerv-image-frame">
              <img
                src={leechWikiImages['leech-nervous'] || generatedArt('leech-nervous', 'Nervous System of Leech')}
                alt="Nervous System of Leech"
                className="nerv-nervous-img"
              />
              <span className="nerv-img-caption">Nervous System</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExcretorySection() {
  return (
    <section className="es-excretory-section">
      <div className="es-excretory-container">
        <div className="es-excretory-header">
          <h2 className="es-section-title">Excretory System</h2>
          <div className="es-title-underline" />
        </div>
        <div className="es-excretory-grid">
          <div className="es-excretory-content">
            <div className="es-info-card">
              <div className="es-icon-badge">💧</div>
              <p className="es-main-text">
                Excretion occurs through <strong>17 pairs of metanephridia</strong>, present in segments{' '}
                <strong>6–22</strong>.
              </p>
            </div>
            <div className="es-components-container">
              <h3 className="es-sub-heading">Each nephridium has:</h3>
              <div className="es-component-list">
                <div className="es-component-card" style={{ animationDelay: '0.2s' }}>
                  <span className="es-dot-indicator" />
                  <p className="es-component-name">A funnel</p>
                </div>
                <div className="es-component-card" style={{ animationDelay: '0.3s' }}>
                  <span className="es-dot-indicator" />
                  <p className="es-component-name">A coiled tubule</p>
                </div>
                <div className="es-component-card" style={{ animationDelay: '0.4s' }}>
                  <span className="es-dot-indicator" />
                  <p className="es-component-name">
                    An external opening <span className="es-highlight">(nephridiopore)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="es-excretory-image-col">
            <div className="es-image-frame">
              <img
                src={leechWikiImages['leech-excretory'] || generatedArt('leech-excretory', 'Excretory System of Leech')}
                alt="Excretory System of Leech"
                className="es-excretory-img"
              />
              <span className="es-img-caption">Nephridium Structure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReproductiveSection() {
  const [tab, setTab] = useState('male');
  const organs = tab === 'male' ? MALE_ORGANS : FEMALE_ORGANS;
  return (
    <section className="reproductive-section" id="reproductive-system">
      <div className="reproductive-container">
        <div className="reproductive-header">
          <h2 className="section-title">Reproductive System</h2>
        </div>
        <div className="reproductive-grid">
          <div className="reproductive-content">
            <div className="hermaphrodite-card">
              <div className="icon-badge">⚥</div>
              <p className="intro-text">
                Leech is <strong>hermaphrodite</strong> because both the male and female reproductive organs are
                present in the same animal.
              </p>
            </div>
            <div className="system-tabs">
              <button className={`tab-btn ${tab === 'male' ? 'active' : ''}`} onClick={() => setTab('male')}>
                Male Reproductive System
              </button>
              <button className={`tab-btn ${tab === 'female' ? 'active' : ''}`} onClick={() => setTab('female')}>
                Female Reproductive System
              </button>
            </div>
            <div className="system-content-area">
              <div className={`system-group ${tab}-group fade-in`}>
                <div className="organ-list">
                  {organs.map((o) => (
                    <div className="organ-card" key={o.name}>
                      <h4 className="organ-name">{o.name}</h4>
                      <p>{o.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="reproductive-image-col">
            <div className="image-frame">
              <img
                src={leechWikiImages['leech-reproductive'] || generatedArt('leech-reproductive', 'Reproductive System of Leech')}
                alt="Reproductive System of Leech"
                className="reproductive-img"
              />
              <span className="img-caption">Reproductive System</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParasiticSection() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i === PARASITIC_GALLERY.length - 1 ? 0 : i + 1));
  const prev = () => setIdx((i) => (i === 0 ? PARASITIC_GALLERY.length - 1 : i - 1));
  const current = PARASITIC_GALLERY[idx];
  return (
    <section className="parasitic-section">
      <div className="parasitic-container">
        <div className="parasitic-header">
          <h2 className="section-title">Parasitic Adaptations Of Leech</h2>
          <div className="title-underline" />
        </div>
        <div className="parasitic-grid">
          <div className="parasitic-content">
            <div className="intro-card">
              <p className="intro-text">
                A leech lives as a parasite, feeding on animal blood using special adaptations to attach, suck,
                store, and digest it slowly.
              </p>
            </div>
            <div className="adaptations-list">
              {PARASITIC_ADAPTATIONS.map((a, i) => (
                <div
                  className={`adaptation-card ${a.fullWidth ? 'full-width-card' : ''}`}
                  style={{ animationDelay: `${0.1 * (i + 1)}s` }}
                  key={a.title}
                >
                  <div className="icon-box">{a.icon}</div>
                  <div className="card-info">
                    <h4 className="adaptation-title">{a.title}</h4>
                    <p>{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="parasitic-image-col">
            <div className="image-frame">
              <div className="slider-wrapper">
                <button className="slider-btn prev-btn" onClick={prev}>
                  ❮
                </button>
                <button className="slider-btn next-btn" onClick={next}>
                  ❯
                </button>
                <img src={current.src} alt={current.alt} className="parasitic-img" />
              </div>
              <span className="img-caption">{current.caption}</span>
              <div className="slider-dots">
                {PARASITIC_GALLERY.map((g, i) => (
                  <span className={`slider-dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} key={g.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function LeechLayout() {
  const [activeId, setActiveId] = useState('taxonomy');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 80px)');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const sections = [
    { id: 'taxonomy', label: 'Taxonomy', icon: Tag, Component: TaxonomySection },
    { id: 'morphology', label: 'External Morphology', icon: Bug, Component: MorphologySection },
    { id: 'anatomy', label: 'Interactive Anatomy', icon: Search, Component: InteractiveAnatomySection },
    { id: 'bodywall', label: 'Body Wall', icon: Layers, Component: BodyWallSection },
    { id: 'locomotion', label: 'Locomotion', icon: Footprints, Component: LocomotionSection },
    { id: 'digestive', label: 'Digestive System', icon: Droplets, Component: DigestiveSection },
    { id: 'respiratory', label: 'Respiratory System', icon: Wind, Component: RespiratorySection },
    { id: 'circulatory', label: 'Circulatory System', icon: HeartPulse, Component: CirculatorySection },
    { id: 'nervous', label: 'Nervous System', icon: Brain, Component: NervousSection },
    { id: 'excretory', label: 'Excretory System', icon: Trash2, Component: ExcretorySection },
    { id: 'reproductive', label: 'Reproductive System', icon: Dna, Component: ReproductiveSection },
    { id: 'parasitic', label: 'Parasitic Adaptations', icon: Syringe, Component: ParasiticSection },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const prevSection = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const nextSection = activeIndex < sections.length - 1 ? sections[activeIndex + 1] : null;

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('.foo-zl-footer');
      const hero = document.querySelector('.leech-hero-banner');
      const y = window.scrollY;
      if (hero) setSidebarVisible(y > hero.offsetHeight * 0.7);
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
    const main = document.querySelector('.leech-zoo-main-content');
    if (main) {
      const targetY = main.getBoundingClientRect().top + window.pageYOffset - 80;
      if (window.scrollY > targetY) window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, [activeId]);

  const ActiveComponent = sections[activeIndex].Component;

  return (
    <div className="leech-zoopage">
      <section className="leech-hero-banner">
        <div className="leech-hero-container">
          <div className="leech-hero-content">
            <span className="leech-taxonomy-tag">Phylum Annelida · Class Hirudinea</span>
            <h1 className="leech-hero-title">Indian Cattle Leech</h1>
            <p className="leech-hero-subtitle">Hirudinaria granulosa</p>
            <div className="leech-taxonomy-grid">
              <div className="leech-tax-item">
                <span className="leech-tax-label">Habitat</span>
                <span className="leech-tax-value">Freshwater</span>
              </div>
              <div className="leech-tax-item">
                <span className="leech-tax-label">Diet</span>
                <span className="leech-tax-value">Sanguivorous</span>
              </div>
              <div className="leech-tax-item">
                <span className="leech-tax-label">Region</span>
                <span className="leech-tax-value">South Asia</span>
              </div>
            </div>
            <p className="leech-hero-description">
              An ectoparasitic annelid inhabiting ponds, swamps, and lakes across the Indian subcontinent. Known for
              its anticoagulant secretion <em>hirudin</em>, used in modern medicine and microsurgery.
            </p>
          </div>
          <div className="leech-hero-visual">
            <div className="leech-hero-image-wrapper">
              <img
                src={leechWikiImages['leech-hero'] || generatedArt('leech-hero', 'Indian Cattle Leech')}
                alt="Indian Cattle Leech - Hirudinaria granulosa"
                className="leech-hero-img"
              />
            </div>
          </div>
        </div>
        <div className="leech-hero-bottom-fade" />
        <div
          className="leech-scroll-indicator"
          onClick={() => {
            const main = document.querySelector('.leech-zoo-main-content');
            if (main) main.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="leech-mouse">
            <div className="leech-wheel" />
          </div>
          <div className="leech-arrow-down" />
        </div>
      </section>

      <div className="leech-zoo-app-container">
        <div className={`leech-mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
        <aside
          ref={sidebarRef}
          className={`leech-zoo-sidebar ${mobileOpen ? 'open' : ''} ${sidebarVisible ? '' : 'hidden'}`}
          style={{ height: sidebarHeight }}
        >
          <div className="leech-sidebar-header">
            <div className="leech-progress-label">Progress</div>
            <div className="leech-progress-track">
              <div className="leech-progress-fill" style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }} />
            </div>
          </div>
          <nav className="leech-sidebar-nav">
            {sections.map((s) => {
              const IconCmp = s.icon;
              return (
                <button key={s.id} className={`leech-nav-btn ${activeId === s.id ? 'active' : ''}`} onClick={() => setActiveId(s.id)}>
                  <span className="leech-nav-icon">
                    <IconCmp size={18} />
                  </span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="leech-zoo-main-content">
          <button className="leech-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open Menu">
            <Menu size={24} />
          </button>
          <div className="leech-content-card">
            <div className="leech-content-header">
              <h2 className="leech-header-title">{sections[activeIndex].label}</h2>
              <div className="leech-header-nav-buttons">
                {prevSection && (
                  <button className="leech-nav-action-btn leech-prev-btn" onClick={() => setActiveId(prevSection.id)}>
                    ← Prev
                  </button>
                )}
                {nextSection && (
                  <button className="leech-nav-action-btn leech-next-btn" onClick={() => setActiveId(nextSection.id)}>
                    Next →
                  </button>
                )}
              </div>
            </div>
            <div className="leech-component-wrapper">
              <ActiveComponent />
            </div>
          </div>
        </main>
      </div>

      <button
        className={`patt-back-to-top ${showBackToTop ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--leech-primary), var(--leech-primary-vivid, #65a30d))',
          color: 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? 'auto' : 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 6px 20px rgba(61,107,10,0.25)',
          zIndex: 90,
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}
