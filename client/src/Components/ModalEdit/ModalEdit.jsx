import dayjs from "dayjs";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../Actions/PostAction";
import JoditEditor from "jodit-react";

const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

function ModalEdit(post) {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const [detailPost, setDetailPost] = useState({
    _id: post.post._id,
    userId: post.user._id,
    title: post.post.title,
    desc: post.post.desc,
    image: post.post.image,
    donatecost: post.post.donatecost,
    startDate: post.post.startDate,
    endDate: post.post.endDate,
    status: post.post.status,
  });

  const handleChange = (e) => {
    setDetailPost({ ...detailPost, [e.target.name]: e.target.value });
  };

  const handlePostChange = (e) => {
    e.preventDefault();
    dispatch(updatePost(detailPost._id, detailPost));
  };

  return (
    <div
      className="modal fade"
      id={"post" + detailPost._id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
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
            <form className="d-flex flex-column" onSubmit={handlePostChange}>
              <input
                type="hidden"
                className="form-control"
                name="id"
                value={post.post._id}
              />
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
                <JoditEditor
                  ref={editor}
                  value={detailPost.desc}
                  name="desc"
                  config={config}
                  tabIndex={1}
                  //   onBlur={(newContent) => getValue(newContent)}
                  onChange={(e) => setDetailPost({ ...detailPost, desc: e })}
                />
                {/* <textarea
                  type="text"
                  className="form-control"
                  id="postDesc"
                  name="desc"
                  onChange={(e) => handleChange(e)}
                  value={detailPost.desc}
                /> */}
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
                  value={dayjs(new Date(detailPost.startDate)).format(
                    "YYYY-MM-DD"
                  )}
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
                  value={dayjs(new Date(detailPost.endDate)).format(
                    "YYYY-MM-DD"
                  )}
                />
              </div>
              {/* status update */}
              <p className="fw-bold">
                Post status:{" "}
                {detailPost.status.toString() === "0"
                  ? "Inactive"
                  : detailPost.status.toString() === "1"
                  ? "Active"
                  : detailPost.status.toString() === "2"
                  ? "Pending"
                  : "Deleted"}
              </p>
              <div className="mb-3 d-flex justify-content-between">
                {/* Inactive */}
                <div className="d-flex flex-column align-items-center">
                  <label
                    htmlFor={detailPost._id + "activePost1"}
                    className="form-label"
                  >
                    Inactive
                  </label>
                  <input
                    type="radio"
                    className="form-control checked-radio-Inactive"
                    id={detailPost._id + "activePost1"}
                    name="status"
                    onChange={(e) => handleChange(e)}
                    value={0}
                    style={{ width: "3px", height: "3px" }}
                  />
                </div>

                {/* Active */}
                <div className="d-flex flex-column align-items-center">
                  <label
                    htmlFor={detailPost._id + "activePost2"}
                    className="form-label"
                  >
                    Active
                  </label>
                  <input
                    type="radio"
                    className="form-control checked-radio-Active"
                    id={detailPost._id + "activePost2"}
                    name="status"
                    onChange={(e) => handleChange(e)}
                    value={1}
                    style={{ width: "3px", height: "3px" }}
                  />
                </div>

                {/* Denied User */}
                <div className="d-flex flex-column align-items-center">
                  <label
                    htmlFor={detailPost._id + "activePost3"}
                    className="form-label"
                  >
                    Pending
                  </label>
                  <input
                    type="radio"
                    className="form-control checked-radio-Denied"
                    id={detailPost._id + "activePost3"}
                    name="status"
                    onChange={(e) => handleChange(e)}
                    value={2}
                    style={{ width: "3px", height: "3px" }}
                  />
                </div>

                {/* Delete User */}
                <div className="d-flex flex-column align-items-center">
                  <label
                    htmlFor={detailPost._id + "activePost4"}
                    className="form-label"
                  >
                    Delete
                  </label>
                  <input
                    type="radio"
                    className="form-control checked-radio-Delete"
                    id={detailPost._id + "activePost4"}
                    name="status"
                    onChange={(e) => handleChange(e)}
                    value={3}
                    style={{ width: "3px", height: "3px" }}
                  />
                </div>
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

export default ModalEdit;
