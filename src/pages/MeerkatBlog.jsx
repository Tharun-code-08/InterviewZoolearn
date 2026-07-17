import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Compass,
  Sparkles,
  Repeat,
  Layers,
  Tag,
  GitBranch,
  Menu,
  ArrowUp,
  Sun,
  Eye,
  Shield,
  Activity,
  Dna,
  Trees,
  Footprints,
  MessageSquare,
  RefreshCcw,
  Swords,
  Telescope,
  Users,
} from 'lucide-react';
import { generatedArt } from '../utils/generatedArt';
import wikiImages from '../data/blogWikiImages.json';

const NAV_ITEMS = [
  { id: 'meerkat-day', label: 'World Meerkat Day', icon: <Compass size={18} /> },
  { id: 'meet-meerkat', label: 'Meet the Meerkat', icon: <BookOpen size={18} /> },
  { id: 'adaptations', label: 'Biological Marvels', icon: <Sparkles size={18} /> },
  { id: 'stripes', label: 'Back Striping', icon: <Tag size={18} /> },
  { id: 'altruism', label: 'Science of Altruism', icon: <GitBranch size={18} /> },
  { id: 'routine', label: 'Daily Routine', icon: <Repeat size={18} /> },
  { id: 'taxonomy', label: 'Taxonomy (2025)', icon: <Tag size={18} /> },
  { id: 'diversity', label: 'Living Subspecies', icon: <Layers size={18} /> },
  { id: 'ancestry', label: '15-Million-Year Ancestry', icon: <GitBranch size={18} /> },
  { id: 'timeline', label: 'Evolution Timeline', icon: <Repeat size={18} /> },
];

const ADAPTATIONS = [
  {
    id: 'belly',
    icon: <Sun size={32} />,
    title: 'Solar Panel Belly',
    subtitle: 'Thermal Regulation',
    points: [
      'Sparse stomach hair reveals dark skin',
      'Basks facing the morning sun to warm up',
      'Acts as a natural solar collector',
      'Crucial for survival after cold desert nights',
    ],
    color: '#2f8593',
  },
  {
    id: 'eyes',
    icon: <Eye size={32} />,
    title: 'Built-in Sunglasses',
    subtitle: 'Anti-Glare Protection',
    points: [
      'Dark patches of fur surround the eyes',
      'Absorbs sunlight and reduces blinding glare',
      'Allows them to look directly into the sky',
      'Helps detect soaring eagles and hawks',
    ],
    color: '#8ba393',
  },
  {
    id: 'venom',
    icon: <Shield size={32} />,
    title: 'Venom Immunity',
    subtitle: 'Chemical Defense',
    points: [
      'Natural resistance to scorpion & snake venom',
      'Evolved neurotoxin receptor blockades',
      'Enables hunting of deadly Kalahari scorpions',
      'Teaches pups how to handle live stingers',
    ],
    color: '#fcd42c',
  },
  {
    id: 'claws',
    icon: <Activity size={32} />,
    title: 'Excavation Master',
    subtitle: 'Rapid Digging System',
    points: [
      'Long, strong, non-retractable foreclaws',
      'Special membranes cover eyes while digging',
      'Ears fold completely shut to keep sand out',
      'Can move their body weight in sand in seconds',
    ],
    color: '#1f5963',
  },
];

const STRIPE_SUBSPECIES = [
  {
    id: 'southern',
    name: 'Southern Meerkat',
    scientific: 'Suricata suricatta suricatta',
    image: wikiImages['southern-meerkat-subspecies'] || generatedArt('southern-meerkat-subspecies', 'Southern Meerkat'),
    color: '#2f8593',
    description:
      'The nominate subspecies. Found in South Africa, Namibia, and Botswana, the Southern meerkat is defined by a warm tawny-brown coat with bold, dark brown horizontal bands across its back. The stripes are highly contrasting, aiding in camouflage among dry savanna brush.',
    features: ['Warm, reddish-tawny base coloration', 'Bold, highly contrasting dark horizontal stripes', 'Thick tail with a prominent dark black tip'],
  },
  {
    id: 'desert',
    name: 'Desert Meerkat',
    scientific: 'Suricata suricatta majoriae',
    image: wikiImages['desert-meerkat-subspecies'] || generatedArt('desert-meerkat-subspecies', 'Desert Meerkat'),
    color: '#8ba393',
    description:
      'Adapted to the intense sun and sand of the Namib Desert. This subspecies exhibits a very pale, silvery-fawn or light sandy-gray coat. The stripes on its back are thinner, fainter, and less defined to prevent heat absorption and blend into sand dunes.',
    features: ['Very pale, silvery-fawn coat to reflect sunlight', 'Thin, faint, low-contrast stripe markings', 'Slender build adapted to extreme Namib aridity'],
  },
  {
    id: 'angolan',
    name: 'Angolan Meerkat',
    scientific: 'Suricata suricatta iona',
    image: wikiImages['angolan-meerkat-subspecies'] || generatedArt('angolan-meerkat-subspecies', 'Angolan Meerkat'),
    color: '#fcd42c',
    description:
      'Hailing from southwestern Angola. The Angolan meerkat is characterized by a darker, brownish-yellow coat. Its back markings are intermediate, displaying thick but slightly diffuse stripe patterns suitable for transitional bushland.',
    features: ['Brownish-yellow base coat coloration', 'Thick, slightly diffuse dark brown stripe markings', 'Found in northernmost range border areas'],
  },
];

