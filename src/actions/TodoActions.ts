import { TODO_ACTIONS } from "../constants";
import { ITodoAddAction, ITodoAddChildAction, ITodoDeleteAction, ITodoItem } from "../interfaces";

export const addTodo = (todo: ITodoItem): ITodoAddAction => ({
  type: TODO_ACTIONS.ADD,
  payload: todo
});

export const deleteTodo = (id: string | number): ITodoDeleteAction => ({
  type: TODO_ACTIONS.DELETE,
  payload: id
});

export const addChildTodo = (parentId: number | string, childTodo:ITodoItem): ITodoAddChildAction => ({
  type: TODO_ACTIONS.ADD_CHILD,
  payload: {parentId, childTodo}
})
