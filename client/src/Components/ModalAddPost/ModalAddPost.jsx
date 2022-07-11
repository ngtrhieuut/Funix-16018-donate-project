import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../Actions/PostAction";

function ModalAddPost() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const [detailPost, setDetailPost] = useState({
    userId: user.user._id,
    title: "",
    desc: "",
    image: "",
    donatecost: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setDetailPost({ ...detailPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    dispatch(uploadPost(detailPost));
  };

  return (
    <div
      className="modal fade"
      id="addPost"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Donate Post
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column" onSubmit={handleAddPost}>
              <div className="mb-3">
                <label htmlFor="postTitle" className="form-label">
                  Post Title
                </label>
                <textarea
                  type="text"
                  className="form-control text-wrap"
                  id="postTitle"
                  name="title"
                  onChange={(e) => handleChange(e)}
                  value={detailPost.title}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postDesc" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="postDesc"
                  name="desc"
                  onChange={(e) => handleChange(e)}
                  value={detailPost.desc}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postImg" className="form-label">
                  Image Url
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="postImg"
                  name="image"
                  onChange={(e) => handleChange(e)}
                  value={detailPost.image}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postDonatCost" className="form-label">
                  Max value
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="postDonatCost"
                  name="donatecost"
                  onChange={(e) => handleChange(e)}
                  value={detailPost.donatecost}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postStartDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="postStartDate"
                  name="startDate"
                  onChange={(e) => handleChange(e)}
                  value={detailPost.startDate}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postEndDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="postEndDate"
                  name="endDate"
                  onChange={(e) => handleChange(e)}
                  value={detailPost.endDate}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </form>
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

export default ModalAddPost;
