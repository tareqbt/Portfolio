import React, { useState, useEffect } from 'react'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

export default function Hero({ section, theme }) {
  const { layout, props = {} } = section
  const { background, primary, secondary, accent, divider } = getThemeColors(theme)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const activeLayout = isMobile ? layout?.mobile : layout?.desktop
  const contentSlots = layout?.desktop?.slots || {}
  const isGrid = activeLayout?.type === 'grid'

  const containerStyle = {
    display: isGrid ? 'grid' : 'flex',
    gridTemplateColumns: isGrid ? 'minmax(0, 1.55fr) minmax(260px, 0.45fr)' : undefined,
    flexDirection: isGrid ? undefined : 'column',
    gap: isMobile ? '2.5rem' : '5rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const renderSlotItem = (slotName) => {
    const p = props || {}
    switch (slotName.toLowerCase()) {
      case 'text':
        return (
          <div style={{ maxWidth: 760 }}>
            {p.name && (
              <h1
                style={{
                  color: primary,
                  fontFamily: 'Georgia, Times New Roman, serif',
                  fontSize: isMobile ? '2.65rem' : '4.6rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  margin: 0,
                  letterSpacing: 0,
                }}
              >
                {p.name}
              </h1>
            )}
            {p.role && (
              <p style={{ margin: '1rem 0 0 0', color: primary, fontSize: '1.18rem', fontWeight: 700, lineHeight: 1.35 }}>
                {p.role}
              </p>
            )}
            {p.affiliation && (
              <p style={{ margin: '0.3rem 0 0 0', color: secondary, opacity: 0.76, fontSize: '0.98rem', lineHeight: 1.55 }}>
                {p.affiliation}
              </p>
            )}
            {p.research_focus && (
              <p style={{ margin: '1.4rem 0 0 0', color: primary, fontSize: isMobile ? '1.18rem' : '1.35rem', fontWeight: 700, lineHeight: 1.45 }}>
                {p.research_focus}
              </p>
            )}
            {p.hero_text && (
              <p style={{ margin: '0.8rem 0 0 0', color: secondary, opacity: 0.82, lineHeight: 1.75, fontSize: '1.02rem', maxWidth: 660 }}>{p.hero_text}</p>
            )}
            {Array.isArray(p.research_areas) && p.research_areas.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1.15rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                {p.research_areas.map((area) => (
                  <span
                    key={area}
                    style={{
                      color: secondary,
                      opacity: 0.8,
                      paddingRight: '0.8rem',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      borderRight: `1px solid ${divider}`,
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </div>
        )
      case 'cta':
        return p.cta_label ? (
          <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start', marginTop: '1.5rem' }}>
            <a href={p.cta_url || '#'} style={{ display: 'inline-block', textDecoration: 'none' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: accent,
                  color: '#fff',
                  border: `1px solid ${accent}`,
                  borderRadius: 6,
                  padding: '0.72rem 1.15rem',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                }}
              >
                {p.cta_label}
              </span>
            </a>
            {p.secondary_cta_label && (
              <a href={p.secondary_cta_url || '#'} style={{ display: 'inline-block', textDecoration: 'none' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: background,
                    color: primary,
                    border: `1px solid ${divider}`,
                    borderRadius: 6,
                    padding: '0.72rem 1.15rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                  }}
                >
                  {p.secondary_cta_label}
                </span>
              </a>
            )}
            {p.tertiary_cta_label && (
              <a href={p.tertiary_cta_url || '#'} style={{ display: 'inline-block', textDecoration: 'none' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: background,
                    color: primary,
                    border: `1px solid ${divider}`,
                    borderRadius: 6,
                    padding: '0.72rem 1.15rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                  }}
                >
                  {p.tertiary_cta_label}
                </span>
              </a>
            )}
          </div>
        ) : null
      case 'image': {
        if (!p.image) return null
        const imageMaxWidth = isMobile ? '260px' : '300px'
        const imageAspectRatio = '1 / 1'
        return (
          <div
            style={{
              width: '100%',
              maxWidth: imageMaxWidth,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: imageAspectRatio,
                overflow: 'hidden',
                borderRadius: 6,
                border: `1px solid ${divider}`,
                boxShadow: '0 12px 28px rgba(17,24,39,0.10)',
                backgroundColor: background,
              }}
            >
              <img
                src={p.image}
                alt={p.name || 'hero image'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%', display: 'block' }}
              />
            </div>
            {p.current_project && (
              <div
                style={{
                  borderLeft: `3px solid ${accent}`,
                  paddingLeft: '0.85rem',
                  color: secondary,
                  fontSize: '0.82rem',
                  lineHeight: 1.55,
                  textAlign: 'left',
                }}
              >
                <span style={{ display: 'block', color: primary, fontWeight: 800 }}>Current Research</span>
                {p.current_project}
              </div>
            )}
          </div>
        )
      }
      default:
        return null
    }
  }

  const renderSlotContent = (slotData) => {
    if (!slotData) return null
    const items = Array.isArray(slotData) ? slotData : [slotData]
    return items.map((item, idx) => {
      const key = typeof item === 'string' ? item : item.name
      return <div key={idx}>{renderSlotItem(key)}</div>
    })
  }

  return (
    <section id="hero" style={{ width: '100%', padding: isMobile ? '3.25rem 1.5rem' : '6rem 1.5rem', backgroundColor: background, borderBottom: `1px solid ${divider}` }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        <div style={containerStyle}>
          {/* Left */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            {renderSlotContent(contentSlots.left)}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', width: '100%' }}>
            {renderSlotContent(contentSlots.right)}
          </div>
        </div>
      </div>
    </section>
  )
}
