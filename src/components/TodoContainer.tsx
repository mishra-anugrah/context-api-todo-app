import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

export const TodoContainer = () => {
  return (
    <div>
      <AddTodo isChild={false} />
      <TodoList />
    </div>
  );
};
