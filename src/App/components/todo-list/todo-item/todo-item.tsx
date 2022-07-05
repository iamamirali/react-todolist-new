import { ITodo } from "App/models/todo.model";
import { useEffect } from "react";
import "./todo-item.scss";

interface props {
  todoItem: ITodo;
  todoList: ITodo[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoItem = ({ todoItem, todoList, setTodoList }: props) => {
  const removeTodo = (id: number) => {
    let todos = todoList;
    setTodoList(
      todos.filter((todo) => todo.id != id)
    );
  };

  return (
    <div className="todo-container">
      <h1>{todoItem.name}</h1>
      <button className="btn-remove" onClick={() => removeTodo(todoItem.id)}>
        delete
      </button>
    </div>
  );
};

export default TodoItem;
