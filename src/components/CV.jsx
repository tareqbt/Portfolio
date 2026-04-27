import React from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors, CONTENT_MAX_WIDTH } from '../theme'

export default function CV({ section, theme }) {
  const { primary, secondary, accent, divider, background } = getThemeColors(theme)
  const props = section?.props || {}
  const title = props.title || 'Curriculum Vitae'
  const subtitle = props.subtitle || null
  const cvUrl = props.cv_url || '/CV_Tareq_Bin_Taher.pdf'

  return (
    <section id="cv" style={{ width: '100%', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        <SectionHeader label="CV" heading={title} description={subtitle} primary={primary} accent={accent} />
        <div
          style={{
            border: `1px solid ${divider}`,
            borderRadius: 8,
            backgroundColor: background,
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ color: primary, fontSize: '1rem', fontWeight: 800 }}>CV_Tareq_Bin_Taher.pdf</div>
            <div style={{ color: secondary, opacity: 0.72, fontSize: '0.875rem', marginTop: '0.2rem' }}>
              PDF format for academic review and sharing.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                backgroundColor: accent,
                color: '#fff',
                borderRadius: 6,
                padding: '0.7rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 800,
              }}
            >
              Open CV
            </a>
            <a
              href={cvUrl}
              download
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                backgroundColor: background,
                color: primary,
                border: `1px solid ${divider}`,
                borderRadius: 6,
                padding: '0.7rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 800,
              }}
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
