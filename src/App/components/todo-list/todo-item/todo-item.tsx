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

const TodoItem = ({ todoItem, todoList, setTodoList }: Props) => {
  const [isTodoDone, setIsTodoDone] = useState<boolean>(todoItem.isDone);

  const removeTodo = (id: number) => {
    const newList = todoList.filter((todo) => todo.id != id);
    setTodoList(newList);
    saveTodoList(newList);
  };

  const setDoneTodo = () => {
    todoItem.isDone = !todoItem.isDone;
    setIsTodoDone(!isTodoDone);
    saveTodoList(todoList);
  };

  return (
    <div className={isTodoDone ? "done-todo" : "todo-container"}>
      <h1>{todoItem.name}</h1>
      <div className="btns-container">
        <button className="btn-remove" onClick={() => removeTodo(todoItem.id)}>
          <RiDeleteBin5Fill></RiDeleteBin5Fill>
        </button>
        <button
          className={isTodoDone ? "btn-done" : "btn-not-done"}
          onClick={() => setDoneTodo()}
        >
          <FaCheckCircle></FaCheckCircle>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
