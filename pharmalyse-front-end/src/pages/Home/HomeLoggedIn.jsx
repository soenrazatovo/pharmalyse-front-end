import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';

import { Link as RouterLink } from 'react-router-dom';

const RECURRENCES = [
  ['Doliprane 1000mg', 'Prochaine reprise probable : 12 nov.'],
  ['Aerius 5mg', 'Prochaine reprise probable : saison prochaine'],
];

// userName: prénom affiché dans le message d'accueil
// favorites: liste des favoris (état dans App), onRemoveFavorite(id)
export default function HomeLoggedIn({ userName = 'Camille', favorites = [], onRemoveFavorite }) {
  const recalledFavorite = favorites.find((f) => f.recall);

  return (
    <Box>
      {/* Greeting */}
      <Container maxWidth="lg" sx={{ pt: 7, pb: 1, textAlign: 'center' }}>
        <Typography variant="h1" color="primary.main" gutterBottom>
          Bonjour, {userName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Voici vos médicaments suivis et ce qui demande votre attention.
        </Typography>
      </Container>

      {/* Alert rappel */}
      {recalledFavorite && (
        <Container maxWidth="lg" sx={{ pt: 3 }}>
          <Alert
            severity="warning"
            icon={false}
            sx={{
              bgcolor: 'primary.main',
              color: 'background.default',
              borderRadius: 3,
              alignItems: 'center',
              '& .MuiAlert-message': { flex: 1, fontWeight: 600 },
            }}
            action={
              <Button
                href="#"
                size="small"
                sx={{ bgcolor: 'secondary.main', color: 'primary.main', px: 2.25 }}
              >
                Voir le détail
              </Button>
            }
          >
            Un de vos favoris, {recalledFavorite.name}, fait l'objet d'un rappel de lot.
          </Alert>
        </Container>
      )}

      {/* Favoris */}
      <Container maxWidth="lg" sx={{ pt: 5, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', mb: 2.75 }}>
          <Typography variant="h2" color="primary.main">Vos favoris</Typography>
          <Button component={RouterLink} to="/favoris" color="primary">Gérer →</Button>
        </Box>
        <Grid container spacing={2}>
          {favorites.map((m) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={m.id}>
              <Card
                sx={{
                  bgcolor: m.recall ? 'background.default' : 'background.paper',
                  border: m.recall ? '1.5px solid' : 'none',
                  borderColor: 'primary.main',
                  p: 2.25,
                  position: 'relative',
                  height: '100%',
                }}
                elevation={0}
              >
                <IconButton
                  size="small"
                  aria-label={`Retirer ${m.name} des favoris`}
                  onClick={() => onRemoveFavorite?.(m.id)}
                  sx={{ position: 'absolute', top: 10, right: 10, color: 'primary.main' }}
                >
                  <FavoriteIcon fontSize="small" />
                </IconButton>
                <Chip
                  label={m.category}
                  size="small"
                  sx={{ bgcolor: 'primary.main', color: 'background.default', mb: 1 }}
                />
                <Typography variant="subtitle1" fontWeight={700} color="text.primary" sx={{ mt: 0.5 }}>
                  {m.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {m.note}
                </Typography>
              </Card>
            </Grid>
          ))}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              component={RouterLink}
              to="/favoris"
              sx={{
                width: '100%',
                height: '100%',
                minHeight: 120,
                border: '1.5px dashed',
                borderColor: 'primary.main',
                bgcolor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                color: 'primary.main',
                cursor: 'pointer',
              }}
              elevation={0}
            >
              <AddIcon />
              <Typography variant="body2" fontWeight={600}>Ajouter un favori</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Récurrences + pharmacie proche */}
      <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
        <Grid container spacing={2.75}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ bgcolor: 'background.paper', p: 3, height: '100%' }} elevation={0}>
              <Typography variant="h3" color="primary.main" gutterBottom>
                D'après vos récurrences
              </Typography>
              {RECURRENCES.map(([name, note]) => (
                <Box
                  key={name}
                  sx={{
                    bgcolor: 'background.default',
                    borderRadius: 2,
                    p: 1.75,
                    mb: 1.25,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                    '&:last-child': { mb: 0 },
                  }}
                >
                  <span>{name}</span>
                  <Typography variant="body2" color="text.secondary">{note}</Typography>
                </Box>
              ))}
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ bgcolor: 'primary.main', color: 'background.default', p: 3, height: '100%' }} elevation={0}>
              <Typography variant="h3" sx={{ color: 'background.default' }} gutterBottom>
                Pharmacie la plus proche
              </Typography>
              <Box sx={{ bgcolor: 'secondary.main', color: 'primary.main', borderRadius: 2, p: 1.75, display: 'flex', justifyContent: 'space-between', fontWeight: 600, mb: 1.5 }}>
                <span>Pharmacie du Marché</span>
                <span>0,4 km</span>
              </Box>
              <Button href="#" sx={{ color: 'secondary.light' }}>Voir l'itinéraire →</Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}