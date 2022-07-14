import { TodoListProps } from "App/models/props.model";
import { ITodo } from "App/models/todo.model";
import { saveTodoList } from "App/services/storage.service";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./todo-item.scss";

type Props = TodoListProps & {
  todoItem: ITodo;
};

function TodoItem({ todoItem, todoList, setTodoList }: Props) {
  const [isTodoDone, setIsTodoDone] = useState<boolean>(todoItem.isDone);

  function removeTodo(id: number, list: ITodo[]) {
    const newList = showEditedList(id, list);
    setTodoList(newList);
    saveTodoList(newList);
  }
  function showEditedList(selectedId: number, list: ITodo[]) {
    return list.filter((item) => item.id !== selectedId);
  }

  function setDoneTodo(todo: ITodo) {
    let doneStatus = toggleDone(todo);
    setIsTodoDone(doneStatus);
    saveTodoList(todoList);
  }
  function toggleDone(item: ITodo) {
    return (item.isDone = !item.isDone);
  }

  return (
    <>
      <div className={isTodoDone ? "done-todo" : "todo-container"}>
        <p className="todo-title">{todoItem.name}</p>
        <span className="todo-signature">{todoItem.signature}</span>
        <div className="btns-container">
          <button
            className="btn-remove"
            onClick={() => removeTodo(todoItem.id, todoList)}
          >
            <RiDeleteBin5Fill></RiDeleteBin5Fill>
          </button>
          <button
            className={isTodoDone ? "btn-done" : "btn-not-done"}
            onClick={() => setDoneTodo(todoItem)}
          >
            <FaCheckCircle></FaCheckCircle>
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoItem;