const ALTRUISM_FORCES = [
  {
    icon: <Dna size={24} />,
    title: 'Kin Selection',
    desc: "Helpers in a mob share a high percentage of genes with the alpha pair's offspring. By sacrificing their food and safety to protect the pups, they ensure their own genetic lineage survives.",
  },
  {
    icon: <Telescope size={24} />,
    title: 'Vigilance Trade-off',
    desc: 'Meerkats must dig deep to find grubs, leaving them blind to danger. Having one dedicated sentinel look out allows foragers to work efficiently without constantly stopping to scan.',
  },
  {
    icon: <MessageSquare size={24} />,
    title: 'Vocal Language Coordination',
    desc: 'Sentinels communicate constantly via "peeps" to signal safety, and issue precise alarm calls specifying the danger type (air vs. land) and urgency level, saving precious seconds.',
  },
  {
    icon: <RefreshCcw size={24} />,
    title: 'Sentinel Rotations',
    desc: 'Guard duty is highly demanding. Mobs rotate sentinel shifts throughout the day, ensuring everyone gets a chance to forage and maintain their strength.',
  },
  {
    icon: <Swords size={24} />,
    title: 'Territorial Defense',
    desc: 'Meerkats defend elaborate underground burrows and food territories. Larger mobs have a higher success rate in repelling rival clans during territory wars.',
  },
];

const ROUTINE = [
  {
    id: 1,
    name: 'Morning Warming',
    time: '06:00 AM',
    activity: 'Solar Basking',
    details:
      'As the sun rises, the mob emerges from the subterranean burrow. Cold from the freezing desert night, they stand tall on their hind legs facing the sun to expose their dark belly patches and absorb solar warmth.',
    image: wikiImages['daily-life-solar-basking'] || generatedArt('daily-life-solar-basking', 'Solar Basking'),
  },
  {
    id: 2,
    name: 'Morning Foraging Run',
    time: '08:00 AM',
    activity: 'Digging & Lookout Duty',
    details:
      'With bodies warmed, the mob travels to their foraging grounds. Foragers search for beetles and scorpions, while the designated sentinel climbs a high rock to keep watch for hawks, eagles, and jackals.',
    image: wikiImages['daily-life-digging-lookout'] || generatedArt('daily-life-digging-lookout', 'Digging and Lookout Duty'),
  },
  {
    id: 3,
    name: 'Midday Heat Retreat',
    time: '12:00 PM',
    activity: 'Burrow Rest & Grooming',
    details:
      'When the Kalahari sun reaches its scorching peak, foraging becomes too hot. The mob retreats underground into their elaborate, cool tunnel systems, spending the midday hours grooming, sleeping, and bonding.',
    image: wikiImages['daily-life-burrow-rest'] || generatedArt('daily-life-burrow-rest', 'Burrow Rest and Grooming'),
  },
  {
    id: 4,
    name: 'Afternoon Hunting & School',
    time: '03:00 PM',
    activity: 'Pup Mentorship & Foraging',
    details:
      'As temperatures cool, the meerkats return above ground. Foraging resumes, and this is the prime time for mentors to teach pups how to safely hunt and handle venomous prey like scorpions.',
    image: wikiImages['daily-life-pup-mentorship'] || generatedArt('daily-life-pup-mentorship', 'Pup Mentorship and Foraging'),
  },
  {
    id: 5,
    name: 'Evening Burrow Lock-in',
    time: '06:30 PM',
    activity: 'Securing the Den',
    details:
      'Before dusk settles, the mob returns to their nesting burrow. After a final scan of the sky by the sentinel, the entire clan descends deep underground, piling together in a cuddle puddle to conserve heat for the cold night ahead.',
    image: wikiImages['daily-life-securing-den'] || generatedArt('daily-life-securing-den', 'Securing the Den'),
  },
];

const TAXONOMY_TREE = {
  order: 'Order: Carnivora',
  suborder: 'Suborder: Feliformia (Cat-like)',
  family: 'Family: Herpestidae (Mongooses)',
  genus: 'Genus: Suricata',
  species: 'Species: Suricata suricatta',
  speciesCommon: '(Meerkat)',
  subspecies: [
    { name: 'Southern Meerkat', scientific: '(S. s. suricatta)' },
    { name: 'Desert Meerkat', scientific: '(S. s. majoriae)' },
    { name: 'Angolan Meerkat', scientific: '(S. s. iona)' },
  ],
};

