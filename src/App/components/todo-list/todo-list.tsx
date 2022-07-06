import { ITodo } from "App/models/todo.model";
import TodoItem from "./todo-item/todo-item";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./todo-list.scss";
import { getTodos, saveTodoList } from "App/services/storage.service";
import { useEffect } from "react";

interface props {
  todoList: ITodo[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList = ({ todoList, setTodoList }: props) => {
  useEffect(() => {
    if (getTodos()) setTodoList(getTodos());
  }, []);

  const onRemoveAllClick = () => {
    setTodoList([]);
    saveTodoList([]);
  };

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
      {todoList.length > 2 ? (
        <button className="btn-remove-all" onClick={onRemoveAllClick}>
          Remove All
        </button>
      ) : null}
    </section>
  );
};

export default TodoList;
