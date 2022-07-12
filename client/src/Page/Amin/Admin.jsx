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

function Admin() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
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

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getAllDonate());
    return posts;
  }, [dispatch, posts]);

  return (
    <div className="Admin">
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

        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="text-center">
                #
              </th>
              <th scope="col" className="text-center">
                Title
              </th>
              <th scope="col" className="text-center">
                Description
              </th>
              <th scope="col" className="text-center">
                Image
              </th>
              <th scope="col" className="text-center">
                Max value
              </th>
              <th scope="col" className="text-center">
                Start
              </th>
              <th scope="col" className="text-center">
                End
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
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <th className="text-center align-middle" scope="row">
                  {index + 1}
                </th>
                <td style={{ width: "20%" }}>{hideText(post.title, 20)}</td>
                <td style={{ width: "20%" }}>
                  {post.desc ? hideText(post.desc, 20) : ""}
                </td>
                <td style={{ width: "10%" }}>
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
                <td
                  style={{ width: "10%" }}
                  className="text-center align-middle"
                >
                  {formatter.format(post.donatecost)}
                </td>
                <td
                  style={{ width: "10%" }}
                  className="text-center align-middle"
                >
                  {dayjs(new Date(post.startDate)).format("YYYY-MM-DD")}
                </td>
                <td
                  style={{ width: "10%" }}
                  className="text-center align-middle"
                >
                  {dayjs(new Date(post.endDate)).format("YYYY-MM-DD")}
                </td>
                <td
                  style={{ width: "10%" }}
                  className="text-center align-middle"
                >
                  {formatter.format(donated(post._id))}
                </td>
                <td
                  className="align-middle text-center"
                  style={{ width: "5%" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={"#post" + index}
                  >
                    Edit
                  </button>
                  <ModalEdit post={post} index={index} user={user} />
                </td>
                <td
                  className="align-middle text-center"
                  style={{ width: "5%" }}
                >
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={"#deletePost" + index}
                  >
                    Delete
                  </button>
                  <ModalDelete post={post} index={index} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
