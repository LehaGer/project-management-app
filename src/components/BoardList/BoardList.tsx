import React, { useState } from 'react';
import { Divider, LinearProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { boardAPI } from '../../services/boardAPI';
import { IBoard } from '../../types/IBoard';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import Spinner from '../Spinner/Spinner';

const BoardList: React.FC = () => {
  const { data, isLoading, isFetching, isError } = boardAPI.useGetAllBoardsQuery();
  const [deleteBoard, {}] = boardAPI.useDeleteBoardMutation();

  const navigate = useNavigate();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [idSelectedBoard, setIdSelectedBoard] = useState('');

  const navigateToBoard = (boardId: string): void => {
    navigate(`board/${boardId}`);
  };

  const handleClickDeleteIcon = (boardId: string): void => {
    setIdSelectedBoard(boardId);
    setIsConfirmationModalOpen(true);
  };

  const deleteSelectedBoard = (): void => {
    deleteBoard(idSelectedBoard);
  };

  const allBoardsElement = data?.map((board: IBoard, index) => {
    const { id, title, description } = board;

    return (
      <React.Fragment key={id}>
        {index !== 0 && <Divider variant="middle" />}
        <ListItem>
          <ListItemText
            primary={title}
            secondary={description}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigateToBoard(id)}
          />
          <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleClickDeleteIcon(id)} />
        </ListItem>
      </React.Fragment>
    );
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {isError && <Typography>An error has occurred!</Typography>}
      <ConfirmationModal
        isConfirmationModalOpen={isConfirmationModalOpen}
        setIsConfirmationModalOpen={setIsConfirmationModalOpen}
        deleteItem={deleteSelectedBoard}
      />
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
    </div>
  );
};

export default BoardList;
