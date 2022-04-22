import { url } from "../App";

function DeleteModal(props) {
  function confirmHandler() {
    const deleteUrl = url + "/" + props.deleteId;
    fetch(deleteUrl, {
      method: "DELETE"
    }).then((response) => {
      if (!response.ok) {
        alert('Delete failed');
        props.closeModal();
      } else {
        props.closeModal();
      }
    });
  }

  function cancelHandler() {
    props.closeModal();
  }

  return (
    <div className="modal">
      <p>Are you sure?</p>
      <button className="btn" onClick={confirmHandler}>
        Confirm
      </button>
      <button className="btn" onClick={cancelHandler}>
        Cancel
      </button>
    </div>
  );
}

export default DeleteModal;
