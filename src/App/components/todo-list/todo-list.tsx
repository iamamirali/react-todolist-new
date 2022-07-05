import { ITodo } from "App/models/todo.model";
import TodoItem from "./todo-item/todo-item";
import "./todo-list.scss";

interface props {
  todoList: ITodo[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList = ({ todoList, setTodoList }: props) => {
  return (
    <section className="todos-container">
      {todoList.map((todo, i) => (
        <TodoItem
          key={i}
          todoItem={todo}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      ))}
    </section>
  );
};

export default TodoList;
