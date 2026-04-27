import React from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

export default function Experience({ section, theme }) {
  const items = section?.items || []
  const { primary, secondary, accent } = getThemeColors(theme)

  return (
    <section id="experience" style={{ width: '100%', padding: '4rem 1.5rem' }}>
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
                paddingLeft: '1rem',
              }}
            >
              <h3 style={{ margin: '0 0 0.25rem 0', color: primary }}>
                {exp.role || 'Role Position'}
              </h3>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: accent, fontWeight: 600 }}>
                  {exp.company || 'Company Name'}
                </span>
                <span style={{ color: secondary, margin: '0 0.5rem' }}>|</span>
                <span style={{ color: secondary }}>{exp.date || 'Date Range'}</span>
              </div>
              <p style={{ margin: 0 }}>
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
