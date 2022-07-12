import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postDonate } from "../../Actions/DonateAction";

function ModalDonate() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);

  const [donateForm, setDonateForm] = useState({
    userDonateId: user ? user._id : "",
    donatePostId: params.postId,
    status: true,
    donate: "",
    donateNote: "",
  });

  const handleChange = (e) => {
    setDonateForm({ ...donateForm, [e.target.name]: e.target.value });
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    dispatch(postDonate(donateForm));
  };

  return (
    <div
      className="modal fade"
      id={"donate" + params.postId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Donate
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column" onSubmit={handleDonateSubmit}>
              <input
                type="hidden"
                className="form-control"
                name="userDonateId"
                value={user ? user._id : ""}
              />
              <input
                type="hidden"
                className="form-control"
                name="donatePostId"
                value={params.postId}
              />
              <div className="mb-3">
                <label htmlFor="donateValue" className="form-label">
                  Donate value
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="donateValue"
                  name="donate"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="donateNote" className="form-label">
                  Note
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="donateNote"
                  name="donateNote"
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Donate
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
          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
}

export default ModalDonate;
