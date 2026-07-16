import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generatedArt } from '../utils/generatedArt';

const POSTS = [
  {
    id: 'giraffe',
    slug: '/blog/giraffe',
    category: 'World Giraffe Day',
    categoryIcon: '🦒',
    title: 'World Giraffe Day',
    subtitle: 'The Tallest Story Ever Told',
    description:
      'Celebrate the longest day of the year with the tallest animal on Earth. Explore 24 million years of evolutionary history, the science behind the iconic neck, four distinct species, and the silent extinction threatening these gentle giants.',
    image: generatedArt('world-giraffe-day-post', 'World Giraffe Day'),
    tags: ['Evolution', 'Conservation', 'Taxonomy', 'Africa'],
    stats: [
      { label: 'Neck', value: '2.4 m' },
      { label: 'Heart', value: '11 kg' },
      { label: 'Evolution', value: '24 Mya' },
    ],
    accentColor: '#2f7432',
    accentLight: '#dcfce7',
    featured: true,
  },
  {
    id: 'meerkat',
    slug: '/blog/meerkat',
    category: 'World Meerkat Day',
    categoryIcon: '🐾',
    title: 'World Meerkat Day',
    subtitle: 'The Social Sentinels of the Desert',
    description:
      'Discover the fascinating social structures, survival strategies, and complex communication of meerkats in the harsh Kalahari Desert environment.',
    image: generatedArt('world-meerkat-day-post', 'World Meerkat Day'),
    tags: ['Behavior', 'Social Structure', 'Desert', 'Mammals'],
    stats: [
      { label: 'Weight', value: '731 g' },
      { label: 'Lifespan', value: '12 yrs' },
      { label: 'Group Size', value: '30' },
    ],
    accentColor: '#d97706',
    accentLight: '#fef3c7',
    featured: false,
  },
];

const COMING_SOON = [
  {
    id: 'elephant',
    icon: '🐘',
    title: 'The Memory Keepers',
    desc: 'Inside the extraordinary minds of African elephants.',
    tag: 'Elephants',
    color: '#475569',
  },
  {
    id: 'cheetah',
    icon: '🐆',
    title: 'Built for Speed',
    desc: 'How natural selection forged the fastest land animal.',
    tag: 'Cheetahs',
    color: '#b45309',
  },
  {
    id: 'octopus',
    icon: '🐙',
    title: 'Nine Brains, Three Hearts',
    desc: 'The alien intelligence of cephalopods.',
    tag: 'Marine Life',
    color: '#0e7490',
  },
];

export default function BlogIndex() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bl-page">
      <section className="bl-hero">
        <div className="bl-hero-bg-pattern"></div>
        <div className="bl-hero-container">
          <span className="bl-hero-eyebrow">ZooLearn Academy</span>
          <h1 className="bl-hero-title">
            The <em>Living World</em> Blog
          </h1>
          <p className="bl-hero-subtitle">
            Deep-dive science stories about evolution, behaviour, and the incredible biology of animals — told with
            detail that textbooks leave out.
          </p>
          <div className="bl-hero-badges">
            <span className="bl-badge">🧬 Evolution</span>
            <span className="bl-badge">🌍 Conservation</span>
            <span className="bl-badge">🔬 Biology</span>
            <span className="bl-badge">🦁 Wildlife</span>
          </div>
        </div>
      </section>

      <div className="bl-content-area">
        <section className="bl-section">
          <div className="bl-section-header">
            <h2 className="bl-section-title">
              <span className="bl-section-dot"></span>
              Published Articles
            </h2>
            <p className="bl-section-meta">
              {POSTS.length} article{POSTS.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <div className="bl-posts-grid">
            {POSTS.map((post) => (
              <article
                key={post.id}
                className={`bl-card ${post.featured ? 'bl-card--featured' : ''} ${
                  hovered === post.id ? 'bl-card--hovered' : ''
                }`}
                onClick={() => navigate(post.slug)}
                onMouseEnter={() => setHovered(post.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ '--bl-accent': post.accentColor, '--bl-accent-light': post.accentLight }}
              >
                <div className="bl-card-image-wrap">
                  <img src={post.image} alt={post.title} className="bl-card-img" />
                  <div className="bl-card-image-overlay"></div>
                  {post.featured && <span className="bl-card-featured-badge">⭐ Featured</span>}
                </div>
                <div className="bl-card-body">
                  <div className="bl-card-top">
                    <span
                      className="bl-card-category"
                      style={{ color: post.accentColor, background: post.accentLight }}
                    >
                      {post.categoryIcon} {post.category}
                    </span>
                  </div>
                  <h3 className="bl-card-title">{post.title}</h3>
                  <p className="bl-card-subtitle">{post.subtitle}</p>
                  <p className="bl-card-desc">{post.description}</p>
                  <div className="bl-card-stats">
                    {post.stats.map((stat, i) => (
                      <div className="bl-card-stat" key={i}>
                        <span className="bl-card-stat-val">{stat.value}</span>
                        <span className="bl-card-stat-lbl">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bl-card-tags">
                    {post.tags.map((tag) => (
                      <span className="bl-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="bl-read-btn" style={{ background: post.accentColor }}>
                    Read Article →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bl-section bl-coming-soon-section">
          <div className="bl-section-header">
            <h2 className="bl-section-title">
              <span className="bl-section-dot bl-section-dot--muted"></span>
              Coming Soon
            </h2>
            <p className="bl-section-meta">More stories in the pipeline</p>
          </div>
          <div className="bl-coming-grid">
            {COMING_SOON.map((item) => (
              <div className="bl-coming-card" key={item.id}>
                <div className="bl-coming-icon-wrap" style={{ background: item.color + '18' }}>
                  <span className="bl-coming-icon">{item.icon}</span>
                </div>
                <div className="bl-coming-body">
                  <span className="bl-coming-tag" style={{ color: item.color }}>
                    {item.tag}
                  </span>
                  <h4 className="bl-coming-title">{item.title}</h4>
                  <p className="bl-coming-desc">{item.desc}</p>
                </div>
                <div className="bl-coming-pill">Soon</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
