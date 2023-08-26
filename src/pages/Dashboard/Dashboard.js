import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUrl from "./CreateUrl";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import ShortUrlDataTable from "./ShortUrlDataTable";
import TopBar from "../../components/TopBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showUrlAddView, setShowUrlAddView] = useState(false);
  const [cookies] = useCookies([]);
  const [userName, setUserName] = useState("");
  function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < Date.now() / 1000;
  }

  useEffect(() => {
    if (cookies.token) {
      if (isTokenExpired(cookies.token)) {
        navigate("/signIn");
      } else {
        setUserName(jwtDecode(cookies.token).name);
      }
    } else {
      console.log("No Token in Cookies");
      navigate("/signIn");
    }
  }, [cookies.token, navigate]);

  return (
    <>
      <div className="dashboard">
        <TopBar userEmail={userName} />
        {!showUrlAddView && (
          <ShortUrlDataTable setShowUrlAddView={setShowUrlAddView} />
        )}
        {showUrlAddView && <CreateUrl setShowUrlAddView={setShowUrlAddView} />}
      </div>
    </>
  );
};

export default Dashboard;
