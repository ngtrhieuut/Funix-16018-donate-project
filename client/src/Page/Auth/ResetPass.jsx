import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../Components/Notification/Notification";
import { isLength, isMatch } from "../../Components/validation/Validation";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function ResetPass() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  return (
    <div className="ResetPass col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <h2 className="fw-bold text-success">Reset Your Password</h2>

      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <label htmlFor="password" className="fw-bold text-success">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChangeInput}
          className="border border-3 border-success rounded-pill p-2 m-2 text-center"
        />

        <label htmlFor="cf_password" className="fw-bold text-success">
          Confirm Password
        </label>
        <input
          type="password"
          name="cf_password"
          id="cf_password"
          value={cf_password}
          onChange={handleChangeInput}
          className="border border-3 border-success rounded-pill p-2 m-2 text-center"
        />

        {success && (
          <p className="fw-bold text-primary">
            Return{" "}
            <Link to="/login" className="btn btn-outline-success">
              Login
            </Link>{" "}
            page
          </p>
        )}

        <button
          onClick={handleResetPass}
          className="btn btn-outline-success rounded-pill p-2 m-2"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPass;
