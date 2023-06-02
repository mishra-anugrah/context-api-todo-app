import React from "react";

export type ITodoAddAction = { type: string; payload: ITodoItem };
export type ITodoDeleteAction = { type: string; payload: string | number };
export type ITodoAddChildAction = {type: string; payload: {parentId: number | string, childTodo: ITodoItem}}
export type ITodoDeleteChildAction = {type: string, payload: {parentId: number | string; childId: number | string}}

export type IAuthAction = 
  | {type: 'SIGN_IN', payload: {token: string}} 
  | {type: 'SIGN_OUT'};

export interface ITodoItem {
  id: string;
  title: string;
  active: boolean;
  children?: [] | ITodoItem[];
}

export interface ITodoState {
  todos: void[] | ITodoItem[];
}

export interface ITodoContextModel {
  state: ITodoState;
  dispatch: React.Dispatch<ITodoAddAction | ITodoDeleteAction | ITodoAddChildAction | ITodoDeleteChildAction>;
}

export interface IAuthContextModel {
  state: IAuthContextState;
  dispatch: React.Dispatch<IAuthAction>;
}

export interface IAuthContextState {
  isAuth: boolean,
  token: string
  // userInfo: {
  //   userName: string,
  // }
}
