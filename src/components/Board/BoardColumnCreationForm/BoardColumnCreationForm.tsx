import { FC, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { columnAPI } from '../../../services/columnAPI';

interface BoardColumnCreationFormProps {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardColumnCreationForm: FC<BoardColumnCreationFormProps> = ({
  isFormOpen,
  setIsFormOpen,
}) => {
  const { boardId = '' } = useParams();
  const [createColumn, {}] = columnAPI.useCreateColumnMutation();
  const [title, setTitle] = useState('');

  const handleCloseModal = (): void => {
    setIsFormOpen(false);
  };

  const handleClickDisagreeButton = (): void => {
    setIsFormOpen(false);
  };

  const handleClickAgreeButton = (): void => {
    createColumn({ boardId, title });
    setIsFormOpen(false);
  };

  return (
    <Dialog
      open={isFormOpen}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Create column'}</DialogTitle>

      <DialogContent>
        <Box m={1} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClickDisagreeButton}>Disagree</Button>
        <Button onClick={handleClickAgreeButton}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardColumnCreationForm;
