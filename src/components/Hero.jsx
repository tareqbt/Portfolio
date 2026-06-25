import React, { useState, useEffect } from 'react'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

export default function Hero({ section, theme }) {
  const { props = {} } = section
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

  const researchAreas = [
    'Fracture mechanics',
    'Multiphysics simulation',
    'Magneto-mechanical modeling',
  ]

  if (isMobile) {
    const p = props || {}

    return (
      <section
        id="hero"
        style={{
          width: '100%',
          padding: '2.2rem 1rem 3.1rem',
          backgroundColor: background,
          borderBottom: `1px solid ${divider}`,
        }}
      >
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.15rem',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isSmallMobile ? 'minmax(0, 1fr) 104px' : 'minmax(0, 1fr) 132px',
                gap: isSmallMobile ? '0.9rem' : '1.1rem',
                alignItems: 'center',
              }}
            >
              <div style={{ minWidth: 0 }}>
                {p.name && (
                  <h1
                    style={{
                      color: primary,
                      fontSize: isSmallMobile ? '2rem' : '2.35rem',
                      fontWeight: 800,
                      lineHeight: 1.05,
                      margin: 0,
                    }}
                  >
                    {p.name}
                  </h1>
                )}
                {p.role && (
                  <p style={{ margin: '0.7rem 0 0', color: primary, fontSize: '1rem', fontWeight: 800, lineHeight: 1.35 }}>
                    {p.role}
                  </p>
                )}
                {(p.lab_name || p.institution) && (
                  <p style={{ margin: '0.28rem 0 0', color: secondary, opacity: 0.8, fontSize: '0.86rem', lineHeight: 1.45 }}>
                    {p.lab_name && p.lab_url ? (
                      <a href={p.lab_url} target="_blank" rel="noreferrer" style={{ color: primary, fontWeight: 800 }}>
                        {p.lab_name}
                      </a>
                    ) : (
                      p.lab_name
                    )}
                    {p.lab_name && p.institution ? ', ' : ''}
                    {p.institution}
                  </p>
                )}
              </div>

              {p.image && (
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 5',
                    overflow: 'hidden',
                    borderRadius: 8,
                    border: `1px solid ${divider}`,
                    backgroundColor: background,
                    boxShadow: '0 14px 30px rgba(17,24,39,0.12)',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name || 'hero image'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 18%',
                      display: 'block',
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ width: '100%' }}>
              {p.pi && (
                <p style={{ margin: 0, color: secondary, opacity: 0.82, fontSize: '0.88rem', lineHeight: 1.5 }}>
                  PI: <span style={{ color: primary, fontWeight: 800 }}>{p.pi}</span>
                </p>
              )}
              {p.hero_text && (
                <p style={{ margin: p.pi ? '0.85rem 0 0' : 0, color: secondary, opacity: 0.88, lineHeight: 1.62, fontSize: '0.96rem' }}>
                  {p.hero_text}
                </p>
              )}
              {p.current_project && (
                <div
                  style={{
                    marginTop: '1rem',
                    borderLeft: `3px solid ${accent}`,
                    backgroundColor: `${accent}08`,
                    borderRadius: 6,
                    padding: '0.7rem 0.8rem 0.7rem 0.85rem',
                    color: secondary,
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ display: 'block', color: primary, fontWeight: 800 }}>Current Research</span>
                  {p.current_project}
                </div>
              )}
              {renderSlotItem('cta')}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const p = props || {}
  const affiliationLine = [p.lab_name, p.institution].filter(Boolean).join(', ')

  return (
    <section
      id="hero"
      style={{
        width: '100%',
        padding: '6.4rem 1.5rem 6.2rem',
        backgroundColor: background,
        borderBottom: `1px solid ${divider}`,
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 380px)',
            gap: '4.5rem',
            alignItems: 'center',
          }}
        >
          <div style={{ maxWidth: 820 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                border: `1px solid ${divider}`,
                borderRadius: 999,
                padding: '0.38rem 0.7rem',
                color: secondary,
                fontSize: '0.78rem',
                fontWeight: 800,
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  backgroundColor: accent,
                  display: 'inline-block',
                }}
              />
              Computational Mechanics
            </div>

            {p.name && (
              <h1
                style={{
                  color: primary,
                  fontSize: '3.35rem',
                  fontWeight: 800,
                  lineHeight: 1.04,
                  margin: '1.1rem 0 0',
                }}
              >
                {p.name}
              </h1>
            )}

            <p
              style={{
                color: primary,
                fontSize: '1.48rem',
                fontWeight: 800,
                lineHeight: 1.28,
                margin: '1rem 0 0',
                maxWidth: 760,
              }}
            >
              Computational fracture mechanics for magnetically active materials.
            </p>

            {p.hero_text && (
              <p
                style={{
                  color: secondary,
                  opacity: 0.9,
                  fontSize: '1.03rem',
                  lineHeight: 1.78,
                  margin: '1.25rem 0 0',
                  maxWidth: 790,
                }}
              >
                {p.hero_text}
              </p>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '0.75rem',
                marginTop: '1.55rem',
                maxWidth: 790,
              }}
            >
              {[
                ['Role', p.role],
                ['Institution', p.institution],
                ['PI', p.pi],
              ].filter(([, value]) => value).map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    borderTop: `2px solid ${accent}`,
                    paddingTop: '0.65rem',
                    minWidth: 0,
                  }}
                >
                  <div style={{ color: secondary, opacity: 0.72, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {label}
                  </div>
                  <div style={{ color: primary, fontSize: '0.9rem', fontWeight: 800, lineHeight: 1.35, marginTop: '0.25rem' }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1.35rem' }}>
              {researchAreas.map((area) => (
                <span
                  key={area}
                  style={{
                    border: `1px solid ${divider}`,
                    borderRadius: 999,
                    color: secondary,
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    padding: '0.42rem 0.68rem',
                    lineHeight: 1,
                  }}
                >
                  {area}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginTop: '1.6rem' }}>
              {p.cta_label && (
                <a href={p.cta_url || '#'} style={{ display: 'inline-block', textDecoration: 'none' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: accent,
                      color: '#fff',
                      border: `1px solid ${accent}`,
                      borderRadius: 6,
                      padding: '0.78rem 1.15rem',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                    }}
                  >
                    {p.cta_label}
                  </span>
                </a>
              )}
              <a href="/CV_Tareq_Bin_Taher.pdf" target="_blank" rel="noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: background,
                    color: primary,
                    border: `1px solid ${divider}`,
                    borderRadius: 6,
                    padding: '0.78rem 1.15rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                  }}
                >
                  CV
                </span>
              </a>
              {p.tertiary_cta_label && (
                <a href={p.tertiary_cta_url || '#'} style={{ display: 'inline-block', textDecoration: 'none' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: background,
                      color: primary,
                      border: `1px solid ${divider}`,
                      borderRadius: 6,
                      padding: '0.78rem 1.15rem',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                    }}
                  >
                    {p.tertiary_cta_label}
                  </span>
                </a>
              )}
            </div>
          </div>

          <aside style={{ width: '100%', justifySelf: 'end' }} aria-label="Research profile summary">
            {p.image && (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  borderRadius: 8,
                  border: `1px solid ${divider}`,
                  backgroundColor: background,
                }}
              >
                <img
                  src={p.image}
                  alt={p.name || 'profile portrait'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 18%',
                    display: 'block',
                  }}
                />
              </div>
            )}

            <div
              style={{
                borderLeft: `3px solid ${accent}`,
                marginTop: '1rem',
                paddingLeft: '0.95rem',
              }}
            >
              <div style={{ color: primary, fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.35 }}>
                Current Research
              </div>
              <p style={{ color: secondary, opacity: 0.86, fontSize: '0.88rem', lineHeight: 1.58, margin: '0.35rem 0 0' }}>
                {p.current_project || 'Computational fracture mechanics and multiphysics modeling'}
              </p>
            </div>

            {affiliationLine && (
              <p style={{ color: secondary, opacity: 0.76, fontSize: '0.82rem', lineHeight: 1.55, margin: '1rem 0 0' }}>
                {p.lab_name && p.lab_url ? (
                  <a href={p.lab_url} target="_blank" rel="noreferrer" style={{ color: primary, fontWeight: 800 }}>
                    {p.lab_name}
                  </a>
                ) : (
                  p.lab_name
                )}
                {p.lab_name && p.institution ? ', ' : ''}
                {p.institution}
              </p>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
