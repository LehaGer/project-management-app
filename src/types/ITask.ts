export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: [];
}

export interface ICreateTaskDto {
  title: string;
  description: string;
  userId: string;
}

export interface IUpdateTaskDto {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
