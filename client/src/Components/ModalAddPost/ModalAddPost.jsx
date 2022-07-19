import dayjs from "dayjs";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../Actions/PostAction";
import { isEmpty } from "../validation/Validation";
import JoditEditor from "jodit-react";

const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

function ModalAddPost() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const [detailPost, setDetailPost] = useState({
    userId: user._id,
    title: "",
    desc: "",
    image: "",
    donatecost: "",
    startDate: "",
    endDate: "",
    err: "",
    success: "",
  });

  const editor = useRef(null);

  const handleChange = (e) => {
    setDetailPost({ ...detailPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    setDetailPost({ ...detailPost, err: "", success: "" });

    console.log(detailPost);

    if (
      isEmpty(detailPost.title) ||
      isEmpty(detailPost.desc) ||
      isEmpty(detailPost.image) ||
      isEmpty(detailPost.donatecost) ||
      isEmpty(detailPost.startDate) ||
      isEmpty(detailPost.endDate)
    )
      return setDetailPost({
        ...detailPost,
        err: "Please add all fields",
        success: "",
      });

    if (new Date(detailPost.startDate) < new Date())
      return setDetailPost({
        ...detailPost,
        err: "The start date must be greater than this date",
        success: "",
      });

    if (detailPost.startDate >= detailPost.endDate)
      return setDetailPost({
        ...detailPost,
        err: "The end date must be greater than the start date",
        success: "",
      });

    setDetailPost({ ...detailPost, err: "", success: "New post was created" });
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
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Donate Post
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
              <span className="fw-bold text-danger">{detailPost.err}</span>
              <span className="fw-bold text-success">{detailPost.success}</span>
              <button type="submit" className="btn btn-primary mt-3">
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
