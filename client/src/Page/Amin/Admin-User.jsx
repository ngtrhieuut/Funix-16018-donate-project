import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Actions/UsersAction";
import Navbar from "../../Components/Navbar/Narbar";
import "./Admin.css";

function AdminUser() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.authData);
  const { users, loading } = useSelector((state) => state.usersReducer);

  console.log(users);

  const doantes = useSelector((state) => state.donateReducer.donates);
  const posts = useSelector((state) => state.postReducer.posts);

  const userDonated = (id) => {
    const donate = doantes.filter((data) => data.userDonateId === id);
    for (let i = 0; i < donate.length; i++) {
      donate[i].postName = posts.find(
        (data) => data._id === donate[i].donatePostId
      );
    }
    return donate;
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <div className="AdminUser">
      <Navbar />
      <div className="container">
        <h3 className="text-center m-4 text-uppercase text-primary fw-bold">
          donate application management system
        </h3>

        <div className="introduce mb-4">
          <h4>
            Admin:{" "}
            <span className="fw-bold">
              {user.firstname + " " + user.lastname}
            </span>
          </h4>
        </div>

        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col" className="text-center">
                Active User
              </th>
              <th scope="col" className="text-center">
                Show Donated
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? "Loading..."
              : users.map((user, index) =>
                  !user.isAdmin ? (
                    <tr key={index}>
                      <td style={{ width: "30%" }}>{user.username}</td>
                      <td style={{ width: "20%" }}>{user.firstname}</td>
                      <td style={{ width: "20%" }}>{user.lastname}</td>
                      <td
                        style={{ width: "15%" }}
                        className="text-center align-middle"
                      >
                        {user.activeUser ? (
                          <div className="d-flex justify-content-center">
                            <button className="btn-active m-1"></button>
                            <p className="m-1">Actived</p>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-center">
                            <button className="btn-inactive m-1"></button>
                            <p className="m-1">Inactive</p>
                          </div>
                        )}
                      </td>

                      <td
                        style={{ width: "15%" }}
                        className="text-center align-middle"
                      >
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={"#showUser" + user._id}
                        >
                          Show
                        </button>
                        <div
                          className="modal fade"
                          id={"showUser" + user._id}
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title fw-bold text-primary"
                                  id="exampleModalLabel"
                                >
                                  {user.username}
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <table className="table table-striped">
                                  <thead className="thead-dark">
                                    <tr>
                                      <th scope="col">Post title</th>
                                      <th scope="col">Donated</th>
                                      <th scope="col">Donate Note</th>
                                      <th scope="col" className="text-center">
                                        Date
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {userDonated(user._id).map(
                                      (donate, index) => (
                                        <tr key={index}>
                                          {donate.postName ? (
                                            <td>{donate.postName.title}</td>
                                          ) : (
                                            "..."
                                          )}
                                          <td>
                                            {formatter.format(donate.donate)}
                                          </td>
                                          <td>{donate.donateNote}</td>
                                          <td>
                                            {donate.createdAt.slice(0, 10)}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
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
                      </td>
                    </tr>
                  ) : (
                    ""
                  )
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUser;
