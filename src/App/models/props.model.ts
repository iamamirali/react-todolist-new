import { ITodo } from "./todo.model";

export interface Todo_TodoList_Props extends TodoProps, TodoListProps {}

export interface TodoProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
}

export interface TodoListProps {
    todoList: ITodo[];
    setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}