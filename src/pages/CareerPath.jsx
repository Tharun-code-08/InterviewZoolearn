import { Link } from 'react-router-dom';
import careerCategories from '../data/careerCategories.json';

export default function CareerPath() {
  return (
    <div className="career-path-container">
      <div className="career-path-header">
        <h1>Zoology & Life Science Career Categories</h1>
        <p>Select a category to explore specific career options, educational pathways, and salary expectations.</p>
      </div>
      <div className="category-grid">
        {careerCategories.map((category, i) => (
          <Link
            key={category.id}
            to={`/career-path/${category.id}`}
            className="category-card"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="category-icon">{category.icon}</div>
            <h2 className="category-title">{category.name}</h2>
            <p className="category-desc">{category.description}</p>
            <div className="category-meta">
              Explore Careers <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
