import { createTheme } from '@mui/material/styles';

const heading = "'Space Grotesk', sans-serif";

// Palette Pharmalyse
export const theme = createTheme({
  palette: {
    primary: { main: '#084734', contrastText: '#FFF9DB' },   // vert foncé
    secondary: { main: '#CEF17B', contrastText: '#084734' }, // lime
    background: { default: '#FFF9DB', paper: '#E5FCCD' },
    text: { primary: '#0B2219', secondary: '#3E5A4C' },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: "'Source Sans 3', sans-serif",
    h1: {
      fontFamily: heading,
      fontWeight: 700,
      fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', // responsive
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: { fontFamily: heading, fontWeight: 600, fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', lineHeight: 1.2, letterSpacing: '-0.01em' },
    h3: { fontFamily: heading, fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.3 },
    body1: { fontSize: '1.125rem', lineHeight: 1.6 },
    body2: { fontSize: '1rem', lineHeight: 1.55 },
    caption: { fontSize: '0.875rem', color: '#3E5A4C' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: { WebkitFontSmoothing: 'antialiased' },
        'a:focus-visible, button:focus-visible': { outline: '3px solid #CEF17B', outlineOffset: 2 },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, textTransform: 'none', fontWeight: 600, paddingInline: 20 },
        sizeLarge: { paddingBlock: 12, fontSize: '1rem' },
        outlined: { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 20, transition: 'box-shadow .2s ease, transform .2s ease' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#FFFFFF80', borderRadius: 14 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 24, backgroundColor: '#FFF9DB', backgroundImage: 'none' },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { backgroundColor: '#FFF9DB', backgroundImage: 'none' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 14 },
      },
    },
  },
});
