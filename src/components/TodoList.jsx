import { useState } from "react";

function TodoList() {
  const [todoList, setTodoList] = useState(["List item #1", "List Item #2"]);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Input: ", userInput);
    addTask(userInput);
    setUserInput("");
  };

  const addTask = (userInput) => {
    todoList.push(userInput);
    setTodoList(todoList);
  };

  return (
    <>
      <ul>
        {todoList.map((todo, i) => (
          <li key={i}>{todo}</li>
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
    </>
  );
}

export default TodoList;
