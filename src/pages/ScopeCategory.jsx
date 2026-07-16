import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  Search,
  Filter,
  IndianRupee,
  Heart,
  X,
  FileText,
  Timer,
  Target,
  Microscope,
  Trees,
  Waves,
  Stethoscope,
  Dna,
  Brain,
  Fingerprint,
  Globe,
  Beaker,
  GraduationCap,
  Landmark,
  HeartPulse,
  Building2,
} from 'lucide-react';
import scopeCategories from '../data/scopeCategories.json';
import courseDetails from '../data/scopeCourseDetails.json';

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

const LEVELS = {
  bsc: { label: 'BACHELOR', color: '#34d399' },
  msc: { label: 'MASTER', color: '#a78bfa' },
  phd: { label: 'DOCTORAL', color: '#fb923c' },
};

function PathwayModal({ career, category, onClose }) {
  const [selected, setSelected] = useState(null);

  const openCourse = (name) => {
    const detail = courseDetails[name] || {
      exp: `Advanced specialized study in ${name} involving research and professional practice.`,
      dur: '2–3 Years',
      imp: 'Critical for professional specialization and significant career advancement.',
    };
    setSelected({ name, ...detail });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content--dark" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close modal-close--white" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="modal-header">
          <div className="modal-header-subtitle" style={{ color: category.theme.primary }}>
            Career Pathway Explorer
          </div>
          <h2 className="modal-header-title">{career.title}</h2>
          <p className="modal-header-desc">{career.desc}</p>
        </div>
        <div className="pathway-legend">
          {Object.entries(LEVELS).map(([key, lvl]) => (
            <div className="legend-item" key={key}>
              <span className="legend-dot" style={{ background: lvl.color }} />
              <span>{lvl.label}</span>
            </div>
          ))}
        </div>
        <div className="pathway-explorer-wrapper dark-theme">
          <div className="taxonomy-instruction">CLICK A COURSE TO VIEW DETAILS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '20px 10px' }}>
            {['bsc', 'msc', 'phd'].map((key) => (
              <div key={key}>
                <div
                  style={{
                    textAlign: 'center',
                    fontWeight: 700,
                    color: LEVELS[key].color,
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    marginBottom: 10,
                  }}
                >
                  {LEVELS[key].label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                  {career[key].map((course) => (
                    <div key={course} className={`course-node ${key}`} onClick={() => openCourse(course)}>
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {selected && (
          <div className="info-sidebar">
            <div className="info-sidebar-handle" />
            <div className="info-sidebar-header">
              <div>
                <h4 className="info-course-name">{selected.name}</h4>
                <div className="info-course-label" style={{ color: category.theme.primary }}>
                  Course Insights
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="info-close-btn">
                <X size={16} />
              </button>
            </div>
            <div className="info-sidebar-body">
              <div className="info-section">
                <div className="info-section-label">
                  <FileText size={13} /> Overview
                </div>
                <p className="info-section-text">{selected.exp}</p>
              </div>
              <div className="info-stats-grid">
                <div className="info-stat-card">
                  <div className="info-stat-label">
                    <Timer size={12} /> Duration
                  </div>
                  <div className="info-stat-value">{selected.dur}</div>
                </div>
                <div className="info-stat-card">
                  <div className="info-stat-label">
                    <Target size={12} /> Outcome
                  </div>
                  <div className="info-stat-desc">{selected.imp}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="salary-footer" style={{ background: category.theme.gradient || category.theme.primary }}>
          <div className="salary-footer-content">
            <div className="salary-footer-main">
              <div className="salary-icon">₹</div>
              <span>
                Academic Outcome Value: <strong>{career.salary}</strong>
              </span>
            </div>
            <div className="salary-footer-note">* Indicative salary ranges based on industry averages</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScopeCategory() {
  const { categoryId } = useParams();
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [saved, setSaved] = useState({});

  const category = scopeCategories.find((c) => c.id === categoryId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) return <div className="loading-state">Loading...</div>;

  const Icon = ICONS[category.icon] || Microscope;

  const openCareer = (career) => {
    setSelectedCareer(career);
    setModalOpen(true);
  };

  const toggleSaved = (e, title) => {
    e.stopPropagation();
    setSaved((s) => ({ ...s, [title]: !s[title] }));
  };

  const filteredCareers = category.careers.filter((c) => {
    const matches =
      c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    const type = c.title.toLowerCase().includes('research') || c.phd[0] !== 'Optional' ? 'Research' : 'Industrial';
    return matches && (filter === 'All' || type === filter);
  });

  return (
    <div className="scope-detail-container" style={{ '--theme-primary': category.theme.primary }}>
      <Link to="/scopes" className="scope-back-btn">
        <ArrowLeft size={20} />
        <span>Back to All Scopes</span>
      </Link>
      <header
        className="scopes-header"
        style={{ textAlign: 'center', marginBottom: 24, padding: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
          <div
            className="scope-icon-wrapper"
            style={{
              margin: 0,
              width: 40,
              height: 40,
              background: category.theme.primary,
              color: 'white',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 16px -4px ${category.theme.primary}4D`,
            }}
          >
            <Icon size={20} strokeWidth={2} />
          </div>
          <h1 style={{ fontSize: '1.75rem', margin: 0, letterSpacing: '-0.03em', fontWeight: 900, color: '#0f172a', lineHeight: 1.15 }}>
            {category.name.replace(/[^\w\s&]/g, '').trim()}
          </h1>
        </div>
        <p style={{ maxWidth: 560, fontSize: '0.9rem', color: '#334155', fontWeight: 500, lineHeight: 1.6, margin: '0 auto' }}>
          {category.description}
        </p>
      </header>
      <div className="category-filters" style={{ maxWidth: 760, margin: '0 auto 28px', padding: '0 16px', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: 240, maxWidth: 360 }}>
          <Search style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={16} />
          <input
            type="text"
            placeholder={`Search ${category.careers.length} careers...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 16px 11px 38px',
              borderRadius: 100,
              border: '1px solid #e2e8f0',
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
              fontSize: '0.88rem',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              color: '#0f172a',
              fontWeight: 500,
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', padding: 5, borderRadius: 100, border: '1px solid #e2e8f0' }}>
          {['All', 'Research', 'Industrial'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '7px 16px',
                borderRadius: 100,
                border: 'none',
                background: filter === s ? category.theme.primary : 'transparent',
                color: filter === s ? 'white' : '#475569',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.8rem',
              }}
            >
              {s === 'All' ? <Filter size={13} /> : null}
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="careers-grid">
        {filteredCareers.map((c, i) => {
          const type = c.title.toLowerCase().includes('research') || c.phd[0] !== 'Optional' ? 'Research' : 'Industrial';
          return (
            <div key={c.title} className="career-modern-card" style={{ animationDelay: `${i * 0.04}s` }} onClick={() => openCareer(c)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <div className="career-badge" style={{ background: `${category.theme.primary}14`, color: category.theme.primary, padding: '3px 9px', borderRadius: 6, fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Top Choice
                  </div>
                  <div className="career-badge" style={{ background: '#e2e8f0', color: '#334155', padding: '3px 9px', borderRadius: 6, fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {type}
                  </div>
                </div>
                <button
                  onClick={(e) => toggleSaved(e, c.title)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: saved[c.title] ? '#ef4444' : '#cbd5e1', transition: 'all 0.3s ease', padding: 0, marginTop: 1 }}
                  title={saved[c.title] ? 'Saved' : 'Save career'}
                >
                  <Heart size={16} fill={saved[c.title] ? '#ef4444' : 'none'} strokeWidth={2} />
                </button>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', lineHeight: 1.3, letterSpacing: '-0.015em' }}>
                {c.title}
              </h3>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#334155', fontSize: '0.85rem', fontWeight: 800, marginBottom: 12, background: '#f8fafc', padding: '3px 9px', borderRadius: 6 }}>
                <IndianRupee size={13} />
                <span>{c.salary}</span>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#334155', margin: '0 0 18px', flexGrow: 1, fontWeight: 500 }}>{c.desc}</p>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingTop: 14, borderTop: '1px solid #f1f5f9' }} className="card-action-trigger-container">
                <span style={{ color: '#334155', fontWeight: 700, fontSize: '0.8rem' }}>View Pathway</span>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${category.theme.primary}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: category.theme.primary, transition: 'all 0.3s ease' }} className="explore-arrow">
                  <ChevronRight size={14} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modalOpen && (
        <PathwayModal career={selectedCareer} category={category} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
