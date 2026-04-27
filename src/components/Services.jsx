import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

function ServiceIcon({ icon, title, accent }) {
  if (icon) return <img src={icon} alt={title} style={{ width: 40, height: 40, objectFit: 'contain' }} />
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 8,
      backgroundColor: `${accent}20`, color: accent,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: '1.1rem',
    }}>
      {title.charAt(0).toUpperCase()}
    </div>
  )
}

function FeaturesList({ features, accent }) {
  if (!features || features.length === 0) return null
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0 0', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      {features.map((f, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ color: accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
          <span>{f}</span>
        </li>
      ))}
    </ul>
  )
}

function PriceLabel({ label, accent }) {
  if (!label) return null
  return (
    <span style={{
      display: 'inline-block',
      backgroundColor: `${accent}15`, color: accent,
      borderRadius: 9999, fontSize: '0.8rem', fontWeight: 600,
      padding: '2px 10px', marginTop: '0.75rem',
    }}>{label}</span>
  )
}

/* ── cards variant ─────────────────────────────── */

function ServicesCards({ items, primary, secondary, accent, divider, background }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          style={{
            display: 'flex', flexDirection: 'column',
            border: `2px solid ${hovered === idx ? accent : divider}`,
            backgroundColor: background,
            borderRadius: 12, padding: '1.5rem',
            transform: hovered === idx ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hovered === idx ? `0 8px 24px ${accent}30` : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          <ServiceIcon icon={item.icon} title={item.title} accent={accent} />
          <h3 style={{ color: primary, margin: '0.75rem 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 700 }}>{item.title}</h3>
          <p style={{ color: secondary, opacity: 0.85, margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>{item.description}</p>
          <FeaturesList features={item.features} accent={accent} />
          <div style={{ marginTop: 'auto' }}>
            <PriceLabel label={item.price_label} accent={accent} />
            {item.cta_url && (
              <a href={item.cta_url} target="_blank" rel="noreferrer" style={{
                display: 'block', textAlign: 'center', textDecoration: 'none',
                marginTop: '1rem', backgroundColor: accent, color: '#fff',
                border: `2px solid ${accent}`, borderRadius: 8,
                padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 600,
              }}>{item.cta_label || 'Get Started'}</a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── list variant ──────────────────────────────── */

function ServicesList({ items, primary, secondary, accent, divider }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, idx) => (
        <div key={item.id || idx} style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          gap: '1.5rem', padding: '1.25rem 0',
          borderBottom: idx < items.length - 1 ? `1px solid ${divider}` : 'none',
        }}>
          <ServiceIcon icon={item.icon} title={item.title} accent={accent} />
          <div style={{ flex: 1 }}>
            <h3 style={{ color: primary, margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 700 }}>{item.title}</h3>
            <p style={{ color: secondary, opacity: 0.85, margin: 0, fontSize: '0.875rem' }}>{item.description}</p>
            {item.features && item.features.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                {item.features.map((f, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', backgroundColor: `${accent}15`, color: accent, borderRadius: 4, padding: '1px 6px' }}>{f}</span>
                ))}
              </div>
            )}
          </div>
          <div style={{ minWidth: 140, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <PriceLabel label={item.price_label} accent={accent} />
            {item.cta_url && (
              <a href={item.cta_url} target="_blank" rel="noreferrer" style={{
                textDecoration: 'none', backgroundColor: accent, color: '#fff',
                border: `2px solid ${accent}`, borderRadius: 8,
                padding: '0.375rem 0.875rem', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap',
              }}>{item.cta_label || 'Get Started'}</a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── pricing variant ───────────────────────────── */

function ServicesPricing({ items, primary, secondary, accent, divider, background }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          style={{
            position: 'relative', display: 'flex', flexDirection: 'column',
            border: item.featured ? `2px solid ${accent}` : `2px solid ${hovered === idx ? `${accent}80` : divider}`,
            backgroundColor: background,
            borderRadius: 12,
            padding: item.featured ? '2rem 1.5rem' : '1.5rem',
            boxShadow: item.featured ? `0 8px 32px ${accent}30` : 'none',
            transform: item.featured ? 'scaleY(1.03)' : hovered === idx ? 'translateY(-4px)' : 'none',
            transformOrigin: 'top center', transition: 'all 0.3s ease',
            marginTop: item.featured ? 0 : '0.75rem',
          }}
          onMouseEnter={() => { if (!item.featured) setHovered(idx) }}
          onMouseLeave={() => setHovered(null)}
        >
          {item.featured && (
            <span style={{
              position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
              backgroundColor: accent, color: '#fff', borderRadius: 9999,
              fontSize: '0.7rem', fontWeight: 700, padding: '2px 12px',
              whiteSpace: 'nowrap', letterSpacing: '0.05em',
            }}>MOST POPULAR</span>
          )}
          <ServiceIcon icon={item.icon} title={item.title} accent={accent} />
          <h3 style={{ color: primary, margin: '0.75rem 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 700 }}>{item.title}</h3>
          <p style={{ color: secondary, opacity: 0.85, margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>{item.description}</p>
          <FeaturesList features={item.features} accent={accent} />
          <div style={{ marginTop: 'auto' }}>
            <PriceLabel label={item.price_label} accent={accent} />
            {item.cta_url && (
              <a href={item.cta_url} target="_blank" rel="noreferrer" style={{
                display: 'block', textAlign: 'center', textDecoration: 'none',
                marginTop: '1rem', backgroundColor: accent, color: '#fff',
                border: `2px solid ${accent}`, borderRadius: 8,
                padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 600,
              }}>{item.cta_label || 'Get Started'}</a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── main export ───────────────────────────────── */

export default function Services({ section, theme }) {
  const { primary, secondary, accent, divider, surface, background } = getThemeColors(theme)
  const items = section?.items || []
  const variant = section?.layout?.variant || 'cards'
  const title = section?.props?.title || 'Services'
  const subtitle = section?.props?.subtitle || null
  const sectionCtaLabel = section?.props?.cta_label || null
  const sectionCtaUrl = section?.props?.cta_url || null

  return (
    <section id="services" style={{ width: '100%', padding: '4rem 1.5rem', backgroundColor: surface }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
      <SectionHeader label="SERVICES" heading={title} description={subtitle} primary={primary} accent={accent} />
      {items.length === 0 ? (
        <p style={{ color: secondary, opacity: 0.6 }}>No services listed.</p>
      ) : variant === 'list' ? (
        <ServicesList items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} />
      ) : variant === 'pricing' ? (
        <ServicesPricing items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} background={background} />
      ) : (
        <ServicesCards items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} background={background} />
      )}
      {sectionCtaLabel && sectionCtaUrl && (
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href={sectionCtaUrl} style={{
            display: 'inline-block', textDecoration: 'none',
            backgroundColor: accent, color: '#fff',
            border: `2px solid ${accent}`, borderRadius: 10,
            padding: '0.625rem 1.75rem', fontSize: '0.9rem', fontWeight: 600,
          }}>{sectionCtaLabel}</a>
        </div>
      )}
      </div>
    </section>
  )
}
