import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPost } from "../../Actions/PostAction";
import ReactPaginate from "react-paginate";
import "./MainContent.css";

function MainContent() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(6);

  const posts = useSelector((state) =>
    state.postReducer.posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    )
  ).filter((post) => post.status === 1);
  const donates = useSelector((state) => state.donateReducer.donates);

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

  function RenderPost({ currentItems }) {
    return (
      <div className="row mt-4 mb-4">
        {currentItems &&
          currentItems.map((post) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-3" key={post._id}>
              <div className="card cardStyle" style={{ width: "22rem" }}>
                <div className="card-body">
                  <h6 className="card-title fw-bold" style={{ height: "80px" }}>
                    {post.title}
                  </h6>
                  <div className="d-flex justify-content-center">
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{ width: "100%" }}
                      className="mt-2 mb-2"
                    />
                  </div>

                  {/* <p className="card-text mb-5" style={{ fontSize: "15px" }}>
                    {hideText(post.desc, 20)}
                  </p> */}
                  <h6 className="text-primary fw-bold fs-6">Detail Donate</h6>
                  <h6 className="">
                    <b>{formatter.format(donated(post._id))}</b> donates/{" "}
                    {formatter.format(post.donatecost)}
                  </h6>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar progress-bar-striped"
                      role="progressbar"
                      style={{
                        width: `${
                          donated(post._id) / post.donatecost > 1
                            ? 100
                            : (donated(post._id) / post.donatecost) * 100
                        }%`,
                      }}
                      aria-valuenow={
                        donated(post._id) / post.donatecost > 1
                          ? 100
                          : (donated(post._id) / post.donatecost) * 100
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <Link
                    to={"/post/" + post._id}
                    className="card-link btn btn-outline-primary"
                    style={{ float: "right" }}
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
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
        <div className="d-flex justify-content-center">
          <RenderPost currentItems={currentItems} />
        </div>
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
  }, [dispatch]);

  return (
    <div className="MainContent container">
      <h1 className="homeTitle text-center text-primary fw-bold m-4">
        List of Donations
      </h1>
      <div className="searchInput d-flex justify-content-between">
        <input
          type="search"
          className="border border-primary rounded-2 p-2 text-center"
          placeholder="Search post's title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="d-flex">
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
            <option value="6" className="text-center m-2">
              6
            </option>
            <option value="9" className="text-center m-2">
              9
            </option>
          </select>
        </div>
      </div>
      <PaginatedItems itemsPerPage={Number(row)} />
    </div>
  );
}

export default MainContent;
