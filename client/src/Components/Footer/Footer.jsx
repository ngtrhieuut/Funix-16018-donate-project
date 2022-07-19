import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      className="container-flud Footer"
      style={{ bottom: "0", width: "100%" }}
    >
      <footer className="text-center text-white bg-primary pb-5">
        <section className="mt-5">
          <div className="row text-center d-flex justify-content-center pt-5">
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link
                  to="/home"
                  className="btn btn-outline-primary bg-light fw-bold"
                >
                  HOME
                </Link>
              </h6>
            </div>
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link
                  to="/profile"
                  className="btn btn-outline-primary bg-light fw-bold"
                >
                  PROFILE
                </Link>
              </h6>
            </div>
          </div>
        </section>

        <hr className="my-5" />

        <section className="text-center">
          <a
            href="https://www.facebook.com/ngtrhieuut/"
            className="text-white me-4"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/ngtrhieuut/"
            className="text-white me-4"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/ngtrhieuut/"
            className="text-white me-4"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/ngtrhieuut/"
            className="text-white me-4"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
