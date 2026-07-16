import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/taxonomy-tree', label: 'Taxonomy Tree' },
  { to: '/zoohub', label: 'ZooHub' },
  { to: '/scopes', label: 'Scopes' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  return (
    <header className={`hea-header ${menuOpen ? 'hea-menu-open' : ''}`}>
      <div className="hea-header-container">
        <div className="hea-left-section">
          <Link
            to="/"
            className={`hea-logo-section ${isActive('/') ? 'active' : ''}`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            <div className="hea-logo-wrapper">
              <img
                alt="ZooLearn Logo"
                className="hea-logo"
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"
              />
            </div>
          </Link>
          <button className="hea-search-btn" aria-label="Search" title="Search (Ctrl+K)">
            <Search size={18} aria-hidden="true" />
            <span className="hea-search-text">Search...</span>
          </button>
        </div>

        <button className="hea-menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen((v) => !v)}>
          <span className="hea-bar hea-bar-1"></span>
          <span className="hea-bar hea-bar-2"></span>
          <span className="hea-bar hea-bar-3"></span>
        </button>

        <nav className={`hea-nav-links ${menuOpen ? 'hea-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? 'hea-active' : ''}
              aria-current={isActive(link.to) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hea-auth-buttons hea-desktop">
          <div className="hea-support-wrapper">
            <button className="hea-support-btn">💛 Support Us</button>
            <div className="hea-support-dropdown">
              <div className="hea-qr-container">
                <img
                  alt="Donate QR Code"
                  className="hea-qr-image"
                  src="https://res.cloudinary.com/dmdo1gixv/image/upload/v1769677280/WhatsApp_Image_2026-01-29_at_14.13.13_qq2t9c.jpg"
                />
                <p className="hea-qr-text">
                  <strong>Help Us Grow!</strong>Scan to donate &amp; support our mission.
                  <br />
                  <span style={{ fontSize: '0.85em', display: 'block', marginTop: '4px', fontStyle: 'italic' }}>
                    Please provide your details while donating us.
                  </span>
                </p>
              </div>
              <a href="mailto:academy.zoolearn@gmail.com" className="hea-support-link">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
