import { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../Actions/UsersAction";
import { isEmpty } from "../validation/Validation";
import "./ModalEditUser.css";

function ModalEditUser(data) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    _id: data.user._id,
    username: data.user.username,
    firstname: data.user.firstname,
    lastname: data.user.lastname,
    activeUser: data.user.activeUser,
    isAdmin: data.user.isAdmin,
    err: "",
    success: "",
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
      er: "",
      success: "",
    });
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, err: "", success: "" });

    if (isEmpty(userInfo.firstname) || isEmpty(userInfo.lastname))
      return setUserInfo({
        ...userInfo,
        err: "Please fill in all fields.",
        success: "",
      });
    setUserInfo({ ...userInfo, err: "", success: "User updated" });
    dispatch(editUser(userInfo));
  };

  return (
    <div
      className="ModalEditUser modal fade"
      id={"editUser" + userInfo._id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold" id="exampleModalLabel">
              Edit User Infomation
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column" onSubmit={handleEditUser}>
              <div className="mb-3">
                <label
                  htmlFor={userInfo._id + "username"}
                  className="form-label fw-bold"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={userInfo._id + "username"}
                  name="username"
                  onChange={(e) => handleChange(e)}
                  value={userInfo.username}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor={userInfo._id + "firstname"}
                  className="form-label fw-bold"
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={userInfo._id + "firstname"}
                  name="firstname"
                  onChange={(e) => handleChange(e)}
                  value={userInfo.firstname}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor={userInfo._id + "lastname"}
                  className="form-label fw-bold"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={userInfo._id + "lastname"}
                  name="lastname"
                  onChange={(e) => handleChange(e)}
                  value={userInfo.lastname}
                />
              </div>

              <h6 className="fw-bold d-flex justify-content-start">
                User status:{"  "}
                {userInfo.activeUser.toString() === "0" ? (
                  <p style={{ color: "purple" }}> Inactive</p>
                ) : userInfo.activeUser.toString() === "1" ? (
                  <p className="text-success"> Active</p>
                ) : userInfo.activeUser.toString() === "2" ? (
                  <p className="text-warning"> User Denied</p>
                ) : (
                  <p className="text-danger"> User Deleted</p>
                )}
              </h6>

              <div className="mb-3 d-flex justify-content-between">
                {/* Inactive */}
                <div className="d-flex flex-column align-items-center">
                  <label htmlFor="activeUser1" className="form-label">
                    Inactive
                  </label>
                  <input
                    type="radio"
                    className="form-control checked-radio-Inactive"
                    id={userInfo._id + "activeUser1"}
                    name="activeUser"
                    onChange={(e) => handleChange(e)}
                    value={0}
                    style={{ width: "3px", height: "3px" }}
                  />
                </div>

                {/* Active */}
                <div className="d-flex flex-column align-items-center">
                  <label htmlFor="activeUser2" className="form-label">
                    Active
                  </label>
                  <input
                    type="radio"
                    className="form-control checked-radio-Active"
                    id={userInfo._id + "activeUser2"}
                    name="activeUser"
                    onChange={(e) => handleChange(e)}
                    value={1}
                    style={{ width: "3px", height: "3px" }}
                  />
                </div>

                {/* Denied User */}
                <div className="d-flex flex-column align-items-center">
                  <label htmlFor="activeUser3" className="form-label">
                    Denied User
                  </label>
                  <input
                    type="radio"
                    className="form-control checked-radio-Denied"
                    id={userInfo._id + "activeUser3"}
                    name="activeUser"
                    onChange={(e) => handleChange(e)}
                    value={2}
                    style={{ width: "3px", height: "3px" }}
                  />
                </div>

                {/* Delete User */}
                <div className="d-flex flex-column align-items-center">
                  <label htmlFor="activeUser4" className="form-label">
                    Delete User
                  </label>
                  <input
                    type="radio"
                    className="form-control checked-radio-Delete"
                    id={userInfo._id + "activeUser4"}
                    name="activeUser"
                    onChange={(e) => handleChange(e)}
                    value={3}
                    style={{ width: "3px", height: "3px" }}
                  />
                </div>
              </div>

              <div className="mb-4 d-flex">
                <span className="m-2 d-flex">
                  Admin:{" "}
                  <p className="fw-bold text-danger">* default will be false</p>
                </span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="isAdmin"
                  onChange={handleChange}
                  defaultValue={false}
                  style={{ width: "30%" }}
                >
                  <option value={true} className="text-center m-2">
                    True
                  </option>
                  <option value={false} className="text-center m-2">
                    False
                  </option>
                </select>
              </div>

              <span className="fw-bold text-danger">{userInfo.err}</span>
              <span className="fw-bold text-success">{userInfo.success}</span>

              <button
                type="submit"
                className="btn btn-primary mt-2"
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

export default ModalEditUser;
