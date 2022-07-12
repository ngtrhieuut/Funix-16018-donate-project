import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Narbar";
import dayjs from "dayjs";
import "./DetailPost.css";
import ModalDonate from "../ModalDonate/ModalDonate";

function DetailPost() {
  const params = useParams();
  const post = useSelector((state) =>
    state.postReducer.posts.find((post) => post._id === params.postId)
  );
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
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

  return (
    <div className="DetailPostMain">
      <Navbar />
      <div className="container">
        <h1 className="homeTitle text-center text-danger fw-bold m-4">
          Detail Donation
        </h1>
        <div className="DetailPost mt-4 mb-4">
          <div className="m-4 d-flex flex-column align-items-center">
            <h3 className="card-title text-primary fw-bold fs-4">
              {post.title}
            </h3>
            <img
              src={post.image}
              alt={post.title}
              style={{ width: "80%" }}
              className="mt-4 mb-4 text-center"
            />
            <p style={{ textAlign: "justify" }}>{post.desc}</p>
          </div>
          <div className="m-4" style={{ width: "100%" }}>
            <div className="card cardStyle p-4">
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
              <div>
                <p>
                  Ngày bắt đầu:{" "}
                  {dayjs(new Date(post.startDate)).format("DD-MM-YYYY")}
                </p>
                <p>
                  Ngày hết hạn:{" "}
                  {dayjs(new Date(post.endDate)).format("DD-MM-YYYY")}
                </p>
              </div>
              {new Date(post.startDate) > new Date() ? (
                <p className="btn btn-outline-warning">
                  This event hasn't started yet
                </p>
              ) : new Date(post.endDate) < new Date() ? (
                <p className="btn btn-outline-danger">This event is over</p>
              ) : donated(post._id) / post.donatecost >= 1 ? (
                <Link to="/" className="btn btn-outline-success">
                  This event has been completed
                </Link>
              ) : isLoggedIn ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={"#donate" + post._id}
                >
                  Donate
                </button>
              ) : (
                <Link
                  to={"/auth/post/" + post._id}
                  className="btn btn-outline-primary"
                >
                  Login to Donate
                </Link>
              )}

              <ModalDonate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPost;
