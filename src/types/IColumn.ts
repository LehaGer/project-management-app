export interface IColumns {
  id: string;
  title: string;
  order: number;
}

export interface IColumn extends IColumns {
  tasks: [];
}

export interface ICreateColumnDto {
  title: string;
}

export interface IUpdateColumnDto {
  title: string;
  order: number;
}
