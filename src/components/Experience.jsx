import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

export default function Experience({ section, theme }) {
  const items = section?.items || []
  const { primary, secondary, accent } = getThemeColors(theme)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="experience" style={{ width: '100%', padding: isMobile ? '3rem 1rem' : '4rem 1.5rem' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
      <SectionHeader label="EXPERIENCE" heading="Experience" description={section?.description} primary={primary} accent={accent} />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.length > 0 ? (
          items.map((exp, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: '1.5rem',
                borderLeft: `2px solid ${accent}`,
                paddingLeft: isMobile ? '0.85rem' : '1rem',
              }}
            >
              <h3 style={{ margin: '0 0 0.25rem 0', color: primary, fontSize: isMobile ? '1rem' : undefined, lineHeight: 1.35 }}>
                {exp.role || 'Role Position'}
              </h3>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '0.15rem' : 0, fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                <span style={{ color: accent, fontWeight: 600 }}>
                  {exp.company || 'Company Name'}
                </span>
                {!isMobile && <span style={{ color: secondary, margin: '0 0.5rem' }}>|</span>}
                <span style={{ color: secondary }}>{exp.date || 'Date Range'}</span>
              </div>
              <p style={{ margin: 0, color: secondary, fontSize: isMobile ? '0.92rem' : undefined }}>
                {exp.description || 'Description of roles and responsibilities.'}
              </p>
            </li>
          ))
        ) : (
          <p style={{ color: secondary }}>No experience listed.</p>
        )}
      </ul>
      </div>
    </section>
  )
}
