import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
import { signUp } from "../../Actions/AuthAction";
import { getAllUser } from "../../Actions/UsersAction";
import "./Auth.css";
import * as AuthApi from "../../API/AuthRequest.js";

function Auth() {
  // const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const users = useSelector((state) => state.usersReducer.users);
  const [login, setLogin] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const logInAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.logIn(formData);
      dispatch({ type: "AUTH_SUCCESS", data: data });
      navigate("../home", { replace: true });
    } catch (error) {
      console.log(error);
      setMessage("Wrong password!!");
      dispatch({ type: "AUTH_FAIL" });
    }
  };

  const handleChange = (e) => {
    setMessage("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!login) {
      if (
        data.password === data.confirmpass &&
        data.firstname !== "" &&
        data.lastname !== "" &&
        data.password !== "" &&
        data.username !== ""
      ) {
        if (data.password.length < 6) {
          setMessage("Password must be at least 6 characters");
        } else {
          dispatch(signUp(data));
          setMessage("");
          setSuccess("Check your email to verify your account!");
        }
      } else {
        setMessage("Somthing went wrong ?!? Please check your infomation!!");
      }
    } else {
      if (data.username !== "" && data.password !== "") {
        const user = users.find((user) => user.username === data.username);
        if (user) {
          if (user.activeUser) {
            dispatch(logInAction(data));
          } else {
            setMessage(
              "Your account have not active, please check your email to active you account"
            );
          }
        } else {
          setMessage("Your account is invalid");
        }
      }
    }
  };

  const resetForm = () => {
    setMessage("");
    setSuccess("");
    setData({
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      username: "",
    });
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  return (
    <section className="vh-150">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <h1 className="text-center fw-bold text-primary title-login">
              Donate App <i className="fa-solid fa-circle-dollar-to-slot"></i>
            </h1>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="SampleIMG"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-google"></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

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
                  value={data.username}
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
                  value={data.password}
                  placeholder="Enter your password"
                />
              </div>

              {!login ? (
                <div>
                  {/* <!-- First Name --> */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example7">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      id="form3Example7"
                      className="form-control form-control-lg"
                      name="confirmpass"
                      onChange={handleChange}
                      value={data.confirmpass}
                      placeholder="Re-Enter you password"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example5">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="form3Example5"
                      className="form-control form-control-lg"
                      name="firstname"
                      onChange={handleChange}
                      value={data.firstname}
                      placeholder="Enter First Name"
                    />
                  </div>

                  {/* <!-- Last name --> */}
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example6">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="form3Example6"
                      className="form-control form-control-lg"
                      name="lastname"
                      onChange={handleChange}
                      value={data.lastname}
                      placeholder="Enter Last Name"
                    />
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>
              )}

              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                }}
              >
                {message}
              </span>
              <span
                style={{
                  color: "green",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                }}
              >
                {loading ? "Loading..." : success}
              </span>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : !login ? "Sign Up" : "Login"}
                </button>
              </div>
            </form>
            {login ? (
              <div className="text-center text-lg-start mt-4 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      setLogin(false);
                      resetForm();
                    }}
                  >
                    Register
                  </button>
                </p>
              </div>
            ) : (
              <div className="text-center text-lg-start mt-4 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account.{" "}
                  <button
                    className="btn btn-outline-success"
                    onClick={(e) => {
                      setLogin(true);
                      resetForm();
                    }}
                  >
                    Login
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auth;
