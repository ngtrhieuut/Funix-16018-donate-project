import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postDonate } from "../../Actions/DonateAction";
import axios from "axios";
import { isEmpty } from "../validation/Validation";

function ModalDonate() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const postName = useSelector((state) =>
    state.postReducer.posts.filter(
      (post) => post._id.toString() === params.postId.toString()
    )
  )[0].title;

  const [donateForm, setDonateForm] = useState({
    userDonateId: user ? user._id : "",
    donatePostId: params.postId,
    status: true,
    donate: "",
    donateNote: "",
    err: "",
    success: "",
  });

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const handleChange = (e) => {
    setDonateForm({ ...donateForm, [e.target.name]: e.target.value });
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();

    setDonateForm({ ...donateForm, err: "", success: "" });

    if (isEmpty(donateForm.donate))
      return setDonateForm({
        ...donateForm,
        err: "Please fill in donate field!",
        success: "",
      });

    try {
      dispatch(postDonate(donateForm));
      const res = await axios.get("/donate");
      const newDonateId = res.data[res.data.length - 1]._id;
      setDonateForm({
        ...donateForm,
        err: "",
        success: `<p style="color: green">Thank you for donating ${formatter.format(
          donateForm.donate
        )} to <br/><b> ${postName}</b>.<br/> Your donation code is: <b>${newDonateId}</b>.<br/> Admin will process and respond via email to you within 24 hours`,
      });
    } catch (err) {
      console.log(err);
    }
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

              <span className="fw-bold text-danger">{donateForm.err}</span>
              {/* <span className="text-success">{donateForm.success}</span> */}
              <div
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{ __html: donateForm.success }}
              ></div>

              <button type="submit" className="btn btn-primary mt-2">
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
