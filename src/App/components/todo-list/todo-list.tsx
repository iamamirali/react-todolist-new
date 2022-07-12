import TodoItem from "./todo-item/todo-item";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./todo-list.scss";
import { getTodos, saveTodoList } from "App/services/storage.service";
import { useEffect } from "react";
import { TodoListProps } from "App/models/props.model";
import { ITodo } from "App/models/todo.model";

function TodoList({ todoList, setTodoList }: TodoListProps) {
  useEffect(() => {
    if (getTodos()) setTodoList(getTodos());
  }, [setTodoList]);

  function onRemoveAllClick() {
    setTodoList([]);
    saveTodoList([]);
  }

  function showList(list: ITodo[]) {
    return list.map((item) => {
      return (
        <CSSTransition key={item.id} timeout={300} classNames="todo-item">
          <TodoItem
            {...{ todoList, setTodoList, key: item.id, todoItem: item }}
          />
        </CSSTransition>
      );
    });
  }

  return (
    <>
      <section className="todos-container">
        <TransitionGroup>
          {todoList.length > 0 && showList(todoList)}
        </TransitionGroup>
        {todoList.length > 2 && (
          <button className="btn-remove-all" onClick={onRemoveAllClick}>
            Remove All
          </button>
        )}
      </section>
    </>
  );
}

export default TodoList;
