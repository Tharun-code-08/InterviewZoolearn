import { useEffect, useRef, useState } from 'react';
import { generatedArt } from '../utils/generatedArt';
import wikiImages from '../data/horseEvolutionWikiImages.json';

const HORSE_STAGES = [
  {
    era: 'Eocene Epoch',
    name: 'Hyracotherium',
    sci: 'Eohippus',
    desc: `Eohippus is the earliest known member of the horse lineage. It appeared during the Eocene epoch. Fossils were first discovered in North America.
It was small, about the size of a fox or terrier dog, around 40 cm tall at the shoulder. It had a short head and neck.
The forelimbs had four functional toes (2, 3, 4, 5) and a splint of the first toe. The hind limbs had three functional toes (2, 3, 4) and a splint of the fifth toe.
The low-crowned molar teeth were adapted for browsing soft vegetation.`,
    facts: ['4 Toes (Front) / 3 Toes (Hind)', '~40 cm tall', 'Size of a fox', 'Browsing diet'],
    img: wikiImages['Hyracotherium'] || generatedArt('Hyracotherium', 'Hyracotherium'),
    extraImage: wikiImages['Hyracotherium-extra'] || generatedArt('Hyracotherium-extra', 'Hyracotherium'),
  },
  {
    era: 'Eocene (~50 MYA)',
    name: 'Orohippus',
    sci: 'Early Eocene horse',
    desc: `Slightly larger than Hyracotherium with changes in tooth structure. Lost the first premolar and developed sharper crests on molars.
• Still a forest browser.
• Subtle shift toward harder foods.
• Represents early diversification of the horse lineage.`,
    facts: ['4 Toes (Front)', 'Sharper Molars', 'Forest Habitat'],
    img: wikiImages['Orohippus'] || generatedArt('Orohippus', 'Orohippus'),
    extraImage: '',
  },
  {
    era: 'Oligocene Epoch',
    name: 'Mesohippus',
    sci: 'Intermediate stage',
    desc: `Mesohippus represents an intermediate stage in horse evolution. It evolved from Hyracotherium (Eohippus).
It appeared during the Oligocene epoch, about 3 crore years ago. It was about the size of a modern sheep. The height was about 60 cm at the shoulders.
The forefeet had three functional digits (2, 3, 4) and a splint of the fifth digit. The hind feet had three toes. The middle toe was longer and supported most of the body weight.
The molar teeth showed the beginning of enamel ridges.`,
    facts: ['3 Toes', '~60 cm tall', 'Size of a sheep', 'Enamel ridges on molars'],
    img: wikiImages['Mesohippus'] || generatedArt('Mesohippus', 'Mesohippus'),
    extraImage: wikiImages['Mesohippus-extra'] || generatedArt('Mesohippus-extra', 'Mesohippus'),
  },
  {
    era: 'Late Oligocene (~30 MYA)',
    name: 'Miohippus',
    sci: 'Advanced Mesohippus',
    desc: `Larger than Mesohippus with improved teeth for grazing. More adapted to grasslands as forests retreated.
• Third toe still present but more reduced.
• Teeth began to transition for abrasive grass diet.
• An evolutionary bridge between browsers and grazers.`,
    facts: ['3 Toes', 'Grazing Teeth', 'Grassland Transition'],
    img: wikiImages['Miohippus'] || generatedArt('Miohippus', 'Miohippus'),
    extraImage: '',
  },
  {
    era: 'Early Miocene (~24 MYA)',
    name: 'Parahippus',
    sci: 'Early grazing horse',
    desc: `Shows clear transition from browsing to grazing. Teeth developed higher crowns with cement coating for grinding tough grass.
• Side toes shrinking but still functional.
• Longer limbs for running across open grasslands.
• Represents the shift from forest browser to grassland grazer.`,
    facts: ['Higher Crowns', 'Running Limbs', 'Cement-Coated Teeth'],
    img: wikiImages['Parahippus'] || generatedArt('Parahippus', 'Parahippus'),
    extraImage: '',
  },
  {
    era: 'Miocene (~15 MYA)',
    name: 'Callippus',
    sci: 'Slender grazing horse',
    desc: `A slender, side-branch of horse evolution. Specialized in grassland habitats alongside Merychippus.
• Highly specialized dentition.
• Represents evolutionary diversification.
• Eventually went extinct without direct descendants.`,
    facts: ['Side-Branch', 'Grassland Specialist', 'Extinct Lineage'],
    img: wikiImages['Callippus'] || generatedArt('Callippus', 'Callippus'),
    extraImage: '',
  },
  {
    era: 'Miocene Epoch',
    name: 'Merychippus',
    sci: 'Ruminating horse',
    desc: `Merychippus is known as the ruminating horse. It evolved from Mesohippus.
It appeared during the Miocene epoch, about 2 crore years ago. It was about the size of a small pony. The height was about 100 cm at the shoulders.
It had a longer neck. The forelimbs and hind limbs had three fingers/toes each. The middle finger and toe were longer and supported most of the body weight. The side toes were reduced.
The teeth were longer and covered with cement, with well-developed enamel ridges.`,
    facts: ['3 Toes (Side toes reduced)', '~100 cm tall', 'Size of a small pony', 'Teeth covered with cement'],
    img: wikiImages['Merychippus'] || generatedArt('Merychippus', 'Merychippus'),
    extraImage: wikiImages['Merychippus-extra'] || generatedArt('Merychippus-extra', 'Merychippus'),
  },
  {
    era: 'Late Miocene Epoch',
    name: 'Pliohippus',
    sci: 'Advanced horse',
    desc: `Pliohippus was an advanced horse in evolution. It evolved from Merychippus-like ancestors.
It lived during the late Miocene epoch (~12–6 million years ago). It was about the size of a modern pony. Height was about 120 cm at the shoulders.
Each limb had one functional toe (digit III). Digits II and IV were reduced to splint bones beneath the skin. It is considered one of the earliest one-toed horses.
Molars were high-crowned with cement and serrations, adapted for grazing grasses.`,
    facts: ['1 Toe (Digit III)', '~120 cm tall', 'Size of a modern pony', 'Grazing molars'],
    img: wikiImages['Pliohippus'] || generatedArt('Pliohippus', 'Pliohippus'),
    extraImage: wikiImages['Pliohippus-extra'] || generatedArt('Pliohippus-extra', 'Pliohippus'),
  },
  {
    era: 'Late Pliocene Epoch',
    name: 'Equus',
    sci: 'Equus caballus (Modern Horse)',
    desc: `Equus is the modern horse. It evolved from Pliohippus. It appeared during the late Pliocene epoch, about 4–4.5 million years ago.
It first appeared in North America and later spread to other parts of the world except Australia. The height is about 150 cm at the shoulders.
It has a long head and long neck. Each forelimb and hind limb has one functional digit (third digit) forming a single hoof. The other digits are reduced and present as two splint bones.
The highly elongated crowns with enamel ridges are perfectly suited for grinding grass.`,
    facts: ['1 Hoof', '~150 cm tall', 'Global spread (except Australia)', 'Grinding teeth'],
    img: wikiImages['Equus'] || generatedArt('Equus', 'Equus'),
    extraImage: wikiImages['Equus-extra'] || generatedArt('Equus-extra', 'Equus'),
  },
];

