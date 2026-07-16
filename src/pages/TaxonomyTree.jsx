import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import treeData from '../data/animaliaTree.json';

// The live site renders this tree as an interactive pan/zoom canvas built with
// ReactFlow. That library isn't part of this project, so the same taxonomic
// content (Kingdom -> Phylum -> Class -> ... -> Species) is reproduced here as
// a faithful nested expand/collapse explorer, matching the dark canvas theme
// and node styling of the original.

function findMatches(node, query, results) {
  if (results.length >= 5) return;
  const label = node.label.toLowerCase();
  const common = node.commonName ? node.commonName.toLowerCase() : '';
  if ((label.includes(query) || common.includes(query)) && label !== query) {
    results.push(node);
  }
  if (node.children) {
    for (const child of node.children) findMatches(child, query, results);
  }
}

function findPathTo(node, query, path = []) {
  const label = node.label.toLowerCase();
  const common = node.commonName ? node.commonName.toLowerCase() : '';
  if (label.includes(query) || common.includes(query)) return { found: node, path };
  if (node.children) {
    for (const child of node.children) {
      const result = findPathTo(child, query, [...path, node.id]);
      if (result.found) return result;
    }
  }
  return { found: null, path: [] };
}

function TreeNode({ node, openMap, setOpenMap, activeId, setActiveId, depth }) {
  const navigate = useNavigate();
  const isLeaf = !node.children || node.children.length === 0;
  const isOpen = !isLeaf && openMap[node.id] !== undefined && openMap[node.id] !== '';
  const openChildId = openMap[node.id];
  const isActive = activeId === node.id;

  const handleClick = () => {
    setActiveId(node.id);
    if (isLeaf) {
      navigate(`/animal/${node.id}`);
      return;
    }
    setOpenMap((prev) => ({ ...prev, [node.id]: isOpen ? '' : node.children[0].id }));
  };

  return (
    <li className="taxo-tree-node-wrapper" style={{ listStyle: 'none' }}>
      <div
        onClick={handleClick}
        style={{
          padding: '10px 16px',
          borderRadius: 12,
          fontSize: 12,
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          minWidth: 120,
          textAlign: 'center',
          cursor: 'pointer',
          color: '#000',
          background: isActive ? '#00e676' : isLeaf ? '#ffd54f' : '#64b5f6',
          boxShadow: isActive ? '0 0 18px rgba(0,230,118,0.9)' : '0 4px 12px rgba(0,0,0,0.4)',
          transition: 'all 0.3s ease',
          userSelect: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          margin: '6px 0',
        }}
      >
        <span>{node.label}</span>
        <span style={{ fontSize: 9, opacity: 0.75 }}>{node.rank}</span>
        {node.commonName && <span style={{ fontSize: 9, opacity: 0.8, fontWeight: 400 }}>({node.commonName})</span>}
        {!isLeaf && <span style={{ fontSize: 10 }}>{isOpen ? '▾' : '▸'}</span>}
      </div>
      {isOpen && (
        <ul style={{ marginLeft: depth < 2 ? 24 : 32, paddingLeft: 16, borderLeft: '2px dashed rgba(255,255,255,0.15)' }}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              openMap={openMap}
              setOpenMap={setOpenMap}
              activeId={activeId}
              setActiveId={setActiveId}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function TaxonomyTree() {
  const [openMap, setOpenMap] = useState({ animalia: treeData.children[0]?.id || '' });
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    const results = [];
    findMatches(treeData, search.trim().toLowerCase(), results);
    return results;
  }, [search]);

  const runSearch = (value) => {
    if (!value.trim()) return;
    const query = value.trim().toLowerCase();
    const { found, path } = findPathTo(treeData, query);
    if (found) {
      const next = {};
      path.forEach((id, i) => {
        next[id] = path[i + 1] || found.id;
      });
      setOpenMap(next);
      setActiveId(found.id);
      setMessage('');
    } else {
      setMessage('No matching species/taxon found.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#121212', color: '#e0e0e0', padding: '24px 16px 64px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: 6 }}>Interactive Taxonomy Tree</h1>
        <p style={{ color: '#9aa0a6', marginBottom: 24 }}>
          Explore the animal kingdom visually — discover classifications from Phylum to Species.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(search);
          }}
          style={{ display: 'flex', gap: 8, marginBottom: 8, position: 'relative', maxWidth: 320 }}
        >
          <input
            type="text"
            placeholder="Search taxon (e.g. Tiger)"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setMessage('');
            }}
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #444', background: '#222', color: 'white', outline: 'none', width: '100%' }}
          />
          {suggestions.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                background: '#222',
                listStyle: 'none',
                margin: '4px 0 0',
                padding: 0,
                borderRadius: 6,
                overflow: 'hidden',
                zIndex: 10,
                border: '1px solid #444',
              }}
            >
              {suggestions.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch(s.label);
                      runSearch(s.label);
                    }}
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', background: 'transparent', color: '#eee', border: 'none', cursor: 'pointer' }}
                  >
                    {s.label} {s.commonName ? `— ${s.commonName}` : ''}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>
        {message && <p style={{ color: '#ff8a80', marginBottom: 16 }}>{message}</p>}

        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '24px 20px',
            overflowX: 'auto',
          }}
        >
          <ul style={{ padding: 0, margin: 0 }}>
            <TreeNode
              node={treeData}
              openMap={openMap}
              setOpenMap={setOpenMap}
              activeId={activeId}
              setActiveId={setActiveId}
              depth={0}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
