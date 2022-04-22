import React from "react";
import Todo from "./components/Todo";
import DeleteModal from "./components/DeleteModal";
import Backdrop from "./components/Backdrop";

import { useRef, useState, useEffect } from "react";

export const url = "https://nitin-db.herokuapp.com/api/v1/";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
function Todo(props) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  //Delete modal handlers
  function deleteModalOpenHandler() {
    setDeleteModalOpen(true);
  }
  function deleteModalCloseHandler() {
    setDeleteModalOpen(false);
  }

  function completeItem() {
    const patchUrl = url + "/" + props.id;
    fetch(patchUrl, {
      method: "PATCH"
    }).then((response) => {
      if (!response.ok) {
        alert("Completing task failed");
      }
      props.getItems();
    });
  }

  return (
    <div className="card">
      <div>
        {
          <input type="checkbox" onClick={completeItem} checked={props.completed ? "checked" : ""} readOnly />
        }
        <p>{props.title}</p>
      </div>
      <div className="actions">
        <button className="btn edit">
          Edit
        </button>
        <button className="btn delete" onClick={deleteModalOpenHandler}>
          Delete
        </button>
      </div>
      {deleteModalOpen ? (
        <section>
          <DeleteModal
            deleteId={props.id}
            closeModal={deleteModalCloseHandler}
            getItems={props.getItems}
          />
          <Backdrop closeModal={deleteModalCloseHandler} />
        </section>
      ) : null}
    </div>
  );
}

export default App;
