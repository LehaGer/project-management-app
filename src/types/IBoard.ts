export interface IBoard {
  id: string;
  title: string;
  description: string;
  columns?: [];
}

export interface ICreateBoardDto {
  title: string;
  description: string;
}

export interface IUpdateBoardDto {
  title: string;
  description: string;
}
