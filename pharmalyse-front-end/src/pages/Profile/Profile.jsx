import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import Popup from '../../components/Popup/Popup.jsx';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Données de démo : à remplacer par l'API (GET /user/me, /user/favorites, ...)
const STATS = [
  { label: 'Favoris', value: 3, Icon: FavoriteBorderIcon },
  { label: 'Alertes de rappel', value: 1, Icon: NotificationsNoneIcon },
  { label: 'Reprises prévues', value: 2, Icon: EventRepeatIcon },
];

const ACTIVITY = [
  ['Clamoxyl 500mg', 'Rappel de lot signalé', 'Aujourd\'hui'],
  ['Doliprane 1000mg', 'Ajouté aux favoris', 'Il y a 3 jours'],
  ['Aerius 5mg', 'Ajouté aux favoris', 'Il y a 2 semaines'],
];

// user: { firstName, lastName, email, initials } — fourni par App
// onUpdateUser(changes): appelé à l'enregistrement du formulaire
export default function Profile({ user, onUpdateUser }) {
  const firstName = user?.firstName ?? 'Camille';
  const INFOS = [
    ['Nom complet', `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || '—'],
    ['Email', user?.email || '—'],
    ['Membre depuis', 'Septembre 2026'],
  ];

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const openEdit = () => {
    setForm({ firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', email: user?.email ?? '' });
    setError('');
    setEditing(true);
  };

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    const clean = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
    };
    if (!clean.firstName || !clean.lastName || !clean.email) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(clean.email)) {
      setError('Adresse email invalide.');
      return;
    }
    onUpdateUser?.(clean);
    setEditing(false);
    setSaved(true);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
      {/* En-tête */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2, mb: 5 }}>
        <Avatar
          sx={{
            width: 88,
            height: 88,
            bgcolor: 'primary.main',
            color: 'secondary.main',
            fontSize: '2rem',
            fontWeight: 700,
          }}
        >
          {user?.initials ?? '??'}
        </Avatar>
        <Box>
          <Typography variant="h2" color="primary.main">
            {firstName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Votre tableau de bord personnel
          </Typography>
        </Box>
        <Button onClick={openEdit} variant="outlined" color="primary" startIcon={<EditOutlinedIcon />}>
          Modifier mon profil
        </Button>
      </Box>

      {/* Statistiques */}
      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          mb: 3,
        }}
      >
        {STATS.map(({ label, value, Icon }) => (
          <Card
            key={label}
            elevation={0}
            sx={{ bgcolor: 'background.paper', p: 3, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <Avatar sx={{ bgcolor: 'primary.main', color: 'secondary.main' }}>
              <Icon />
            </Avatar>
            <Box>
              <Typography variant="h2" color="primary.main" lineHeight={1}>
                {value}
              </Typography>
              <Typography variant="caption">{label}</Typography>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Activité + infos */}
      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
        }}
      >
        <Card elevation={0} sx={{ bgcolor: 'background.paper', p: 3 }}>
          <Typography variant="h3" color="primary.main" gutterBottom>
            Activité récente
          </Typography>
          {ACTIVITY.map(([name, event, when]) => (
            <Box
              key={name + event}
              sx={{
                bgcolor: 'background.default',
                borderRadius: 2,
                p: 1.75,
                mb: 1.25,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1,
                '&:last-child': { mb: 0 },
              }}
            >
              <Box>
                <Typography fontWeight={700}>{name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event}
                </Typography>
              </Box>
              <Chip label={when} size="small" sx={{ bgcolor: 'secondary.main', color: 'primary.main' }} />
            </Box>
          ))}
        </Card>

        <Card elevation={0} sx={{ bgcolor: 'primary.main', color: 'background.default', p: 3 }}>
          <Typography variant="h3" sx={{ color: 'background.default' }} gutterBottom>
            Mes informations
          </Typography>
          {INFOS.map(([label, value]) => (
            <Box key={label} sx={{ mb: 1.5 }}>
              <Typography variant="caption" sx={{ color: 'secondary.main' }}>
                {label}
              </Typography>
              <Typography variant="body2">{value}</Typography>
            </Box>
          ))}
          <Button
            component={RouterLink}
            to="/favoris"
            sx={{ color: 'secondary.light', px: 0, mt: 1 }}
          >
            Voir mes favoris →
          </Button>
        </Card>
      </Box>

      {/* Édition du profil */}
      <Popup
        open={editing}
        onClose={() => setEditing(false)}
        title="Modifier mon profil"
        asForm
        error={error}
        confirmLabel="Enregistrer"
        onConfirm={handleSubmit}
      >
        <TextField label="Prénom" value={form.firstName} onChange={handleChange('firstName')} autoComplete="given-name" autoFocus fullWidth />
        <TextField label="Nom" value={form.lastName} onChange={handleChange('lastName')} autoComplete="family-name" fullWidth />
        <TextField label="Email" type="email" value={form.email} onChange={handleChange('email')} autoComplete="email" fullWidth />
      </Popup>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSaved(false)}>Profil mis à jour.</Alert>
      </Snackbar>
    </Container>
  );
}
