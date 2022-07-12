import { Todo_TodoList_Props } from "App/models/props.model";
import { ITodo } from "App/models/todo.model";
import { saveTodoList } from "App/services/storage.service";
import { useState } from "react";
import "./todo-input.scss"; // use module

function TodoInput({
  todo,
  setTodo,
  todoList,
  setTodoList,
}: Todo_TodoList_Props) {
  const [hasInputErr, setHasInputErr] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setTodo(value);
  }

  function handleTodoSubmit(e: React.FormEvent<HTMLFormElement>, todo: string) {
    e.preventDefault();
    setHasInputErr(!todo);
    if (!todo) return;
    updateTodoList(todoList);
    setTodo("");
  }

  function updateTodoList(list: ITodo[]) {
    let newList = setNewList(list, {
      name: todo,
      id: Date.now(),
      isDone: false,
    });
    setTodoList(newList);
    saveTodoList(newList);
  }
  function setNewList(prevList: ITodo[], newItem: ITodo) {
    return [...prevList, newItem];
  }

  return (
    <form
      onSubmit={(e) => handleTodoSubmit(e, todo)}
      className="input-container"
    >
      <input
        type="text"
        onChange={handleInputChange}
        value={todo}
        className={hasInputErr ? "error-input" : "todo-input"}
        placeholder="Add a ToDo..."
      />
      <button className="btn-add" type="submit">
        +
      </button>
    </form>
  );
}

export default TodoInput;
