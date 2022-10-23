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
import { taskAPI } from '../../../services/taskAPI';
import { useAppSelector } from '../../../hooks/redux';

interface BoardTaskCreationFormProps {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columnId: string;
}

const BoardTaskCreationForm: FC<BoardTaskCreationFormProps> = ({
  isFormOpen,
  setIsFormOpen,
  columnId,
}) => {
  const { boardId = '' } = useParams();
  const [createTask, {}] = taskAPI.useCreateTaskMutation();
  const { userId } = useAppSelector((state) => state.basis);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCloseModal = (): void => {
    setIsFormOpen(false);
  };

  const handleClickDisagreeButton = (): void => {
    setIsFormOpen(false);
  };

  const handleClickAgreeButton = (): void => {
    createTask({ boardId, columnId, title, description, userId });
    setIsFormOpen(false);
  };

  return (
    <Dialog
      open={isFormOpen}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Create task'}</DialogTitle>

      <DialogContent>
        <Box m={1} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default BoardTaskCreationForm;
