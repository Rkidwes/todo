import { useState } from "react";
import classNames from "classnames";
// import styles from "./TodoList.module.scss";
const styles = require("./TodoList.module.scss");

interface Todo {
  id: React.Key;
  completed: Boolean;
  text: String;
}

function TodoList() {
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("data");
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue;
  });
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("User Input: ", userInput);
    addTodo(userInput);
    setUserInput("");
  };

  const addTodo = (userInput: String) => {
    todoList.push({
      id: todoList.length + 1,
      text: userInput,
      completed: false,
    });
    localStorage.setItem("data", JSON.stringify(todoList));
    setTodoList(todoList);
  };

  const updateTodo = (id: React.Key) => {
    const selectedItem = todoList.findIndex((obj: Todo) => {
      return obj.id === id;
    });
    const newArray = [...todoList];
    newArray[selectedItem].completed = !newArray[selectedItem].completed;
    localStorage.setItem("data", JSON.stringify(newArray));
    setTodoList(newArray);
  };

  const clearCompleted = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newArray = todoList.filter((item: Todo) => item.completed === false);
    localStorage.setItem("data", JSON.stringify(newArray));
    setTodoList(newArray);
  };

  return (
    <div className="max-w-sm bg-gray-400">
      <ul className={styles.list}>
        {todoList.map((todo: Todo) => (
          <li
            key={todo.id}
            className={classNames(
              styles.item,
              todo.completed && styles.completed
            )}
            onClick={() => updateTodo(todo.id)}
          >
            <span
              className={classNames(
                styles.selector,
                todo.completed && styles.selectorCompleted
              )}
            />
            {todo.text}
          </li>
        ))}
      </ul>
      <div className="flex spacing">
        <form>
          <input
            type="text"
            name="name"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="border radius-full"
            onClick={(e) => handleSubmit(e)}
          >
            Add Todo
          </button>
        </form>
      </div>
      <button onClick={(e) => clearCompleted(e)}>Clear completed tasks</button>
    </div>
  );
}

export default TodoList;
