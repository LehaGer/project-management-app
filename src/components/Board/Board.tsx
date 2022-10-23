import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { responseError } from '../../types/interfaces';
import { columnAPI } from '../../services/columnAPI';
import BoardColumn from './BoardColumn/BoardColumn';
import Spinner from '../Spinner/Spinner';
import BoardColumnCreationForm from './BoardColumnCreationForm/BoardColumnCreationForm';
import useErrorHandler from '../../hooks/useErrorHandler';

const Board: FC = () => {
  const { boardId = '' } = useParams();
  const { data: allColumns, isLoading, isError, error } = columnAPI.useGetAllColumnsQuery(boardId);
  const { errorAlertsElement, submitError } = useErrorHandler();
  const [isBoardCreationFormOpen, setIsBoardCreationFormOpen] = useState(false);

  useEffect(() => {
    if (error) {
      submitError(error as responseError);
    }
  }, [error, submitError]);

  const handleClickButton = () => {
    setIsBoardCreationFormOpen(true);
  };

  const columnsElement = allColumns?.map((column) => {
    const { id, title, order } = column;

    return (
      <BoardColumn key={id} boardId={boardId} columnId={column.id} title={title} order={order} />
    );
  });

  if (isError) {
    return (
      <>
        <Typography>An error has occurred!</Typography>
        {errorAlertsElement}
      </>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        columnGap: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        m: 2,
      }}
    >
      {columnsElement}

      <Button
        sx={{
          alignSelf: 'start',
          flexShrink: 0,
          order: (allColumns?.length || 0) + 1,
          marginBottom: 2,
        }}
        variant="outlined"
        onClick={handleClickButton}
      >
        add column
      </Button>

      {isBoardCreationFormOpen && (
        <BoardColumnCreationForm
          isFormOpen={isBoardCreationFormOpen}
          setIsFormOpen={setIsBoardCreationFormOpen}
        />
      )}
    </Box>
  );
};

export default Board;
