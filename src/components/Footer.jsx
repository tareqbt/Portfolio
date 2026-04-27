import React, { useState, useEffect } from 'react'

function getColors(theme) {
  const palette = theme?.colorPalette ?? theme?.color_palette ?? []
  return {
    primary: palette[0] || '#1917fc',
    secondary: palette[1] || '#134331',
    accent: palette[2] || '#ed2f25',
  }
}

export default function Footer({ section, theme }) {
  const layout = section?.layout || {}
  const props = section?.props || {}
  const slots = layout?.slots || {}
  const { primary, secondary, accent } = getColors(theme)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const desktopCols = layout?.columns?.desktop || 2
  const mobileCols = layout?.columns?.mobile || 1
  const activeCols = isMobile ? mobileCols : desktopCols

  const footerOuterStyle = {
    width: '100%',
    marginTop: 'auto',
    borderTop: `1px solid ${secondary}`,
  }

  const footerInnerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${activeCols}, 1fr)`,
    gap: layout?.gap ?? '2rem',
    padding: '2rem 1.5rem',
    width: '100%',
    maxWidth: 1100,
    margin: '0 auto',
    textAlign: isMobile ? 'center' : 'left',
  }

  const renderSlot = (slotName) => {
    switch (slotName.toLowerCase()) {
      case 'logo':
        return props.logo ? (
          <img src={props.logo} alt="Logo" style={{ height: 40, width: 40, objectFit: 'contain' }} />
        ) : null
      case 'name':
        return props.name ? (
          <span style={{ fontWeight: 600, color: primary }}>{props.name}</span>
        ) : null
      case 'links':
        return (props.links || []).length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(props.links || []).map((link, idx) => (
              <a
                key={idx}
                href={link.url || '#'}
                style={{ fontSize: '0.875rem', color: secondary, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = secondary)}
              >
                {link.label || 'Footer Link'}
              </a>
            ))}
          </div>
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

  const showBranding = props.show_branding ?? props.showBranding ?? true

  return (
    <footer id="footer" style={footerOuterStyle}>
      <div style={footerInnerStyle}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: isMobile ? 'center' : 'flex-start' }}>
          {renderSlotGroup(slots?.left) ?? (
            <>
              {renderSlot('logo')}
              {renderSlot('name')}
            </>
          )}
          <p style={{ margin: 0, fontSize: '0.875rem', color: secondary }}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: isMobile ? 'center' : 'flex-start' }}>
          {slots?.right ? (
            renderSlotGroup(slots.right)
          ) : (
            <>
              <span style={{ fontWeight: 600 }}>Links</span>
              {renderSlot('links')}
            </>
          )}
        </div>
      </div>
      {showBranding && (
        <div
          style={{
            width: '100%',
            maxWidth: 1100,
            margin: '0 auto',
            padding: '1rem 1.5rem',
            borderTop: `1px solid ${secondary}`,
            textAlign: 'center',
            fontSize: '0.8rem',
            color: secondary,
            opacity: 0.75,
          }}
        >
          Made with{' '}
          <a
            href="https://cubiee.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: primary, fontWeight: 600, textDecoration: 'none' }}
          >
            cubiee.com
          </a>
        </div>
      )}
    </footer>
  )
}
