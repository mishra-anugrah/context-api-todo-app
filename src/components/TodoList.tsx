import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { deleteTodo } from "../actions/TodoActions";
import { ITodoItem } from "../interfaces";
import AddTodo from "./AddTodo";

const TodoList = () => {
  const {
    state: { todos },
    dispatch,
  } = useContext(TodoContext);

  const [addChildren, setAddChildren] = useState<boolean>(false);

  const deleteHandler = (id: string | number) => dispatch(deleteTodo(id));

  const addChildrenHandler = (id: string | number) => {
    console.log("adding children to ", id);
    setAddChildren(true);
  };

  const childTodoDeleteHandler = (parentIndex, childIndex) => {
    console.log(`deleting ${parentIndex}-${childIndex}`);
  };

  return todos.length > 0 ? (
    <ul>
      {todos.map((todo: ITodoItem) => (
        <>
          <li key={todo.id}>
            <div className="todo-item-container">
              <span>{todo.title} </span>
              <button onClick={() => addChildrenHandler(todo.id)}>+</button>
              <button onClick={() => deleteHandler(todo.id)}>Delete</button>
            </div>
            {todo?.children.length ? (
              <>
                <ul>
                  {todo.children.map((childTodo, childIndex) => (
                    <>
                      <li>{childTodo.title}</li>
                      <button
                        onClick={() =>
                          childTodoDeleteHandler(todo.id, childIndex)
                        }
                      >
                        delete
                      </button>
                    </>
                  ))}
                </ul>
              </>
            ) : (
              <></>
            )}
            {addChildren ? (
              <AddTodo
                isChild
                parentId={todo.id}
                setAddChildren={setAddChildren}
              />
            ) : (
              <></>
            )}
          </li>
        </>
      ))}
    </ul>
  ) : (
    <h2>Nothing Todo! Try adding a few</h2>
  );
};

export default TodoList;
