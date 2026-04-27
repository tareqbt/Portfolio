import React, { useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

export default function Skills({ section, theme }) {
  const layout = section?.layout || {}
  const items = section?.items || []
  const { primary, secondary, accent, divider, background } = getThemeColors(theme)

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
  const categoryOrder = ['Simulation & Modeling', 'Programming & Computing', 'Engineering Tools', 'Research Methods']
  const groupedItems = items.reduce((groups, skill) => {
    const category = skill.category || 'Research Methods'
    if (!groups[category]) groups[category] = []
    groups[category].push(skill)
    return groups
  }, {})
  const categories = [
    ...categoryOrder.filter((category) => groupedItems[category]),
    ...Object.keys(groupedItems).filter((category) => !categoryOrder.includes(category)),
  ]

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap,
    justifyContent: 'flex-start',
    padding: '1rem 0 0',
    width: '100%',
  }

  const cardBase = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem',
    border: `1px solid ${divider}`,
    backgroundColor: background,
    borderRadius: 8,
    minWidth: isMobile ? 0 : 180,
    transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
    flexBasis: cardWidth,
    flexGrow: 0,
    flexShrink: 0,
  }

  const renderIcon = (skill) => {
    if (skill.icon) {
      return <img src={skill.icon} alt="" style={{ width: 34, height: 34, objectFit: 'contain', flexShrink: 0 }} />
    }

    const initials = (skill.name || '')
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 3)
      .toUpperCase()

    return (
      <span
        aria-hidden="true"
        style={{
          width: 34,
          height: 34,
          borderRadius: 6,
          backgroundColor: `${accent}12`,
          color: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.72rem',
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {initials}
      </span>
    )
  }

  return (
    <section id="skills" style={{ width: '100%', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
      <SectionHeader label="SKILLS" heading="Skills" description={section?.description} primary={primary} accent={accent} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {items.length > 0 ? (
          categories.map((category) => (
            <div key={category}>
              <h3 style={{ color: primary, fontSize: '0.9rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {category}
              </h3>
              <div style={containerStyle}>
                {groupedItems[category].map((skill, idx) => (
                  <div
                    key={`${category}-${skill.name}-${idx}`}
                    style={{ ...cardBase }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = accent
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = `0 4px 14px ${accent}18`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = divider
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {renderIcon(skill)}
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: primary }}>
                      {skill.name || 'Skill Name'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: secondary }}>No skills listed yet.</p>
        )}
      </div>
      </div>
    </section>
  )
}
