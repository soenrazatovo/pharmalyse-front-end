import { createTheme } from '@mui/material/styles';

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
    h1: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '3.5rem', lineHeight: 1.05 },
    h2: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.75rem' },
    h3: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.25rem' },
    body1: { fontSize: '1.25rem' },
    body2: { fontSize: '1rem' },
    caption: { fontSize: '0.85rem', color: '#3E5A4C' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
});