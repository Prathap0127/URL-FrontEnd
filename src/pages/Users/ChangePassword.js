import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [resetPasswordPayload, setResetPasswordPayload] = useState({
    resetToken,
    password: "",
    confirmPassword: "",
  });
  // console.log(resetPasswordPayload)//Test

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // throw Error when Password does not match
    if (
      resetPasswordPayload.password !== resetPasswordPayload.confirmPassword
    ) {
      toast.error(`Password does not match`);
      return true;
    }

    // throw Error when Password length is less than 8
    if (resetPasswordPayload.password.length < 8) {
      toast.error(`Password must be minimum 8 characters`);
      return true;
    }

    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/password/reset/${resetToken}`,
        { ...resetPasswordPayload },
        { withCredentials: true }
      )
      .then(function (response) {
        // Handle successful response
        if (response.data.success === true) {
          setTimeout(() => {
            navigate("/signIn");
          }, 2000);
          toast.success("Password Updated Sucessfully");
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          return toast.error("User email does not exist", error);
        }
        toast.error(error.response.data);
        setTimeout(() => {
          navigate("/signIn");
        }, 1000);
      });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordPayload({
      ...resetPasswordPayload,
      [name]: value,
    });
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
                  Change Password
                </h5>

                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="floatingPassword1"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={resetPasswordPayload.password}
                      required
                      onChange={(event) => handleOnChange(event)}
                    />
                    <label htmlFor="floatingPassword">
                      <span className="text-muted">Enter New Password</span>
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingconfirmPassword"
                      placeholder="Password"
                      name="confirmPassword"
                      value={resetPasswordPayload.confirmPassword}
                      onChange={(event) => handleOnChange(event)}
                    />
                    <label htmlFor="floatingPassword">
                      <span className="text-muted">Re-Enter Password</span>
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      disabled={
                        resetPasswordPayload.password === "" ||
                        resetPasswordPayload.confirmPassword === ""
                      }
                      type="submit"
                    >
                      Update Password
                    </button>
                  </div>
                </form>

                <div className="m-3 text-center text-muted">
                  <small>
                    Existing User?{" "}
                    <Link
                      to={"/signIn"}
                      className="text-muted text-decoration-none text-capitalize "
                    >
                      Click LogIn
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
