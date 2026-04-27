export const DEFAULT_THEME_COLORS = {
  background: '#FFFFFF',
  primary: '#111827',
  secondary: '#111827',
  surface: '#F3F4F6',
  divider: '#E5E7EB',
  accent: '#2563EB',
}

export const CONTENT_MAX_WIDTH = 1320

export function getThemeColors(theme) {
  const palette = theme?.colorPalette ?? theme?.color_palette ?? []

  if (palette.length >= 5) {
    return {
      background: palette[0],
      primary: palette[1],
      secondary: palette[1],
      surface: palette[2],
      divider: palette[3],
      accent: palette[4],
    }
  }

  return {
    ...DEFAULT_THEME_COLORS,
    primary: palette[0] || DEFAULT_THEME_COLORS.primary,
    secondary: palette[1] || DEFAULT_THEME_COLORS.secondary,
    accent: palette[2] || DEFAULT_THEME_COLORS.accent,
  }
}
