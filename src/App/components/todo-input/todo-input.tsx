import { Todo_TodoList_Props } from "App/models/props.model";
import { ITodo } from "App/models/todo.model";
import { Web3Props } from "App/models/web3.model";
import { saveTodoList } from "App/services/storage.service";
import withWeb3 from "App/services/withWeb3";
import { useState } from "react";
import Web3 from "web3";
import "./todo-input.scss"; // use module

function TodoInput({
  todo,
  setTodo,
  todoList,
  setTodoList,
  checkWallet,
  signMessage,
  web3,
  hasWallet,
  signHash,
}: Todo_TodoList_Props & Web3Props) {
  const [hasInputErr, setHasInputErr] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setTodo(value);
  }

  function handleTodoSubmit(e: React.FormEvent<HTMLFormElement>, todo: string) {
    e.preventDefault();
    setHasInputErr(!todo);
    checkWallet();
    if (!todo) return;
    signMessage(web3, hasWallet, todo);
    updateTodoList(todoList, signHash);
    setTodo("");
  }

  async function updateTodoList(list: ITodo[], signHash: string) {
    let newList = setNewList(list, {
      name: todo,
      signature: signHash,
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

export default withWeb3(TodoInput);
