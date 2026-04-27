import React from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors, CONTENT_MAX_WIDTH } from '../theme'

export default function Publications({ section, theme }) {
  const { primary, secondary, accent, divider, background, surface } = getThemeColors(theme)
  const items = section?.items || []
  const title = section?.props?.title || 'Publications & Presentations'

  return (
    <section id="publications" style={{ width: '100%', padding: '4rem 1.5rem', backgroundColor: surface }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        <SectionHeader label="PUBLICATIONS" heading={title} description={null} primary={primary} accent={accent} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item, idx) => (
            <article
              key={item.id || idx}
              style={{
                border: `1px solid ${divider}`,
                borderRadius: 8,
                backgroundColor: background,
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ color: accent, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {item.type || 'Presentation'}
                  </div>
                  <h3 style={{ color: primary, margin: '0.35rem 0 0', fontSize: '1.08rem', lineHeight: 1.35 }}>
                    {item.title}
                  </h3>
                </div>
                {item.date && (
                  <div style={{ color: secondary, opacity: 0.72, fontSize: '0.85rem', fontWeight: 700 }}>
                    {item.date}
                  </div>
                )}
              </div>
              {item.venue && (
                <p style={{ color: secondary, opacity: 0.82, margin: '0.55rem 0 0', fontSize: '0.92rem' }}>
                  {item.venue}
                </p>
              )}
              {item.authors && (
                <p style={{ color: secondary, opacity: 0.82, margin: '0.45rem 0 0', fontSize: '0.9rem' }}>
                  {item.authors}
                </p>
              )}
              {item.link_url && (
                <a href={item.link_url} style={{ display: 'inline-block', marginTop: '0.75rem', color: accent, fontWeight: 800, textDecoration: 'none', fontSize: '0.88rem' }}>
                  View related research
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
