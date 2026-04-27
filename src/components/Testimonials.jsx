import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

function StarRating({ rating, accent, divider }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: '0.75rem' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: '1rem', color: i < rating ? accent : divider }}>
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}

function Avatar({ item, primary }) {
  const initials = item.author_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return item.author_avatar ? (
    <img
      src={item.author_avatar}
      alt={item.author_name}
      style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
    />
  ) : (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: primary,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '1rem',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

function AuthorRow({ item, primary, secondary }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem' }}>
      <Avatar item={item} primary={primary} />
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: primary }}>{item.author_name}</div>
        {(item.author_role || item.author_company) && (
          <div style={{ fontSize: '0.75rem', color: `${secondary}cc` }}>
            {[item.author_role, item.author_company].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── cards variant ─────────────────────────────── */

function TestimonialsCards({ items, primary, secondary, accent, divider, background }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: `2px solid ${hovered === idx ? accent : divider}`,
            backgroundColor: background,
            borderRadius: 12,
            padding: '1.5rem',
            transform: hovered === idx ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hovered === idx ? `0 8px 24px ${accent}30` : 'none',
            transition: 'all 0.3s ease',
            cursor: 'default',
          }}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          <StarRating rating={item.rating ?? 5} accent={accent} divider={divider} />
          <div style={{ color: primary, fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.25rem', fontFamily: 'serif' }}>
            &ldquo;
          </div>
          <p style={{ color: secondary, opacity: 0.85, flex: 1, margin: 0, lineHeight: 1.7 }}>{item.quote}</p>
          <AuthorRow item={item} primary={primary} secondary={secondary} />
        </div>
      ))}
    </div>
  )
}

/* ── list variant ──────────────────────────────── */

function TestimonialsList({ items, primary, secondary, accent, divider }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          style={{ borderLeft: `4px solid ${accent}`, paddingLeft: '1.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
        >
          <StarRating rating={item.rating ?? 5} accent={accent} divider={divider} />
          <div style={{ color: primary, fontSize: '2rem', lineHeight: 1, marginBottom: '0.25rem', fontFamily: 'serif' }}>
            &ldquo;
          </div>
          <p style={{ color: secondary, opacity: 0.85, margin: '0 0 1rem 0', lineHeight: 1.7 }}>{item.quote}</p>
          <AuthorRow item={item} primary={primary} secondary={secondary} />
        </div>
      ))}
    </div>
  )
}

/* ── carousel variant ──────────────────────────── */

function TestimonialsCarousel({ items, primary, secondary, accent, divider, background }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const item = items[activeIdx]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 600, border: `2px solid ${divider}`, backgroundColor: background, borderRadius: 12, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <StarRating rating={item.rating ?? 5} accent={accent} divider={divider} />
        <div style={{ color: primary, fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.25rem', fontFamily: 'serif' }}>
          &ldquo;
        </div>
        <p style={{ color: secondary, opacity: 0.85, margin: '0 0 1.5rem 0', lineHeight: 1.7 }}>{item.quote}</p>
        <AuthorRow item={item} primary={primary} secondary={secondary} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
          disabled={activeIdx === 0}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: `2px solid ${activeIdx === 0 ? `${primary}60` : primary}`,
            backgroundColor: 'transparent',
            color: activeIdx === 0 ? `${primary}60` : primary,
            cursor: activeIdx === 0 ? 'not-allowed' : 'pointer',
            fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: activeIdx === 0 ? 0.35 : 1, transition: 'opacity 0.2s',
          }}
        >←</button>

        <div style={{ display: 'flex', gap: 6 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => setActiveIdx(i)} style={{
              width: i === activeIdx ? 20 : 8, height: 8, borderRadius: 4, border: 'none',
              backgroundColor: i === activeIdx ? accent : divider,
              cursor: 'pointer', transition: 'all 0.3s ease', padding: 0,
            }} />
          ))}
        </div>

        <button
          onClick={() => setActiveIdx((i) => Math.min(items.length - 1, i + 1))}
          disabled={activeIdx === items.length - 1}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: `2px solid ${activeIdx === items.length - 1 ? `${primary}60` : primary}`,
            backgroundColor: 'transparent',
            color: activeIdx === items.length - 1 ? `${primary}60` : primary,
            cursor: activeIdx === items.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: activeIdx === items.length - 1 ? 0.35 : 1, transition: 'opacity 0.2s',
          }}
        >→</button>
      </div>
    </div>
  )
}

/* ── main export ───────────────────────────────── */

export default function Testimonials({ section, theme }) {
  const { primary, secondary, accent, divider, surface, background } = getThemeColors(theme)
  const items = section?.items || []
  const variant = section?.layout?.variant || 'cards'
  const title = section?.props?.title || 'What People Say'
  const subtitle = section?.props?.subtitle || null

  return (
    <section id="testimonials" style={{ width: '100%', padding: '4rem 1.5rem', backgroundColor: surface }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
      <SectionHeader label="TESTIMONIALS" heading={title} description={subtitle} primary={primary} accent={accent} />
      {items.length === 0 ? (
        <p style={{ color: secondary, opacity: 0.6 }}>No testimonials listed.</p>
      ) : variant === 'list' ? (
        <TestimonialsList items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} />
      ) : variant === 'carousel' ? (
        <TestimonialsCarousel items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} background={background} />
      ) : (
        <TestimonialsCards items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} background={background} />
      )}
      </div>
    </section>
  )
}
