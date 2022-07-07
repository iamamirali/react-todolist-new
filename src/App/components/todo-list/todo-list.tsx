import TodoItem from "./todo-item/todo-item";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./todo-list.scss";
import { getTodos, saveTodoList } from "App/services/storage.service";
import { useEffect } from "react";
import { TodoListProps } from "App/models/props.model";

const TodoList = ({ todoList, setTodoList }: TodoListProps) => {
  useEffect(() => {
    if (getTodos()) setTodoList(getTodos());
  }, [setTodoList]);

  const onRemoveAllClick = () => {
    setTodoList([]);
    saveTodoList([]);
  };

  return (
    <section className="todos-container">
      <TransitionGroup>
        {todoList.length > 0 &&
          todoList.map((todo, i) => (
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
      {todoList.length > 2 && (
        <button className="btn-remove-all" onClick={onRemoveAllClick}>
          Remove All
        </button>
      )}
    </section>
  );
};

export default TodoList;
