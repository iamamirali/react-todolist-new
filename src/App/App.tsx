import { useState } from "react";
import appStyles from "./App.module.scss";
import TodoInput from "./components/todo-input/todo-input";
import TodoList from "./components/todo-list/todo-list";
import { ITodo } from "./models/todo.model";
import withWeb3 from "./services/withWeb3";

const WithWeb3TodoInput = withWeb3(TodoInput);

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  return (
    <>
      <main className={appStyles.container}>
        <h1 className={appStyles.title}>ToDo List</h1>
        <WithWeb3TodoInput {...{ todo, setTodo, todoList, setTodoList }} />
        <TodoList {...{ todoList, setTodoList }} />
      </main>
    </>
  );
}

export default App;
