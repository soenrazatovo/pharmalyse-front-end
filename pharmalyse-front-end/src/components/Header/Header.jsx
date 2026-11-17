import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup.jsx';

// isLoggedIn: bool — affiche l'avatar user ou le lien "Mon espace"
// userInitials: ex. "CM", utilisé seulement si isLoggedIn
// onLogout: appelé au clic sur "Déconnexion"
export default function Header({ isLoggedIn, userInitials = '??', onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const closeMenu = () => setAnchorEl(null);
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  // Le menu se ferme, puis on demande confirmation avant de déconnecter
  const handleLogoutClick = () => {
    closeMenu();
    setConfirmLogout(true);
  };

  const handleLogoutConfirm = () => {
    setConfirmLogout(false);
    onLogout?.();
    navigate('/');
  };

  return (
    <AppBar position="static" elevation={0} color="primary">
      <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ gap: 3, py: 1.5, flexWrap: 'wrap' }}>
        <Typography
          variant="h3"
          component={RouterLink}
          to="/"
          aria-label="Pharmalyse, retour à l'accueil"
          sx={{
            color: 'background.default',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Pharmalyse
        </Typography>

        <Box
          component="form"
          role="search"
          onSubmit={(e) => e.preventDefault()}
          sx={{ flex: 1, minWidth: 220 }}
        >
          <TextField
            id="search-med"
            type="search"
            fullWidth
            size="small"
            placeholder="Doliprane, ibuprofène, amoxicilline…"
            aria-label="Rechercher un médicament"
            sx={{
              bgcolor: 'background.default',
              borderRadius: 999,
              '& fieldset': { border: 'none' },
            }}
            InputProps={{
              sx: { borderRadius: 999 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button href="#" sx={{ color: 'secondary.light' }}>
            Pharmacies
          </Button>

          {isLoggedIn ? (
            <>
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-label="Menu utilisateur"
                aria-haspopup="menu"
                aria-expanded={open ? 'true' : undefined}
                aria-controls={open ? 'user-menu' : undefined}
                sx={{ p: 0 }}
              >
                <Avatar sx={{ bgcolor: 'secondary.main', color: 'primary.main', fontWeight: 700 }}>
                  {userInitials}
                </Avatar>
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={closeMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{ paper: { sx: { mt: 1, minWidth: 200, borderRadius: 2 } } }}
              >
                <MenuItem component={RouterLink} to="/profil" onClick={closeMenu}>
                  <ListItemIcon><PersonOutlineIcon fontSize="small" /></ListItemIcon>
                  Mon Profil
                </MenuItem>
                <MenuItem component={RouterLink} to="/favoris" onClick={closeMenu}>
                  <ListItemIcon><FavoriteBorderIcon fontSize="small" /></ListItemIcon>
                  Mes favoris
                </MenuItem>
                <MenuItem component={RouterLink} to="/parametres" onClick={closeMenu}>
                  <ListItemIcon><SettingsOutlinedIcon fontSize="small" /></ListItemIcon>
                  Paramètres
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                  Déconnexion
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={RouterLink} to="/login" sx={{ color: 'secondary.light' }}>
              Mon espace
            </Button>
          )}
        </Box>
      </Toolbar>
      </Container>

      <Popup
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        title="Se déconnecter ?"
        description="Vous devrez vous reconnecter pour retrouver vos favoris et vos alertes."
        confirmLabel="Se déconnecter"
        onConfirm={handleLogoutConfirm}
      />
    </AppBar>
  );
}