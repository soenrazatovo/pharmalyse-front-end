import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Popup from '../../components/Popup/Popup.jsx';
import Divider from '@mui/material/Divider';

const NOTIFICATIONS = [
  ['recallAlerts', 'Alertes de rappel de lot', 'Être prévenu quand un de vos favoris est concerné.'],
  ['refillReminders', 'Rappels de reprise', 'Suggestions basées sur vos récurrences de prise.'],
  ['newsletter', 'Actualités Pharmalyse', 'Nouveautés et informations du service.'],
];

export const DEFAULT_SETTINGS = {
  recallAlerts: true,
  refillReminders: true,
  newsletter: false,
};

function Section({ title, description, children, sx }) {
  return (
    <Card elevation={0} sx={{ bgcolor: 'background.paper', p: 3, mb: 2.5, ...sx }}>
      <Typography variant="h3" color="primary.main">{title}</Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{description}</Typography>
      )}
      {children}
    </Card>
  );
}

// settings: { recallAlerts, refillReminders, newsletter } — état dans App
// onChangeSettings(changes), onDeleteAccount()
export default function Settings({ settings = DEFAULT_SETTINGS, onChangeSettings, onDeleteAccount }) {
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [pwdError, setPwdError] = useState('');
  const [toast, setToast] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handlePwd = (field) => (e) => setPwd((p) => ({ ...p, [field]: e.target.value }));

  const handlePwdSubmit = (e) => {
    e.preventDefault();
    if (!pwd.current || !pwd.next || !pwd.confirm) {
      setPwdError('Tous les champs sont obligatoires.');
      return;
    }
    if (pwd.next.length < 8) {
      setPwdError('Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (pwd.next !== pwd.confirm) {
      setPwdError('La confirmation ne correspond pas.');
      return;
    }
    // TODO: appel API (PUT /user/password)
    setPwd({ current: '', next: '', confirm: '' });
    setPwdError('');
    setToast('Mot de passe modifié.');
  };

  return (
    <Container maxWidth="md" sx={{ pt: 6, pb: 8 }}>
      <Typography variant="h1" color="primary.main" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 4, textAlign: 'center' }}>
        Paramètres
      </Typography>

      <Section title="Notifications" description="Choisissez ce que Pharmalyse peut vous envoyer.">
        {NOTIFICATIONS.map(([key, label, hint], i) => (
          <Box key={key}>
            {i > 0 && <Divider />}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1.5 }}>
              <Box>
                <Typography id={`label-${key}`} fontWeight={600}>{label}</Typography>
                <Typography variant="caption">{hint}</Typography>
              </Box>
              <Switch
                color="primary"
                checked={Boolean(settings[key])}
                onChange={(e) => onChangeSettings?.({ [key]: e.target.checked })}
                slotProps={{ input: { 'aria-labelledby': `label-${key}` } }}
              />
            </Box>
          </Box>
        ))}
      </Section>

      <Section title="Mot de passe" description="Utilisez au moins 8 caractères.">
        <Box
          component="form"
          onSubmit={handlePwdSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 420 }}
        >
          {pwdError && <Alert severity="error">{pwdError}</Alert>}
          <TextField label="Mot de passe actuel" type="password" autoComplete="current-password" value={pwd.current} onChange={handlePwd('current')} />
          <TextField label="Nouveau mot de passe" type="password" autoComplete="new-password" value={pwd.next} onChange={handlePwd('next')} />
          <TextField label="Confirmer le nouveau mot de passe" type="password" autoComplete="new-password" value={pwd.confirm} onChange={handlePwd('confirm')} />
          <Box>
            <Button type="submit" variant="contained" color="primary">Changer le mot de passe</Button>
          </Box>
        </Box>
      </Section>

      <Section
        title="Supprimer mon compte"
        description="Cette action est définitive : vos favoris et vos informations seront effacés."
        sx={{ bgcolor: 'background.default', border: '1.5px solid', borderColor: 'error.main' }}
      >
        <Button variant="outlined" color="error" onClick={() => setConfirmDelete(true)}>
          Supprimer mon compte
        </Button>
      </Section>

      <Popup
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Supprimer votre compte ?"
        description="Vous serez déconnecté et toutes vos données seront supprimées. Cette action est irréversible."
        variant="danger"
        confirmLabel="Supprimer définitivement"
        onConfirm={() => {
          setConfirmDelete(false);
          onDeleteAccount?.();
        }}
      />

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToast('')}>{toast}</Alert>
      </Snackbar>
    </Container>
  );
}
