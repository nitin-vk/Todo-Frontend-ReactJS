import React from "react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import Backdrop from "./Backdrop";
import { url } from "../App";

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
          <input type="checkbox" onClick={completeItem} checked={props.completed ? "checked" : ""} />
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

export default Todo;
