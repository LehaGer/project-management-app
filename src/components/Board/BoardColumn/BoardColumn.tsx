import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  List,
  TextField,
  Typography,
} from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { taskAPI } from '../../../services/taskAPI';
import { columnAPI } from '../../../services/columnAPI';
import useConfirmationModal from '../../../hooks/useConfirmationModal';
import BoardTaskCreationForm from '../BoardTaskCreationForm/BoardTaskCreationForm';
import BoardTask from '../BoardTask/BoardTask';
import styles from './BoardColumn.module.css';
import { setColumnDragState, setTaskDragState } from '../../../store/reducers/draggingSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

interface IBoardColumnProps {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
}

const BoardColumn: FC<IBoardColumnProps> = ({ boardId, columnId, title, order }) => {
  const { data: allTasks, isLoading, isError } = taskAPI.useGetAllTasksQuery({ boardId, columnId });
  const [deleteColumn] = columnAPI.useDeleteColumnMutation();
  const [updateColumn] = columnAPI.useUpdateColumnMutation();
  const [updateTaskPosition] = taskAPI.useUpdateTaskPositionMutation();
  const { columnDragState, taskDragState } = useAppSelector((state) => state.dragging);
  const dispatch = useAppDispatch();

  const { confirmationModalElement, isAgree, openConfirmationModal } =
    useConfirmationModal('column');
  const [isBoardTaskCreationFormOpen, setIsBoardTaskCreationFormOpen] = useState(false);

  const [isTitleEditMode, setIsTitleEditMode] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState(title);

  useEffect(() => {
    if (isAgree) {
      deleteColumn({ boardId, columnId });
    }
  }, [isAgree, boardId, columnId, deleteColumn]);

  const handleClickTitle = (): void => {
    setIsTitleEditMode(true);
  };

  const handleChangeTextFieldTitle = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextFieldValue(e.target.value);
  };

  const approveTitleChange = (): void => {
    updateColumn({ boardId, columnId, title: textFieldValue, order });
    setIsTitleEditMode(false);
  };

  const cancelTitleChange = (): void => {
    setIsTitleEditMode(false);
    setTextFieldValue(title);
  };

  const handleClickDeleteIcon = (): void => {
    openConfirmationModal();
  };

  const openBoardTaskCreationForm = (): void => {
    setIsBoardTaskCreationFormOpen(true);
  };

  const allTasksElement = allTasks?.map((task) => {
    const { id } = task;

    return <BoardTask key={id} taskData={task} />;
  });

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      (e.target as HTMLDivElement).className.includes(styles.boardColumn) &&
      columnDragState.state &&
      columnDragState.columnId !== columnId
    ) {
      (e.target as HTMLDivElement).classList.add(styles.onDragOver);
      (e.target as HTMLDivElement).classList.add(
        columnDragState?.order && columnDragState?.order > order
          ? styles.onDragOverLess
          : styles.onDragOverMore
      );
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove(styles.onDragOver);
    (e.target as HTMLDivElement).classList.remove(styles.onDragOverLess);
    (e.target as HTMLDivElement).classList.remove(styles.onDragOverMore);
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    boardColumn: string,
    title: string
  ) => {
    e.stopPropagation();
    if (!taskDragState.state && !columnDragState.state) {
      dispatch(
        setColumnDragState({
          state: true,
          columnId: boardColumn,
          title: title,
          order,
        })
      );
    }
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove(styles.onDragOver);
    (e.target as HTMLDivElement).classList.remove(styles.onDragOverLess);
    (e.target as HTMLDivElement).classList.remove(styles.onDragOverMore);
    dispatch(setColumnDragState({ state: false }));
  };

  const onDropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    boardColumn: string,
    order: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove(styles.onDragOver);
    (e.target as HTMLDivElement).classList.remove(styles.onDragOverLess);
    (e.target as HTMLDivElement).classList.remove(styles.onDragOverMore);
    if (taskDragState.state) {
      updateTaskPosition({
        boardId,
        columnId: taskDragState.columnId ?? '',
        taskId: taskDragState.taskId ?? '',
        userId: taskDragState.userId ?? '',
        title: taskDragState.title ?? '',
        description: taskDragState.description ?? '',
        order: allTasks?.length ? Math.max(...allTasks.map((task) => task.order)) + 1 : 1,
        newColumnId: boardColumn,
      });
    }
    if (columnDragState.state) {
      updateColumn({
        boardId,
        columnId: columnDragState.columnId ?? '',
        title: columnDragState.title ?? '',
        order,
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '280px',
        order,
        opacity: columnDragState?.columnId === columnId ? 0.5 : 1,
      }}
      draggable={!taskDragState.state}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragEnter={(e) => dragStartHandler(e, columnId, title)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDrop={(e) => onDropHandler(e, columnId, order)}
      className={`${styles.boardColumn} ${columnDragState.state ? styles.onDragging : ''}`}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          backgroundColor: '#fff',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isTitleEditMode ? (
            <>
              <TextField
                size="small"
                value={textFieldValue}
                onChange={handleChangeTextFieldTitle}
              />

              <IconButton onClick={approveTitleChange}>
                <DoneOutlinedIcon />
              </IconButton>

              <IconButton onClick={cancelTitleChange}>
                <ClearOutlinedIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Typography variant="h6" component="h2" p={1} onClick={handleClickTitle}>
                {`${title} (${order})`}
              </Typography>

              <IconButton onClick={handleClickDeleteIcon}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>

        <Divider />

        <Box sx={{ position: 'relative', flexGrow: '1', overflowY: 'auto' }}>
          <List sx={{ display: 'flex', flexDirection: 'column' }}>
            {isLoading && <LinearProgress />}
            {isError && <Typography p={1}>An error has occurred!</Typography>}
            {allTasksElement}
          </List>
        </Box>

        <Divider />

        <Button variant="text" onClick={openBoardTaskCreationForm}>
          add task
        </Button>

        {isBoardTaskCreationFormOpen && (
          <BoardTaskCreationForm
            isFormOpen={isBoardTaskCreationFormOpen}
            setIsFormOpen={setIsBoardTaskCreationFormOpen}
            columnId={columnId}
          />
        )}
      </Box>

      {confirmationModalElement}
    </Box>
  );
};

export default BoardColumn;
