import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Actions/UsersAction";
import ModalAddUser from "../../Components/ModalAddUser/ModalAddUser";
import ModalEditUser from "../../Components/ModalEditUser/ModalEditUser";
import Navbar from "../../Components/Navbar/Narbar";
import ReactPaginate from "react-paginate";
import "./Admin.css";

function AdminUser() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(5);

  const user = useSelector((state) => state.authReducer.authData);
  const { loading } = useSelector((state) => state.usersReducer);
  const users = useSelector((state) =>
    state.usersReducer.users.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    )
  );

  const doantes = useSelector((state) => state.donateReducer.donates);
  const posts = useSelector((state) => state.postReducer.posts);

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

  //group users for pagination
  function RenderUsers({ currentItems }) {
    return (
      <tbody>
        {currentItems &&
          currentItems.map((user) => (
            <tr key={user._id}>
              <td style={{ width: "30%" }} className="align-middle">
                {user.username}
              </td>
              <td style={{ width: "15%" }} className="align-middle">
                {user.firstname + " " + user.lastname}{" "}
              </td>
              <td style={{ width: "15%" }} className="align-middle text-center">
                {user.isAdmin ? "Admin" : ""}
              </td>
              <td style={{ width: "15%" }} className="text-center align-middle">
                {user.activeUser.toString() === "1" ? (
                  <div className="d-flex justify-content-center">
                    <button className="btn-active m-1"></button>
                    <p className="m-1">Actived</p>
                  </div>
                ) : user.activeUser.toString() === "0" ? (
                  <div className="d-flex justify-content-center">
                    <button className="btn-inactive m-1"></button>
                    <p className="m-1">Inactive</p>
                  </div>
                ) : user.activeUser.toString() === "2" ? (
                  <div className="d-flex justify-content-center">
                    <button className="btn-denied m-1"></button>
                    <p className="m-1">User Denied</p>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <button className="btn-deleted m-1"></button>
                    <p className="m-1">User Deleted</p>
                  </div>
                )}
              </td>

              <td style={{ width: "15%" }}>
                <div className="text-center align-middle">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={"#showUser" + user._id}
                  >
                    Show
                  </button>
                </div>

                <div
                  className="modal fade"
                  id={"showUser" + user._id}
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
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
                              <th scope="col" className="text-center">
                                Post title
                              </th>
                              <th scope="col" className="text-center">
                                Donated
                              </th>
                              <th scope="col" className="text-center">
                                Donate Note
                              </th>
                              <th scope="col" className="text-center">
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {userDonated(user._id).map((donate) => (
                              <tr key={donate._id}>
                                {donate.postName ? (
                                  <td style={{ width: "45%" }}>
                                    {donate.postName.title}
                                  </td>
                                ) : (
                                  <td style={{ width: "40%" }}>...</td>
                                )}
                                <td
                                  style={{ width: "20%" }}
                                  className="text-center"
                                >
                                  {formatter.format(donate.donate)}
                                </td>
                                <td style={{ width: "15%" }}>
                                  {donate.donateNote}
                                </td>
                                <td
                                  style={{ width: "20%" }}
                                  className="text-center"
                                >
                                  {donate.createdAt.slice(0, 10)}
                                </td>
                              </tr>
                            ))}
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
              <td style={{ width: "10%" }} className="align-middle">
                <div className="text-center">
                  <button
                    className={
                      user.isAdmin
                        ? "btn btn-outline-primary disabled"
                        : "btn btn-outline-primary"
                    }
                    data-bs-toggle="modal"
                    data-bs-target={"#editUser" + user._id}
                  >
                    Edit
                  </button>
                </div>
                <ModalEditUser user={user} />
              </td>
            </tr>
          ))}
      </tbody>
    );
  }

  //set pagination
  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(users.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(users.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % users.length;
      // console.log(
      //   `User requested page number ${event.selected}, which is offset ${newOffset}`
      // );
      setItemOffset(newOffset);
    };
    return (
      <div className="d-flex flex-column align-items-center">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Full Name</th>
              <th scope="col" className="text-center">
                Admin
              </th>
              <th scope="col" className="text-center">
                Active User
              </th>
              <th scope="col" className="text-center">
                Show Donated
              </th>
              <th scope="col" className="text-center">
                Edit User
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td>Loading...</td>
              </tr>
            </tbody>
          ) : (
            <RenderUsers currentItems={currentItems} />
          )}
        </table>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }

  const handleRowChange = (e) => {
    setRow(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <div className="AdminUser">
      <Navbar />
      <div className="container d-flex flex-column">
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
          <button
            type="button"
            className="btn btn-outline-success"
            data-bs-toggle="modal"
            data-bs-target="#addUser"
          >
            Add User
          </button>
          <ModalAddUser />

          <div className="searchInput">
            <input
              type="search"
              className="border border-primary rounded-2 p-2 text-center"
              placeholder="Search username"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 d-flex">
          <span className="m-2">Select number of rows</span>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleRowChange}
            style={{ width: "1%" }}
          >
            <option value="3" className="text-center m-2">
              3
            </option>
            <option value="5" className="text-center m-2">
              5
            </option>
            <option value="8" className="text-center m-2">
              8
            </option>
          </select>
        </div>

        <PaginatedItems itemsPerPage={Number(row)} />
      </div>
    </div>
  );
}

export default AdminUser;
