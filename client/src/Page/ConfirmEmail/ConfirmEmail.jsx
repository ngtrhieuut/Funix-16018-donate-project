import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { confirmEmail } from "../../Actions/AuthAction";

function ConfirmEmail() {
  const params = useParams();
  const dispatch = useDispatch();

  const formData = {
    userId: params.userId,
    token: params.token,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(confirmEmail(formData));
  };
  return (
    <div className="ConfirmEmail">
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
              <form
                onSubmit={handleSubmit}
                className="d-flex justify-content-center"
              >
                <input type="hidden" name="userId" value={formData.userId} />
                <input type="hidden" name="token" value={formData.token} />
                <button
                  type="submit"
                  className="btn btn-outline-primary p-3 fw-bold"
                >
                  {" "}
                  Click here to active your email
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ConfirmEmail;
