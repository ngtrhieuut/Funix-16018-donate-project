import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { logIn } from "../../Actions/AuthAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import FacebookLogin from "react-facebook-login";

function SignInWithOrtherNetwork() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
    err: "",
    success: "",
  });
  const responseGoogle = async (response) => {
    console.log(response);
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      console.log(123);

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("isLoggedIn", true);

      dispatch(logIn());
      navigate("/", { replace: true });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  // const responseFacebook = async (response) => {
  //   try {
  //     const { accessToken, userID } = response;
  //     const res = await axios.post("/user/facebook_login", {
  //       accessToken,
  //       userID,
  //     });

  //     setUser({ ...user, error: "", success: res.data.msg });
  //     localStorage.setItem("isLoggedIn", true);

  //     dispatch(logIn());
  //     navigate("/", { replace: true });
  //   } catch (err) {
  //     err.response.data.msg &&
  //       setUser({ ...user, err: err.response.data.msg, success: "" });
  //   }
  // };

  return (
    <div className="SignInWithOrtherNetwork mt-5">
      <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
        {/* <button type="button" className="btn btn-primary btn-floating mx-1">
          <i className="fab fa-facebook-f"></i>
        </button> */}
        <GoogleLogin
          clientId="820524117638-nfdf3pn8qai18h4n0f7lrocpm9ujvnj1.apps.googleusercontent.com"
          buttonText="Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Or</p>
      </div>
    </div>
  );
}

export default SignInWithOrtherNetwork;
