import { useReducer, createContext } from "react";
import {
  ITodoAddAction,
  ITodoDeleteAction,
  ITodoState,
  ITodoContextModel,
  ITodoAddChildAction,
  ITodoDeleteChildAction,
} from "../interfaces";
import { ITodoItem } from "../interfaces";
import { TODO_ACTIONS } from "../constants";

const defaultState: ITodoState = {
  todos: [],
};

const reducer = (
  state: ITodoState,
  action:
    | ITodoAddAction
    | ITodoDeleteAction
    | ITodoAddChildAction
    | ITodoDeleteChildAction
): ITodoState => {
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case TODO_ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter(
          (item: ITodoItem) => item.id !== action.payload
        ),
      };

    case TODO_ACTIONS.ADD_CHILD:
      const newTodos = [...state.todos].map((parentTodo: ITodoItem) => {
        if (parentTodo.id === action.payload.parentId) {
          parentTodo.children.push(action.payload.childTodo);
        }
        return parentTodo;
      });

      return {
        ...state,
        todos: [...newTodos],
      };

    case TODO_ACTIONS.DELETE_CHILD: {
      const newTodos = [...state.todos].map((parentTodo) => {
        if (parentTodo.id === action.payload.parentId) {
          parentTodo.children = parentTodo.children.filter(
            (childTodo: ITodoItem) => childTodo.id !== action.payload.childId
          );
        }
        return parentTodo;
      });

      return {
        ...state,
        todos: [...newTodos],
      };
    }

    default:
      return state;
  }
};

export const TodoContext = createContext({} as ITodoContextModel);

export const TodoProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
