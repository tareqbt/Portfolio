import React, { useState, useEffect } from 'react'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

export default function Hero({ section, theme }) {
  const { layout, props = {} } = section
  const { background, primary, secondary, accent, divider } = getThemeColors(theme)

  const [isMobile, setIsMobile] = useState(false)
  const [isSmallMobile, setIsSmallMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSmallMobile(window.innerWidth < 480)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const activeLayout = isMobile ? layout?.mobile : layout?.desktop
  const contentSlots = layout?.desktop?.slots || {}
  const isGrid = activeLayout?.type === 'grid'

  const containerStyle = {
    display: isGrid ? 'grid' : 'flex',
    gridTemplateColumns: isGrid ? 'minmax(0, 1.45fr) minmax(280px, 0.55fr)' : undefined,
    flexDirection: isGrid ? undefined : 'column',
    gap: isMobile ? '2rem' : '5.5rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const renderSlotItem = (slotName) => {
    const p = props || {}
    switch (slotName.toLowerCase()) {
      case 'text':
        return (
          <div style={{ maxWidth: 760, width: '100%' }}>
            {p.name && (
              <h1
                style={{
                  color: primary,
                  fontSize: isMobile ? (isSmallMobile ? '2.15rem' : '2.55rem') : '3.25rem',
                  fontWeight: 800,
                  lineHeight: isMobile ? 1.08 : 1.1,
                  margin: 0,
                }}
              >
                {p.name}
              </h1>
            )}
            {p.role && (
              <p style={{ margin: isMobile ? '0.75rem 0 0 0' : '1rem 0 0 0', color: primary, fontSize: isMobile ? '1.08rem' : '1.18rem', fontWeight: 700, lineHeight: 1.35 }}>
                {p.role}
              </p>
            )}
            {p.affiliation && (
              <p style={{ margin: '0.3rem 0 0 0', color: secondary, opacity: 0.76, fontSize: '0.98rem', lineHeight: 1.55 }}>
                {p.affiliation}
              </p>
            )}
            {(p.lab_name || p.institution) && (
              <p style={{ margin: '0.3rem 0 0 0', color: secondary, opacity: 0.78, fontSize: '0.98rem', lineHeight: 1.55 }}>
                {p.lab_name && p.lab_url ? (
                  <a href={p.lab_url} target="_blank" rel="noreferrer" style={{ color: primary, fontWeight: 700, textDecoration: 'none' }}>
                    {p.lab_name}
                  </a>
                ) : (
                  p.lab_name
                )}
                {p.lab_name && p.institution ? ', ' : ''}
                {p.institution}
              </p>
            )}
            {p.pi && (
              <p style={{ margin: '0.3rem 0 0 0', color: secondary, opacity: 0.78, fontSize: '0.98rem', lineHeight: 1.55 }}>
                Principal Investigator (PI): <span style={{ color: primary, fontWeight: 700 }}>{p.pi}</span>
              </p>
            )}
            {p.hero_text && (
              <p style={{ margin: isMobile ? '1.05rem 0 0 0' : '1.55rem 0 0 0', color: secondary, opacity: 0.86, lineHeight: isMobile ? 1.62 : 1.8, fontSize: isMobile ? '0.96rem' : '1.12rem', maxWidth: 780 }}>{p.hero_text}</p>
            )}
          </div>
        )
      case 'cta':
        return p.cta_label ? (
          <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', justifyContent: isMobile ? 'stretch' : 'flex-start', marginTop: isMobile ? '1.25rem' : '1.5rem', width: '100%' }}>
            <a href={p.cta_url || '#'} style={{ display: 'inline-block', textDecoration: 'none', flex: isSmallMobile ? '1 1 100%' : isMobile ? '1 1 140px' : '0 0 auto' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: isMobile ? '100%' : 'auto',
                  backgroundColor: accent,
                  color: '#fff',
                  border: `1px solid ${accent}`,
                  borderRadius: 6,
                  padding: '0.72rem 1.15rem',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  textAlign: 'center',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = `0 6px 16px ${accent}40`
                  e.currentTarget.style.opacity = '0.92'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.opacity = '1'
                }}
              >
                {p.cta_label}
              </span>
            </a>
            {p.secondary_cta_label && (
              <a href={p.secondary_cta_url || '#'} style={{ display: 'inline-block', textDecoration: 'none', flex: isSmallMobile ? '1 1 100%' : isMobile ? '1 1 140px' : '0 0 auto' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: isMobile ? '100%' : 'auto',
                    backgroundColor: background,
                    color: primary,
                    border: `1px solid ${divider}`,
                    borderRadius: 6,
                    padding: '0.72rem 1.15rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    textAlign: 'center',
                    transition: 'border-color 0.15s ease, transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accent
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = divider
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {p.secondary_cta_label}
                </span>
              </a>
            )}
            {p.tertiary_cta_label && (
              <a href={p.tertiary_cta_url || '#'} style={{ display: 'inline-block', textDecoration: 'none', flex: isSmallMobile ? '1 1 100%' : isMobile ? '1 1 140px' : '0 0 auto' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: isMobile ? '100%' : 'auto',
                    backgroundColor: background,
                    color: primary,
                    border: `1px solid ${divider}`,
                    borderRadius: 6,
                    padding: '0.72rem 1.15rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    textAlign: 'center',
                    transition: 'border-color 0.15s ease, transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accent
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = divider
                    e.currentTarget.style.transform = 'translateY(0)'
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
        const imageMaxWidth = isMobile ? (isSmallMobile ? '188px' : '224px') : '360px'
        const imageAspectRatio = '1 / 1'
        return (
          <div
            style={{
              width: '100%',
              maxWidth: imageMaxWidth,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: imageAspectRatio,
                overflow: 'hidden',
                borderRadius: isMobile ? 8 : 6,
                border: `1px solid ${divider}`,
                backgroundColor: background,
                boxShadow: isMobile ? '0 16px 38px rgba(17,24,39,0.12)' : 'none',
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
                  fontSize: isMobile ? '0.78rem' : '0.82rem',
                  lineHeight: 1.55,
                  textAlign: 'left',
                  backgroundColor: isMobile ? `${accent}08` : 'transparent',
                  borderRadius: isMobile ? 6 : 0,
                  paddingTop: isMobile ? '0.6rem' : 0,
                  paddingBottom: isMobile ? '0.6rem' : 0,
                  paddingRight: isMobile ? '0.7rem' : 0,
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

  if (isMobile) {
    return (
      <section
        id="hero"
        style={{
          width: '100%',
          padding: '2.35rem 1rem 3.25rem',
          backgroundColor: background,
          borderBottom: `1px solid ${divider}`,
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.4rem',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {renderSlotItem('image')}
            </div>
            <div style={{ width: '100%' }}>
              {renderSlotItem('text')}
              {renderSlotItem('cta')}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="hero" style={{ width: '100%', padding: isMobile ? '3rem 1rem 3.5rem' : '7.5rem 1.5rem 7rem', backgroundColor: background, borderBottom: `1px solid ${divider}` }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        <div style={containerStyle}>
          {/* Left */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              width: '100%',
            }}
          >
            {renderSlotContent(contentSlots.left)}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', width: '100%' }}>
            {renderSlotContent(contentSlots.right)}
          </div>
        </div>
      </div>
    </section>
  )
}
