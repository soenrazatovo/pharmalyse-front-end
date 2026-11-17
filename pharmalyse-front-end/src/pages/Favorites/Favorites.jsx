import { useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import Popup from '../../components/Popup/Popup.jsx';
import { CATALOG } from '../../data/favorites';

// favorites: [{ id, category, name, note, recall }]
// onAdd(medication) / onRemove(id) / onUpdateNote(id, note) / onRestore(favorite)
export default function Favorites({ favorites, onAdd, onRemove, onUpdateNote, onRestore }) {
  const [query, setQuery] = useState('');
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null); // { id, name, note }
  const [removed, setRemoved] = useState([]); // derniers favoris retirés (pour annuler)
  const [selectMode, setSelectMode] = useState(false);
  const [picked, setPicked] = useState([]); // ids cochés en mode sélection
  const [confirmBulk, setConfirmBulk] = useState(false);
  const [toDelete, setToDelete] = useState(null); // favori en attente de confirmation

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return favorites;
    return favorites.filter((f) => `${f.name} ${f.category} ${f.note}`.toLowerCase().includes(q));
  }, [favorites, query]);

  // Médicaments du catalogue pas encore en favoris
  const available = CATALOG.filter((m) => !favorites.some((f) => f.id === m.id));
  const recallCount = favorites.filter((f) => f.recall).length;

  const handleAdd = () => {
    if (!selected) return;
    onAdd?.(selected);
    setSelected(null);
    setAdding(false);
  };

  const handleRemove = (fav) => {
    onRemove?.(fav.id);
    setRemoved([fav]);
  };

  const handleUndo = () => {
    removed.forEach((f) => onRestore?.(f));
    setRemoved([]);
  };

  const exitSelectMode = () => {
    setSelectMode(false);
    setPicked([]);
  };

  const togglePick = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const allVisiblePicked = filtered.length > 0 && filtered.every((f) => picked.includes(f.id));
  const toggleAll = () =>
    setPicked(
      allVisiblePicked
        ? picked.filter((id) => !filtered.some((f) => f.id === id))
        : [...new Set([...picked, ...filtered.map((f) => f.id)])]
    );

  const handleBulkRemove = () => {
    const toRemove = favorites.filter((f) => picked.includes(f.id));
    toRemove.forEach((f) => onRemove?.(f.id));
    setRemoved(toRemove);
    setConfirmBulk(false);
    exitSelectMode();
  };

  const handleSaveNote = () => {
    onUpdateNote?.(editing.id, editing.note.trim());
    setEditing(null);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h1" color="primary.main" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1 }}>Mes favoris</Typography>
        <Typography variant="body2" color="text.secondary">
          {favorites.length} médicament{favorites.length > 1 ? 's' : ''} suivi{favorites.length > 1 ? 's' : ''}
          {recallCount > 0 && ` · ${recallCount} rappel${recallCount > 1 ? 's' : ''} en cours`}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <TextField
          size="small"
          type="search"
          placeholder="Filtrer mes favoris…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ flex: 1, minWidth: 220, maxWidth: 420, '& fieldset': { border: 'none' } }}
          InputProps={{
            sx: { borderRadius: 999, bgcolor: 'background.paper' },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
          inputProps={{ 'aria-label': 'Filtrer mes favoris' }}
        />
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => (selectMode ? exitSelectMode() : setSelectMode(true))}
            disabled={favorites.length === 0}
          >
            {selectMode ? 'Terminer' : 'Sélectionner'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setAdding(true)}
            disabled={available.length === 0}
          >
            Ajouter un favori
          </Button>
        </Box>
      </Box>

      {selectMode && (
        <Box
          sx={{
            display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap',
            bgcolor: 'primary.main', color: 'background.default', borderRadius: 3, px: 2, py: 1, mb: 3,
          }}
        >
          <Checkbox
            checked={allVisiblePicked}
            indeterminate={picked.length > 0 && !allVisiblePicked}
            onChange={toggleAll}
            disabled={filtered.length === 0}
            sx={{ color: 'secondary.main', '&.Mui-checked, &.MuiCheckbox-indeterminate': { color: 'secondary.main' } }}
            slotProps={{ input: { 'aria-label': 'Tout sélectionner' } }}
          />
          <Typography sx={{ flex: 1, fontWeight: 600 }}>
            {picked.length === 0 ? 'Aucun favori sélectionné' : `${picked.length} sélectionné${picked.length > 1 ? 's' : ''}`}
          </Typography>
          <Button
            startIcon={<DeleteOutlineIcon />}
            disabled={picked.length === 0}
            onClick={() => setConfirmBulk(true)}
            sx={{ bgcolor: 'secondary.main', color: 'primary.main', '&.Mui-disabled': { opacity: 0.5, color: 'primary.main' } }}
          >
            Supprimer
          </Button>
        </Box>
      )}


      {filtered.length === 0 ? (
        <Card elevation={0} sx={{ bgcolor: 'background.paper', p: 4, textAlign: 'center' }}>
          <Typography variant="h3" color="primary.main" gutterBottom>
            {favorites.length === 0 ? 'Aucun favori pour le moment' : 'Aucun résultat'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {favorites.length === 0
              ? 'Ajoutez les médicaments que vous prenez pour suivre les rappels de lot.'
              : 'Essayez avec un autre mot-clé.'}
          </Typography>
        </Card>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {filtered.map((m) => (
            <Card
              key={m.id}
              elevation={0}
              onClick={selectMode ? () => togglePick(m.id) : undefined}
              sx={{
                bgcolor: m.recall ? 'background.default' : 'background.paper',
                border: m.recall || picked.includes(m.id) ? '1.5px solid' : 'none',
                borderColor: 'primary.main',
                outline: picked.includes(m.id) ? '3px solid' : 'none',
                outlineColor: 'secondary.main',
                p: 2.25,
                position: 'relative',
                cursor: selectMode ? 'pointer' : 'default',
              }}
            >
              {selectMode ? (
                <Checkbox
                  size="small"
                  checked={picked.includes(m.id)}
                  onChange={() => togglePick(m.id)}
                  onClick={(e) => e.stopPropagation()}
                  color="primary"
                  sx={{ position: 'absolute', top: 6, right: 6 }}
                  slotProps={{ input: { 'aria-label': `Sélectionner ${m.name}` } }}
                />
              ) : null}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1, pr: 4 }}>
                <Chip label={m.category} size="small" sx={{ bgcolor: 'primary.main', color: 'background.default' }} />
                {m.recall && <Chip label="Rappel de lot" size="small" sx={{ bgcolor: 'secondary.main', color: 'primary.main' }} />}
              </Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 0.5 }}>{m.name}</Typography>
              <Typography variant="caption" component="p" sx={{ minHeight: '1.5em' }}>
                {m.note || 'Aucune note'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mt: 1 }}>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<EditOutlinedIcon fontSize="small" />}
                  onClick={() => setEditing({ id: m.id, name: m.name, note: m.note ?? '' })}
                  disabled={selectMode}
                  sx={{ px: 0 }}
                >
                  Modifier la note
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteOutlineIcon fontSize="small" />}
                  onClick={() => setToDelete(m)}
                  disabled={selectMode}
                  aria-label={`Supprimer ${m.name} des favoris`}
                  sx={{ px: 1 }}
                >
                  Supprimer
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}

      {/* Ajout */}
      <Popup
        open={adding}
        onClose={() => setAdding(false)}
        title="Ajouter un favori"
        confirmLabel="Ajouter"
        onConfirm={handleAdd}
        confirmDisabled={!selected}
      >
        <Autocomplete
          options={available}
          value={selected}
          onChange={(_, v) => setSelected(v)}
          getOptionLabel={(o) => o.name}
          groupBy={(o) => o.category}
          noOptionsText="Aucun médicament trouvé"
          renderInput={(params) => <TextField {...params} label="Rechercher un médicament" autoFocus />}
        />
      </Popup>

      {/* Suppression d'un favori */}
      <Popup
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title="Supprimer ce favori ?"
        description={`${toDelete?.name ?? ''} ne sera plus suivi pour les rappels de lot. Vous pourrez annuler juste après.`}
        variant="danger"
        confirmLabel="Supprimer"
        onConfirm={() => {
          handleRemove(toDelete);
          setToDelete(null);
        }}
      />

      {/* Suppression multiple */}
      <Popup
        open={confirmBulk}
        onClose={() => setConfirmBulk(false)}
        title={`Supprimer ${picked.length} favori${picked.length > 1 ? 's' : ''} ?`}
        description="Ils ne seront plus suivis pour les rappels de lot. Vous pourrez annuler juste après."
        variant="danger"
        confirmLabel="Supprimer"
        onConfirm={handleBulkRemove}
      />

      {/* Note */}
      <Popup
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={editing?.name}
        asForm
        confirmLabel="Enregistrer"
        onConfirm={handleSaveNote}
      >
        <TextField
          label="Note personnelle"
          value={editing?.note ?? ''}
          onChange={(e) => setEditing((s) => ({ ...s, note: e.target.value }))}
          fullWidth
          multiline
          minRows={2}
          autoFocus
        />
      </Popup>

      {/* Annulation du retrait */}
      <Snackbar
        open={removed.length > 0}
        autoHideDuration={5000}
        onClose={(_, reason) => reason !== 'clickaway' && setRemoved([])}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="info"
          onClose={() => setRemoved([])}
          action={<Button size="small" color="inherit" onClick={handleUndo}>Annuler</Button>}
        >
          {removed.length === 1 ? `${removed[0].name} retiré des favoris.` : `${removed.length} favoris retirés.`}
        </Alert>
      </Snackbar>
    </Container>
  );
}
