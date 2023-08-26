import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { formatISO9075 } from "date-fns";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";
import copy from "copy-to-clipboard";
import { useCookies } from "react-cookie";

import "./table.css";

const ShortUrlDataTable = (props) => {
  const [clicked, setClicked] = useState(false);
  const currentUrl = window.location.href;
  const [total_items, setTotal_items] = useState(0);
  const [myShortUrl, setMyShortUrl] = useState([]);

  // Pagination
  const [page] = useState(1);

  // Cookies
  const [cookies] = useCookies([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/urls?page=${page}`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          token: cookies.token,
        },
      })
      .then((response) => {
        setTotal_items(response.data.count);
        setMyShortUrl(response.data.items);
      })
      .catch((error) => {
        console.log("UseEffect Error");
        console.log(error);
        if (error.message === "jwt expired") {
          Navigate("/sign-in");
        }
      });
  }, [page, cookies.token, clicked]);

  function wait() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/urls/${id}`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          token: cookies.token,
          // page: page,
        },
      })
      .then((response) => {
        setTotal_items(response.data.count);
        setMyShortUrl(response.data.items);
        //   console.log("Reload Data after Delete: ", response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "jwt expired") {
          Navigate("/sign-in");
        }
      });
  };

  const UrlRow = ({ item, index, item_no }) => {
    const copyToClipboard = (copy_data) => {
      copy(copy_data);
      toast.success(`URL copied to clipboard`);
    };

    return (
      <tr>
        <td> {item_no + 1} </td>
        <td>
          {formatISO9075(new Date(item.created_at), { representation: "date" })}
        </td>

        <td>
          <span className="ms-1">{item.name}</span>
        </td>

        <td
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={item.originalLink}
        >
          {item.originalLink.length > 30
            ? item.originalLink.slice(0, 25) + "..."
            : item.originalLink}
        </td>

        <td>
          <Link
            to={currentUrl + item.urlCode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary"
            onClick={() => {
              wait().then(() => {
                setClicked(!clicked);
              });
            }}
          >
            {item.urlCode}
          </Link>
        </td>
        <td>{item.visitCount}</td>

        <td className="text-center d-flex">
          <button
            className="btn btn-outline-danger"
            onClick={() => copyToClipboard(currentUrl + item.urlCode)}
          >
            copy
          </button>
          &nbsp;
          <button
            className="btn btn-outline-danger"
            onClick={() => handleDelete(item._id)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="container mt-2 px-0">
        <header className="py-2  mb-0">
          <div className="text-center my-1">
            <h2 className="display-4">Dashboard</h2>
            <p className="lead mb-0"></p>
          </div>
        </header>
      </div>
      <div className="container d-flex flex-column align-items-center">
        {total_items === 0 && (
          <h4 className="text-center pb-4">
            click down to Start Create new short urls
          </h4>
        )}
        {total_items > 0 && (
          <>
            <div className="container mt-5 px-2">
              <div className="table-responsive">
                <table className="table table-responsive table-striped">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" width="5%">
                        #
                      </th>
                      <th scope="col" width="8%">
                        Date
                      </th>

                      <th scope="col" width="10%">
                        URL Name
                      </th>
                      <th scope="col" width="20%">
                        Original URL
                      </th>
                      <th scope="col" width="20%">
                        Short URL
                      </th>
                      <th scope="col" width="10%">
                        No.of Views
                      </th>
                      <th scope="col" className="text-center" width="5%">
                        <span>Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myShortUrl.map((item, index) => (
                      <UrlRow
                        item={item}
                        index={index}
                        key={index}
                        item_no={(page - 1) * 10 + index}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => props.setShowUrlAddView(true)}
        >
          Create New Short Url
        </button>
      </div>
    </>
  );
};

export default ShortUrlDataTable;
