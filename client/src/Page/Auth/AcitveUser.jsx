import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showErrMsg } from "../../Components/Notification/Notification";
import axios from "axios";

function ActiveUser() {
  const { token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState("none");

  const handleShow = () => {
    show === "none" ? setShow("block") : setShow("none");
  };

  useEffect(() => {
    if (token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", { token });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [token]);

  return (
    <div className="ActiveUser col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <button
        className="text-center btn btn-outline-success"
        onClick={handleShow}
      >
        Click here to active your email
      </button>
      <h1 style={{ display: show }}>
        {err
          ? err && showErrMsg(err)
          : success && (
              <div className="fw-bold text-success m-2">
                <p>{success}</p>
                <Link to="/login" className="btn btn-outline-success">
                  Login
                </Link>
              </div>
            )}
      </h1>
    </div>
  );
}

export default ActiveUser;
