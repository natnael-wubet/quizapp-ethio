// src/theme.ts
import { createTheme, rem } from '@mantine/core'

export const theme = createTheme({
  // -------- Primary Colors --------
  // A vibrant, educational palette: indigo + teal accents
  primaryColor: 'indigo',
  primaryShade: 6, // default shade for buttons, links, etc.

  colors: {
    // Extend with custom shades if needed (optional)
    // Mantine already has 'indigo', 'teal', 'blue', etc.
  },

  // -------- Fonts --------
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, monospace',
  headings: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: rem(34), lineHeight: '1.2' },
      h2: { fontSize: rem(28), lineHeight: '1.3' },
      h3: { fontSize: rem(22), lineHeight: '1.4' },
      h4: { fontSize: rem(18), lineHeight: '1.4' },
      h5: { fontSize: rem(16), lineHeight: '1.5' },
      h6: { fontSize: rem(14), lineHeight: '1.5' },
    },
  },

  // -------- Spacing / Sizing --------
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },

  // -------- Breakpoints (mobile-first) --------
  breakpoints: {
    xs: '36em', // 576px
    sm: '48em', // 768px
    md: '62em', // 992px
    lg: '75em', // 1200px
    xl: '88em', // 1408px
  },

  // -------- Component Default Props & Styles --------
  components: {
    Button: {
      defaultProps: {
        radius: 'md' as const,
        size: 'md' as const,
      },
      styles: {
        root: {
          fontWeight: 600,
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: 'var(--mantine-shadow-sm)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'md' as const,
        p: 'lg' as const,
        shadow: 'sm' as const,
      },
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-white)',
          border: '1px solid var(--mantine-color-gray-2)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: 'var(--mantine-shadow-md)',
          },
        },
      },
    },
    Input: {
      defaultProps: {
        radius: 'md' as const,
        size: 'md' as const,
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md' as const,
        size: 'md' as const,
      },
    },
    Select: {
      defaultProps: {
        radius: 'md' as const,
        size: 'md' as const,
      },
    },
    Modal: {
      defaultProps: {
        radius: 'md' as const,
        centered: true,
        transitionProps: { transition: 'fade' as const, duration: 200 },
      },
    },
    Table: {
      defaultProps: {
        striped: true,
        highlightOnHover: true,
        horizontalSpacing: 'md' as const,
        verticalSpacing: 'sm' as const,
      },
    },
    Badge: {
      defaultProps: {
        radius: 'xl' as const,
        size: 'md' as const,
      },
    },
    Tabs: {
      defaultProps: {
        radius: 'md' as const,
        variant: 'outline' as const,
      },
      styles: {
        tab: {
          fontWeight: 600,
          '&[data-active]': {
            backgroundColor: 'var(--mantine-color-indigo-0)',
            color: 'var(--mantine-color-indigo-7)',
          },
        },
      },
    },
  },
})

export default theme
