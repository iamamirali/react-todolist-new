import { ITodo } from "App/models/todo.model";

export const saveTodoList = (todoList: ITodo[]) => {
  localStorage.setItem("todos", JSON.stringify(todoList));
};

export const getTodos = (): ITodo[] => {
  return JSON.parse(localStorage.getItem("todos") as string);
};
