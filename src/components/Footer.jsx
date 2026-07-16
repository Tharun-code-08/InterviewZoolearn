import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="foo-zl-footer">
      <div className="foo-zl-footer-inner">
        <div className="foo-zl-brand">
          <div className="foo-zl-logo">
            <Logo size={32} />
            <h1>ZooLearn</h1>
          </div>
          <p className="foo-zl-tagline">
            Empowering students and NEET aspirants with interactive zoology education. Master biology through
            visual taxonomy and structured learning paths.
          </p>
        </div>
        <div className="foo-zl-links">
          <div className="foo-zl-col">
            <h3>Platform</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/taxonomy-tree">Taxonomy Tree</Link></li>
              <li><Link to="/zoohub">ZooHub</Link></li>
            </ul>
          </div>
          <div className="foo-zl-col">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li>
                <div className="contact-dropdown-container">
                  <span className="contact-toggle">Contact ▼</span>
                </div>
              </li>
              <li><a href="mailto:academy.zoolearn@gmail.com">Support</a></li>
            </ul>
          </div>
          <div className="foo-zl-col">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/about">Privacy Policy</Link></li>
              <li><Link to="/about">Terms of Service</Link></li>
              <li><Link to="/about">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="foo-zl-copyright">
        <div className="foo-zl-copyright-content">
          <span>© 2026 ZooLearn EdTech. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
