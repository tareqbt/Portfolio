import React from 'react'
import SectionHeader from './SectionHeader'
import { getThemeColors } from '../theme'
import { CONTENT_MAX_WIDTH } from '../theme'

const CATEGORY_EMOJI = {
  certification: '🏆',
  award: '🥇',
  publication: '📄',
  license: '📋',
  honor: '⭐',
}

function AchievementIcon({ item, primary }) {
  const emoji = CATEGORY_EMOJI[item.category || ''] || '🎖️'
  return item.icon && item.icon.startsWith('http') ? (
    <img src={item.icon} alt={item.title} style={{ width: 44, height: 44, objectFit: 'contain' }} />
  ) : (
    <div style={{
      width: 44, height: 44, borderRadius: 8, flexShrink: 0,
      backgroundColor: `${primary}10`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
    }}>{emoji}</div>
  )
}

function BadgeCard({ item, primary, secondary, accent, divider, background }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
      border: `2px solid ${divider}`, borderRadius: 10, padding: '1rem',
      backgroundColor: background,
      transition: 'border-color 0.2s ease',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = divider }}
    >
      <AchievementIcon item={item} primary={primary} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: primary, marginBottom: '0.1rem' }}>{item.title}</div>
        {item.issuer && <div style={{ fontSize: '0.75rem', color: secondary, opacity: 0.85, marginBottom: '0.1rem' }}>{item.issuer}</div>}
        {item.date && <div style={{ fontSize: '0.75rem', color: secondary, opacity: 0.65 }}>{item.date}</div>}
        {item.credential_url && (
          <a href={item.credential_url} target="_blank" rel="noreferrer"
            style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, textDecoration: 'none', display: 'inline-block', marginTop: '0.25rem' }}>
            View →
          </a>
        )}
      </div>
    </div>
  )
}

/* ── badges variant ────────────────────────────── */

function AchievementsBadges({ items, primary, secondary, accent, divider, background }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
      {items.map((item, idx) => (
        <BadgeCard key={item.id || idx} item={item} primary={primary} secondary={secondary} accent={accent} divider={divider} background={background} />
      ))}
    </div>
  )
}

/* ── timeline variant ──────────────────────────── */

function AchievementsTimeline({ items, primary, secondary, accent, divider }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative' }}>
      <div style={{ position: 'absolute', left: 87, top: 8, bottom: 8, width: 2, backgroundColor: divider }} />
      {items.map((item, idx) => (
        <li key={item.id || idx} style={{ display: 'flex', gap: '1.5rem', marginBottom: idx < items.length - 1 ? '2rem' : 0, position: 'relative' }}>
          <div style={{ width: 80, textAlign: 'right', color: primary, fontWeight: 700, fontSize: '0.8rem', paddingTop: 2, flexShrink: 0 }}>
            {item.date || ''}
          </div>
          <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: accent, border: `3px solid #fff`, flexShrink: 0, marginTop: 2, zIndex: 1 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: primary, marginBottom: '0.1rem' }}>{item.title}</div>
            {item.issuer && <div style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, marginBottom: '0.1rem' }}>{item.issuer}</div>}
            {item.description && <p style={{ color: secondary, opacity: 0.8, margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>{item.description}</p>}
            {item.credential_url && (
              <a href={item.credential_url} target="_blank" rel="noreferrer"
                style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, textDecoration: 'none', display: 'inline-block', marginTop: '0.25rem' }}>
                View Certificate →
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ── grouped variant ───────────────────────────── */

function AchievementsGrouped({ items, primary, secondary, accent, divider, background }) {
  const groups = items.reduce((acc, item) => {
    const key = item.category || 'other'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {Object.entries(groups).map(([category, groupItems]) => (
        <div key={category}>
          <h3 style={{
            color: primary, borderBottom: `2px solid ${accent}`,
            paddingBottom: '0.4rem', marginBottom: '0.75rem',
            fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            {CATEGORY_EMOJI[category] || '🎖️'} {category.charAt(0).toUpperCase() + category.slice(1)}s
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
            {groupItems.map((item, idx) => (
              <BadgeCard key={item.id || idx} item={item} primary={primary} secondary={secondary} accent={accent} divider={divider} background={background} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── main export ───────────────────────────────── */

export default function Achievements({ section, theme }) {
  const { primary, secondary, accent, divider, background } = getThemeColors(theme)
  const items = section?.items || []
  const variant = section?.layout?.variant || 'badges'
  const title = section?.props?.title || 'Achievements & Certifications'

  return (
    <section id="achievements" style={{ width: '100%', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
      <SectionHeader label="ACHIEVEMENTS" heading={title} description={section?.description} primary={primary} accent={accent} />
      {items.length === 0 ? (
        <p style={{ color: secondary, opacity: 0.6 }}>No achievements listed.</p>
      ) : variant === 'timeline' ? (
        <AchievementsTimeline items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} />
      ) : variant === 'grouped' ? (
        <AchievementsGrouped items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} background={background} />
      ) : (
        <AchievementsBadges items={items} primary={primary} secondary={secondary} accent={accent} divider={divider} background={background} />
      )}
      </div>
    </section>
  )
}
