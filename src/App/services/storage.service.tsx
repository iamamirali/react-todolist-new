import { ITodo } from "App/models/todo.model";

export let todos: ITodo[] = [];

export const saveTodo = (todo: ITodo) => {
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const getTodos = (): string => {
  return JSON.parse(localStorage.getItem("todos") as string);
};
