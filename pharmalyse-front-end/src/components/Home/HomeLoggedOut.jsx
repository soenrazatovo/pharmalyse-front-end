import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const FEATURES = [
  { title: 'Récurrences', body: 'Suivez les traitements que vous reprenez le plus souvent.', tags: ['Historique', 'Rythme'] },
  { title: 'Allergènes', body: 'Repérez vite les excipients et substances à risque.', tags: ['Lactose', 'Gluten'] },
  { title: 'Rappels de lots', body: "Un signalement ANSM ? On vous dit s'il faut retourner en pharmacie.", tags: ['Alertes', 'N° de lot'] },
  { title: 'Pharmacie proche', body: 'La plus proche, ouverte maintenant, en un coup d\'œil.', tags: ['Carte', 'Horaires'] },
];

const MEDICATIONS = [
  { category: 'Antalgique', name: 'Doliprane 1000mg', detail: 'Paracétamol · boîte de 8', recall: false },
  { category: 'Anti-inflammatoire', name: 'Advil 400mg', detail: 'Ibuprofène · boîte de 12', recall: false },
  { category: 'Rappel en cours', name: 'Clamoxyl 500mg', detail: 'Amoxicilline · lot concerné', recall: true },
  { category: 'Antihistaminique', name: 'Aerius 5mg', detail: 'Desloratadine · boîte de 15', recall: false },
];

export default function HomeLoggedOut() {
  return (
    <Box>
      {/* Hero */}
      <Container maxWidth="lg" sx={{ pt: 9, pb: 7 }}>
        <Box sx={{ maxWidth: 640 }}>
          <Typography variant="h1" color="primary.main" gutterBottom>
            Chaque médicament français, décortiqué.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Interactions, allergènes, rappels de lots et pharmacies autour de
            vous — tout ce que vous cherchez avant d'ouvrir la boîte.
          </Typography>
        </Box>
      </Container>

      {/* Feature cards */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Grid container spacing={2.5}>
          {FEATURES.map((f) => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              <Card sx={{ bgcolor: 'background.default', p: 1.5, height: '100%' }} elevation={0}>
                <Box sx={{ bgcolor: 'primary.main', color: 'background.default', borderRadius: 2, p: 2, fontWeight: 600 }}>
                  {f.title}
                </Box>
                <Box sx={{ bgcolor: 'secondary.main', color: 'text.primary', borderRadius: 2, p: 2, mt: 1.25, fontSize: '0.95rem' }}>
                  {f.body}
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 1.25 }}>
                  {f.tags.map((t) => (
                    <Box key={t} sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 1.5, p: 1.25, fontSize: '0.8rem', textAlign: 'center' }}>
                      {t}
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Browse grid, style Vinted */}
      <Box sx={{ bgcolor: 'background.paper', py: 7 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', mb: 3.5 }}>
            <Typography variant="h2" color="primary.main">Parcourir le répertoire</Typography>
            <Button href="#" color="primary">Tout voir →</Button>
          </Box>
          <Grid container spacing={2}>
            {MEDICATIONS.map((m) => (
              <Grid item xs={12} sm={6} md={3} key={m.name}>
                <Card
                  component="a"
                  href="#"
                  sx={{ bgcolor: 'background.default', p: 2.25, display: 'block', textDecoration: 'none' }}
                  elevation={0}
                >
                  <Chip
                    label={m.category}
                    size="small"
                    sx={{
                      bgcolor: m.recall ? 'primary.main' : 'secondary.main',
                      color: m.recall ? 'background.default' : 'primary.main',
                      mb: 1,
                    }}
                  />
                  <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                    {m.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {m.detail}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pharmacie proche */}
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
        <Box sx={{ flex: 1, minWidth: 280 }}>
          <Typography variant="h2" color="primary.main" gutterBottom>
            Trouvez la pharmacie la plus proche
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
            Géolocalisation, horaires en temps réel et garde du dimanche —
            sans sortir de l'app.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Activer ma position
          </Button>
        </Box>
        <Card sx={{ flex: 1, minWidth: 280, bgcolor: 'secondary.main', p: 3 }} elevation={0}>
          {[
            ['Pharmacie du Marché', '0,4 km', true],
            ['Grande Pharmacie Nation', '0,9 km', false],
            ['Pharmacie de Garde', '1,3 km', false],
          ].map(([name, dist, highlight]) => (
            <Box
              key={name}
              sx={{
                bgcolor: highlight ? 'primary.main' : 'background.default',
                color: highlight ? 'background.default' : 'text.primary',
                borderRadius: 2,
                p: 1.75,
                mb: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                '&:last-child': { mb: 0 },
              }}
            >
              <span>{name}</span>
              <span>{dist}</span>
            </Box>
          ))}
        </Card>
      </Container>
    </Box>
  );
}