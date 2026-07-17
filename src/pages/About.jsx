import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
const CAROUSEL_IMAGES = [
  'https://res.cloudinary.com/duibfmcw1/image/upload/v1783550009/WhatsApp_Image_2026-07-07_at_4.29.38_PM_jq9dqp.jpg',
  'https://res.cloudinary.com/duibfmcw1/image/upload/v1783550031/WhatsApp_Image_2026-07-07_at_4.29.38_PM_1_myxskv.jpg',
  'https://res.cloudinary.com/duibfmcw1/image/upload/v1783743848/ceo_image_boralg.jpg',
];

export default function About() {
  const location = useLocation();
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((s) => (s + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoplay]);

  const goTo = (i) => {
    setActive(i);
    startAutoplay();
  };
  const next = () => {
    setActive((s) => (s + 1) % CAROUSEL_IMAGES.length);
    startAutoplay();
  };
  const prev = () => {
    setActive((s) => (s - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
    startAutoplay();
  };

  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else setTimeout(scrollToHash, 300);
      }
    };
    scrollToHash();
  }, [location]);

  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="about-hero-content">
          <span className="about-hero-badge">About Us</span>
          <h1>About ZooLearn</h1>
          <p>A specialized educational platform dedicated to zoology, animal taxonomy, and biological sciences.</p>
        </div>
      </section>

      <section className="about-section about-intro-section">
        <div className="about-intro-grid">
          <div className="about-intro-card">
            <div className="intro-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1 4 3 6 3s6-2 6-3v-5" />
              </svg>
            </div>
            <h3>For Learners</h3>
            <p>
              ZooLearn is designed to support school students, NEET aspirants, undergraduate learners, and
              early-stage researchers by providing structured, syllabus-aligned, and scientifically accurate content.
            </p>
          </div>
          <div className="about-intro-card">
            <div className="intro-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3>Strong Foundation</h3>
            <p>
              The platform focuses on building a strong academic foundation in zoology through carefully curated
              content based on NCERT guidelines and modern taxonomy, covering Class 10 through NEET syllabi.
            </p>
          </div>
          <div className="about-intro-card">
            <div className="intro-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <h3>Detailed Content</h3>
            <p>
              ZooLearn provides fully completed content on human evolution, evolutionary stages, and detailed
              anatomical studies of the leech, cockroach, and rabbit — the most frequently tested zoology topics.
            </p>
          </div>
          <div className="about-intro-card">
            <div className="intro-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Future-Ready</h3>
            <p>
              Built with a long-term vision of integrating intelligent learning tools. AI-based features are under
              development and will be introduced in future phases.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-mission-section">
        <div className="section-label">
          <span className="section-label-badge">Our Purpose</span>
          <h2>Our Mission</h2>
          <p className="section-label-sub">
            ZooLearn's mission is to make zoology learning clear, structured, and reliable for every learner.
          </p>
        </div>
        <div className="mission-items">
          {[
            'Provide complete and syllabus-accurate zoology content',
            'Follow modern and accepted taxonomic classification systems',
            'Simplify complex zoological concepts without losing scientific depth',
            'Support students in academic learning and competitive exam preparation',
            'Build a platform that gradually evolves with technology while maintaining academic integrity',
          ].map((text) => (
            <div className="mission-item" key={text}>
              <div className="mission-item-marker"></div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section about-future-section">
        <div className="section-label">
          <span className="section-label-badge">Roadmap</span>
          <h2>Future Plans</h2>
        </div>
        <div className="future-timeline">
          {[
            { title: 'AI-Powered Chatbot', desc: 'Doubt-solving and concept clarification with intelligent AI' },
            { title: 'Smart Quizzes', desc: 'AI-powered quizzes with Easy, Medium, and Hard difficulty levels' },
            { title: 'Personalized Learning', desc: 'Custom recommendations based on your learning patterns' },
            { title: 'Advanced Modules', desc: 'Certification-based courses and advanced zoology modules' },
            { title: 'Interactive Tools', desc: 'Taxonomy exploration and comparison tools for deeper learning' },
            { title: 'Community & Experts', desc: 'Community learning features and expert sessions' },
          ].map((item) => (
            <div className="future-item" key={item.title}>
              <div className="future-item-dot"></div>
              <div className="future-item-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section directors-section" id="directors">
        <div className="directors-header">
          <span className="directors-badge">Leadership</span>
          <h2>Directors of ZooLearn</h2>
          <p className="directors-subtitle">Meet the visionary leaders guiding ZooLearn Academy's mission and growth.</p>
        </div>
        <div className="directors-grid">
          <div className="director-card" id="Amirtharaj-Natarajan">
            <div className="director-image-wrap">
              <img
                loading="lazy"
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1770016570/amirtharaj-removebg-preview_nhyhyp.png"
                alt="Amirtharaj Natarajan"
              />
            </div>
            <div className="director-info">
              <h3>Amirtharaj Natarajan</h3>
              <span className="director-role">3D Developer &amp; Guide</span>
              <p>
                Amirtharaj Natarajan is a 3D Developer and Guide at ZooLearn Academy. Since December 2025, he has
                been leading the 3D team and helping employees build practical 3D and AR/VR skills.
              </p>
            </div>
          </div>
          <div className="director-card" id="Dr-Krishnamoorthy">
            <div className="director-image-wrap">
              <img
                loading="lazy"
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1783748019/krishnamoorthy_d8wy5s.png"
                alt="Dr. R. Krishnamoorthy"
              />
            </div>
            <div className="director-info">
              <h3>Dr. R. Krishnamoorthy, Ph.D.</h3>
              <span className="director-role">Content Verification Advisor</span>
              <p>
                Dr. R. Krishnamoorthy, Ph.D., is an experienced zoologist, researcher, and recipient of multiple
                national research awards. He serves as the Content Verification Advisor at ZooLearn Academy,
                ensuring all learning materials are accurate and authenticated.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section achievements-section" id="achievements">
        <div className="achievements-header">
          <span className="achievements-badge">Recognition</span>
          <h2>Achievements</h2>
        </div>
        <div className="achievement-showcase">
          <div className="achievement-carousel">
            <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="carousel-viewport">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${active * 100}%)` }}
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  const delta = touchStartX.current - e.changedTouches[0].clientX;
                  if (Math.abs(delta) > 50) (delta > 0 ? next() : prev());
                }}
              >
                {CAROUSEL_IMAGES.map((src, i) => (
                  <div className="carousel-slide" key={i}>
                    <img loading="lazy" src={src} alt={`Luminary Award 2026 - Photo ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            <button className="carousel-btn carousel-next" onClick={next} aria-label="Next image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className="carousel-dots">
              {CAROUSEL_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === active ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="achievement-content">
            <div className="achievement-award-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 22V8a2 2 0 0 0-2-2H6v6.83a8 8 0 0 0 4 6.93V22" />
                <path d="M14 22V8a2 2 0 0 1 2-2h2v6.83a8 8 0 0 1-4 6.93V22" />
              </svg>
            </div>
            <h3>Luminary Award 2026</h3>
            <p>
              ZooLearn Academy was honored with the <strong>Luminary Award 2026</strong> for its outstanding
              contribution to innovative education, recognizing its commitment to transforming learning through
              technology and creativity.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-careers-section">
        <div className="section-label">
          <span className="section-label-badge">Join Us</span>
          <h2>Careers</h2>
          <p className="section-label-sub">
            ZooLearn offers opportunities for individuals who want to contribute to the future of science education.
          </p>
        </div>
        <div className="careers-grid">
          {[
            'Zoology and life science content development',
            'Educational research and curriculum planning',
            'Software development and platform engineering',
            'AI and educational technology',
            'Scientific illustration and academic design',
          ].map((text) => (
            <div className="career-item" key={text}>
              <div className="career-bullet"></div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section about-press-section">
        <div className="section-label">
          <span className="section-label-badge">Media</span>
          <h2>Press Kit</h2>
          <p className="section-label-sub">
            The ZooLearn Press Kit provides official information for media, educators, collaborators, and partners.
          </p>
        </div>
        <div className="press-items">
          {[
            'Platform overview and academic focus',
            'Current content coverage and future roadmap',
            'Brand descriptions and usage details',
            'Media and contact information',
          ].map((text) => (
            <div className="press-item" key={text}>
              <div className="press-bullet"></div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
