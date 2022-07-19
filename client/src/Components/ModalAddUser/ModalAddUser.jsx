import { useState } from "react";
import axios from "axios";
import { isEmpty, isEmail, isLength, isMatch } from "../validation/Validation";
import { useDispatch } from "react-redux";

function ModalAddUser(data) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    err: "",
    success: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUser({
      ...user,
      err: "",
      success: "",
    });

    console.log(user);

    if (
      isEmpty(user.firstname) ||
      isEmpty(user.password) ||
      isEmpty(user.lastname)
    )
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(user.username))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (isLength(user.password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(user.password, user.confirmpass))
      return setUser({ ...user, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post("/user/add-user", {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
      });

      dispatch({ type: "ADDNEWUSER_SUCCESS", data: res.data.user });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div
      className="ModalAddUser modal fade"
      id="addUser"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold" id="exampleModalLabel">
              Add New User
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  User name
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  name="username"
                  onChange={handleChange}
                  value={user.username}
                  placeholder="Enter a valid email"
                />
              </div>
              {/*Password input*/}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                  placeholder="Enter your password"
                />
              </div>
              {/*Confirm Password*/}
              <div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example7">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    autoComplete="new-password"
                    id="form3Example7"
                    className="form-control form-control-lg"
                    name="confirmpass"
                    onChange={handleChange}
                    value={user.confirmpass}
                    placeholder="Re-Enter you password"
                  />
                </div>

                {/*First Name*/}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example5">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="form3Example5"
                    className="form-control form-control-lg"
                    name="firstname"
                    onChange={handleChange}
                    value={user.firstname}
                    placeholder="Enter First Name"
                  />
                </div>

                {/*Last name*/}
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example6">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="form3Example6"
                    className="form-control form-control-lg"
                    name="lastname"
                    onChange={handleChange}
                    value={user.lastname}
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              {/* Erors message */}
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                }}
              >
                {user.err}
              </span>

              {/* Success message */}
              <span
                style={{
                  color: "Green",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                }}
              >
                {user.success}
              </span>
              <div className="text-center text-lg-start pt-2 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Add New User
                </button>
              </div>
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

export default ModalAddUser;
