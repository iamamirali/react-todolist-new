import { useState } from "react";
import "./App.scss";
import TodoInput from "./components/todo-input/todo-input";
import TodoList from "./components/todo-list/todo-list";
import { ITodo } from "./models/todo.model";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  return (
    <main className="app-container">
      <h1 className="app-title">ToDo List</h1>
      <TodoInput
        todo={todo}
        setTodo={setTodo}
        todoList={todoList}
        setTodoList={setTodoList}
      />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </main>
  );
}

export default App;
