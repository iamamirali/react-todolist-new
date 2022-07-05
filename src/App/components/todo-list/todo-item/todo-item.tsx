import { ITodo } from "App/models/todo.model";
import { saveTodoList } from "App/services/storage.service";
import { useState } from "react";
import "./todo-item.scss";

interface props {
  todoItem: ITodo;
  todoList: ITodo[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoItem = ({ todoItem, todoList, setTodoList }: props) => {
  const [todoStyle, setTodoStyle] = useState("todo-container");

  const removeTodo = (id: number) => {
    let todos = todoList;
    setTodoList(todos.filter((todo) => todo.id != id));
    saveTodoList(todoList);
  };

  const setDoneTodo = () => {
    setTodoStyle(
      todoStyle == "todo-container" ? "done-todo" : "todo-container"
    );
  };

  return (
    <div className={todoStyle}>
      <h1>{todoItem.name}</h1>
      <button className="btn-remove" onClick={() => removeTodo(todoItem.id)}>
        delete
      </button>
      <button className="btn-done" onClick={() => setDoneTodo()}>
        done
      </button>
    </div>
  );
};

export default TodoItem;
