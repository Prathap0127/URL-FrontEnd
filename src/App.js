import { UserContextProvider } from "./context/UserContext";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Users/SignIn";
import SignUp from "./pages/Users/SignUp";
import ForgotPassword from "./pages/Users/ForgotPassword";
import ThanksPage from "./pages/Users/ThanksPage";
import ActivateAccount from "./pages/Users/ActivateAccount";
import ChangePassword from "./pages/Users/ChangePassword";
import RedirectShortUrl from "./pages/Dashboard/RedirectShortUrl";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/success" element={<ThanksPage />} />
          <Route
            path="/activate-account/:activationToken"
            element={<ActivateAccount />}
          />
          <Route
            path="/resetpassword/:resetToken"
            element={<ChangePassword />}
          />
          <Route path="/:shortUrl" element={<RedirectShortUrl />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
