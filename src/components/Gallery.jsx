import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

export default function Gallery({ section, theme }) {
  const { primary, secondary, accent, divider, surface, background } = getThemeColors(theme)
  const items = section?.items || []
  const sortedItems = [...items].sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0
    const bTime = b.date ? new Date(b.date).getTime() : 0
    return bTime - aTime
  })
  const title = section?.props?.title || 'Gallery'
  const subtitle = section?.props?.subtitle || null
  const [activeImage, setActiveImage] = useState(null)

  return (
    <section id="gallery" style={{ width: '100%', padding: '4rem 1.5rem', backgroundColor: surface }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        <SectionHeader label="GALLERY" heading={title} description={subtitle} primary={primary} accent={accent} />

        {sortedItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {sortedItems.map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => setActiveImage(item)}
                style={{
                  padding: 0,
                  border: `1px solid ${divider}`,
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: background,
                  cursor: 'zoom-in',
                  textAlign: 'left',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title || 'Gallery image'}
                  style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '0.85rem' }}>
                  <div style={{ color: primary, fontSize: '0.9rem', fontWeight: 700 }}>{item.title || 'Photo'}</div>
                  {item.caption && (
                    <div style={{ color: secondary, opacity: 0.75, fontSize: '0.78rem', marginTop: '0.2rem' }}>
                      {item.caption}
                    </div>
                  )}
                  {item.meta && (
                    <div style={{ color: secondary, opacity: 0.65, fontSize: '0.72rem', fontWeight: 700, marginTop: '0.45rem' }}>
                      {item.meta}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
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
              <div style={{ color: primary, fontWeight: 700, fontSize: '1rem' }}>Photo gallery</div>
              <div style={{ color: secondary, opacity: 0.75, fontSize: '0.875rem', marginTop: '0.2rem' }}>
                Event and presentation photos will be featured here.
              </div>
            </div>
            <a
              href="#case_studies"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                backgroundColor: accent,
                color: '#fff',
                borderRadius: 8,
                padding: '0.6rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
              }}
            >
              View Research
            </a>
          </div>
        )}
      </div>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title || 'Gallery image'}
          onClick={() => setActiveImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(17,24,39,0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(1000px, 96vw)',
              height: 'min(760px, 92vh)',
              backgroundColor: background,
              borderRadius: 8,
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ color: primary, fontWeight: 700 }}>{activeImage.title || 'Photo'}</div>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                aria-label="Close gallery image"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 6,
                  border: 'none',
                  backgroundColor: primary,
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  lineHeight: 1,
                }}
              >
                x
              </button>
            </div>
            <img
              src={activeImage.image}
              alt={activeImage.title || 'Gallery image'}
              style={{ width: '100%', height: '100%', minHeight: 0, objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
