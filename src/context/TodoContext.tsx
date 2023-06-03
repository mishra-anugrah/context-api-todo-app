import { useReducer, createContext } from "react";
import {
  ITodoAddAction,
  ITodoDeleteAction,
  ITodoState,
  ITodoContextModel,
  ITodoAddChildAction,
  ITodoDeleteChildAction,
  ITodoItem,
} from "../interfaces";
import { TODO_ACTIONS } from "../constants";
import { is } from "typescript-is";

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
      if (is<ITodoAddAction>(action)) {
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };
      }
      break;

    case TODO_ACTIONS.DELETE:
      if (is<ITodoDeleteAction>(action)) {
        return {
          ...state,
          todos: state.todos.filter(
            (item: ITodoItem) => item.id !== action.payload
          ),
        };
      }
      break;

    case TODO_ACTIONS.ADD_CHILD:
      let newTodos: ITodoItem[];

      if (is<ITodoAddChildAction>(action)) {
        newTodos = [...state.todos].map((parentTodo: ITodoItem) => {
          if (parentTodo.id === action.payload.parentId) {
            parentTodo.children.push(action.payload.childTodo);
          }
          return parentTodo as ITodoItem;
        });
      }
      return {
        ...state,
        todos: [...newTodos],
      };

    case TODO_ACTIONS.DELETE_CHILD: {
      let newTodos: ITodoItem[];
      if (is<ITodoDeleteChildAction>(action)) {
        newTodos = [...state.todos].map((parentTodo: ITodoItem) => {
          if (
            // typeof action.payload === "object" &&
            // "parentId" in action.payload &&
            is<ITodoDeleteChildAction>(action) &&
            parentTodo.id === action.payload.parentId
          ) {
            parentTodo.children = parentTodo.children.filter(
              (childTodo: ITodoItem) =>
                is<ITodoDeleteAction>(action) &&
                childTodo.id !== action.payload.childId
            );
          }
          return parentTodo;
        });
      }

      return {
        ...state,
        todos: [...newTodos],
      };
    }

    default:
      return { ...state };
  }
};

export const TodoContext = createContext({
  state: defaultState,
  dispatch: () => {},
} as ITodoContextModel);

export const TodoProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
