import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Placeholder from './pages/Placeholder';
import ZooHub from './pages/ZooHub';
import SpeciesDetail from './pages/SpeciesDetail';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Placeholder title="Home" />} />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/taxonomy-tree" element={<Placeholder title="Taxonomy Tree" />} />
        <Route path="/living-world" element={<Placeholder title="The Living World" />} />
        <Route path="/basic-features-of-classification" element={<Placeholder title="Basic Features of Classification" />} />
        <Route path="/kingdom-animalia" element={<Placeholder title="Kingdom Animalia" />} />
        <Route path="/horse-evolution" element={<Placeholder title="Horse Evolution" />} />
        <Route path="/evolution" element={<Placeholder title="Evolution" />} />
        <Route path="/anatomy" element={<Placeholder title="Anatomy" />} />

        <Route path="/career-path" element={<Placeholder title="Career Path" />} />
        <Route path="/career-path/:categoryId" element={<Placeholder title="Career Path Category" />} />
        <Route path="/scopes" element={<Placeholder title="Scopes" />} />
        <Route path="/scopes/:categoryId" element={<Placeholder title="Scope Category" />} />

        <Route path="/blog" element={<Placeholder title="Blog" />} />
        <Route path="/blog/giraffe" element={<Placeholder title="Giraffe Blog" />} />
        <Route path="/blog/meerkat" element={<Placeholder title="Meerkat Blog" />} />

        <Route path="/frog" element={<Placeholder title="Frog" />} />
        <Route path="/honeybee" element={<Placeholder title="Honeybee" />} />
        <Route path="/rabbit" element={<Placeholder title="Rabbit" />} />
        <Route path="/cockroach" element={<Placeholder title="Cockroach" />} />
        <Route path="/leech" element={<Placeholder title="Leech" />} />

        <Route path="/zoohub" element={<ZooHub />} />
        <Route path="/zoohub/:phylum" element={<ZooHub />} />
        <Route path="/zoohub/:phylum/:slug" element={<SpeciesDetail />} />

        <Route path="*" element={<Placeholder title="404 Not Found" />} />
      </Routes>
    </Layout>
  );
}
