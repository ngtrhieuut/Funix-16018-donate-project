import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Actions/AuthAction";

function Navbar(appName) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);

  let admin = false;
  if (user) {
    admin = user.user.isAdmin;
  }

  const handleLogOut = (a) => {
    dispatch(logout());
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
          {admin ? (
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
                  className="nav-link active fw-bold text-light"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
            </ul>
          )}

          {user.user.activeUser ? (
            <div className="d-flex justifly-content-center">
              <p className="border border-primary rounded-3 bg-light p-2 m-1 fw-bold text-primary">
                {user.user.firstname + " " + user.user.lastname}
              </p>
              <button
                className="btn btn-outline-danger m-1 fw-bold bg-light"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="btn btn-outline-success m-1 fw-bold bg-light"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
