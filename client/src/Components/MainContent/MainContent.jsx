import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPost } from "../../Actions/PostAction";
import "./MainContent.css";

function MainContent() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);

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

  useEffect(() => {
    dispatch(getAllPost());
    return posts;
  }, [dispatch, posts]);
  return (
    <div className="MainContent container">
      <h1 className="homeTitle text-center text-primary fw-bold m-4">
        List of Donations
      </h1>
      <div className="row mt-4 mb-4">
        {posts.map((post) => (
          <div
            className="col-sm-12 col-md-6 col-lg-4 mb-3 d-flex justifly-content-center"
            key={post._id}
          >
            <div className="card cardStyle" style={{ width: "22rem" }}>
              <div className="card-body" style={{ position: "relative" }}>
                <h6 className="card-title fw-bold">{post.title}</h6>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%" }}
                  className="mt-2 mb-2"
                />
                <p className="card-text mb-5" style={{ fontSize: "15px" }}>
                  {hideText(post.desc, 20)}
                </p>
                <Link
                  to={"/post/" + post._id}
                  className="card-link btn btn-outline-primary m-3"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                  }}
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
