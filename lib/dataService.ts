import { prisma } from '@/lib/prisma';
import {
  featuredTopics,
  quickModules,
  recommendedModules,
  moduleDetails,
  speciesList,
  speciesDetails,
  caseStudies,
} from '@/data/mockData';

export async function getModules() {
  if (process.env.DATABASE_URL) {
    try {
      const modules = await prisma.module.findMany({ include: { quizzes: true } });
      return modules.map((module) => ({
        slug: module.slug,
        title: module.title,
        category: module.category,
        description: module.description,
        lessons: module.lessons,
        highlight: `${module.quizzes.length} preguntas`,
      }));
    } catch {
      return recommendedModules;
    }
  }

  return recommendedModules;
}

export async function getModuleBySlug(slug: string) {
  if (process.env.DATABASE_URL) {
    try {
      const module = await prisma.module.findUnique({
        where: { slug },
        include: { quizzes: true },
      });
      if (!module) return null;

      return {
        slug: module.slug,
        title: module.title,
        description: module.description,
        category: module.category,
        lessons: module.lessons,
        highlight: `${module.quizzes.length} preguntas`,
        details: moduleDetails[slug as keyof typeof moduleDetails] ?? null,
      };
    } catch {
      return { ...recommendedModules.find((item) => item.slug === slug), details: moduleDetails[slug as keyof typeof moduleDetails] ?? null } || null;
    }
  }

  return { ...recommendedModules.find((item) => item.slug === slug), details: moduleDetails[slug as keyof typeof moduleDetails] ?? null } || null;
}

export async function getSpecies() {
  if (process.env.DATABASE_URL) {
    try {
      const species = await prisma.species.findMany();
      return species.map((item) => ({
        slug: item.slug,
        name: item.name,
        subtitle: item.reference,
        image: `/images/${item.slug}.png`,
      }));
    } catch {
      return speciesList;
    }
  }

  return speciesList;
}

export async function getSpeciesBySlug(slug: string) {
  if (process.env.DATABASE_URL) {
    try {
      const item = await prisma.species.findUnique({ where: { slug } });
      if (!item) return null;
      return {
        name: item.name,
        subtitle: item.reference,
        temperature: item.temperature,
        heartRate: item.heartRate,
        respiratoryRate: item.respiratoryRate,
        weightRange: item.weightRange,
        capillaryRefill: item.notes ?? '≤ 2 segundos',
      };
    } catch {
      return speciesDetails[slug as keyof typeof speciesDetails] || null;
    }
  }

  return speciesDetails[slug as keyof typeof speciesDetails] || null;
}

export async function getCaseStudies() {
  if (process.env.DATABASE_URL) {
    try {
      const cases = await prisma.caseStudy.findMany();
      return cases.map((item) => ({
        slug: item.slug,
        title: item.title,
        category: item.category,
        summary: item.summary,
      }));
    } catch {
      return caseStudies;
    }
  }

  return caseStudies;
}

export async function getCaseBySlug(slug: string) {
  if (process.env.DATABASE_URL) {
    try {
      const caseItem = await prisma.caseStudy.findUnique({
        where: { slug },
        include: { decisions: true },
      });
      if (!caseItem) return null;

      return {
        slug: caseItem.slug,
        title: caseItem.title,
        category: caseItem.category,
        summary: caseItem.summary,
        scenario: caseItem.scenario,
        decisions: caseItem.decisions.map((decision) => ({
          label: decision.label,
          description: decision.description,
          feedback: decision.feedback,
          correct: decision.correct,
        })),
      };
    } catch {
      return caseStudies.find((item) => item.slug === slug) || null;
    }
  }

  return caseStudies.find((item) => item.slug === slug) || null;
}

export async function searchContent(query: string) {
  const normalized = query.toLowerCase();
  const modules = recommendedModules.filter((module) =>
    module.title.toLowerCase().includes(normalized) || module.description.toLowerCase().includes(normalized),
  );
  const cases = caseStudies.filter((item) => item.title.toLowerCase().includes(normalized) || item.summary.toLowerCase().includes(normalized));
  const topics = featuredTopics.filter((topic) => topic.toLowerCase().includes(normalized));

  return { modules, cases, topics };
}
