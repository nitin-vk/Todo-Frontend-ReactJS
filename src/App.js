import React from "react";
import Todo from "./components/Todo";
import { useRef, useState, useEffect } from "react";

export const url = "postgresql://qlurmbevawjaxf:a0b463adbb8be17eb5d887ee66b03b3dc2b0ca8b30c97f07c98c74d97e94f78d@ec2-54-80-123-146.compute-1.amazonaws.com:5432/d8r0e23a6nusf4";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const todoContentRef = useRef();

  function getItems() {
    setIsLoading(true);
    fetch(url, {
      method: "GET"
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        const newList = [...response.todo_list];
        setIsLoading(false);
        setTodoList(newList);
      });
  }

  function submitHandler(event) {
    event.preventDefault();
    const addUrl = url;
    const contentInput = todoContentRef.current.value;
    const addData = {
      title: contentInput
    };
    fetch(addUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addData)
    }).then((response) => {
      if (!response.ok) {
        alert('Add failed');
      } else {
        return response.json();
      }
    }).then(response => {
      event.target.reset();
      getItems();
    });
  }

  useEffect(getItems, []);

  return (
    <div>
      <h1>To Do Items</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Type here to add ..."
          maxLength="100"
          required
          ref={todoContentRef}
        />
        <button className="btn">ADD</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        todoList.map((item) => {
          return <Todo key={item.id} id={item.id} title={item.title} completed={item.completed} getItems={getItems} />;
        })
      )}
    </div>
  );
}

export default App;
