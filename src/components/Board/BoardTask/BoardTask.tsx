import React, { FC, useEffect, useState } from 'react';
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ITask } from '../../../types/ITask';
import { taskAPI } from '../../../services/taskAPI';
import useConfirmationModal from '../../../hooks/useConfirmationModal';
import styles from './BoardTask.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setColumnDragState, setTaskDragState } from '../../../store/reducers/draggingSlice';

interface IBoardTaskProps {
  taskData: ITask;
}

const BoardTask: FC<IBoardTaskProps> = ({
  taskData: { boardId, columnId, id, userId, title, order, description },
}) => {
  const [deleteTask] = taskAPI.useDeleteTaskMutation();
  const [updateTask] = taskAPI.useUpdateTaskMutation();
  const [updateTaskPosition] = taskAPI.useUpdateTaskPositionMutation();
  const { taskDragState, columnDragState } = useAppSelector((state) => state.dragging);
  const dispatch = useAppDispatch();

  const { confirmationModalElement, isAgree, openConfirmationModal } = useConfirmationModal('task');

  const [isTaskEditMode, setIsTaskEditMode] = useState(false);
  const [textFieldTitleValue, setTextFieldTitleValue] = useState(title);
  const [textFieldDescriptionValue, setTextFieldDescriptionValue] = useState(description);

  useEffect(() => {
    if (isAgree) {
      deleteTask({ boardId, columnId, taskId: id });
    }
  }, [isAgree, boardId, columnId, id, deleteTask]);

  const handleClickEditIcon = (): void => {
    setIsTaskEditMode(true);
  };

  const handleChangeTextFieldTitle = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextFieldTitleValue(e.target.value);
  };

  const handleChangeTextFieldDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextFieldDescriptionValue(e.target.value);
  };

  const approveTaskChange = (): void => {
    updateTask({
      boardId,
      columnId,
      userId,
      taskId: id,
      title: textFieldTitleValue,
      order,
      description: textFieldDescriptionValue,
    });
    setIsTaskEditMode(false);
  };

  const cancelTaskChange = (): void => {
    setIsTaskEditMode(false);
    setTextFieldTitleValue(title);
    setTextFieldDescriptionValue(description);
  };

  const handleClickDeleteIcon = (): void => {
    openConfirmationModal();
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      (e.target as HTMLDivElement).className.includes(styles.boardTask) &&
      taskDragState.state === true &&
      taskDragState.taskId !== id
    ) {
      (e.target as HTMLDivElement).classList.add(styles.onDragOver);
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove(styles.onDragOver);
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    boardColumn: string,
    boardTask: string
  ) => {
    e.stopPropagation();
    if (!taskDragState.state) {
      dispatch(
        setTaskDragState({
          state: true,
          columnId: boardColumn,
          taskId: boardTask,
          userId,
          title: textFieldTitleValue,
          description: textFieldDescriptionValue,
        })
      );
    }
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove(styles.onDragOver);
    dispatch(setTaskDragState({ state: false }));
  };

  const onDropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    boardColumn: string,
    boardTask: string,
    order: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLDivElement).classList.remove(styles.onDragOver);
    updateTaskPosition({
      boardId,
      columnId: taskDragState.columnId ?? '',
      taskId: taskDragState.taskId ?? '',
      userId: taskDragState.userId ?? '',
      title: taskDragState.title ?? '',
      description: taskDragState.description ?? '',
      order,
      newColumnId: boardColumn,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.2,
        m: 1,
        p: 1,
        border: '0',
        padding: '0',
        borderRadius: 1,
        order,
        opacity: taskDragState?.taskId === id ? 0.5 : 1,
      }}
      draggable={true}
      onDragOver={(e) => {
        dragOverHandler(e);
      }}
      onDragLeave={(e) => {
        dragLeaveHandler(e);
      }}
      onDragEnter={(e) => {
        dragStartHandler(e, columnId, id);
      }}
      onDragEnd={(e) => {
        dragEndHandler(e);
      }}
      onDrop={(e) => {
        onDropHandler(e, columnId, id, order);
      }}
      className={`${styles.boardTask} ${taskDragState.state ? styles.onDragging : ''}`}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.2,
          m: 1,
          p: 1,
          border: '1px solid rgba(25, 118, 210, 0.5)',
          borderRadius: 1,
          margin: '0',
        }}
      >
        {isTaskEditMode ? (
          <>
            <TextField
              size="small"
              value={textFieldTitleValue}
              fullWidth
              onChange={handleChangeTextFieldTitle}
            />

            <TextField
              multiline
              value={textFieldDescriptionValue}
              fullWidth
              onChange={handleChangeTextFieldDescription}
            />
          </>
        ) : (
          <>
            <Typography variant="body1" component="h3">
              {title}
            </Typography>

            <Typography variant="body2">{description}</Typography>
          </>
        )}
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          {isTaskEditMode ? (
            <>
              <IconButton size="small" onClick={approveTaskChange}>
                <DoneOutlinedIcon />
              </IconButton>

              <IconButton size="small" onClick={cancelTaskChange}>
                <ClearOutlinedIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton size="small" onClick={handleClickEditIcon}>
                <EditOutlinedIcon />
              </IconButton>

              <IconButton size="small" onClick={handleClickDeleteIcon}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </>
          )}
        </Stack>
      </Box>

      {confirmationModalElement}
    </Box>
  );
};

export default BoardTask;
