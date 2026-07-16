import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ChevronRight,
  Microscope,
  Trees,
  Waves,
  Stethoscope,
  Dna,
  Search,
  Brain,
  Fingerprint,
  Globe,
  Beaker,
  GraduationCap,
  Landmark,
  HeartPulse,
  Building2,
  Heart,
} from 'lucide-react';
import scopeCategories from '../data/scopeCategories.json';

const ICONS = {
  Microscope,
  Trees,
  Waves,
  Stethoscope,
  Dna,
  Search,
  Brain,
  Fingerprint,
  Globe,
  Beaker,
  GraduationCap,
  Landmark,
  HeartPulse,
  Building2,
  Heart,
};

export default function Scopes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="scopes-container">
      <div className="scopes-bg-blob blob-1"></div>
      <div className="scopes-bg-blob blob-2"></div>
      <header className="scopes-header">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            background: 'rgba(31, 170, 89, 0.1)',
            borderRadius: 100,
            color: '#065f46',
            fontWeight: 800,
            marginBottom: 18,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          <Sparkles size={14} />
          <span>Future-Proof Careers</span>
        </div>
        <h1>Zoology & Life Science Scopes</h1>
        <p>
          Explore specialized career pathways, global opportunities, and educational requirements tailored for the
          modern scientist.
        </p>
      </header>
      <div className="scopes-grid">
        {scopeCategories.map((s, i) => {
          const Icon = ICONS[s.icon] || Microscope;
          return (
            <Link
              key={s.id}
              to={`/scopes/${s.id}`}
              className="scope-card group"
              style={{ '--card-primary': s.theme.primary, animationDelay: `${i * 0.05}s` }}
            >
              <div
                className="scope-icon-wrapper"
                style={{ color: s.theme.primary, background: `${s.theme.primary}14` }}
              >
                <Icon size={24} strokeWidth={2} />
              </div>
              <h2>{s.name.replace(/[^\w\s&]/g, '').trim()}</h2>
              <div
                className="scope-footer"
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingTop: 16,
                  borderTop: '1px solid #f1f5f9',
                }}
              >
                <span style={{ color: '#334155', fontSize: '0.8rem', fontWeight: 700 }}>
                  {s.careers.length} Paths
                </span>
                <div
                  className="card-action-arrow"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#f8fafc',
                    color: s.theme.primary,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ChevronRight size={15} strokeWidth={2.5} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
