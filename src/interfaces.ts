import React from "react";


export type IAuthSignInAction =  {type: string, payload: {token: string}};
export type IAuthSignOutAction =  {type: string};

export type IAuthAction = IAuthSignInAction | IAuthSignOutAction;

export interface IAuthContextModel {
  state: IAuthContextState;
  dispatch: React.Dispatch<IAuthAction>;
}

export interface IAuthContextState {
  isAuth: boolean,
  token: string
}

export interface ITodoAddAction { type: string; payload: ITodoItem };
export interface ITodoDeleteAction { type: string; payload: string | number };
export interface ITodoAddChildAction {type: string; payload: {parentId: number | string, childTodo: ITodoItem}}
export interface ITodoDeleteChildAction {type: string, payload: {parentId: number | string; childId: number | string}}

export interface ITodoItem {
  id: string;
  title: string;
  active: boolean;
  children?:  ITodoItem[];
}

export interface ITodoState {
  todos: ITodoItem[];
}

export interface ITodoContextModel {
  state: ITodoState;
  dispatch: React.Dispatch<ITodoAddAction | ITodoDeleteAction | ITodoAddChildAction | ITodoDeleteChildAction>;
}

// export const isAddingNewChild = (action: unknown) : action is ITodoAddChildAction => {

//   if (!action
//     || typeof action !== 'object'
//     || typeof action.type !== 'string'
//     || action.payload
//     ) return false;

//   return true;
// }
