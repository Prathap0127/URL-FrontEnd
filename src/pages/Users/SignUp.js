import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const initialSignUpPayload = { name: "", email: "", password: "" };
  const [signUpPayload, setSignUpPayload] = useState(initialSignUpPayload);
  const { name, email, password } = signUpPayload;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSignUpPayload({
      ...signUpPayload,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/register`,
        { ...signUpPayload },
        { withCredentials: true }
      );

      // console.log(data)

      const { success, message } = data;

      if (success) {
        toast.success(message);
        setTimeout(() => {
          navigate("/success");
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("\n Error - SignUp : " + error);
      console.log(error.response.data.message);
      error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("" + error);
    }

    setSignUpPayload(initialSignUpPayload);
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
                  Register
                </h5>

                {/* FORM - Sign Up */}
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="floatingInputName"
                      placeholder="User Name"
                      type="text"
                      name="name"
                      value={name}
                      required
                      onChange={(event) => handleOnChange(event)}
                    />
                    <label htmlFor="floatingInput">
                      <span className="text-muted">User Name</span>
                    </label>
                  </div>

                  {/* Email */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={email}
                      required
                      onChange={(event) => handleOnChange(event)}
                    />
                    <label htmlFor="floatingInput">
                      <span className="text-muted">Email</span>
                    </label>
                  </div>

                  {/* Password */}
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={password}
                      required
                      onChange={(event) => handleOnChange(event)}
                    />
                    <label htmlFor="floatingPassword">
                      <span className="text-muted">Password</span>
                    </label>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <div className="m-3 text-center text-muted">
                  <small>
                    Existing User?{" "}
                    <Link to={"/signIn"} className="text-muted">
                      Sign In
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

export default SignUp;
