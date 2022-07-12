import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar(appName) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);

  const { authData, isLoggedIn } = auth;

  const isAdmin = authData ? authData.isAdmin : false;

  const handleLogOut = async (a) => {
    dispatch({ type: "DELETE_TOKEN" });
    dispatch({ type: "LOG_OUT" });
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("LoggedIn");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i
            className="fa-solid fa-circle-dollar-to-slot"
            style={{ fontSize: "30px", color: "white" }}
          ></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAdmin ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fw-bold text-light"
                  aria-current="page"
                  to="/admin"
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link fw-bold text-light"
                  aria-current="page"
                  to="/admin-user"
                >
                  User
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold text-light"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold text-light"
                  aria-current="page"
                  to="/home"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </li>
            </ul>
          )}

          {isLoggedIn ? (
            <div className="d-flex">
              <p className="border border-primary rounded-3 bg-light p-2 m-1 fw-bold text-primary">
                {authData ? authData.firstname + " " + authData.lastname : ""}
              </p>
              <button
                className="btn btn-outline-danger m-1 fw-bold bg-light"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <Link
                to="/login"
                className="btn btn-outline-success m-1 fw-bold bg-light"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-info m-1 fw-bold bg-light"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
