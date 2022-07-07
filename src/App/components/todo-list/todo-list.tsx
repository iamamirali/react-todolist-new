import TodoItem from "./todo-item/todo-item";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./todo-list.scss";
import { getTodos, saveTodoList } from "App/services/storage.service";
import { useEffect } from "react";
import { TodoListProps } from "App/models/props.model";

// first of all read todo input component
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
        {/* never use logic like maps or iteration at the JSX section
            convert it to a method and return JSX from that method then you can simply call method here and pass the value
        */}
        {todoList.length > 0 &&
          todoList.map((todo, i) => (
            // destructor my friend and pass props with rest spread
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