const DIVERSITY = [
  {
    name: 'Southern Meerkat',
    scientific: 'Suricata suricatta suricatta',
    status: 'Least Concern',
    statusColor: '#16a34a',
    image: wikiImages['diversity-southern-meerkat'] || generatedArt('diversity-southern-meerkat', 'Southern Meerkat'),
  },
  {
    name: 'Desert Meerkat',
    scientific: 'Suricata suricatta majoriae',
    status: 'Least Concern',
    statusColor: '#16a34a',
    image: wikiImages['diversity-desert-meerkat'] || generatedArt('diversity-desert-meerkat', 'Desert Meerkat'),
  },
  {
    name: 'Angolan Meerkat',
    scientific: 'Suricata suricatta iona',
    status: 'Least Concern',
    statusColor: '#16a34a',
    image: wikiImages['diversity-angolan-meerkat'] || generatedArt('diversity-angolan-meerkat', 'Angolan Meerkat'),
  },
];

const ANCESTRY = [
  {
    year: '15 Mya',
    name: 'Feliform Ancestry (Early Carnivora)',
    description:
      'Mongooses belong to the Feliformia (cat-like) suborder. Roughly 15 million years ago, early mongoose ancestors diverged from other feliform branches in Eurasia and Africa, adapting to forest floor foraging.',
    img: wikiImages['ancestry-feliform'] || generatedArt('ancestry-feliform', 'Feliform Ancestry'),
  },
  {
    year: '10 Mya',
    name: 'Herpestidae Family Radiation',
    description:
      'The mongoose family (Herpestidae) expanded significantly. These early ancestors evolved long bodies, short legs, and acute senses of smell, allowing them to excel at sniffing out underground prey.',
    img: wikiImages['ancestry-herpestidae'] || generatedArt('ancestry-herpestidae', 'Herpestidae Family Radiation'),
  },
  {
    year: '5 Mya',
    name: 'Suricata Genus Divergence',
    description:
      'As African forests thinned due to drying climates, the ancestor of the genus Suricata split from other mongooses. Surviving in open, predator-heavy savanna required developing the earliest forms of group vigilance.',
    img: wikiImages['ancestry-suricata-divergence'] || generatedArt('ancestry-suricata-divergence', 'Suricata Genus Divergence'),
  },
  {
    year: '2 Mya',
    name: 'Suricata major (Fossil Ancestor)',
    description:
      'Fossil records in South Africa show Suricata major, a larger prehistoric ancestor of modern meerkats. They possessed similar digging claws but had not yet fully refined their complex social structures.',
    img: wikiImages['ancestry-suricata-major'] || generatedArt('ancestry-suricata-major', 'Suricata major Fossil Ancestor'),
  },
  {
    year: '1 Mya',
    name: 'Suricata suricatta (Modern Meerkat)',
    description:
      'Modern meerkats emerge in East and Southern Africa. They fully adapt to group cooperative breeding, sentinel warning calls, and structural division of labor to colonize the dry Kalahari and Namib deserts.',
    img: wikiImages['ancestry-modern-meerkat'] || generatedArt('ancestry-modern-meerkat', 'Suricata suricatta Modern Meerkat'),
  },
];

const CHRONOLOGY = [
  { period: '15 Mya', ancestor: 'Feliformia Split', characteristics: 'Diverged from early cat-like carnivores to form herpestid branches.' },
  { period: '10 Mya', ancestor: 'Herpestidae Family', characteristics: 'Radiation of early mongooses across Eurasian and African savanna grasslands.' },
  { period: '5 Mya', ancestor: 'Suricata Divergence', characteristics: 'Split from solitary mongooses, transitioning to open desert environments.' },
  { period: '2 Mya', ancestor: 'Suricata major', characteristics: 'Prehistoric fossil species found in South Africa; larger size than modern meerkats.' },
  { period: '1 Mya', ancestor: 'Modern Meerkat appears', characteristics: 'First fossils of modern Suricata suricatta emerge in dry South African zones.' },
  { period: 'Present', ancestor: '3 Living Subspecies', characteristics: 'Southern, Desert, and Angolan meerkats populate Kalahari, Namib, and Angolan plains.' },
];

const EPOCHS = [
  { stage: 'Feliformia to Herpestidae', time: '15 → 10 Mya', duration: '5 Million Years', icon: <Trees size={24} /> },
  { stage: 'Herpestidae to Suricata', time: '10 → 5 Mya', duration: '5 Million Years', icon: <Sparkles size={24} /> },
  { stage: 'Suricata to Suricata major', time: '5 → 2 Mya', duration: '3 Million Years', icon: <Footprints size={24} /> },
  { stage: 'Suricata major to Modern', time: '2 → 1 Mya', duration: '1 Million Years', icon: <Sun size={24} /> },
];

