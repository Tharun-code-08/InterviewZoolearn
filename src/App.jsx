import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Placeholder from './pages/Placeholder';
import Home from './pages/Home';
import ZooHub from './pages/ZooHub';
import SpeciesDetail from './pages/SpeciesDetail';
import UnderConstruction from './pages/UnderConstruction';
import Rabbit from './pages/Rabbit';
import HoneyBee from './pages/HoneyBee';
import Cockroach from './pages/Cockroach';
import BasicFeatures from './pages/BasicFeatures';
import Patterns from './pages/Patterns';
import HorseEvolution from './pages/HorseEvolution';
import BlogIndex from './pages/BlogIndex';
import GiraffeBlog from './pages/GiraffeBlog';
import MeerkatBlog from './pages/MeerkatBlog';
import CareerPath from './pages/CareerPath';
import CareerCategory from './pages/CareerCategory';
import Scopes from './pages/Scopes';
import ScopeCategory from './pages/ScopeCategory';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/taxonomy-tree" element={<Placeholder title="Taxonomy Tree" />} />
        <Route path="/living-world" element={<Placeholder title="The Living World" />} />
        <Route path="/basic-features-of-classification" element={<BasicFeatures />} />
        <Route path="/kingdom-animalia" element={<Placeholder title="Kingdom Animalia" />} />
        <Route path="/horse-evolution" element={<HorseEvolution />} />
        <Route path="/evolution" element={<UnderConstruction />} />
        <Route path="/anatomy" element={<Patterns />} />

        <Route path="/career-path" element={<CareerPath />} />
        <Route path="/career-path/:categoryId" element={<CareerCategory />} />
        <Route path="/scopes" element={<Scopes />} />
        <Route path="/scopes/:categoryId" element={<ScopeCategory />} />

        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/giraffe" element={<GiraffeBlog />} />
        <Route path="/blog/meerkat" element={<MeerkatBlog />} />

        <Route path="/frog" element={<Placeholder title="Frog" />} />
        <Route path="/honeybee" element={<HoneyBee />} />
        <Route path="/rabbit" element={<Rabbit />} />
        <Route path="/cockroach" element={<Cockroach />} />
        <Route path="/leech" element={<Placeholder title="Leech" />} />

        <Route path="/zoohub" element={<ZooHub />} />
        <Route path="/zoohub/:phylum" element={<ZooHub />} />
        <Route path="/zoohub/:phylum/:slug" element={<SpeciesDetail />} />

        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </Layout>
  );
}
