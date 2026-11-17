import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'background.default', py: 3, mt: 'auto' }}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography variant="h3" component="span" sx={{ color: 'background.default' }}>
          Pharmalyse
        </Typography>
        <Typography variant="body2" sx={{ color: 'secondary.light', opacity: 0.85 }}>
          © {new Date().getFullYear()} Pharmalyse · Projet BTS SIO SLAM
        </Typography>
      </Container>
    </Box>
  );
}
