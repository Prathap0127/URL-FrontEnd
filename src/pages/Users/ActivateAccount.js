import axios from "axios";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ActivateAccount = () => {
  const { activationToken } = useParams();
  const [activationStatus, setActivationStatus] = useState("");
  const [isActivated, setIsActivated] = useState();

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/user/activate/${activationToken}`
      )
      .then((response) => response.data)
      .then((data) => {
        console.log("Activate Account:", data);
        if (data.success) {
          setActivationStatus("User Account activated successfully!");
          setIsActivated(true);
        } else {
          setActivationStatus("Account Activation Failed. Please try again.");
          setIsActivated(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setActivationStatus("Check after Sometimes");
      });
  }, [activationToken]);

  console.log(activationStatus);

  return (
    <>
      {isActivated && (
        <div className="container d-flex flex-column gap-3 align-items-center justify-content-center min-vh-100">
          <h1 className="display-6">
            <strong> User Account Activated Successfully! </strong>
          </h1>
          <Icon icon="healthicons:happy-outline" color="#b2b2b2" height="130" />
          <p className=" mx-auto w-75 text-center">
            Your account has been activated successfully.
          </p>

          <Link
            to={"/signIn"}
            className="text-danger text-decoration-none blockquote "
          >
            Return to Sign In
          </Link>
        </div>
      )}

      {!isActivated && (
        <div className="container d-flex flex-column gap-3 align-items-center justify-content-center min-vh-100">
          <h1 className="display-6">
            <strong> UserAccount Activation Failed! </strong>
          </h1>
          <Icon
            icon="icon-park-outline:emotion-unhappy"
            color="#b2b2b2"
            height="130"
          />
          <p className=" mx-auto w-75 text-center">
            Account Activation token is invalid or has expired.
          </p>

          <Link
            to={"/signIn"}
            className="text-danger text-decoration-none blockquote "
          >
            Return to Sign In
          </Link>
        </div>
      )}
    </>
  );
};

export default ActivateAccount;
