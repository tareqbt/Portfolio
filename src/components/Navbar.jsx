import React, { useState, useEffect } from 'react'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

export default function Navbar({ section, theme }) {
  const layout = section?.layout || {}
  const desktopLayout = layout?.desktop || {}
  const mobileLayout = layout?.mobile || {}
  const props = section?.props || {}
  const slots = desktopLayout?.slots || {}
  const { background, primary, secondary, accent, divider } = getThemeColors(theme)

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMenuCollapsed(window.innerWidth < 860)
      if (window.innerWidth >= 860) setIsOpen(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const ctaLabel = props.cta_label ?? props.ctaLabel ?? props.CTA
  const ctaUrl = props.cta_url ?? props.ctaUrl

  const activeLayout = isMenuCollapsed ? mobileLayout : desktopLayout

  const navOuterStyle = {
    width: '100%',
    borderBottom: `1px solid ${divider}`,
    position: 'sticky',
    top: 0,
    backgroundColor: isMenuCollapsed ? 'rgba(255,255,255,0.96)' : background,
    backdropFilter: isMenuCollapsed ? 'saturate(160%) blur(14px)' : 'none',
    zIndex: 200,
    boxShadow: isOpen ? '0 12px 28px rgba(17,24,39,0.08)' : 'none',
  }

  const navInnerStyle = {
    display: 'flex',
    justifyContent: activeLayout?.justify ?? 'space-between',
    alignItems: activeLayout?.align ?? 'center',
    gap: activeLayout?.gap ?? '2rem',
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    margin: '0 auto',
    padding: isMenuCollapsed ? '0.75rem 1rem' : '1rem 1.5rem',
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
          <span
            style={{
              display: 'block',
              maxWidth: isMenuCollapsed ? 'min(62vw, 280px)' : 'none',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: isMenuCollapsed ? '1.02rem' : '1.125rem',
              fontWeight: 700,
              color: primary,
            }}
          >
            {props.name}
          </span>
        ) : null
      case 'links':
        return (props.links || []).length ? (
          <div
            style={{
              display: 'flex',
              flexDirection: isMenuCollapsed ? 'column' : 'row',
              alignItems: isMenuCollapsed ? 'stretch' : 'center',
              gap: isMenuCollapsed ? '0.35rem' : '1.5rem',
            }}
          >
            {(props.links || []).map((link, idx) => (
              <a
                key={idx}
                href={link.url || '#'}
                target={link.target}
                rel={link.rel || (link.target === '_blank' ? 'noopener noreferrer' : undefined)}
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '0.875rem',
                  color: primary,
                  transition: 'color 0.2s',
                  padding: isMenuCollapsed ? '0.8rem 0' : 0,
                  borderBottom: isMenuCollapsed ? `1px solid ${divider}` : 'none',
                  fontWeight: isMenuCollapsed ? 700 : 400,
                }}
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
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: accent,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                width: isMenuCollapsed ? '100%' : 'auto',
                minHeight: isMenuCollapsed ? 42 : 'auto',
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
        {!isMenuCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {renderSlotGroup(slots?.right)}
          </div>
        )}

        {/* Collapsible menu button */}
        {isMenuCollapsed && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            style={{
              marginLeft: 'auto',
              background: accent,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              padding: 9,
              width: 44,
              height: 44,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${accent}30`,
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

        {/* Collapsible dropdown */}
        {isMenuCollapsed && isOpen && (
          <div
            id="mobile-nav-menu"
            style={{
              position: 'absolute',
              left: 0,
              top: '100%',
              width: '100%',
              background: background,
              padding: '0.85rem 1rem 1rem',
              borderBottom: `1px solid ${divider}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
            }}
          >
            {renderSlotGroup(slots?.right)}
          </div>
        )}
      </div>
    </nav>
  )
}
