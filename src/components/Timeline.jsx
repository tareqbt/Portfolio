import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors, CONTENT_MAX_WIDTH } from '../theme'

export default function Timeline({ section, theme }) {
  const { primary, secondary, accent, divider, background, surface } = getThemeColors(theme)
  const items = section?.items || []
  const sortedItems = [...items].sort((a, b) => Number(b.year) - Number(a.year))
  const title = section?.props?.title || 'Education / Timeline'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="career_timeline" style={{ width: '100%', padding: isMobile ? '3rem 1rem' : '4rem 1.5rem' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        <SectionHeader label="TIMELINE" heading={title} description={null} primary={primary} accent={accent} />
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {sortedItems.map((item, idx) => (
            <article
              key={item.id || idx}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '76px minmax(0, 1fr)',
                gap: isMobile ? '0.75rem' : '1.1rem',
                border: `1px solid ${divider}`,
                borderRadius: 8,
                backgroundColor: background,
                padding: isMobile ? '1rem' : '1.1rem',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    border: `1px solid ${divider}`,
                    borderRadius: 999,
                    backgroundColor: surface,
                    color: primary,
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    padding: '0.35rem 0.6rem',
                  }}
                >
                  {item.year}
                </span>
              </div>
              <div>
                <h3 style={{ margin: 0, color: primary, fontSize: '1rem', fontWeight: 800, lineHeight: 1.35 }}>{item.title}</h3>
                {item.subtitle && (
                  <div style={{ color: secondary, opacity: 0.72, fontSize: '0.82rem', marginTop: '0.25rem', lineHeight: 1.45 }}>
                    {item.subtitle}
                  </div>
                )}
                {item.description && (
                  <p style={{ color: secondary, opacity: 0.82, fontSize: '0.88rem', lineHeight: 1.55, margin: '0.45rem 0 0' }}>
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
