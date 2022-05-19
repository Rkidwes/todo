import { useState } from "react";
import classNames from "classnames";
import styles from "./TodoList.module.css";

function TodoList() {
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("data");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Input: ", userInput);
    addTodo(userInput);
    setUserInput("");
  };

  const addTodo = (userInput) => {
    todoList.push({
      id: todoList.length + 1,
      text: userInput,
      completed: false,
    });
    localStorage.setItem("data", JSON.stringify(todoList));
    setTodoList(todoList);
  };

  const updateTodo = (id) => {
    const selectedItem = todoList.findIndex((obj) => {
      return obj.id === id;
    });
    const newArray = [...todoList];
    newArray[selectedItem].completed = !newArray[selectedItem].completed;
    localStorage.setItem("data", JSON.stringify(newArray));
    setTodoList(newArray);
  };

  const clearCompleted = (e) => {
    e.preventDefault();
    const newArray = todoList.filter((item) => item.completed === false);
    localStorage.setItem("data", JSON.stringify(newArray));
    setTodoList(newArray);
  };

  return (
    <>
      <ul className={styles.list}>
        {todoList.map((todo, i) => (
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
      <form>
        <input
          type="text"
          name="name"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Add Todo</button>
      </form>
      <button onClick={(e) => clearCompleted(e)}>Clear completed tasks</button>
    </>
  );
}

export default TodoList;
