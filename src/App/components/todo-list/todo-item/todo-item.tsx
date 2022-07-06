import { ITodo } from "App/models/todo.model";
import { saveTodoList } from "App/services/storage.service";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./todo-item.scss";

interface props {
  todoItem: ITodo;
  todoList: ITodo[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoItem = ({ todoItem, todoList, setTodoList }: props) => {
  const [todoStyle, setTodoStyle] = useState<boolean>(todoItem.isDone);

  const removeTodo = (id: number) => {
    const newList = todoList.filter((todo) => todo.id != id);
    setTodoList(newList);
    saveTodoList(newList);
  };

  const setDoneTodo = () => {
    todoItem.isDone = !todoItem.isDone;
    setTodoStyle(!todoStyle);
    saveTodoList(todoList);
  };

  return (
    <div className={todoStyle ? "done-todo" : "todo-container"}>
      <h1>{todoItem.name}</h1>
      <div className="btns-container">
        <button className="btn-remove" onClick={() => removeTodo(todoItem.id)}>
          <RiDeleteBin5Fill></RiDeleteBin5Fill>
        </button>
        <button
          className={todoStyle ? "btn-done" : "btn-not-done"}
          onClick={() => setDoneTodo()}
        >
          <FaCheckCircle></FaCheckCircle>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
