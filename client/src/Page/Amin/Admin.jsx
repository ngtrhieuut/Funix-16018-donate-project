import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Narbar";
import ModalEdit from "../../Components/ModalEdit/ModalEdit";
import ModalDelete from "../../Components/ModalDelete/ModalDelete";
import { getAllPost } from "../../Actions/PostAction";
import { getAllDonate } from "../../Actions/DonateAction";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ModalAddPost from "../../Components/ModalAddPost/ModalAddPost";
import ReactPaginate from "react-paginate";

function Admin() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(5);

  const user = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) =>
    state.postReducer.posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    )
  );
  const donates = useSelector((state) => state.donateReducer.donates);

  const hideText = (text, number) => {
    if (text.split(" ")) {
      if (text.split(" ").length <= number) {
        return text;
      } else {
        const arr = text.split(" ").slice(0, number);
        arr.push("...");
        return arr.join(" ");
      }
    }
    return text;
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const donated = (postId) => {
    const donateArr = donates.filter(
      (donate) => donate.donatePostId === postId
    );
    let donate = 0;
    if (donateArr) {
      for (let i = 0; i < donateArr.length; i++) {
        donate += donateArr[i].donate;
      }
      return donate;
    } else return donate;
  };

  //group users for pagination
  function RenderPosts({ currentItems }) {
    return (
      <tbody>
        {currentItems &&
          currentItems.map((post) => (
            <tr key={post._id}>
              <td style={{ width: "40%" }}>{hideText(post.title, 20)}</td>
              {/* <td style={{ width: "20%" }}>
                {post.desc ? hideText(post.desc, 20) : ""}
                {post.desc ? <div dangerouslySetInnerHTML={{ __html: post.desc }}></div> : ""}
              </td> */}
              <td style={{ width: "10%" }} className="align-middle text-center">
                {post.image ? (
                  <img
                    src={post.image}
                    style={{ width: "80%" }}
                    alt={post.title}
                  />
                ) : (
                  <></>
                )}
              </td>
              <td style={{ width: "10%" }} className="text-center align-middle">
                {formatter.format(post.donatecost)}
              </td>
              <td style={{ width: "10%" }} className="text-center align-middle">
                {dayjs(new Date(post.startDate)).format("YYYY-MM-DD")}
                <br />
                {dayjs(new Date(post.endDate)).format("YYYY-MM-DD")}
              </td>
              <td style={{ width: "10%" }} className="text-center align-middle">
                {post.status.toString() === "1" ? (
                  <div className="d-flex justify-content-center">
                    <button className="btn-active m-1"></button>
                    <p className="m-1">Actived</p>
                  </div>
                ) : post.status.toString() === "0" ? (
                  <div className="d-flex justify-content-center">
                    <button className="btn-inactive m-1"></button>
                    <p className="m-1">Inactive</p>
                  </div>
                ) : post.status.toString() === "2" ? (
                  <div className="d-flex justify-content-center">
                    <button className="btn-denied m-1"></button>
                    <p className="m-1">Pending</p>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <button className="btn-deleted m-1"></button>
                    <p className="m-1">Deleted</p>
                  </div>
                )}
              </td>
              <td style={{ width: "10%" }} className="text-center align-middle">
                {formatter.format(donated(post._id))}
              </td>
              <td style={{ width: "5%" }} className="align-middle">
                <div className="align-middle text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={"#post" + post._id}
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <ModalEdit post={post} user={user} />
                </div>
              </td>
              <td className="align-middle text-center" style={{ width: "5%" }}>
                {donated(post._id) > 0 ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={"#deletePost" + post._id}
                    disabled
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={"#deletePost" + post._id}
                  >
                    Delete
                  </button>
                )}

                <ModalDelete post={post} />
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
      setCurrentItems(posts.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(posts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % posts.length;
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
              <th scope="col" className="text-center">
                Title
              </th>
              {/* <th scope="col" className="text-center">
                Description
              </th> */}
              <th scope="col" className="text-center">
                Image
              </th>
              <th scope="col" className="text-center">
                Max value
              </th>
              <th scope="col" className="text-center">
                Time range
              </th>
              <th scope="col" className="text-center">
                Status
              </th>
              <th scope="col" className="text-center">
                Donated
              </th>
              <th scope="col" className="text-center">
                Edit
              </th>
              <th scope="col" className="text-center">
                Delete
              </th>
            </tr>
          </thead>
          <RenderPosts currentItems={currentItems} />
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
    dispatch(getAllPost());
    dispatch(getAllDonate());
  }, [dispatch]);

  return (
    <div className="Admin">
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
            data-bs-target="#addPost"
          >
            Add post
          </button>
          <ModalAddPost />

          <div className="searchInput">
            <input
              type="search"
              className="border border-primary rounded-2 p-2 text-center"
              placeholder="Search post's title"
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

export default Admin;
