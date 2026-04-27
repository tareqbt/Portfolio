import React from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors, CONTENT_MAX_WIDTH } from '../theme'

export default function Timeline({ section, theme }) {
  const { primary, secondary, accent, divider, background } = getThemeColors(theme)
  const items = section?.items || []
  const sortedItems = [...items].sort((a, b) => Number(b.year) - Number(a.year))
  const title = section?.props?.title || 'Education / Timeline'

  return (
    <section id="career_timeline" style={{ width: '100%', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        <SectionHeader label="TIMELINE" heading={title} description={null} primary={primary} accent={accent} />
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {sortedItems.map((item, idx) => (
            <article
              key={item.id || idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '90px minmax(0, 1fr)',
                gap: '1rem',
                border: `1px solid ${divider}`,
                borderRadius: 8,
                backgroundColor: background,
                padding: '1rem',
              }}
            >
              <div style={{ color: accent, fontWeight: 800, fontSize: '0.9rem' }}>{item.year}</div>
              <div>
                <h3 style={{ margin: 0, color: primary, fontSize: '1rem', lineHeight: 1.35 }}>{item.title}</h3>
                {item.subtitle && (
                  <div style={{ color: secondary, opacity: 0.78, fontSize: '0.88rem', marginTop: '0.25rem' }}>
                    {item.subtitle}
                  </div>
                )}
                {item.description && (
                  <p style={{ color: secondary, opacity: 0.82, fontSize: '0.9rem', lineHeight: 1.65, margin: '0.55rem 0 0' }}>
                    {item.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
