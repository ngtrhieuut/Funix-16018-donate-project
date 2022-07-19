import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../validation/Validation";
import { editUser } from "../../Actions/UsersAction";

function ProfileContent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.authReducer.loading);
  const doantes = useSelector((state) => state.donateReducer.donates);
  const posts = useSelector((state) => state.postReducer.posts);

  const { _id, username, firstname, lastname, activeUser, isAdmin } = user;

  const [data, setData] = useState({
    _id: _id,
    username: username,
    firstname: firstname,
    lastname: lastname,
    activeUser: activeUser,
    isAdmin: isAdmin,
    err: "",
    success: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // filter donate by user
  const userDonated = (id) => {
    const donate = doantes.filter((data) => data.userDonateId === id);
    for (let i = 0; i < donate.length; i++) {
      donate[i].postName = posts.find(
        (data) => data._id === donate[i].donatePostId
      );
    }
    return donate;
  };

  //format currency render
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const handleEditUser = (e) => {
    e.preventDefault();
    console.log(data);
    if (isEmpty(data.firstname) || isEmpty(data.lastname))
      return setData({ ...data, err: "Please fill all fields" });
    try {
      dispatch(editUser(data));
      dispatch({ type: "UPDATEPROFILE_SUCCESS", data: data });
      setData({ ...data, err: "", success: "User was updated!" });
    } catch (err) {
      console.log(err);
      setData({ ...data, err: "update failed!", success: "" });
    }
  };

  return (
    <div className="container mt-4 ProfileContent">
      <div className="row g-2">
        {/* left card */}
        <div className="col-md-3 col-sm-12">
          <div className="card cardStyle">
            <div className="card-body">
              <h5 className="card-title fw-bold text-primary">
                User Infomation
              </h5>
              {loading ? (
                <div>"Loading..."</div>
              ) : (
                <div className="d-flex flex-column mt-4">
                  <p>
                    Username: <span className="fw-bold">{user.username}</span>
                  </p>
                  <p>
                    Full Name:{" "}
                    <span className="fw-bold">
                      {user.firstname + " " + user.lastname}
                    </span>
                  </p>
                </div>
              )}

              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target={"#edit" + user._id}
                style={{ float: "right" }}
              >
                <i className="fa-solid fa-pen"></i>
              </button>

              <div
                className="modal fade"
                id={"edit" + user._id}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Edit user infomation
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form
                        className="d-flex flex-column"
                        onSubmit={handleEditUser}
                      >
                        <div className="mb-3">
                          <label
                            htmlFor={user._id + "username"}
                            className="form-label fw-bold"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={user._id + "username"}
                            name="username"
                            onChange={(e) => handleChange(e)}
                            value={data.username}
                            disabled
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor={user._id + "firstname"}
                            className="form-label fw-bold"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={user._id + "firstname"}
                            name="firstname"
                            onChange={(e) => handleChange(e)}
                            value={data.firstname}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor={user._id + "lastname"}
                            className="form-label fw-bold"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={user._id + "lastname"}
                            name="lastname"
                            onChange={(e) => handleChange(e)}
                            value={data.lastname}
                          />
                        </div>
                        <span className="fw-bold text-danger">{data.err}</span>
                        <span className="fw-bold text-success">
                          {data.success}
                        </span>

                        <button type="submit" className="btn btn-primary mt-2">
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
            </div>
          </div>
        </div>

        {/* right card */}
        <div className="col-sm-12 col-md-9">
          <div className="card cardStyle">
            <div className="card-body">
              <h5 className="card-title fw-bold text-primary text-center">
                History of user's donated
              </h5>
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "40%" }}
                    >
                      Post title
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "20%" }}
                    >
                      Donated
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "20%" }}
                    >
                      Donate Note
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "20%" }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userDonated(_id).map((donate) => (
                    <tr key={donate._id}>
                      {donate.postName ? (
                        <td>{donate.postName.title}</td>
                      ) : (
                        <td>...</td>
                      )}
                      <td className="text-center">
                        {formatter.format(donate.donate)}
                      </td>
                      <td className="text-center">{donate.donateNote}</td>
                      <td className="text-center">
                        {donate.createdAt.slice(0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
