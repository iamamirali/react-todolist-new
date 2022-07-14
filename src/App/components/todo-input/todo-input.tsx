import { Todo_TodoList_Props } from "App/models/props.model";
import { ITodo } from "App/models/todo.model";
import { Web3Props } from "App/models/web3.model";
import { saveTodoList } from "App/services/storage.service";
import { useState } from "react";
import "./todo-input.scss";

function TodoInput({
  todo,
  setTodo,
  todoList,
  setTodoList,
  checkWallet,
  signMessage,
}: Todo_TodoList_Props & Web3Props) {
  const [hasInputErr, setHasInputErr] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setTodo(value);
  }

  async function handleTodoSubmit(
    e: React.FormEvent<HTMLFormElement>,
    todo: string
  ) {
    e.preventDefault();
    setHasInputErr(!todo);
    checkWallet();
    if (!todo) return;
    setTodo("");
    updateTodoList(todoList, await signMessage(todo));
  }

  async function updateTodoList(list: ITodo[], signature: string) {
    let newList = setNewList(list, {
      name: todo,
      signature: signature,
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
    <>
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
    </>
  );
}

export default TodoInput;
