import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

function Tags({ tags, accent }) {
  if (!tags || tags.length === 0) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
      {tags.map((tag, i) => (
        <span key={i} style={{ fontSize: '0.72rem', fontWeight: 600, backgroundColor: `${accent}12`, color: accent, borderRadius: 4, padding: '2px 8px' }}>{tag}</span>
      ))}
    </div>
  )
}

function Metrics({ metrics, primary, secondary }) {
  if (!metrics || metrics.length === 0) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '0.75rem' }}>
      {metrics.map((m, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: primary, lineHeight: 1 }}>{m.value}</span>
          <span style={{ fontSize: '0.72rem', color: secondary, opacity: 0.75, marginTop: 2 }}>{m.label}</span>
        </div>
      ))}
    </div>
  )
}

function ExpandableImage({ item, primary, surface, height = '100%', minHeight, onOpenImage }) {
  if (!item.image) {
    return (
      <div style={{ width: '100%', height, minHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: `${primary}50` }}>
        ðŸ“‹
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onOpenImage(item)}
      aria-label={`Open ${item.title} poster`}
      title="Open larger image"
      style={{
        width: '100%',
        height,
        minHeight,
        padding: 0,
        border: 'none',
        backgroundColor: surface,
        cursor: 'zoom-in',
        overflow: 'hidden',
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{ width: '100%', height: '100%', objectFit: item.image_fit || 'cover', display: 'block' }}
      />
    </button>
  )
}

function ImageLightbox({ image, primary, background, onClose, onPrevious, onNext }) {
  useEffect(() => {
    if (!image) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [image, onClose, onPrevious, onNext])

  if (!image) return null
  const hasMultiple = image.images && image.images.length > 1

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      onClick={onClose}
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
          width: 'min(1200px, 96vw)',
          height: 'min(820px, 92vh)',
          backgroundColor: background,
          borderRadius: 8,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ color: primary, fontWeight: 700, fontSize: '0.95rem' }}>{image.title}</div>
            {hasMultiple && (
              <div style={{ color: primary, opacity: 0.62, fontSize: '0.78rem', marginTop: '0.15rem' }}>
                {image.index + 1} of {image.images.length}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enlarged image"
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
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Previous image"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 42,
                  height: 42,
                  borderRadius: 999,
                  border: 'none',
                  backgroundColor: 'rgba(17,24,39,0.82)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  zIndex: 1,
                }}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 42,
                  height: 42,
                  borderRadius: 999,
                  border: 'none',
                  backgroundColor: 'rgba(17,24,39,0.82)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  zIndex: 1,
                }}
              >
                ›
              </button>
            </>
          )}
          <img
            src={image.src}
            alt={image.title}
            style={{
              width: '100%',
              height: '100%',
              minHeight: 0,
              objectFit: 'contain',
              display: 'block',
              backgroundColor: '#fff',
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* ── featured variant ──────────────────────────── */

function PresentationPhoto({ item, primary, secondary, divider, background, onOpenImage }) {
  const photos = item.presentation_images || (
    item.presentation_image
      ? [{ image: item.presentation_image, title: item.presentation_image_title || 'Presentation photo' }]
      : []
  )

  if (photos.length === 0) return null

  return (
    <div style={{ display: 'grid', gap: '0.6rem' }}>
      {photos.map((photo, idx) => {
        const title = photo.title || 'Presentation photo'

        return (
          <button
            key={`${photo.image}-${idx}`}
            type="button"
            onClick={() => onOpenImage(item, photo.image)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.6rem',
              border: `1px solid ${divider}`,
              borderRadius: 8,
              backgroundColor: background,
              color: primary,
              cursor: 'zoom-in',
              textAlign: 'left',
            }}
          >
            <img
              src={photo.image}
              alt={title}
              style={{
                width: 96,
                height: 64,
                objectFit: 'cover',
                borderRadius: 6,
                flexShrink: 0,
                backgroundColor: '#fff',
              }}
            />
            <span>
              <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700 }}>{title}</span>
              <span style={{ display: 'block', fontSize: '0.72rem', color: secondary, opacity: 0.75 }}>Click to enlarge</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function CaseStudiesFeatured({ items, primary, secondary, accent, divider, surface, background, onOpenImage }) {
  const [openItem, setOpenItem] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {items.map((item, idx) => {
        const id = item.id || String(idx)
        const isOpen = openItem === id
        const hasAccordion = item.problem || item.approach || item.result

        return (
          <div key={id} style={{ border: `2px solid ${divider}`, backgroundColor: background, borderRadius: 16, overflow: 'hidden', display: 'grid', gridTemplateColumns: '40% 60%' }}>
            <div style={{ backgroundColor: surface, minHeight: 280, overflow: 'hidden' }}>
              {item.image
                ? <img src={item.image} alt={item.title} onClick={() => onOpenImage(item)} style={{ width: '100%', height: '100%', objectFit: item.image_fit || 'cover', display: 'block', cursor: 'zoom-in' }} />
                : <div style={{ width: '100%', height: '100%', minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: `${primary}50` }}>📋</div>
              }
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Tags tags={item.tags} accent={accent} />
              <h3 style={{ color: primary, margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h3>
              {item.client && <div style={{ fontSize: '0.75rem', fontWeight: 600, color: secondary, opacity: 0.75 }}>{item.client}</div>}
              {item.summary && <p style={{ color: secondary, opacity: 0.85, margin: 0, fontStyle: 'italic', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.summary}</p>}
              <PresentationPhoto item={item} primary={primary} secondary={secondary} divider={divider} background={background} onOpenImage={onOpenImage} />

              {hasAccordion && (
                <div>
                  <button
                    onClick={() => setOpenItem(isOpen ? null : id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'none', border: `1px solid ${divider}`, borderRadius: 6,
                      padding: '0.375rem 0.75rem', cursor: 'pointer', color: primary,
                      fontSize: '0.8rem', fontWeight: 600,
                    }}
                  >
                    <span>Problem / Approach / Result</span>
                    <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
                  </button>
                  {isOpen && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {item.problem && <div><div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: accent, marginBottom: '0.2rem' }}>Problem</div><p style={{ color: secondary, opacity: 0.85, margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>{item.problem}</p></div>}
                      {item.approach && <div><div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: accent, marginBottom: '0.2rem' }}>Approach</div><p style={{ color: secondary, opacity: 0.85, margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>{item.approach}</p></div>}
                      {item.result && <div><div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: accent, marginBottom: '0.2rem' }}>Result</div><p style={{ color: secondary, opacity: 0.85, margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>{item.result}</p></div>}
                    </div>
                  )}
                </div>
              )}

              <Metrics metrics={item.metrics} primary={primary} secondary={secondary} />
              {item.link_url && (
                <a href={item.link_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', fontWeight: 600, color: primary, textDecoration: 'none', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  View Case Study →
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── grid variant ──────────────────────────────── */

function CaseStudiesGrid({ items, primary, secondary, accent, divider, surface, background, onOpenImage }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          style={{
            border: `2px solid ${hovered === idx ? accent : divider}`,
            backgroundColor: background,
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            transform: hovered === idx ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hovered === idx ? `0 8px 24px ${accent}30` : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          {item.image
            ? <img src={item.image} alt={item.title} onClick={() => onOpenImage(item)} style={{ width: '100%', height: 180, objectFit: item.image_fit || 'cover', display: 'block', cursor: 'zoom-in' }} />
            : <div style={{ width: '100%', height: 180, backgroundColor: `${primary}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: `${primary}40` }}>📋</div>
          }
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <Tags tags={item.tags} accent={accent} />
            <h3 style={{ color: primary, margin: 0, fontSize: '1rem', fontWeight: 700 }}>{item.title}</h3>
            {item.summary && <p style={{ color: secondary, opacity: 0.8, margin: 0, fontSize: '0.875rem' }}>{item.summary}</p>}
            <Metrics metrics={item.metrics} primary={primary} secondary={secondary} />
            {item.link_url && <a href={item.link_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, textDecoration: 'none', marginTop: 'auto' }}>View →</a>}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── minimal variant ───────────────────────────── */

function CaseStudiesMinimal({ items, primary, secondary, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, idx) => (
        <div key={item.id || idx} style={{ borderLeft: `4px solid ${accent}`, paddingLeft: '1.5rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', marginBottom: idx < items.length - 1 ? '2.5rem' : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
            <h3 style={{ color: primary, margin: 0, fontSize: '1.125rem', fontWeight: 700 }}>{item.title}</h3>
            <Tags tags={item.tags} accent={accent} />
          </div>
          {item.summary && <p style={{ color: secondary, opacity: 0.8, margin: '0 0 0.75rem 0', fontStyle: 'italic', fontSize: '0.875rem' }}>{item.summary}</p>}
          {item.problem && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: primary }}>Problem </span><span style={{ color: secondary, opacity: 0.85, fontSize: '0.875rem' }}>{item.problem}</span></div>}
          {item.approach && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: primary }}>Approach </span><span style={{ color: secondary, opacity: 0.85, fontSize: '0.875rem' }}>{item.approach}</span></div>}
          {item.result && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: primary }}>Result </span><span style={{ color: secondary, opacity: 0.85, fontSize: '0.875rem' }}>{item.result}</span></div>}
          <Metrics metrics={item.metrics} primary={primary} secondary={secondary} />
          {item.link_url && <a href={item.link_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, textDecoration: 'none', display: 'inline-block', marginTop: '0.5rem' }}>View Case Study →</a>}
        </div>
      ))}
    </div>
  )
}

/* ── main export ───────────────────────────────── */

export default function CaseStudies({ section, theme }) {
  const { primary, secondary, accent, divider, surface, background } = getThemeColors(theme)
  const items = section?.items || []
  const variant = section?.layout?.variant || 'featured'
  const title = section?.props?.title || 'Case Studies'
  const [expandedImage, setExpandedImage] = useState(null)

  const openImageGroup = (item, clickedSrc = item.image) => {
    const images = [
      ...(item.image ? [{ src: item.image, title: item.title }] : []),
      ...(item.presentation_images || []).map((photo) => ({
        src: photo.image,
        title: photo.title || item.title,
      })),
      ...(!item.presentation_images && item.presentation_image
        ? [{ src: item.presentation_image, title: item.presentation_image_title || item.title }]
        : []),
    ]
    const index = Math.max(0, images.findIndex((image) => image.src === clickedSrc))

    setExpandedImage({ ...images[index], images, index })
  }

  const showRelativeImage = (direction) => {
    setExpandedImage((current) => {
      if (!current?.images?.length) return current
      const nextIndex = (current.index + direction + current.images.length) % current.images.length
      return { ...current.images[nextIndex], images: current.images, index: nextIndex }
    })
  }

  return (
    <section id="case_studies" style={{ width: '100%', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
      <SectionHeader label="CASE STUDIES" heading={title} description={section?.description} primary={primary} accent={accent} />
      {items.length === 0 ? (
        <p style={{ color: secondary, opacity: 0.6 }}>No case studies listed.</p>
      ) : variant === 'grid' ? (
        <CaseStudiesGrid items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} surface={surface} background={background} onOpenImage={openImageGroup} />
      ) : variant === 'minimal' ? (
        <CaseStudiesMinimal items={items} primary={primary} secondary={secondary} accent={accent} />
      ) : (
        <CaseStudiesFeatured items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} surface={surface} background={background} onOpenImage={openImageGroup} />
      )}
      </div>
      <ImageLightbox
        image={expandedImage}
        primary={primary}
        background={background}
        onClose={() => setExpandedImage(null)}
        onPrevious={() => showRelativeImage(-1)}
        onNext={() => showRelativeImage(1)}
      />
    </section>
  )
}
