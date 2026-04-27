import React, { useState, useEffect } from 'react'

function getColors(theme) {
  const palette = theme?.colorPalette ?? theme?.color_palette ?? []
  return {
    primary: palette[0] || '#1917fc',
    secondary: palette[1] || '#134331',
    accent: palette[2] || '#ed2f25',
  }
}

export default function Hero({ section, theme }) {
  const { layout, props = {} } = section
  const { primary, secondary, accent } = getColors(theme)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const activeLayout = isMobile ? layout?.mobile : layout?.desktop
  const contentSlots = layout?.desktop?.slots || {}
  const isGrid = activeLayout?.type === 'grid'

  const containerStyle = {
    display: isGrid ? 'grid' : 'flex',
    gridTemplateColumns: isGrid ? '1fr 1fr' : undefined,
    flexDirection: isGrid ? undefined : 'column',
    gap: activeLayout?.gap || '2rem',
    alignItems: activeLayout?.align || 'center',
    justifyContent: activeLayout?.justify || 'center',
  }

  const renderSlotItem = (slotName) => {
    const p = props || {}
    switch (slotName.toLowerCase()) {
      case 'text':
        return (
          <div>
            {p.name && <h1 style={{ color: primary }}>{p.name}</h1>}
            {p.hero_text && (
              <p style={{ marginTop: '0.5rem', opacity: 0.8, lineHeight: 1.7 }}>{p.hero_text}</p>
            )}
          </div>
        )
      case 'cta':
        return p.cta_label ? (
          <a href={p.cta_url || '#'} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1.25rem' }}>
            <button
              style={{
                backgroundColor: primary,
                color: '#fff',
                border: `2px solid ${accent}`,
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: `0 4px 12px ${accent}40`,
                transition: 'opacity 0.2s',
              }}
            >
              {p.cta_label}
            </button>
          </a>
        ) : null
      case 'image': {
        if (!p.image) return null
        const imageMaxWidth = isMobile ? '320px' : '520px'
        const imageAspectRatio = isMobile ? '4 / 3' : '1 / 1'
        return (
          <div
            style={{
              width: '100%',
              maxWidth: imageMaxWidth,
              aspectRatio: imageAspectRatio,
              overflow: 'hidden',
              borderRadius: 12,
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            }}
          >
            <img
              src={p.image}
              alt={p.name || 'hero image'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )
      }
      default:
        return null
    }
  }

  const renderSlotContent = (slotData) => {
    if (!slotData) return null
    const items = Array.isArray(slotData) ? slotData : [slotData]
    return items.map((item, idx) => {
      const key = typeof item === 'string' ? item : item.name
      return <div key={idx}>{renderSlotItem(key)}</div>
    })
  }

  return (
    <section id="hero" style={{ width: '100%', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={containerStyle}>
          {/* Left */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            {renderSlotContent(contentSlots.left)}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', width: '100%' }}>
            {renderSlotContent(contentSlots.right)}
          </div>
        </div>
      </div>
    </section>
  )
}
