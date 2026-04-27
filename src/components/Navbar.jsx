import React, { useState, useEffect } from 'react'

function getColors(theme) {
  const palette = theme?.colorPalette ?? theme?.color_palette ?? []
  return {
    primary: palette[0] || '#1917fc',
    secondary: palette[1] || '#134331',
    accent: palette[2] || '#ed2f25',
  }
}

export default function Navbar({ section, theme }) {
  const layout = section?.layout || {}
  const desktopLayout = layout?.desktop || {}
  const mobileLayout = layout?.mobile || {}
  const props = section?.props || {}
  const slots = desktopLayout?.slots || {}
  const { primary, secondary, accent } = getColors(theme)

  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const ctaLabel = props.cta_label ?? props.ctaLabel ?? props.CTA
  const ctaUrl = props.cta_url ?? props.ctaUrl

  const activeLayout = isMobile ? mobileLayout : desktopLayout

  const navOuterStyle = {
    width: '100%',
    borderBottom: `1px solid ${secondary}`,
    position: 'relative',
  }

  const navInnerStyle = {
    display: 'flex',
    justifyContent: activeLayout?.justify ?? 'space-between',
    alignItems: activeLayout?.align ?? 'center',
    gap: activeLayout?.gap ?? '2rem',
    width: '100%',
    maxWidth: 1100,
    margin: '0 auto',
    padding: '1rem 1.5rem',
    position: 'relative',
  }

  const renderSlot = (slotName) => {
    switch (slotName.toLowerCase()) {
      case 'logo':
        return props.logo ? (
          <img src={props.logo} alt="Logo" style={{ height: 40, width: 40, objectFit: 'contain' }} />
        ) : null
      case 'name':
        return props.name ? (
          <span style={{ fontSize: '1.125rem', fontWeight: 600, color: primary }}>{props.name}</span>
        ) : null
      case 'links':
        return (props.links || []).length ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {(props.links || []).map((link, idx) => (
              <a
                key={idx}
                href={link.url || '#'}
                style={{ fontSize: '0.875rem', color: primary, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = primary)}
              >
                {link.label || 'Link'}
              </a>
            ))}
          </div>
        ) : null
      case 'cta':
        return ctaLabel ? (
          <a href={ctaUrl || '#'} target="_blank" rel="noreferrer">
            <button
              style={{
                backgroundColor: primary,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              {ctaLabel}
            </button>
          </a>
        ) : null
      default:
        return null
    }
  }

  const renderSlotGroup = (slotData) => {
    if (!slotData) return null
    const items = Array.isArray(slotData) ? slotData : [slotData]
    return items.map((item, idx) => {
      const name = typeof item === 'string' ? item : item?.name
      if (!name) return null
      return <div key={`${name}-${idx}`}>{renderSlot(name)}</div>
    })
  }

  return (
    <nav style={navOuterStyle}>
      <div style={navInnerStyle}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {renderSlotGroup(slots?.left)}
        </div>

        {/* Desktop right */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {renderSlotGroup(slots?.right)}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: primary,
            }}
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        )}

        {/* Mobile dropdown */}
        {isMobile && isOpen && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '100%',
              width: '100%',
              background: '#fafafa',
              padding: '1rem 1.5rem',
              borderBottom: `1px solid ${secondary}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              zIndex: 50,
            }}
          >
            {renderSlotGroup(slots?.right)}
          </div>
        )}
      </div>
    </nav>
  )
}
