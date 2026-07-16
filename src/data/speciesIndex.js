import porifera from './species/porifera_data.json';
import coelenterata from './species/coelenterata_data.json';
import ctenophora from './species/ctenophora_data.json';
import platyhelminthes from './species/platyhelminthes_data.json';
import aschelminthes from './species/aschelminthes_data.json';
import annelida from './species/annelida_data.json';
import arthropoda from './species/arthropoda_data.json';
import mollusca from './species/mollusca_data.json';
import echinodermata from './species/echinodermata_data.json';
import hemichordata from './species/hemichordata_data.json';
import chordata from './species/chordata_data.json';

import chordataTree from './species/chordata_tree.json';
import molluscaTree from './species/mollusca_tree.json';
import { generatedArt } from '../utils/generatedArt';

function withGeneratedArt(dataMap) {
  const out = {};
  Object.entries(dataMap).forEach(([slug, sp]) => {
    out[slug] = { ...sp, image: generatedArt(slug, sp.name) };
  });
  return out;
}

function withGeneratedArtTree(tree) {
  return tree.map((group) => ({
    ...group,
    species: group.species.map((sp) => ({ ...sp, image: generatedArt(sp.slug, sp.name) })),
  }));
}

export const PHYLUM_DATA = {
  porifera: withGeneratedArt(porifera),
  coelenterata: withGeneratedArt(coelenterata),
  ctenophora: withGeneratedArt(ctenophora),
  platyhelminthes: withGeneratedArt(platyhelminthes),
  aschelminthes: withGeneratedArt(aschelminthes),
  annelida: withGeneratedArt(annelida),
  arthropoda: withGeneratedArt(arthropoda),
  mollusca: withGeneratedArt(mollusca),
  echinodermata: withGeneratedArt(echinodermata),
  hemichordata: withGeneratedArt(hemichordata),
  chordata: withGeneratedArt(chordata),
};

export const PHYLUM_TREES = {
  chordata: withGeneratedArtTree(chordataTree),
  mollusca: withGeneratedArtTree(molluscaTree),
};

export const PHYLUM_LABELS = {
  porifera: 'Porifera',
  coelenterata: 'Coelenterata',
  ctenophora: 'Ctenophora',
  platyhelminthes: 'Platyhelminthes',
  aschelminthes: 'Aschelminthes',
  annelida: 'Annelida',
  arthropoda: 'Arthropoda',
  mollusca: 'Mollusca',
  echinodermata: 'Echinodermata',
  hemichordata: 'Hemichordata',
  chordata: 'Chordata',
};

function buildTreeFromData(dataMap) {
  const groups = new Map();
  Object.values(dataMap).forEach((species) => {
    const classLine = (species.classification || []).find((c) => c.startsWith('Class:'));
    const className = classLine ? classLine.split(':')[1].trim() : 'Unclassified';
    if (!groups.has(className)) groups.set(className, { id: className, className, species: [] });
    groups.get(className).species.push({
      id: species.id,
      slug: species.slug,
      name: species.name,
      scientificName: species.scientificName,
      image: species.image,
      path: `/zoohub/${species.phylumSlug}/${species.slug}`,
    });
  });
  return Array.from(groups.values());
}

export function getPhylumTree(phylumSlug) {
  if (PHYLUM_TREES[phylumSlug]) return PHYLUM_TREES[phylumSlug];
  const dataMap = PHYLUM_DATA[phylumSlug];
  if (!dataMap) return [];
  const withPhylum = {};
  Object.entries(dataMap).forEach(([slug, sp]) => {
    withPhylum[slug] = { ...sp, phylumSlug };
  });
  return buildTreeFromData(withPhylum);
}

export function getSpecies(phylumSlug, slug) {
  const dataMap = PHYLUM_DATA[phylumSlug];
  if (!dataMap) return null;
  return dataMap[slug] || null;
}

export function getAdjacentSpecies(phylumSlug, slug) {
  const dataMap = PHYLUM_DATA[phylumSlug];
  if (!dataMap) return { prev: null, next: null };
  const keys = Object.keys(dataMap);
  const idx = keys.indexOf(slug);
  const prevKey = idx > 0 ? keys[idx - 1] : keys[keys.length - 1];
  const nextKey = idx >= 0 && idx < keys.length - 1 ? keys[idx + 1] : keys[0];
  return { prev: dataMap[prevKey], next: dataMap[nextKey] };
}
