import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalCentered from "../../components/ModalCentered";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [reset_email, setReset_email] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(
        `${process.env.REACT_APP_SERVER_URL}/api/user/password/forgot_password`
      );
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/password/forgot_password`,
        { reset_email },
        { withCredentials: true }
      );
      console.log(data);
      setModalShow(true);
    } catch (error) {
      // alert(error)
      console.log();
      if (error.response.status === 404) {
        toast.error("User email does not exist", error);
      }
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row">
          <div className="col">
            <div
              className="card border-5 border-primary rounded-5 my-5 "
              style={{ minWidth: "350px", minHeight: "400px" }}
            >
              <div className="card-body p-4 p-sm-5">
                <div className="d-flex justify-content-center align-items-center p-1">
                  <h2>URL's Shortner</h2>
                </div>
                <h5 className="card-title text-center mb-3 fw-light font-italic fs-3">
                  Password Reset
                </h5>

                {/* Form - Reset Email */}
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      name="email"
                      value={reset_email}
                      onChange={(event) => setReset_email(event.target.value)}
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter Registered Email"
                      required
                    />
                    <label htmlFor="floatingInput">
                      <span className="text-muted">Registered Email</span>
                    </label>
                  </div>

                  <div className="d-grid m-4">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>

                {/* Sign In or Sign Up */}
                <div className="m-3 text-center">
                  <Link
                    to="/signIn"
                    className="text-secondary text-decoration-none "
                  >
                    <small>LogIn</small>
                  </Link>
                  <span className="text-muted px-3">Or</span>
                  <Link
                    to="/signUp"
                    className="text-secondary text-decoration-none "
                  >
                    <small>Register</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCentered
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          navigate("/signIn");
        }}
        modalTitle="Reset Email Sent."
        message="Reset link has been sent to the registered email."
      />
    </>
  );
};

export default ForgotPassword;
