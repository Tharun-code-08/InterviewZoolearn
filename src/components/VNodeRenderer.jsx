import {
  Layers,
  BookOpen,
  Waves,
  RefreshCw,
  Activity,
  Microscope,
  Sparkles,
  Syringe,
  GitBranch,
  Bird,
  CircleCheck,
  FlaskConical,
  Scissors,
  Shell,
  ShieldCheck,
  Star,
  TreePine,
  Zap,
  RotateCcw,
} from 'lucide-react';

const ICONS = {
  Layers,
  BookOpen,
  Waves,
  RefreshCw,
  Activity,
  Microscope,
  Sparkles,
  Syringe,
  GitBranch,
  Bird,
  CircleCheck,
  FlaskConical,
  Scissors,
  Shell,
  ShieldCheck,
  Star,
  TreePine,
  Zap,
  RotateCcw,
};

// Renders a lightweight vdom tree extracted from the live site's compiled JSX
// (shape: { tag, props, children } | { icon } | { frag, children } | { stub } | string)
// so the original classNames/content/structure can be reproduced faithfully
// without hand-transcribing thousands of lines of JSX.
export default function VNode({ node }) {
  if (node === null || node === undefined || node === false) return null;
  if (typeof node === 'string' || typeof node === 'number') return node;

  if (Array.isArray(node)) {
    return node.map((child, i) => <VNode node={child} key={i} />);
  }

  if (node.icon) {
    const Icon = ICONS[node.icon];
    if (!Icon) return null;
    return <Icon className="lucide section-icon" aria-hidden="true" />;
  }

  if (node.stub) {
    // Interactive widgets (ReactFlow taxonomy diagram) intentionally omitted —
    // the same information is already presented in the surrounding class cards.
    return null;
  }

  if (node.frag) {
    return <>{(node.children || []).map((child, i) => (
      <VNode node={child} key={i} />
    ))}</>;
  }

  if (node.tag) {
    const Tag = node.tag;
    const props = { ...(node.props || {}) };
    delete props.ref;
    const children = node.children || [];
    if (children.length === 0) {
      return <Tag {...props} />;
    }
    return (
      <Tag {...props}>
        {children.map((child, i) => (
          <VNode node={child} key={i} />
        ))}
      </Tag>
    );
  }

  return null;
}
