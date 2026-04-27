import React, { useEffect, useMemo, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
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
import Gallery from './components/Gallery'
import CV from './components/CV'
import Publications from './components/Publications'
import Timeline from './components/Timeline'
import { getThemeColors } from './theme'

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
  publications: Publications,
  career_timeline: Timeline,
  gallery: Gallery,
  cv: CV,
}

function getRouteFromHash() {
  if (typeof window === 'undefined') return 'home'

  const hash = window.location.hash.replace(/^#\/?/, '').trim()
  return hash || 'home'
}

const HOME_ROUTES = new Set(['home', 'research'])

/* ── app ────────────────────────────────────────────── */

export default function App() {
  const theme = normalizeTheme(portfolioData.theme)
  const colors = getThemeColors(theme)
  const sections = portfolioData.sections ?? []
  const [route, setRoute] = useState(getRouteFromHash)

  const sectionByType = useMemo(() => {
    return sections.reduce((acc, section) => {
      if (section?.type) acc[section.type] = section
      return acc
    }, {})
  }, [sections])

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (route === 'research') {
        document.getElementById('case_studies')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [route])

  const renderSection = (type, override = {}) => {
    const section = sectionByType[type]
    const Component = SECTION_MAP[type]
    if (!section || !Component) return null
    return <Component key={type} section={{ ...section, ...override }} theme={theme} />
  }

  const isHomeRoute = HOME_ROUTES.has(route)
  const analyticsPath =
    typeof window === 'undefined' ? '/' : `${window.location.pathname}${window.location.hash}`

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
        backgroundColor: colors.background,
      }}
    >
      {renderSection('navbar')}

      {isHomeRoute && (
        <>
          {renderSection('hero')}
          {renderSection('case_studies')}
          {renderSection('skills')}
          {renderSection('gallery')}
        </>
      )}

      {route === 'timeline' && renderSection('career_timeline')}
      {route === 'experience' && renderSection('experience')}
      {route === 'publications' && renderSection('publications')}

      {!isHomeRoute && !['timeline', 'experience', 'publications'].includes(route) && (
        <>
          {renderSection('hero')}
          {renderSection('case_studies')}
          {renderSection('skills')}
          {renderSection('gallery')}
        </>
      )}

      {renderSection('footer')}
      <Analytics route={`/${route}`} path={analyticsPath} />
    </div>
  )
}
