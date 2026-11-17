import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

/**
 * Pop-up réutilisable.
 *
 * Props :
 * - open, onClose        : contrôle d'affichage
 * - title                : titre
 * - description          : texte simple sous le titre (ex. message de confirmation)
 * - children             : contenu libre (champs de formulaire, liste…)
 * - error                : message d'erreur affiché en haut du contenu
 * - variant              : 'default' | 'danger' (couleur du bouton principal)
 * - confirmLabel         : libellé du bouton principal (défaut « Confirmer »)
 * - cancelLabel          : libellé du bouton secondaire (défaut « Annuler »)
 * - onConfirm            : action du bouton principal. Absent → pas de bouton principal
 * - confirmDisabled      : désactive le bouton principal
 * - hideCancel           : masque le bouton secondaire
 * - asForm               : enveloppe le contenu dans un <form> ; Entrée / bouton principal soumettent
 * - actions              : remplace entièrement la zone de boutons
 * - maxWidth             : 'xs' | 'sm' | 'md' … (défaut 'xs')
 *
 * Exemples :
 *   <Popup open title="Supprimer ?" description="Irréversible." variant="danger"
 *          confirmLabel="Supprimer" onConfirm={...} onClose={...} />
 *
 *   <Popup open asForm title="Modifier" onConfirm={save} onClose={close} error={err}>
 *     <TextField ... />
 *   </Popup>
 */
export default function Popup({
  open,
  onClose,
  title,
  description,
  children,
  error,
  variant = 'default',
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  onConfirm,
  confirmDisabled = false,
  hideCancel = false,
  asForm = false,
  actions,
  maxWidth = 'xs',
}) {
  const danger = variant === 'danger';

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm?.();
  };

  const body = (
    <>
      {title && (
        <DialogTitle sx={{ color: danger ? 'error.main' : 'primary.main', fontWeight: 700 }}>
          {title}
        </DialogTitle>
      )}
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '8px !important' }}>
        {error && <Alert severity="error">{error}</Alert>}
        {description && <DialogContentText>{description}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {actions ?? (
          <>
            {!hideCancel && (
              <Button color="primary" onClick={onClose}>{cancelLabel}</Button>
            )}
            {onConfirm && (
              <Button
                type={asForm ? 'submit' : 'button'}
                variant="contained"
                color={danger ? 'error' : 'primary'}
                onClick={asForm ? undefined : onConfirm}
                disabled={confirmDisabled}
              >
                {confirmLabel}
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      {asForm ? (
        <Box component="form" onSubmit={handleSubmit} noValidate>{body}</Box>
      ) : (
        body
      )}
    </Dialog>
  );
}
