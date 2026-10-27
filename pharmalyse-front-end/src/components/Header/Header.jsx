import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

// isLoggedIn: bool — affiche l'avatar user ou le lien "Mon espace"
// userInitials: ex. "CM", utilisé seulement si isLoggedIn
export default function Header({ isLoggedIn, userInitials = '??' }) {
  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar sx={{ gap: 3, py: 1.5, flexWrap: 'wrap' }}>
        <Typography
          variant="h3"
          component="span"
          sx={{ color: 'background.default', letterSpacing: '-0.01em' }}
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
            <Avatar sx={{ bgcolor: 'secondary.main', color: 'primary.main', fontWeight: 700 }}>
              {userInitials}
            </Avatar>
          ) : (
            <Button href="#" sx={{ color: 'secondary.light' }}>
              Mon espace
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}