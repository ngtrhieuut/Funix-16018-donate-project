import { useDispatch } from "react-redux";
import { deletePost } from "../../Actions/PostAction";

function ModalDelete(data) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(data.post._id, data.index));
  };

  return (
    <div
      className="modal fade"
      id={"deletePost" + data.index}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title fw-bold text-danger"
              id="exampleModalLabel"
            >
              Delete Post
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete post <b>{data.post.title}</b>?
            </p>
            <button
              type="button"
              className="btn btn-outline-danger fw-bold p-2"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
