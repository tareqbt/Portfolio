import React, { useEffect, useState } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(null)
  const activeImage = activeIndex === null ? null : sortedItems[activeIndex]
  const hasMultipleImages = sortedItems.length > 1

  const closeImage = () => setActiveIndex(null)
  const showRelativeImage = (direction) => {
    setActiveIndex((current) => {
      if (current === null || sortedItems.length === 0) return current
      return (current + direction + sortedItems.length) % sortedItems.length
    })
  }

  useEffect(() => {
    if (activeIndex === null) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') showRelativeImage(-1)
      if (event.key === 'ArrowRight') showRelativeImage(1)
      if (event.key === 'Escape') closeImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, sortedItems.length])

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
                onClick={() => setActiveIndex(idx)}
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
              href="#/research"
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
          onClick={closeImage}
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
              <div>
                <div style={{ color: primary, fontWeight: 700 }}>{activeImage.title || 'Photo'}</div>
                {hasMultipleImages && (
                  <div style={{ color: secondary, opacity: 0.62, fontSize: '0.78rem', marginTop: '0.15rem' }}>
                    {activeIndex + 1} of {sortedItems.length}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={closeImage}
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
            <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={() => showRelativeImage(-1)}
                    aria-label="Previous gallery image"
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 42,
                      height: 42,
                      borderRadius: 999,
                      border: 'none',
                      backgroundColor: 'rgba(17,24,39,0.78)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '1.35rem',
                      zIndex: 1,
                      lineHeight: 1,
                    }}
                  >
                    {'<'}
                  </button>
                  <button
                    type="button"
                    onClick={() => showRelativeImage(1)}
                    aria-label="Next gallery image"
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 42,
                      height: 42,
                      borderRadius: 999,
                      border: 'none',
                      backgroundColor: 'rgba(17,24,39,0.78)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '1.35rem',
                      zIndex: 1,
                      lineHeight: 1,
                    }}
                  >
                    {'>'}
                  </button>
                </>
              )}
              <img
                src={activeImage.image}
                alt={activeImage.title || 'Gallery image'}
                style={{ width: '100%', height: '100%', minHeight: 0, objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
