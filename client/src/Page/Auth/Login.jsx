import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SignInWithOrtherNetwork from "./SignInWithOrtherNetwork";
import { logIn } from "../../Actions/AuthAction";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authReducer);
  const { loading } = auth;
  const [user, setUser] = useState({
    username: "",
    password: "",
    err: "",
    success: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", {
        username: user.username,
        password: user.password,
      });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("LoggedIn", true);

      const LoggedIn = localStorage.getItem("LoggedIn");
      if (LoggedIn) {
        const getToken = async () => {
          const res = await axios.post("/user/refresh_token", null);
          dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
        };
        getToken();
      }

      dispatch(logIn());
      navigate("/", { replace: true });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="Login col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <SignInWithOrtherNetwork />
      <form onSubmit={handleSubmit}>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">
            User name
          </label>
          <input
            type="email"
            id="form3Example3"
            className="form-control form-control-lg"
            name="username"
            onChange={handleChange}
            value={user.username}
            placeholder="Enter a valid email"
          />
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="form3Example4">
            Password
          </label>
          <input
            type="password"
            id="form3Example4"
            className="form-control form-control-lg"
            name="password"
            onChange={handleChange}
            value={user.password}
            placeholder="Enter your password"
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Link to="/forgot-password" className="text-body">
            Forgot password?
          </Link>
        </div>

        <span
          style={{
            color: "red",
            fontSize: "12px",
            alignSelf: "flex-end",
            marginRight: "5px",
          }}
        >
          {user.err}
        </span>

        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
      <div className="text-center text-lg-start mt-4 pt-2">
        <p className="small fw-bold mt-2 pt-1 mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="btn btn-outline-danger">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