export default function HorseEvolution() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [zoomed, setZoomed] = useState(null);

  const selectedIndex = selected ? HORSE_STAGES.findIndex((s) => s.name === selected.name) : -1;

  useEffect(() => {
    let raf;
    const update = () => {
      if (!containerRef.current || !progressRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let pct = (window.innerHeight / 2 - rect.top) / rect.height;
      pct = Math.max(0, Math.min(1, pct));
      progressRef.current.style.height = `${pct * 100}%`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('horse-reveal-visible');
        });
      },
      { root: null, rootMargin: '250px 0px 250px 0px', threshold: 0.01 }
    );
    const items = document.querySelectorAll('.horse-timeline-item');
    items.forEach((item) => observer.observe(item));
    // Safety net: never let content stay invisible if the observer somehow
    // misses an item (reduced-motion setups, very fast programmatic scroll).
    const fallback = setTimeout(() => {
      items.forEach((item) => item.classList.add('horse-reveal-visible'));
    }, 2500);
    return () => {
      items.forEach((item) => observer.unobserve(item));
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <section className="horse-evo-section">
        <header className="horse-evo-header">
          <p className="horse-evo-domain">zoolearn.in</p>
          <h1 className="horse-evo-title">Evolution of the Horse</h1>
          <h2 className="horse-evo-subtitle">From Eohippus to Equus — A 55 Million Year Journey</h2>
        </header>
        <div className="horse-timeline-container" ref={containerRef}>
          <div className="horse-timeline-line">
            <div className="horse-timeline-progress" ref={progressRef} />
          </div>
          {HORSE_STAGES.map((stage, i) => {
            const isLeft = i % 2 === 0;
            const photoCard = (
              <div className="horse-photo-card" onClick={() => setSelected(stage)} style={{ cursor: 'pointer' }}>
                <div className="horse-image-wrapper">
                  <img src={stage.img} alt={stage.name} loading="lazy" />
                </div>
                <h3 className="horse-species-name">{stage.name}</h3>
                <p className="horse-species-sci">{stage.sci}</p>
              </div>
            );
            const eraLabel = (align) => (
              <div className={`horse-era-label ${align === 'right' ? 'horse-era-align-right' : ''}`}>
                <span className="horse-era-year">{stage.era}</span>
              </div>
            );
            return (
              <div
                key={stage.name}
                className={`horse-timeline-item ${isLeft ? 'horse-item-left' : 'horse-item-right'} ${
                  stage.name === 'Callippus' ? 'horse-branch-item' : ''
                }`}
              >
                <div className="horse-timeline-pane horse-pane-left">{isLeft ? photoCard : eraLabel('right')}</div>
                <div className="horse-timeline-marker">
                  <span className="horse-marker-dot" />
                </div>
                {stage.name === 'Callippus' && <div className="horse-branch-line-right" />}
                <div className="horse-timeline-pane horse-pane-right">{isLeft ? eraLabel() : photoCard}</div>
              </div>
            );
          })}
        </div>
      </section>

      {selected && (
        <div className="horse-detail-overlay" onClick={() => setSelected(null)}>
          <button
            className="horse-nav-btn horse-nav-left"
            onClick={(e) => {
              e.stopPropagation();
              if (selectedIndex > 0) setSelected(HORSE_STAGES[selectedIndex - 1]);
            }}
            disabled={selectedIndex === 0}
          >
            ❮
          </button>
          <div className="horse-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="horse-detail-close" onClick={() => setSelected(null)}>
              ✕
            </button>
            <div className="horse-detail-top">
              <div className="horse-detail-img-wrap">
                <img src={selected.img} alt={selected.name} />
              </div>
              <div className="horse-detail-header">
                <span className="horse-detail-era">{selected.era}</span>
                <h2 className="horse-detail-name">{selected.name}</h2>
                <p className="horse-detail-sci">{selected.sci}</p>
              </div>
            </div>
            <div className={`horse-detail-body ${selected.extraImage ? 'has-extra-image' : ''}`}>
              <div className="horse-detail-text">
                <p className="horse-detail-desc">{selected.desc}</p>
                <div className="horse-detail-facts">
                  {selected.facts.map((f, i) => (
                    <span className="horse-detail-fact-pill" key={i}>
                      🔹 {f}
                    </span>
                  ))}
                </div>
              </div>
              {selected.extraImage && selected.extraImage.trim() !== '' && (
                <div
                  className="horse-detail-large-image-wrap"
                  onClick={() => setZoomed(selected.extraImage)}
                  style={{ cursor: 'zoom-in' }}
                >
                  <img
                    src={selected.extraImage}
                    alt={`${selected.name} detailed view`}
                    className="horse-large-extra-img"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
          <button
            className="horse-nav-btn horse-nav-right"
            onClick={(e) => {
              e.stopPropagation();
              if (selectedIndex < HORSE_STAGES.length - 1) setSelected(HORSE_STAGES[selectedIndex + 1]);
            }}
            disabled={selectedIndex === HORSE_STAGES.length - 1}
          >
            ❯
          </button>
        </div>
      )}

      {zoomed && (
        <div className="horse-zoomed-overlay" onClick={() => setZoomed(null)}>
          <button className="horse-zoomed-close" onClick={() => setZoomed(null)}>
            ✕
          </button>
          <img src={zoomed} alt="Zoomed detailed view" className="horse-zoomed-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
