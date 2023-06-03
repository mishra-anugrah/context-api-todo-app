import { FormEvent, useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { addChildTodo, addTodo } from "../actions/TodoActions";

interface IAddTodoProps {
  isChild: boolean;
  parentId?: number | string;
  setAddChildren?: (boolean) => void;
}

const AddTodo = (props: IAddTodoProps) => {
  const { dispatch } = useContext(TodoContext);

  const { isChild, parentId, setAddChildren } = props;

  const [inputValue, setInputValue] = useState<string>("");

  const inputValueHandler = (event) => {
    setInputValue(event.target.value);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      return;
    }

    const newTodo = {
      id: new Date().getTime().toString(),
      title: inputValue,
      active: true,
      children: [],
    };

    if (isChild) {
      dispatch(addChildTodo(parentId, newTodo));
    } else {
      dispatch(addTodo(newTodo));
    }

    setInputValue("");
    // setAddChildren ?? setAddChildren(false);
  };

  return (
    <>
      <input type="text" value={inputValue} onChange={inputValueHandler} />
      <button type="button" onClick={submitHandler}>
        Add
      </button>
    </>
  );
};

export default AddTodo;
