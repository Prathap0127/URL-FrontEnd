import React, { useEffect, useState } from "react";
import axios from "axios";
import ShortUrlDataTable from "./ShortUrlDataTable";

const EmptyStateUrl = (props) => {
  const [myShortUrl, setMyShortUrl] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/urls?page=${page}`,
        {
          withCredentials: true,
        }
      );
      setMyShortUrl(response.data.items);
      setItemsCount(response.data.count);
      setTotalPages(response.data.pageCount);
      console.log(itemsCount, myShortUrl);
    };
    fetchData();
  }, [page]);

  return (
    <>
      <div className="container d-flex flex-column align-items-center">
        {<ShortUrlDataTable />}
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => props.setShowUrlAddView(true)}
        >
          Create New Url
        </button>
      </div>
    </>
  );
};

export default EmptyStateUrl;
