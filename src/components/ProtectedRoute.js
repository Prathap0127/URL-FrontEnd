import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [cookies] = useCookies([]);

  function isTokenExpired() {
    if (!cookies) {
      console.log("Private Route - no cookie");
      console.log(cookies);
      return true;
    }
    if (cookies.token) {
      // Return Validated TOKEN expiration result
      const decodedToken = jwtDecode(cookies.token);
      return decodedToken.exp < Date.now() / 1000;
    } else {
      /* Return Expired True when No token in cookies */
      console.log("Private Route - No token");
      console.log(cookies);
      return true;
    }
  }

  /* Show OUTLET if valid token else SignIn Page */
  return isTokenExpired() ? <Navigate to="/signIn" /> : <Outlet />;
};

export default ProtectedRoute;
