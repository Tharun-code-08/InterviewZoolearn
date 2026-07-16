import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
import About from './pages/About';
import TaxonomyTree from './pages/TaxonomyTree';
import LivingWorld from './pages/LivingWorld';
import KingdomAnimalia from './pages/KingdomAnimalia';
import Frog from './pages/Frog';
import LeechLayout from './pages/LeechLayout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/taxonomy-tree" element={<TaxonomyTree />} />
        <Route path="/living-world" element={<LivingWorld />} />
        <Route path="/basic-features-of-classification" element={<BasicFeatures />} />
        <Route path="/kingdom-animalia" element={<KingdomAnimalia />} />
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

        <Route path="/frog" element={<Frog />} />
        <Route path="/honeybee" element={<HoneyBee />} />
        <Route path="/rabbit" element={<Rabbit />} />
        <Route path="/cockroach" element={<Cockroach />} />
        <Route path="/leech" element={<LeechLayout />} />

        <Route path="/zoohub" element={<ZooHub />} />
        <Route path="/zoohub/:phylum" element={<ZooHub />} />
        <Route path="/zoohub/:phylum/:slug" element={<SpeciesDetail />} />

        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </Layout>
  );
}
