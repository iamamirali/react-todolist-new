import { Todo_TodoList_Props } from "App/models/props.model";
import { saveTodoList } from "App/services/storage.service";
import { useEffect, useState } from "react";
import "./todo-input.scss"; // use module

const TodoInput = ({
  todo,
  setTodo,
  todoList,
  setTodoList,
}: Todo_TodoList_Props) => {
  const [hasInputErr, setHasInputErr] = useState<boolean>();

  // why always Arrow function
  //  what's different in arrow function or regular function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value); // always use destructor even you know the exact value. Example for multi nested => const { value } = e.target
  };

  const handleTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // the blow code is shit
    // setStat in react is not sync so in chain of setState like below  you have to sure each setState done then run next setState

    // see code in comment below
    if (!todo) {
      setHasInputErr(true);
    } else {
      updateTodoList();
      setTodo("");
      setHasInputErr(false);
    }

    //  see code below instead of your code
    // 1- less lines of code
    // 2- Iam sure my tow statement run after my first setState

    // setHasInputErr(!todo);
  };
  // useEffect(() => {
  //   if (!hasInputErr) return;
  //   updateTodoList();
  //   setTodo("");
  // }, [hasInputErr, setTodo]);

  const updateTodoList = () => {
    let newList = [...todoList, { id: Date.now(), name: todo, isDone: false }];
    // tell me whats different between bellow code and if you don't know search about deep copy and shallow copy
    // const myJson = {
    //   a: {
    //     b: 1,
    //     d: 53,
    //   },
    //   c: 2,
    // };
    // const copy1 = { ...myJson };
    // const copy2 = JSON.parse(JSON.stringify(myJson));
    // const copy3 = Object.assign({}, myJson);
    // const copy4 = _.cloneDeep(myJson); // from lodash library

    setTodoList(newList);
    saveTodoList(newList);
  };

  return (
    <form onSubmit={(e) => handleTodoSubmit(e)} className="input-container">
      <input
        type="text"
        onChange={(e) => handleInputChange(e)}
        // we can use this method like bellow can you tell me what happening here
        // read about reference types and primitive types
        // onChange={handleInputChange}
        value={todo}
        className={hasInputErr ? "error-input" : "todo-input"}
        placeholder="Add a ToDo..."
      />
      <button className="btn-add" type="submit">
        +
      </button>
    </form>
  );
};

export default TodoInput;
