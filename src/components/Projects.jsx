import React from 'react'
import SectionHeader from './SectionHeader'

function getColors(theme) {
  const palette = theme?.colorPalette ?? theme?.color_palette ?? []
  return {
    primary: palette[0] || '#1917fc',
    secondary: palette[1] || '#134331',
    accent: palette[2] || '#ed2f25',
  }
}

export default function Projects({ section, theme }) {
  const { layout, itemLayout, items } = section
  const { primary, secondary, accent } = getColors(theme)

  const outerStyle = { width: '100%', padding: '4rem 1.5rem' }

  const containerStyle = {
    display: layout?.type || 'flex',
    flexDirection: 'column',
    gap: layout?.gap || '1rem',
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }

  const cardBase = {
    maxWidth: itemLayout?.constraints?.maxWidth,
    width: '100%',
    border: `2px solid ${secondary}`,
    borderRadius: 12,
    padding: 16,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  }

  const cardInnerStyle = {
    display: 'flex',
    flexDirection: itemLayout?.layout?.direction || 'column',
    gap: itemLayout?.layout?.gap || '1rem',
    height: '100%',
  }

  return (
    <section id="projects" style={outerStyle}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionHeader label="PROJECTS" heading="Projects" description={section?.description} primary={primary} accent={accent} />
      <div style={containerStyle}>
        {(items || []).map((project, idx) => (
          <div
            key={project.id || idx}
            style={cardBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accent
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 8px 24px ${accent}30`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = secondary
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={cardInnerStyle}>
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title || 'Project image'}
                  style={{ width: '100%', height: 192, objectFit: 'cover', borderRadius: 10 }}
                />
              )}

              {project.title && (
                <h3 style={{ margin: 0, color: primary }}>{project.title}</h3>
              )}

              {project.description && (
                <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.7 }}>{project.description}</p>
              )}

              {project.link_url && (
                <a
                  href={project.link_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'block',
                    marginTop: 'auto',
                    textDecoration: 'none',
                    textAlign: 'center',
                    backgroundColor: primary,
                    color: '#fff',
                    border: `2px solid ${accent}`,
                    borderRadius: 10,
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    boxShadow: `0 2px 8px ${accent}40`,
                    transition: 'opacity 0.2s',
                  }}
                >
                  Live Link
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
