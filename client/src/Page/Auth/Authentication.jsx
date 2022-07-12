import ActiveUser from "./AcitveUser";
import ForgotPass from "./ForgotPass";
import Login from "./Login";
import Register from "./Register";
import ResetPass from "./ResetPass";

function Authentication(data) {
  const login = data.data;

  return (
    <div className="Login">
      <section className="vh-150">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <h1 className="text-center fw-bold text-primary title-login m-4">
                Donate App <i className="fa-solid fa-circle-dollar-to-slot"></i>
              </h1>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="SampleIMG"
              />
            </div>
            {login === "login" ? <Login /> : ""}
            {login === "register" ? <Register /> : ""}
            {login === "active" ? <ActiveUser /> : ""}
            {login === "forgortpasss" ? <ForgotPass /> : ""}
            {login === "resetpass" ? <ResetPass /> : ""}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Authentication;
