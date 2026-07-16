import { Link } from 'react-router-dom';
import { getPhylumTree } from '../data/speciesIndex';

export default function PhylumSection({ meta }) {
  const { slug, prefix, label, subtitle } = meta;
  const groups = getPhylumTree(slug);

  return (
    <div className="scroll-reveal">
      <section>
        <div className={`${prefix}-container`}>
          <header>
            <h1>Phylum {label}</h1>
            <p className={`${prefix}-subtitle`}>{subtitle}</p>
          </header>
          {groups.map((group) => (
            <section className={`${prefix}-class-section`} key={group.id}>
              <h2 className={`${prefix}-class-heading`}>
                <div className={`${prefix}-bord`}></div>
                <span className={`${prefix}-class-badge`}>Class</span>
                {group.className}
              </h2>
              <div className={`${prefix}-species-grid`}>
                {group.species.map((sp) => (
                  <Link
                    key={sp.slug}
                    className={`${prefix}-species-card`}
                    to={sp.path || `/zoohub/${slug}/${sp.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <img alt={sp.name} className={`${prefix}-species-image`} src={sp.image} />
                    <div className={`${prefix}-species-info`}>
                      <div>
                        <div className={`${prefix}-species-name`}>{sp.name}</div>
                        <div className={`${prefix}-species-name-scientific`}>{sp.scientificName}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
