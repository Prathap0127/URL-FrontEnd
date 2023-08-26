import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalCentered from "../../components/ModalCentered";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const navigate = useNavigate();
  const [, setCookie, removeCookie] = useCookies(["token"]);
  const initialData = { email: "", password: "", remember: false };
  const [modalShow, setModalShow] = useState(false);
  const [loginPayload, setLoginPayload] = useState(initialData);
  const { email, password } = loginPayload;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginPayload({ ...loginPayload, [name]: value });
  };

  const handleError = (err) => toast.error(err);
  const handleSuccess = (msg) => toast.success(msg);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/login`,
        { ...loginPayload },
        { withCredentials: true }
      );
      console.log(data);
      if (data.token) {
        setCookie("token", data.token);
      }
      if (!data.user.verified) return signOut_RedirectToSignIn();

      const { success, message } = data;
      console.log("message", message);
      console.log("success", success);

      if (success) {
        handleSuccess();
        setTimeout(() => {
          navigate("/", 1000);
        });
      } else {
        handleError();
      }
    } catch (error) {
      console.log("\n Error - SignIn : " + error);
      console.log(error.response.data.message);
      error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("" + error);
    }

    setLoginPayload(initialData);
  };

  const signOut_RedirectToSignIn = () => {
    removeCookie("token");
    setModalShow(true);
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row">
          <div className="col mx-auto">
            <div
              className="card border-5 border-primary rounded-5 my-5 "
              style={{ minWidth: "350px", minHeight: "400px" }}
            >
              <div className="card-body p-4 p-sm-5">
                <div className="d-flex justify-content-center align-items-center p-1">
                  <h2>URL's Shortner</h2>
                </div>
                <h5 className="card-title text-center mb-3 fw-light font-italic fs-3">
                  LogIn
                </h5>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Field - User Email */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="floatingInput"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={email}
                      required
                      onChange={(e) => handleOnChange(e)}
                    />
                    <label htmlFor="floatingInput">
                      <span className="text-muted">Email</span>
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={password}
                      required
                      onChange={(e) => handleOnChange(e)}
                    />
                    <label htmlFor="floatingPassword">
                      <span className="text-muted">Password</span>
                    </label>
                  </div>
                  <div className="m-3 text-center">
                    <Link
                      to="/forgotPassword"
                      className="text-secondary text-decoration-none "
                    >
                      <small>Forgot password?</small>
                    </Link>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      LogIn
                    </button>
                  </div>
                </form>

                <div className="m-3 text-center text-muted">
                  <small>
                    <Link
                      to={"/signUp"}
                      className="text-muted text-decoration-none text-capitalize "
                    >
                      Click To Register
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VERTICALLY CENTERED MODEL */}
      <ModalCentered
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          navigate("/signIn");
        }}
        modalTitle="Your Account not Activated "
        message="kindly check your email and verify the account to login in URL's Shortner"
      />
    </>
  );
};

export default SignIn;
