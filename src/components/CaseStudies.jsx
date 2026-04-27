import React, { useState } from 'react'
import SectionHeader from './SectionHeader'

function getColors(theme) {
  const palette = theme?.colorPalette ?? theme?.color_palette ?? []
  return {
    primary: palette[0] || '#1917fc',
    secondary: palette[1] || '#134331',
    accent: palette[2] || '#ed2f25',
  }
}

function Tags({ tags, primary }) {
  if (!tags || tags.length === 0) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
      {tags.map((tag, i) => (
        <span key={i} style={{ fontSize: '0.72rem', fontWeight: 600, backgroundColor: `${primary}12`, color: primary, borderRadius: 4, padding: '2px 8px' }}>{tag}</span>
      ))}
    </div>
  )
}

function Metrics({ metrics, primary, secondary }) {
  if (!metrics || metrics.length === 0) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '0.75rem' }}>
      {metrics.map((m, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: primary, lineHeight: 1 }}>{m.value}</span>
          <span style={{ fontSize: '0.72rem', color: secondary, opacity: 0.75, marginTop: 2 }}>{m.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── featured variant ──────────────────────────── */

function CaseStudiesFeatured({ items, primary, secondary, accent }) {
  const [openItem, setOpenItem] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {items.map((item, idx) => {
        const id = item.id || String(idx)
        const isOpen = openItem === id
        const hasAccordion = item.problem || item.approach || item.result

        return (
          <div key={id} style={{ border: `2px solid ${secondary}20`, borderRadius: 16, overflow: 'hidden', display: 'grid', gridTemplateColumns: '40% 60%' }}>
            <div style={{ backgroundColor: `${primary}10`, minHeight: 280, overflow: 'hidden' }}>
              {item.image
                ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <div style={{ width: '100%', height: '100%', minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: `${primary}50` }}>📋</div>
              }
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Tags tags={item.tags} primary={primary} />
              <h3 style={{ color: primary, margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h3>
              {item.client && <div style={{ fontSize: '0.75rem', fontWeight: 600, color: secondary, opacity: 0.75 }}>Client: {item.client}</div>}
              {item.summary && <p style={{ color: secondary, opacity: 0.85, margin: 0, fontStyle: 'italic', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.summary}</p>}

              {hasAccordion && (
                <div>
                  <button
                    onClick={() => setOpenItem(isOpen ? null : id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'none', border: `1px solid ${primary}30`, borderRadius: 6,
                      padding: '0.375rem 0.75rem', cursor: 'pointer', color: primary,
                      fontSize: '0.8rem', fontWeight: 600,
                    }}
                  >
                    <span>Problem / Approach / Result</span>
                    <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
                  </button>
                  {isOpen && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {item.problem && <div><div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: accent, marginBottom: '0.2rem' }}>Problem</div><p style={{ color: secondary, opacity: 0.85, margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>{item.problem}</p></div>}
                      {item.approach && <div><div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: accent, marginBottom: '0.2rem' }}>Approach</div><p style={{ color: secondary, opacity: 0.85, margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>{item.approach}</p></div>}
                      {item.result && <div><div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: accent, marginBottom: '0.2rem' }}>Result</div><p style={{ color: secondary, opacity: 0.85, margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>{item.result}</p></div>}
                    </div>
                  )}
                </div>
              )}

              <Metrics metrics={item.metrics} primary={primary} secondary={secondary} />
              {item.link_url && (
                <a href={item.link_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', fontWeight: 600, color: primary, textDecoration: 'none', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  View Case Study →
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── grid variant ──────────────────────────────── */

function CaseStudiesGrid({ items, primary, secondary, accent }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          style={{
            border: `2px solid ${hovered === idx ? accent : `${secondary}20`}`,
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            transform: hovered === idx ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hovered === idx ? `0 8px 24px ${accent}30` : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          {item.image
            ? <img src={item.image} alt={item.title} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            : <div style={{ width: '100%', height: 180, backgroundColor: `${primary}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: `${primary}40` }}>📋</div>
          }
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <Tags tags={item.tags} primary={primary} />
            <h3 style={{ color: primary, margin: 0, fontSize: '1rem', fontWeight: 700 }}>{item.title}</h3>
            {item.summary && <p style={{ color: secondary, opacity: 0.8, margin: 0, fontSize: '0.875rem' }}>{item.summary}</p>}
            <Metrics metrics={item.metrics} primary={primary} secondary={secondary} />
            {item.link_url && <a href={item.link_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, textDecoration: 'none', marginTop: 'auto' }}>View →</a>}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── minimal variant ───────────────────────────── */

function CaseStudiesMinimal({ items, primary, secondary, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, idx) => (
        <div key={item.id || idx} style={{ borderLeft: `4px solid ${accent}`, paddingLeft: '1.5rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', marginBottom: idx < items.length - 1 ? '2.5rem' : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
            <h3 style={{ color: primary, margin: 0, fontSize: '1.125rem', fontWeight: 700 }}>{item.title}</h3>
            <Tags tags={item.tags} primary={primary} />
          </div>
          {item.summary && <p style={{ color: secondary, opacity: 0.8, margin: '0 0 0.75rem 0', fontStyle: 'italic', fontSize: '0.875rem' }}>{item.summary}</p>}
          {item.problem && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: primary }}>Problem </span><span style={{ color: secondary, opacity: 0.85, fontSize: '0.875rem' }}>{item.problem}</span></div>}
          {item.approach && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: primary }}>Approach </span><span style={{ color: secondary, opacity: 0.85, fontSize: '0.875rem' }}>{item.approach}</span></div>}
          {item.result && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: primary }}>Result </span><span style={{ color: secondary, opacity: 0.85, fontSize: '0.875rem' }}>{item.result}</span></div>}
          <Metrics metrics={item.metrics} primary={primary} secondary={secondary} />
          {item.link_url && <a href={item.link_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, textDecoration: 'none', display: 'inline-block', marginTop: '0.5rem' }}>View Case Study →</a>}
        </div>
      ))}
    </div>
  )
}

/* ── main export ───────────────────────────────── */

export default function CaseStudies({ section, theme }) {
  const { primary, secondary, accent } = getColors(theme)
  const items = section?.items || []
  const variant = section?.layout?.variant || 'featured'
  const title = section?.props?.title || 'Case Studies'

  return (
    <section id="case_studies" style={{ width: '100%', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionHeader label="CASE STUDIES" heading={title} description={section?.description} primary={primary} accent={accent} />
      {items.length === 0 ? (
        <p style={{ color: secondary, opacity: 0.6 }}>No case studies listed.</p>
      ) : variant === 'grid' ? (
        <CaseStudiesGrid items={items} primary={primary} secondary={secondary} accent={accent} />
      ) : variant === 'minimal' ? (
        <CaseStudiesMinimal items={items} primary={primary} secondary={secondary} accent={accent} />
      ) : (
        <CaseStudiesFeatured items={items} primary={primary} secondary={secondary} accent={accent} />
      )}
      </div>
    </section>
  )
}
