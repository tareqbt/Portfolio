import React from 'react'

export default function SectionHeader({ label, heading, description, primary, accent }) {
  const showLabel = label && label.toLowerCase() !== String(heading || '').toLowerCase()

  return (
    <div style={{ marginBottom: description ? '1.5rem' : '2rem' }}>
      {showLabel && (
        <p style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: accent,
          margin: '0 0 0.35rem',
        }}>
          {label}
        </p>
      )}
      <h2 style={{
        fontSize: '2.25rem',
        fontWeight: 800,
        color: primary,
        margin: description ? '0 0 0.6rem' : '0 0 2rem',
        lineHeight: 1.15,
      }}>
        {heading}
      </h2>
      {description && (
        <p style={{
          fontSize: '1rem',
          color: primary,
          opacity: 0.72,
          margin: '0 0 2rem',
          lineHeight: 1.6,
        }}>
          {description}
        </p>
      )}
    </div>
  )
}
