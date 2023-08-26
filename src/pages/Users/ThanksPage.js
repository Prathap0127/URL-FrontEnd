import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

const ThanksPage = () => {
  const [, , removeCookie] = useCookies(["token"]);
  const [tokenExpired, setTokenExpired] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = getCookie(`token`);
    try {
      if (isTokenExpired(cookieToken)) {
        navigate("/");
      }
      if (cookieToken) {
        setTokenExpired(isTokenExpired(cookieToken));
      }
    } catch (error) {
      navigate("/");
    }
  }, [navigate]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    // const currentTime = Date.now();
    return decodedToken.exp < Date.now() / 1000;
  }
  function handleCookie() {
    removeCookie("token");
  }

  return (
    <>
      {!tokenExpired ? (
        <div className="container d-flex flex-column gap-3 align-items-center justify-content-center min-vh-100">
          <h1 className="display-6">
            <strong>Thanks for the registration!</strong>
          </h1>
          <Icon icon="mdi:check-circle-outline" color="#b2b2b2" height="130" />
          <p className=" mx-auto w-75 text-center">
            Your account has been created and a verification email has been sent
            to your registered email address. Please click on the verification
            link included in the email to activate your account.
          </p>

          <Link
            to={"/signIn"}
            onClick={handleCookie}
            className="text-danger text-decoration-none blockquote "
          >
            Return to Sign In
          </Link>
        </div>
      ) : (
        <>
          <div className="container d-flex flex-column gap-3 align-items-center justify-content-center min-vh-100">
            <h1 className="display-6">
              <strong>Please Login!</strong>
            </h1>

            <Link
              to={"/signIn"}
              onClick={handleCookie}
              className="text-danger text-decoration-none blockquote "
            >
              Return to Sign In
            </Link>
            <button onClick={handleCookie}>clear cookie</button>
          </div>
        </>
      )}
    </>
  );
};

export default ThanksPage;
