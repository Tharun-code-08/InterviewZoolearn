import { Link, useParams } from 'react-router-dom';
import { BookOpen, Microscope, Ruler, Network, Globe, Landmark } from 'lucide-react';
import { PHYLUM_LABELS, getSpecies, getAdjacentSpecies } from '../data/speciesIndex';

function FeatureRow(line) {
  const idx = line.indexOf(':');
  const label = idx >= 0 ? line.slice(0, idx).trim() : line;
  const value = idx >= 0 ? line.slice(idx + 1).trim() : '';
  return (
    <li key={label}>
      <strong>{label}:</strong>
      <span>{value}</span>
    </li>
  );
}

function GridItems({ items }) {
  return (
    <div className="phyl-grid-items">
      {items.map((item, i) => (
        <div className="phyl-grid-item" key={i}>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function SpeciesDetail() {
  const { phylum, slug } = useParams();
  const species = getSpecies(phylum, slug);

  if (!species) return <h2>Species not found</h2>;

  const { prev, next } = getAdjacentSpecies(phylum, slug);

  const classification = {};
  (species.classification || []).forEach((line) => {
    const [label, value] = line.split(':').map((s) => s.trim());
    classification[label] = value;
  });

  return (
    <div className="phyl-genus-sycon-container">
      <div className="phyl-hero">
        <div className="phyl-hero-nav">
          <div className="phyl-hero-nav">
            {prev && (
              <Link to={`/zoohub/${phylum}/${prev.slug}`} className="phyl-nav-btn prev">
                <span className="nav-arrow">←</span>
                <div className="nav-text">
                  <span className="nav-label">Previous</span>
                  <span className="nav-name">{prev.name}</span>
                </div>
              </Link>
            )}
            {next && (
              <Link to={`/zoohub/${phylum}/${next.slug}`} className="phyl-nav-btn next">
                <div className="nav-text">
                  <span className="nav-label">Next</span>
                  <span className="nav-name">{next.name}</span>
                </div>
                <span className="nav-arrow">→</span>
              </Link>
            )}
          </div>
        </div>
        <div className="phyl-hero-content">
          <div className="phyl-hero-text">
            <h1>
              <span className="phyl-scientific-name">{species.name}</span>
              <br />
              <span className="phyl-common-name">{species.scientificName}</span>
            </h1>
            <p>{species.description}</p>
          </div>
          <div className="phyl-hero-image">
            <img alt={species.name} src={species.image} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <div className="phyl-content-section">
        {species.introduction?.length > 0 && (
          <div className="scroll-reveal">
            <div className="phyl-card">
              <div className="phyl-card-header">
                <BookOpen className="lucide phyl-card-icon" aria-hidden="true" />
                <h2>Introduction</h2>
              </div>
              <GridItems items={species.introduction} />
            </div>
          </div>
        )}

        {species.features?.length > 0 && (
          <div className="scroll-reveal">
            <div className="phyl-card">
              <div className="phyl-card-header">
                <Microscope className="lucide phyl-card-icon" aria-hidden="true" />
                <h2>General Features</h2>
              </div>
              <ul className="phyl-features-list">{species.features.map(FeatureRow)}</ul>
            </div>
          </div>
        )}

        {(species.sizeStructure?.length > 0 || species['3d']) && (
          <div className="scroll-reveal">
            <div className="phyl-card">
              <div className="phyl-card-header">
                <Ruler className="lucide phyl-card-icon" aria-hidden="true" />
                <h2>Size &amp; Structure</h2>
              </div>
              <div className="phyl-side-by-side">
                <div className="phyl-grid-items" style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {species.sizeStructure?.map((item, i) => (
                    <div className="phyl-grid-item" style={{ padding: '15px 20px' }} key={i}>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                {species['3d'] && (
                  <div className="phyl-sketchfab-embed-wrapper" style={{ boxShadow: 'rgba(0,0,0,0.15) 0px 12px 30px' }}>
                    <iframe
                      title={`${species.name} 3D`}
                      src={species['3d']}
                      frameBorder="0"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {Object.keys(classification).length > 0 && (
          <div className="scroll-reveal">
            <div className="phyl-card phyl-tree-container">
              <div className="phyl-card-header" style={{ justifyContent: 'center' }}>
                <Network className="lucide phyl-card-icon" aria-hidden="true" style={{ color: 'var(--phyl-accent-yellow)' }} />
                <h2 style={{ color: 'var(--phyl-accent-yellow)' }}>Classification</h2>
              </div>
              <div className="phyl-tree">
                {Object.entries(classification).map(([level, value]) => (
                  <div className="phyl-tree-item" key={level}>
                    <span
                      data-level={level}
                      style={{ borderRadius: 50, border: 'none', background: 'white', boxShadow: 'rgba(0,0,0,0.08) 0px 8px 24px' }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {species.ecology?.length > 0 && (
          <div className="scroll-reveal">
            <div className="phyl-card">
              <div className="phyl-card-header">
                <Globe className="lucide phyl-card-icon" aria-hidden="true" />
                <h2>Ecology</h2>
              </div>
              <GridItems items={species.ecology} />
            </div>
          </div>
        )}

        {species.economy?.length > 0 && (
          <div className="scroll-reveal">
            <div className="phyl-card">
              <div className="phyl-card-header">
                <Landmark className="lucide phyl-card-icon" aria-hidden="true" />
                <h2>Economic Importance</h2>
              </div>
              <GridItems items={species.economy} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
