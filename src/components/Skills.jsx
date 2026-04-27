import React, { useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'

function getColors(theme) {
  const palette = theme?.colorPalette ?? theme?.color_palette ?? []
  return {
    primary: palette[0] || '#1917fc',
    secondary: palette[1] || '#134331',
    accent: palette[2] || '#ed2f25',
  }
}

export default function Skills({ section, theme }) {
  const layout = section?.layout || {}
  const items = section?.items || []
  const { primary, secondary, accent } = getColors(theme)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const desktopCols = layout?.columns?.desktop || 5
  const mobileCols = layout?.columns?.mobile || 2
  const activeCols = isMobile ? mobileCols : desktopCols
  const gap = layout?.gap || '1.5rem'
  const cardWidth = `calc((100% - (${gap} * ${activeCols - 1})) / ${activeCols})`

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap,
    justifyContent: 'center',
    padding: '2rem 0',
    width: '100%',
  }

  const cardBase = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    border: `2px solid ${secondary}`,
    borderRadius: 8,
    minWidth: 120,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    flexBasis: cardWidth,
    flexGrow: 0,
    flexShrink: 0,
  }

  return (
    <section id="skills" style={{ width: '100%', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionHeader label="SKILLS" heading="Skills" description={section?.description} primary={primary} accent={accent} />
      <div style={containerStyle}>
        {items.length > 0 ? (
          items.map((skill, idx) => {
            const cardColor = idx % 3 === 0 ? primary : idx % 3 === 1 ? secondary : accent
            return (
              <div
                key={idx}
                style={{ ...cardBase }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 4px 12px ${accent}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = secondary
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {skill.icon && (
                  <img src={skill.icon} alt={skill.name} style={{ width: 40, height: 40 }} />
                )}
                <span style={{ fontSize: '1.125rem', fontWeight: 500, color: cardColor }}>
                  {skill.name || 'Skill Name'}
                </span>
              </div>
            )
          })
        ) : (
          <p style={{ color: secondary }}>No skills listed yet.</p>
        )}
      </div>
      </div>
    </section>
  )
}
