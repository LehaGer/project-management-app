import { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Modal from '../Modal/Modal';

interface IConfirmationModalProps {
  title: string;
  isConfirmationModalOpen: boolean;
  setIsConfirmationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAgree: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationModal: FC<IConfirmationModalProps> = ({
  title,
  isConfirmationModalOpen,
  setIsConfirmationModalOpen,
  setIsAgree,
}) => {
  const handleCloseModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleClickDisagreeButton = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleClickAgreeButton = () => {
    setIsAgree(true);
    setIsConfirmationModalOpen(false);
  };

  return (
    <Modal>
      <Dialog
        open={isConfirmationModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete the {title}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This {title} will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDisagreeButton}>Disagree</Button>
          <Button onClick={handleClickAgreeButton}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Modal>
  );
};

export default ConfirmationModal;
