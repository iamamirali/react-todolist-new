import { Todo_TodoList_Props } from "App/models/props.model";
import { saveTodoList } from "App/services/storage.service";
import { useState } from "react";
import "./todo-input.scss";

const TodoInput = ({
  todo,
  setTodo,
  todoList,
  setTodoList,
}: Todo_TodoList_Props) => {
  const [hasInputErr, setHasInputErr] = useState<boolean>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const onTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo) {
      setHasInputErr(true);
    } else {
      updateTodoList();
      setTodo("");
      setHasInputErr(false);
    }
  };

  const updateTodoList = () => {
    let newList = [...todoList, { id: Date.now(), name: todo, isDone: false }];
    setTodoList(newList);
    saveTodoList(newList);
  };

  return (
    <form onSubmit={(e) => onTodoSubmit(e)} className="input-container">
      <input
        type="text"
        onChange={(e) => onInputChange(e)}
        value={todo}
        className={hasInputErr ? "error-input" : "todo-input"}
        placeholder="Add a ToDo..."
      />
      <button className="btn-add" type="submit">
        +
      </button>
    </form>
  );
};

export default TodoInput;
