import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import careerCategories from '../data/careerCategories.json';
import courseDetails from '../data/careerCourseDetails.json';

function CareerModal({ career, category, onClose, onCourseClick }) {
  if (!career) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: `10px solid ${category?.theme?.primary || '#48bb78'}` }}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2 style={{ fontSize: '2.4rem', color: category?.theme?.secondary || '#14532d', marginBottom: 10, fontWeight: 900 }}>
            {career.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#4a5568', maxWidth: 700, margin: '0 auto' }}>{career.desc}</p>
        </div>
        <div className="modal-body">
          <h3 className="pathway-title" style={{ marginTop: 20, color: category?.theme?.primary }}>
            Educational Pathway Explorer
          </h3>
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#718096', marginBottom: 15 }}>
            Click a degree to view course details
          </p>
          <div className="reactflow-container" style={{ display: 'flex', flexDirection: 'column', gap: 30, padding: '20px 0' }}>
            {[
              { label: 'Bachelor', key: 'bsc', list: career.bsc },
              { label: 'Master', key: 'msc', list: career.msc },
              { label: 'Doctoral', key: 'phd', list: career.phd },
            ].map((tier) => (
              <div key={tier.key}>
                <div style={{ textAlign: 'center', fontWeight: 700, color: '#718096', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: 10 }}>
                  {tier.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15, justifyContent: 'center' }}>
                  {tier.list.map((course) => (
                    <div
                      key={course}
                      className={`course-node ${tier.key}`}
                      onClick={() => onCourseClick(course)}
                    >
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="salary-banner"
            style={{
              background: category?.theme?.gradient || 'linear-gradient(135deg, #f6e05e 0%, #ecc94b 100%)',
              color: category?.theme?.secondary ? '#fff' : '#744210',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>💰</span>
            <span>
              Average Salary Outcome: <strong>{career.salary}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursePanel({ course, isActive, onClose }) {
  return (
    <div className={`course-panel ${isActive ? 'active' : ''}`}>
      <button className="panel-back" onClick={onClose}>
        <span>←</span> Back to Career
      </button>
      {course ? (
        <>
          <div className="panel-header">
            <h3>{course.name}</h3>
          </div>
          <div className="panel-section">
            <span className="panel-label">Explanation</span>
            <p className="panel-value">{course.exp}</p>
          </div>
          <div className="panel-section">
            <span className="panel-label">Duration</span>
            <p className="panel-value">⏱ {course.dur}</p>
          </div>
          <div className="panel-section">
            <span className="panel-label">Why it's important</span>
            <p className="panel-value">{course.imp}</p>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: 100, color: '#94a3b8' }}>
          <p>Select a course to see details</p>
        </div>
      )}
    </div>
  );
}

export default function CareerCategory() {
  const { categoryId } = useParams();
  const [career, setCareer] = useState(null);
  const [course, setCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [panelActive, setPanelActive] = useState(false);

  const category = careerCategories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="category-detail-container">
        <Link to="/career-path" className="back-link">← Back to Categories</Link>
        <h1>Category not found</h1>
      </div>
    );
  }

  const openCareer = (c) => {
    setCareer(c);
    setModalOpen(true);
  };

  const openCourse = (name) => {
    const detail = courseDetails[name] || {
      exp: 'Detailed information about this course.',
      dur: '2-3 years',
      imp: 'Important course for specialization in this field.',
    };
    setCourse({ name, ...detail });
    setPanelActive(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPanelActive(false);
    setTimeout(() => {
      setCareer(null);
      setCourse(null);
    }, 300);
  };

  const closePanel = () => setPanelActive(false);

  return (
    <div className="category-detail-container" style={{ backgroundColor: category.theme?.accent || '#f8fafc' }}>
      <Link to="/career-path" className="back-link">
        <span style={{ fontSize: '1.2rem', marginRight: 8 }}>←</span>
        Back to Categories
      </Link>
      <div className="career-path-header">
        <h1 style={{ color: category.theme?.secondary || '#2d3748' }}>{category.name}</h1>
        <p>{category.description}</p>
      </div>
      <div className="career-grid">
        {category.careers.map((c, i) => (
          <div
            key={c.title}
            className="career-card"
            onClick={() => openCareer(c)}
            style={{ animationDelay: `${i * 0.1}s`, borderLeft: `5px solid ${category.theme?.primary || '#48bb78'}` }}
          >
            <h3 className="career-card-title">{c.title}</h3>
            <p className="career-card-desc">{c.desc}</p>
            <div style={{ marginTop: 15, fontSize: '0.9rem', color: category.theme?.primary, fontWeight: 700 }}>
              View Pathway →
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <CareerModal career={career} category={category} onClose={closeModal} onCourseClick={openCourse} />
      )}
      <CoursePanel course={course} isActive={panelActive} onClose={closePanel} />
    </div>
  );
}
