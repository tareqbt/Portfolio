import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors, CONTENT_MAX_WIDTH } from '../theme'

function Metrics({ metrics, primary, secondary, divider, surface, isMobile = false }) {
  if (!metrics || metrics.length === 0) return null

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: isMobile ? '0.55rem' : '0.7rem',
        marginTop: '0.85rem',
        paddingTop: '0.85rem',
        borderTop: `1px solid ${divider}`,
      }}
    >
      {metrics.map((m, i) => (
        <div key={i} style={{ backgroundColor: surface, borderRadius: 6, padding: '0.7rem 0.75rem', minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: '0.72rem', color: secondary, opacity: 0.72, lineHeight: 1.25 }}>
            {m.label}
          </span>
          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: primary, lineHeight: 1.35, marginTop: '0.18rem' }}>
            {m.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function ImageLightbox({ image, primary, background, onClose, onPrevious, onNext }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
        padding: isMobile ? '0.65rem' : '1.5rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isMobile ? '100%' : 'min(1200px, 96vw)',
          height: isMobile ? 'min(760px, 94dvh)' : 'min(820px, 92vh)',
          backgroundColor: background,
          borderRadius: 8,
          padding: isMobile ? '0.75rem' : '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ color: primary, fontWeight: 800, fontSize: '0.95rem' }}>{image.title}</div>
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
              width: isMobile ? 40 : 36,
              height: isMobile ? 40 : 36,
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
                  left: isMobile ? 8 : 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: isMobile ? 38 : 42,
                  height: isMobile ? 38 : 42,
                  borderRadius: 999,
                  border: 'none',
                  backgroundColor: 'rgba(17,24,39,0.82)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  zIndex: 1,
                }}
              >
                {'<'}
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                style={{
                  position: 'absolute',
                  right: isMobile ? 8 : 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: isMobile ? 38 : 42,
                  height: isMobile ? 38 : 42,
                  borderRadius: 999,
                  border: 'none',
                  backgroundColor: 'rgba(17,24,39,0.82)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  zIndex: 1,
                }}
              >
                {'>'}
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

function PresentationPhoto({ item, primary, secondary, divider, background, onOpenImage, isMobile }) {
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
              alignItems: isMobile ? 'flex-start' : 'center',
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
                width: isMobile ? 78 : 96,
                height: isMobile ? 58 : 64,
                objectFit: 'cover',
                borderRadius: 6,
                flexShrink: 0,
                backgroundColor: '#fff',
              }}
            />
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800 }}>{title}</span>
              <span style={{ display: 'block', fontSize: '0.72rem', color: secondary, opacity: 0.72 }}>Click to enlarge</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function CaseStudiesFeatured({ items, primary, secondary, accent, divider, surface, background, onOpenImage }) {
  const [openItem, setOpenItem] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 780)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {items.map((item, idx) => {
        const id = item.id || String(idx)
        const isOpen = openItem === id
        const hasAccordion = item.problem || item.approach || item.result
        const hasImage = Boolean(item.image)
        const metadata = [item.client, item.industry].filter(Boolean).join(' | ')

        return (
          <div
            key={id}
            style={{
              border: `1px solid ${divider}`,
              backgroundColor: background,
              borderRadius: 8,
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: hasImage && !isMobile ? 'minmax(280px, 420px) minmax(0, 1fr)' : '1fr',
            }}
          >
            {hasImage && (
              <div style={{ backgroundColor: surface, minHeight: isMobile ? 190 : 300, overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  onClick={() => onOpenImage(item)}
                  style={{ width: '100%', height: '100%', objectFit: item.image_fit || 'cover', display: 'block', cursor: 'zoom-in' }}
                />
              </div>
            )}

            <div style={{ padding: isMobile ? '1rem' : '1.55rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ color: primary, margin: 0, fontSize: isMobile ? '1.02rem' : '1.12rem', fontWeight: 800, lineHeight: 1.35 }}>{item.title}</h3>
              {metadata && (
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: secondary, opacity: 0.72, lineHeight: 1.45 }}>
                  {metadata}
                </div>
              )}
              {item.summary && (
                <p style={{ color: secondary, opacity: 0.84, margin: 0, fontSize: '0.92rem', lineHeight: 1.65 }}>
                  {item.summary}
                </p>
              )}

              <PresentationPhoto item={item} primary={primary} secondary={secondary} divider={divider} background={background} onOpenImage={onOpenImage} isMobile={isMobile} />

              {hasAccordion && (
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? null : id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'none',
                      border: `1px solid ${divider}`,
                      borderRadius: 6,
                      padding: isMobile ? '0.55rem 0.75rem' : '0.4rem 0.75rem',
                      cursor: 'pointer',
                      color: primary,
                      fontSize: '0.8rem',
                      fontWeight: 800,
                    }}
                  >
                    <span>Research Details</span>
                    <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>v</span>
                  </button>
                  {isOpen && (
                    <div style={{ marginTop: '0.8rem', display: 'grid', gap: '0.75rem' }}>
                      {item.problem && <DetailBlock label="Problem" text={item.problem} accent={accent} secondary={secondary} />}
                      {item.approach && <DetailBlock label="Approach" text={item.approach} accent={accent} secondary={secondary} />}
                      {item.result && <DetailBlock label="Result" text={item.result} accent={accent} secondary={secondary} />}
                    </div>
                  )}
                </div>
              )}

              <Metrics metrics={item.metrics} primary={primary} secondary={secondary} divider={divider} surface={surface} isMobile={isMobile} />
              {item.link_url && (
                <a href={item.link_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', fontWeight: 700, color: primary, textDecoration: 'none', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  View Case Study &gt;
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DetailBlock({ label, text, accent, secondary }) {
  return (
    <div>
      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: accent, marginBottom: '0.2rem' }}>{label}</div>
      <p style={{ color: secondary, opacity: 0.86, margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>{text}</p>
    </div>
  )
}

function CaseStudiesGrid({ items, primary, secondary, accent, divider, surface, background, onOpenImage }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '1.25rem' }}>
      {items.map((item, idx) => {
        const metadata = [item.client, item.industry].filter(Boolean).join(' | ')

        return (
          <div
            key={item.id || idx}
            style={{
              border: `1px solid ${hovered === idx ? accent : divider}`,
              backgroundColor: background,
              borderRadius: 8,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transform: hovered === idx ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                onClick={() => onOpenImage(item)}
                style={{ width: '100%', height: 180, objectFit: item.image_fit || 'cover', display: 'block', cursor: 'zoom-in' }}
              />
            )}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
              <h3 style={{ color: primary, margin: 0, fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.35 }}>{item.title}</h3>
              {metadata && <div style={{ fontSize: '0.76rem', color: secondary, opacity: 0.72 }}>{metadata}</div>}
              {item.summary && <p style={{ color: secondary, opacity: 0.84, margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>{item.summary}</p>}
              <Metrics metrics={item.metrics} primary={primary} secondary={secondary} divider={divider} surface={surface} />
              {item.link_url && <a href={item.link_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', fontWeight: 700, color: accent, textDecoration: 'none', marginTop: 'auto' }}>View &gt;</a>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function CaseStudiesMinimal({ items, primary, secondary, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, idx) => (
        <div key={item.id || idx} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '1.25rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', marginBottom: idx < items.length - 1 ? '2rem' : 0 }}>
          <h3 style={{ color: primary, margin: 0, fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.35 }}>{item.title}</h3>
          {item.summary && <p style={{ color: secondary, opacity: 0.84, margin: '0.55rem 0 0', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.summary}</p>}
        </div>
      ))}
    </div>
  )
}

export default function CaseStudies({ section, theme }) {
  const { primary, secondary, accent, divider, surface, background } = getThemeColors(theme)
  const items = section?.items || []
  const variant = section?.layout?.variant || 'featured'
  const title = section?.props?.title || 'Research Highlights'
  const [expandedImage, setExpandedImage] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 780)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

    if (images.length === 0) return

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
    <section id="case_studies" style={{ width: '100%', padding: isMobile ? '3rem 1rem' : '4rem 1.5rem' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        <SectionHeader label="RESEARCH" heading={title} description={section?.description} primary={primary} accent={accent} />
        {items.length === 0 ? (
          <p style={{ color: secondary, opacity: 0.6 }}>No research highlights listed.</p>
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
