import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const RedirectFailed = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <p className="fs-3">
          {" "}
          <span className="text-danger">Oops!</span> Short Url is not found.
        </p>
        <p className="lead">Automatically Redirecting to home Page Or Click</p>
        <Link to="/" className=" btn btn-danger">
          Go Home
        </Link>
      </div>
    </div>
  );
};

const Redirecting = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
};

const RedirectShortUrl = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { shortUrl } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/urls/${shortUrl}`)
      .then((response) => {
        window.open(response.data.sourceUrl, "_self");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  });

  if (isLoading) {
    return <Redirecting />;
  } else {
    return <RedirectFailed />;
  }
};

export default RedirectShortUrl;