function AdaptationsSection() {
  const [active, setActive] = useState(null);
  return (
    <div className="meer-adaptations-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">Biological Marvels: Desert Survival</h3>
        <p className="meer-section-text">
          Through millions of years in the unforgiving Kalahari, meerkats have evolved a toolkit of incredible biological solutions. Click any
          card to explore their survival adaptations.
        </p>
      </div>
      <div className="meer-adaptations-grid">
        {ADAPTATIONS.map((a) => (
          <div
            key={a.id}
            className={`meer-adapt-flip-card ${active === a.id ? 'flipped' : ''}`}
            onClick={() => setActive(active === a.id ? null : a.id)}
          >
            <div className="meer-adapt-flip-inner">
              <div className="meer-adapt-flip-front" style={{ borderBottomColor: a.color }}>
                <span className="meer-adapt-icon-large">{a.icon}</span>
                <h4>{a.title}</h4>
                <span className="meer-adapt-subtitle" style={{ color: a.color }}>{a.subtitle}</span>
                <div className="meer-click-hint">Click to explore</div>
              </div>
              <div className="meer-adapt-flip-back" style={{ background: a.color }}>
                <h4>{a.title}</h4>
                <ul>
                  {a.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StripesSection() {
  const [active, setActive] = useState(STRIPE_SUBSPECIES[0]);
  return (
    <div className="meer-stripe-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">Unique Back Stripes: Subspecies Camouflage Guide</h3>
        <p className="meer-section-text">
          Just like human fingerprints, no two meerkats have the exact same bar markings. These <strong>unique back stripes</strong> help
          individuals identify each other and serve as natural camouflage. Click a subspecies below to explore their specific markings and coat
          variations.
        </p>
      </div>
      <div className="gir-coat-interactive-wrapper">
        <div className="gir-coat-thumbnails">
          {STRIPE_SUBSPECIES.map((s) => (
            <button
              key={s.id}
              className={`gir-coat-thumb-btn ${active.id === s.id ? 'active' : ''}`}
              onClick={() => setActive(s)}
              style={{ '--coat-color': s.color }}
            >
              <span className="gir-coat-thumb-label">{s.name}</span>
            </button>
          ))}
        </div>
        <div className="gir-coat-main-display">
          <div className="gir-coat-large-image">
            <img src={active.image} alt={active.name} loading="lazy" decoding="async" />
            <div className="gir-coat-overlay">
              <div className="gir-coat-info">
                <div className="gir-coat-header" style={{ borderLeftColor: active.color }}>
                  <h4 style={{ color: active.color }}>{active.name}</h4>
                  <em>{active.scientific}</em>
                </div>
                <p className="gir-coat-desc">{active.description}</p>
                <ul className="gir-coat-features">
                  {active.features.map((f, i) => (
                    <li key={i}>
                      <span style={{ color: active.color }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AltruismSection() {
  return (
    <div className="meer-neck-science-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">The Science of Altruism: Why Meerkats Cooperate</h3>
        <p className="meer-section-text">
          <strong>The Evolution of Selflessness:</strong> Altruism is rare in the animal kingdom, but the meerkat is a prime exception. Their
          cooperative lifestyle is driven by five evolutionary forces.
        </p>
      </div>
      <div className="gir-forces-grid">
        {ALTRUISM_FORCES.map((f, i) => (
          <div className="gir-force-card" key={i}>
            <div className="gir-force-icon" style={{ background: 'var(--meer-primary-light)', color: 'var(--meer-primary-dark)' }}>{f.icon}</div>
            <div className="gir-force-content">
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoutineSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const go = (idx) => {
    setPrev(active);
    setActive(idx);
  };
  return (
    <div className="meer-routine-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">A Day in the Life: Interactive Daily Routine</h3>
        <p className="meer-section-text">
          Meerkats follow a highly structured daily schedule driven by temperature, sun position, and collective safety. Click the timeline
          stages below to witness the hourly routine of a Kalahari mob.
        </p>
      </div>
      <div className="meer-routine-interactive">
        <div className="meer-routine-main-view">
          {ROUTINE.map((r, i) => {
            let cls = 'meer-routine-slide';
            if (i === active) cls += ' active';
            else if (i === prev) cls += ' previous';
            if (i === active && active > prev) cls += ' wipe-forward';
            if (i === active && active < prev) cls += ' wipe-backward';
            return (
              <div className={cls} key={r.id}>
                <img src={r.image} alt={r.name} loading="lazy" decoding="async" />
                <div className="meer-routine-overlay">
                  <div className="meer-routine-data-box">
                    <div className="meer-routine-era">{r.time}</div>
                    <h4>{r.name}</h4>
                    <p>{r.details}</p>
                    <div className="meer-routine-stats">
                      <div className="meer-routine-stat">
                        <span className="stat-icon">🐾</span>
                        <div className="stat-info">
                          <strong>Core Activity</strong>
                          <span>{r.activity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="meer-routine-timeline-controls">
          <div className="meer-routine-progress-track">
            <div className="meer-routine-progress-fill" style={{ width: `${(active / (ROUTINE.length - 1)) * 100}%` }} />
          </div>
          <div className="meer-routine-steps">
            {ROUTINE.map((r, i) => (
              <button key={r.id} className={`meer-routine-step-btn ${i <= active ? 'completed' : ''} ${i === active ? 'active' : ''}`} onClick={() => go(i)}>
                <div className="meer-routine-step-dot" />
                <div className="meer-routine-step-label">{r.time}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxonomySection() {
  return (
    <div className="meer-taxonomy-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">Taxonomy & Evolution</h3>
        <p className="meer-section-text">
          Meerkats are not rodents, dogs, or prairie dogs. They belong to the order <strong>Carnivora</strong> and suborder{' '}
          <strong>Feliformia</strong>, family <strong>Herpestidae</strong> (the mongoose family), and are the only surviving members of the genus{' '}
          <strong>Suricata</strong>. Genetic studies recognize three distinct subspecies adapted to different regional zones of Southern Africa.
        </p>
      </div>
      <div className="meer-reactflow-wrapper" style={{ width: '100%', padding: '2rem', background: '#fbfbf4', border: '1px solid var(--meer-border)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="tax-node root-node" style={{ background: '#ececc2', border: '2px solid #2f8593', width: 240 }}>{TAXONOMY_TREE.order}</div>
          <div className="tax-node genus-node" style={{ background: '#fbfbf4', border: '2px solid #1f5963', width: 240 }}>{TAXONOMY_TREE.suborder}</div>
          <div className="tax-node root-node" style={{ background: '#ececc2', border: '2px solid #2f8593', width: 240 }}>{TAXONOMY_TREE.family}</div>
          <div className="tax-node genus-node" style={{ background: '#fbfbf4', border: '2px solid #1f5963', width: 240 }}>{TAXONOMY_TREE.genus}</div>
          <div className="tax-node species-node" style={{ background: '#fff', border: '2px solid #2f8593', width: 240 }}>
            {TAXONOMY_TREE.species}
            <br />
            <small>{TAXONOMY_TREE.speciesCommon}</small>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
            {TAXONOMY_TREE.subspecies.map((sub) => (
              <div key={sub.name} className="tax-node subspecies-node" style={{ background: '#fff', border: '1px solid #8ba393', width: 180, fontSize: '0.8rem' }}>
                {sub.name}
                <br />
                <small>{sub.scientific}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DiversitySection() {
  return (
    <div className="gir-living-diversity-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Living Subspecies: Subspecific Diversity</h3>
        <p className="gir-section-text">
          Evolution has shaped regional populations of meerkats to match their specific environments, resulting in three recognized subspecies
          spanning Southern Africa.
        </p>
      </div>
      <div className="gir-diversity-grid">
        {DIVERSITY.map((d, i) => (
          <div className="gir-div-card" key={i}>
            <div className="gir-div-image-container">
              <img src={d.image} alt={`${d.name} — ${d.scientific}`} className="gir-div-img" loading="lazy" />
            </div>
            <div className="gir-div-overlay">
              <span className="gir-div-status" style={{ backgroundColor: d.statusColor }}>{d.status}</span>
              <div className="gir-div-content">
                <h4>{d.name}</h4>
                <em>{d.scientific}</em>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AncestrySection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const pct = ((window.innerHeight / 2 - top) / height) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="gir-ancestry-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">The 15-Million-Year Mongoose Ancestry</h3>
        <p className="gir-section-text">
          Meerkats did not evolve in isolation. Their lineage is a testament to adapting from forested conditions into open, dry savannas where
          survival requires group cooperation.
        </p>
      </div>
      <div className="timeline-container-wrapper" style={{ marginTop: '3rem' }}>
        <div className="timeline-container" ref={containerRef}>
          <div className="timeline-line">
            <div className="timeline-progress" style={{ height: `${progress}%`, background: 'var(--meer-primary)' }} />
          </div>
          {ANCESTRY.map((a, i) => {
            const leftHasImage = i % 2 === 0;
            return (
              <div className="timeline-item" key={a.name}>
                <div className="timeline-pane pane-left">
                  {leftHasImage ? (
                    <div className="content-group align-right">
                      <h3 className="phylum-name" style={{ color: 'var(--meer-primary-dark)' }}>{a.name}</h3>
                      <div className="phylum-image-wrapper" style={{ borderColor: 'var(--meer-primary)' }}>
                        <img src={a.img} alt={a.name} loading="lazy" />
                      </div>
                    </div>
                  ) : (
                    <div className="content-group text-only align-right">
                      <p className="phylum-desc">{a.description}</p>
                    </div>
                  )}
                </div>
                <div className="timeline-marker" style={{ background: 'var(--meer-primary)', color: 'white' }}>{a.year}</div>
                <div className="timeline-pane pane-right">
                  {leftHasImage ? (
                    <div className="content-group text-only align-left">
                      <p className="phylum-desc">{a.description}</p>
                    </div>
                  ) : (
                    <div className="content-group align-left">
                      <h3 className="phylum-name" style={{ color: 'var(--meer-primary-dark)' }}>{a.name}</h3>
                      <div className="phylum-image-wrapper" style={{ borderColor: 'var(--meer-primary)' }}>
                        <img src={a.img} alt={a.name} loading="lazy" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EvolutionTimelineSection() {
  return (
    <div className="gir-evo-timeline-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Evolutionary Chapters</h3>
        <p className="gir-section-text">The 15-million-year evolutionary path of meerkats broken down into key transitions.</p>
        <div className="gir-epoch-grid">
          {EPOCHS.map((e, i) => (
            <div className="gir-epoch-card" key={i}>
              <div className="gir-epoch-icon">{e.icon}</div>
              <div className="gir-epoch-content">
                <div className="gir-epoch-time">{e.time}</div>
                <h4>{e.stage}</h4>
                <div className="gir-epoch-duration">Takes {e.duration}</div>
              </div>
            </div>
          ))}
          <div className="gir-epoch-card total" style={{ borderColor: 'var(--meer-primary)' }}>
            <div className="gir-epoch-icon"><Repeat size={24} /></div>
            <div className="gir-epoch-content">
              <div className="gir-epoch-time">15 → 1 Mya</div>
              <h4>Total Evolution</h4>
              <div className="gir-epoch-duration">14 Million Years</div>
            </div>
          </div>
        </div>
      </div>

      <div className="gir-section-box" style={{ marginTop: '3rem' }}>
        <h3 className="gir-section-title">Critical Evolutionary Milestones</h3>
        <div className="gir-ancestors-grid">
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: '#2f8593' }}>Feliformia</div>
            <div className="gir-anc-header">
              <h4>Herpestidae Split</h4>
              <span>15 Mya</span>
            </div>
            <p>Diverged from other feliforms, specializing in ground-dwelling insectivorous habits.</p>
          </div>
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: '#8ba393' }}>Open Savanna</div>
            <div className="gir-anc-header">
              <h4>Suricata Split</h4>
              <span>5 Mya</span>
            </div>
            <p>Left dense cover for open plains, driving the need for social warning systems.</p>
          </div>
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: '#fcd42c', color: 'var(--meer-text-main)' }}>Fossil Record</div>
            <div className="gir-anc-header">
              <h4>Suricata major</h4>
              <span>2 Mya</span>
            </div>
            <p>Prehistoric ancestor of meerkats, showing identical digging anatomy but larger body mass.</p>
          </div>
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: '#1f5963' }}>Modern form</div>
            <div className="gir-anc-header">
              <h4>Suricata suricatta</h4>
              <span>1 Mya</span>
            </div>
            <p>First appearance of fully modern meerkats with specialized group-rearing and alarm vocalizations.</p>
          </div>
        </div>
      </div>

      <div className="gir-section-box" style={{ marginTop: '3rem' }}>
        <h3 className="gir-section-title">Chronological Milestones</h3>
        <div className="gir-chrono-list">
          {CHRONOLOGY.map((c, i) => (
            <div className={`gir-chrono-item ${c.period === '1 Mya' || c.period === 'Present' ? 'gir-chrono-highlight' : ''}`} key={i}>
              <div className="gir-chrono-time">{c.period}</div>
              <div className="gir-chrono-node" style={{ background: 'var(--meer-primary)' }} />
              <div className="gir-chrono-details">
                <h4>{c.ancestor}</h4>
                <p>{c.characteristics}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="gir-callout gir-callout-fact" style={{ marginTop: '2rem', borderLeftColor: 'var(--meer-primary)' }}>
          <strong>Unique Achievement:</strong> Modern meerkats are the only mongooses to evolve complete division of labor, altruistic guard
          rotations, and active teaching (mentoring) of hunting strategies.
        </div>
      </div>
    </div>
  );
}

export default function MeerkatBlog() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 120px)');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('meerkat-day');
  const [scrollPct, setScrollPct] = useState(0);
  const sidebarRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: top - 90, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('.foo-zl-footer');
      const hero = document.querySelector('.meer-hero-banner');
      const scrollY = window.scrollY;
      if (hero) {
        setSidebarVisible(scrollY > hero.offsetHeight * 0.7);
      }
      setShowBackToTop(scrollY > 400);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= 150) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }

      if (!footer || !sidebarRef.current) return;
      const offset = 80;
      const rect = footer.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      if (rect.top < viewHeight) {
        const h = Math.max(rect.top - offset - 40, 100);
        setSidebarHeight(`${h}px`);
      } else {
        setSidebarHeight(`calc(100vh - ${offset + 40}px)`);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="meer-zoopage">
      <section className="meer-hero-banner" id="meerkat-day">
        <div className="meer-hero-container">
          <div className="meer-hero-content">
            <span className="meer-taxonomy-tag">July 3 · World Meerkat Day</span>
            <h1 className="meer-hero-title">World Meerkat Day</h1>
            <p className="meer-hero-subtitle">Celebrating the Social Sentinels of the Desert</p>
            <div className="meer-taxonomy-grid">
              <div className="meer-tax-item">
                <span className="meer-tax-label">Weight</span>
                <span className="meer-tax-value">730 g</span>
              </div>
              <div className="meer-tax-item">
                <span className="meer-tax-label">Lifespan</span>
                <span className="meer-tax-value">12-14 yrs</span>
              </div>
              <div className="meer-tax-item">
                <span className="meer-tax-label">Speed</span>
                <span className="meer-tax-value">32 km/h</span>
              </div>
              <div className="meer-tax-item">
                <span className="meer-tax-label">Group Size</span>
                <span className="meer-tax-value">Up to 50</span>
              </div>
            </div>
            <p className="meer-hero-description">
              Masters of collaboration, these small mammals conquer the harsh Kalahari Desert through complex social structures, altruistic
              behavior, and sophisticated vocal communication.
            </p>
          </div>
          <div className="meer-hero-visual">
            <div className="meer-hero-image-wrapper">
              <img
                src={wikiImages['hero-meerkat-banner'] || generatedArt('hero-meerkat-banner', 'Meerkat')}
                alt="Meerkat Hero"
                className="meer-hero-img"
              loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
        <div className="meer-hero-bottom-fade" />
        <div className="meer-scroll-indicator" onClick={() => scrollToSection('meet-meerkat')}>
          <div className="meer-mouse">
            <div className="meer-wheel" />
          </div>
          <div className="meer-arrow-down" />
        </div>
      </section>

      <div className="meer-zoo-app-container">
        <div className={`meer-mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
        <aside ref={sidebarRef} className={`meer-zoo-sidebar ${mobileOpen ? 'open' : ''} ${sidebarVisible ? '' : 'hidden'}`} style={{ height: sidebarHeight }}>
          <div className="meer-sidebar-header">
            <div className="meer-progress-track">
              <div className="meer-progress-fill" style={{ width: `${scrollPct}%` }} />
            </div>
          </div>
          <nav className="meer-sidebar-nav">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} className={`meer-nav-btn ${activeSection === item.id ? 'active' : ''}`} onClick={() => scrollToSection(item.id)}>
                <span className="meer-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="meer-zoo-main-content">
          <button className="meer-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open Menu">
            <Menu size={24} />
          </button>

          <div className="meer-content-card">
            <section id="meerkat-day" className="meer-blog-section">
              <h2 className="meer-section-heading">Why World Meerkat Day?</h2>
              <div className="meer-section-box">
                <div className="meer-section-banner-wrapper">
                  <img src={wikiImages['world-meerkat-day-banner'] || generatedArt('world-meerkat-day-banner', 'World Meerkat Day')} alt="World Meerkat Day Banner" loading="lazy" decoding="async" />
                </div>
                <h3 className="meer-section-title">July 3rd — Celebrating the Desert's Cooperators</h3>
                <p className="meer-section-text">
                  <strong>World Meerkat Day</strong> is celebrated annually on <strong>July 3rd</strong>. This day is dedicated to raising
                  awareness about these incredible, highly social animals and the desert ecosystems they call home.
                </p>
                <p className="meer-section-text">
                  Meerkats teach us valuable lessons about teamwork, altruism, and collective responsibility. By understanding how they survive
                  the harsh desert conditions through collaboration, we can appreciate the complex web of life in the Kalahari.
                </p>
                <div className="meer-day-gallery">
                  <div className="meer-gallery-item">
                    <img src={wikiImages['gallery-meerkat-family'] || generatedArt('gallery-meerkat-family', 'Meerkat Family')} alt="Meerkat Family" loading="lazy" decoding="async" />
                  </div>
                  <div className="meer-gallery-item">
                    <img src={wikiImages['gallery-meerkat-lookout'] || generatedArt('gallery-meerkat-lookout', 'Meerkat Lookout')} alt="Meerkat Lookout" loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="meer-day-highlights" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
                  <div className="meer-day-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--meer-border)', textAlign: 'center', boxShadow: 'var(--meer-shadow-soft)' }}>
                    <span className="meer-day-icon" style={{ display: 'block', marginBottom: '10px', color: 'var(--meer-primary)' }}><Compass size={32} /></span>
                    <h4 style={{ color: 'var(--meer-primary-dark)', marginBottom: '10px' }}>When?</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--meer-text-secondary)', lineHeight: '1.5' }}>
                      July 3rd every year — a special day dedicated to the Suricata genus
                    </p>
                  </div>
                  <div className="meer-day-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--meer-border)', textAlign: 'center', boxShadow: 'var(--meer-shadow-soft)' }}>
                    <span className="meer-day-icon" style={{ display: 'block', marginBottom: '10px', color: 'var(--meer-primary)' }}><Users size={32} /></span>
                    <h4 style={{ color: 'var(--meer-primary-dark)', marginBottom: '10px' }}>Why Celebrate?</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--meer-text-secondary)', lineHeight: '1.5' }}>
                      To honor their unmatched cooperation, intricate communication, and community survival instincts
                    </p>
                  </div>
                  <div className="meer-day-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--meer-border)', textAlign: 'center', boxShadow: 'var(--meer-shadow-soft)' }}>
                    <span className="meer-day-icon" style={{ display: 'block', marginBottom: '10px', color: 'var(--meer-primary)' }}><Shield size={32} /></span>
                    <h4 style={{ color: 'var(--meer-primary-dark)', marginBottom: '10px' }}>Our Mission</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--meer-text-secondary)', lineHeight: '1.5' }}>
                      Support habitat protection and address challenges like severe Kalahari droughts
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="meer-section-divider" />

            <section id="meet-meerkat" className="meer-blog-section">
              <h2 className="meer-section-heading">Meet the Meerkat</h2>
              <div className="meer-section-box meer-horizontal-layout">
                <div className="meer-horizontal-text">
                  <h3 className="meer-section-title">The Collaborative Carnivore</h3>
                  <p className="meer-section-text">
                    Meerkats (<em>Suricata suricatta</em>) are small foraging carnivores belonging to the mongoose family (Herpestidae). They are
                    highly recognizable by their upright sentinel posture and are native to the Kalahari Desert in Botswana, the Namib Desert in
                    Namibia, southwestern Angola, and South Africa.
                  </p>
                  <p className="meer-section-text">
                    They possess slender bodies, long legs, and a distinctive tail that helps them balance when standing upright. Meerkats have a
                    broad head, large eyes, a pointed snout, and small crescent-shaped ears. The color of their coat varies depending on their
                    geographical location, ranging from light fawn to silvery-brown, which helps them blend seamlessly into their arid, dusty
                    environment.
                  </p>
                  <p className="meer-section-text">
                    A group of meerkats is called a "mob", "gang", or "clan". While a typical clan contains around 20 meerkats, some
                    super-families have been known to grow up to 50 members. These clans are tightly knit and highly territorial, constantly
                    defending their home range from rival meerkat mobs.
                  </p>
                </div>
                <div className="meer-horizontal-image-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                  <img
                    src={wikiImages['meet-the-meerkat-1'] || generatedArt('meet-the-meerkat-1', 'Meet the Meerkat')}
                    alt="Meet the Meerkat"
                    className="meer-horizontal-image"
                    style={{ height: 'auto', maxHeight: '230px', objectFit: 'contain', objectPosition: 'center', width: '100%', border: '2px solid var(--meer-primary)', padding: '4px', background: '#ffffff', borderRadius: '12px' }}
                  loading="lazy" decoding="async" />
                  <img
                    src={wikiImages['meet-the-meerkat-2'] || generatedArt('meet-the-meerkat-2', 'Meerkat Scene')}
                    alt="Meet the Meerkat Scene"
                    className="meer-horizontal-image"
                    style={{ height: 'auto', maxHeight: '230px', objectFit: 'contain', objectPosition: 'center', width: '100%', border: '2px solid var(--meer-primary)', padding: '4px', background: '#ffffff', borderRadius: '12px' }}
                  loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="meer-meet-stats">
                <div className="meer-stat-card">
                  <span className="meer-stat-number">12 in</span>
                  <span className="meer-stat-desc">Body Length</span>
                </div>
                <div className="meer-stat-card">
                  <span className="meer-stat-number">10 in</span>
                  <span className="meer-stat-desc">Tail Length</span>
                </div>
                <div className="meer-stat-card">
                  <span className="meer-stat-number">30+</span>
                  <span className="meer-stat-desc">Distinct Calls</span>
                </div>
                <div className="meer-stat-card">
                  <span className="meer-stat-number">4</span>
                  <span className="meer-stat-desc">Toes per Foot</span>
                </div>
              </div>
            </section>

            <div className="meer-section-divider" />

            <section id="adaptations" className="meer-blog-section">
              <h2 className="meer-section-heading">Biological Marvels</h2>
              <AdaptationsSection />
            </section>

            <div className="meer-section-divider" />

            <section id="stripes" className="meer-blog-section">
              <h2 className="meer-section-heading">Back Striping Patterns</h2>
              <StripesSection />
            </section>

            <div className="meer-section-divider" />

            <section id="altruism" className="meer-blog-section">
              <h2 className="meer-section-heading">Science of Altruism</h2>
              <AltruismSection />
            </section>

            <div className="meer-section-divider" />

            <section id="routine" className="meer-blog-section">
              <h2 className="meer-section-heading">A Day in the Life</h2>
              <RoutineSection />
            </section>

            <div className="meer-section-divider" />

            <section id="taxonomy" className="meer-blog-section">
              <h2 className="meer-section-heading">Taxonomy & Evolution</h2>
              <TaxonomySection />
            </section>

            <div className="meer-section-divider" />

            <section id="diversity" className="meer-blog-section">
              <h2 className="meer-section-heading">Living Subspecies</h2>
              <DiversitySection />
            </section>

            <div className="meer-section-divider" />

            <section id="ancestry" className="meer-blog-section">
              <h2 className="meer-section-heading">15-Million-Year Ancestry</h2>
              <AncestrySection />
            </section>

            <div className="meer-section-divider" />

            <section id="timeline" className="meer-blog-section">
              <h2 className="meer-section-heading">Mongoose Evolution Timeline</h2>
              <EvolutionTimelineSection />
            </section>
          </div>
        </main>
      </div>

      <button className={`meer-back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUp size={22} />
      </button>
    </div>
  );
}
