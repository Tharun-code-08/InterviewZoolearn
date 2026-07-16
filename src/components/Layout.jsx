import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
      <div className="toast-container"></div>
    </div>
  );
}
