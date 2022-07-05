import { ITodo } from "App/models/todo.model";
import { useState } from "react";
import "./todo-input.scss";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todoList: ITodo[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoInput = ({ todo, setTodo, todoList, setTodoList }: props) => {
  const [inputStyle, setInputStyle] = useState("todo-input");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const onInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo) {
      setInputStyle("error-input");
    } else {
      updateTodoList();
      setTodo("");
      setInputStyle("todo-input");
    }
  };

  const updateTodoList = () => {
    setTodoList([...todoList, { id: Date.now(), name: todo, isDone: false }]);
  };

  return (
    <form onSubmit={(e) => onInputSubmit(e)} className="input-container">
      <input
        type="text"
        onChange={(e) => onInputChange(e)}
        value={todo}
        className={inputStyle}
        placeholder="Add a ToDo..."
      />
      <button className="btn-add" type="submit">
        +
      </button>
    </form>
  );
};

export default TodoInput;
