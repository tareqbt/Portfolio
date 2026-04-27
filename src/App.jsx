import React from 'react'
import portfolioData from './portfolio-data.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import Achievements from './components/Achievements'
import CaseStudies from './components/CaseStudies'

/* ── helpers ────────────────────────────────────────── */

function normalizeTheme(t) {
  if (!t) return {}
  return {
    ...t,
    maxWidth: t.maxWidth ?? t.max_width ?? '1280px',
    width: t.width ?? '100%',
    margin: t.margin ?? '0 auto',
    display: t.display ?? 'flex',
    flexDirection: t.flexDirection ?? t.flex_direction ?? 'column',
    alignItems: t.alignItems ?? t.align_items ?? 'center',
    colorPalette: Array.isArray(t.colorPalette)
      ? t.colorPalette
      : Array.isArray(t.color_palette)
        ? t.color_palette
        : [],
  }
}

/* ── section map ────────────────────────────────────── */

const SECTION_MAP = {
  navbar: Navbar,
  hero: Hero,
  skills: Skills,
  experience: Experience,
  projects: Projects,
  footer: Footer,
  testimonials: Testimonials,
  services: Services,
  achievements: Achievements,
  case_studies: CaseStudies,
}

/* ── app ────────────────────────────────────────────── */

export default function App() {
  const theme = normalizeTheme(portfolioData.theme)
  const sections = portfolioData.sections ?? []

  return (
    <div
      style={{
        width: theme.width,
        maxWidth: theme.maxWidth,
        margin: theme.margin,
        display: theme.display,
        flexDirection: theme.flexDirection,
        alignItems: theme.alignItems,
        minHeight: '100vh',
        backgroundColor: theme.colorPalette.length > 0
          ? theme.colorPalette[theme.colorPalette.length - 1]
          : undefined,
      }}
    >
      {sections.map((section, idx) => {
        const Component = SECTION_MAP[section?.type]
        if (!Component) return null
        const key = section?.id ?? `${section?.type}-${idx}`
        return <Component key={key} section={section} theme={theme} />
      })}
    </div>
  )
}
