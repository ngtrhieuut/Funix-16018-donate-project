import { useState } from "react";
import axios from "axios";
import { isEmail } from "../../Components/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../Components/Notification/Notification";

const initialState = {
  username: "",
  err: "",
  success: "",
};

function ForgotPass() {
  const [data, setData] = useState(initialState);

  const { username, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(username))
      return setData({ ...data, err: "Invalid emails.", success: "" });

    try {
      const res = await axios.post("/user/forgot", { username });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="ForgotPasa col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <h2 className="fw-bold text-warning">Forgot Your Password?</h2>

      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <label htmlFor="username" className="text-warning mt-2 mb-2">
          Enter your username (email) address
        </label>
        <input
          type="email"
          name="username"
          id="username"
          value={username}
          onChange={handleChangeInput}
          className="border border-3 border-warning rounded-pill p-2 m-2 text-center"
        />
        <button
          onClick={forgotPassword}
          className="btn btn-outline-warning rounded-pill p-2 m-2"
        >
          Verify your email
        </button>
      </div>
    </div>
  );
}

export default ForgotPass;
