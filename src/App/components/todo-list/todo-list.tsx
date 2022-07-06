import { ITodo } from "App/models/todo.model";
import TodoItem from "./todo-item/todo-item";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./todo-list.scss";
import { getTodos } from "App/services/storage.service";
import { useEffect } from "react";

interface props {
  todoList: ITodo[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList = ({ todoList, setTodoList }: props) => {
  useEffect(() => {
    if (getTodos()) setTodoList(getTodos());
  }, []);

  return (
    <section className="todos-container">
      <TransitionGroup>
        {todoList.map((todo, i) => (
          <CSSTransition key={todo.id} timeout={300} classNames="todo-item">
            <TodoItem
              key={i}
              todoItem={todo}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
};

export default TodoList;
