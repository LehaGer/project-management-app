import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { responseError } from '../../types/interfaces';
import { boardAPI } from '../../services/boardAPI';
import { IBoard } from '../../types/IBoard';
import { useNavigate } from 'react-router-dom';
import useConfirmationModal from '../../hooks/useConfirmationModal';
import Spinner from '../Spinner/Spinner';
import useErrorHandler from '../../hooks/useErrorHandler';

const BoardList: React.FC = () => {
  const { data, isLoading, isFetching, isError, error } = boardAPI.useGetAllBoardsQuery();
  const [deleteBoard, {}] = boardAPI.useDeleteBoardMutation();
  const { confirmationModalElement, isAgree, openConfirmationModal } =
    useConfirmationModal('board');
  const { errorAlertsElement, submitError } = useErrorHandler();
  const navigate = useNavigate();

  const [idSelectedBoard, setIdSelectedBoard] = useState('');

  useEffect(() => {
    if (error) {
      submitError(error as responseError);
    }
  }, [error, submitError]);

  useEffect(() => {
    if (isAgree) {
      deleteBoard(idSelectedBoard);
    }
  }, [isAgree, deleteBoard, idSelectedBoard]);

  const navigateToBoard = (boardId: string): void => {
    navigate(`board/${boardId}`);
  };

  const handleClickDeleteIcon = (boardId: string): void => {
    setIdSelectedBoard(boardId);
    openConfirmationModal();
  };

  const allBoardsElement = data?.map((board: IBoard, index) => {
    const { id, title, description } = board;

    return (
      <React.Fragment key={id}>
        {index !== 0 && <Divider variant="middle" />}
        <ListItem>
          <ListItemButton onClick={() => navigateToBoard(id)}>
            <ListItemText primary={title} secondary={description} />
          </ListItemButton>

          <IconButton onClick={() => handleClickDeleteIcon(id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      </React.Fragment>
    );
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      {isError && <Typography>An error has occurred!</Typography>}

      {allBoardsElement?.length !== 0 && (
        <List
          sx={{
            width: '100%',
            maxWidth: '500px',
            bgcolor: 'background.paper',
            borderRadius: 2,
            marginBottom: 2,
          }}
        >
          {allBoardsElement}
          {isFetching && <LinearProgress />}
        </List>
      )}

      {errorAlertsElement}
      {confirmationModalElement}
    </Box>
  );
};

export default BoardList;
