import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";

import LoginSignUp from "./components/User/LoginSignUp.js";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";


import store from "./store";
import { loadUser } from "./actions/userActions";
import ShowAllFood from "./components/Hotel/ShowAllFood";
import Loader from "./components/layouts/Loader/Loader";

import Welcome from "./components/common/Welcome.jsx";
import Add from "./components/Hotel/AddFood/Add";
import FoodRequests from "./components/Hotel/FoodRequests/FoodRequests";
import EachRequest from "./components/Hotel/FoodRequests/EachRequest";

import Vols from "./components/Hotel/Vol/Vol";
import ShowAllFoodVol from "./components/Volunteer/MUI/ShowAllFoodVol";
import Hotels from "./components/Volunteer/MUI/Hotels";
import EachFood from "./components/Volunteer/RequestFood/EachFood";
import RequestFood from "./components/Volunteer/RequestFood/Request";

import DashboardMain from "./components/Hotel/Dashboard/DashboardMain";
import DashboardMainVol from "./components/Volunteer/Dashboard/DashboardMain";

import MyRequests from "./components/Volunteer/MyRequests";
import AcceptedRequests from "./components/Volunteer/AcceptedRequests";
import PickedRequests from "./components/Volunteer/PickedRequests";
import UpdateProfile from "./components/User/UpdateProfile";
import Profile from "./components/User/Profile";

// import Paperbase from "./components/common/Paperbase.jsx";
// import RequireAuth from "./components/common/PrivateRoute.js";
import NotFoundPage from "./components/common/404.js";



function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const [role, setRole] = useState("");
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  // Redirect to home if path is '/'
  if (window.location.pathname === "/") {
    navigate("/home", { replace: true });
  }
  if (window.location.pathname === "/logout") {
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    store.dispatch(loadUser());

    if (isAuthenticated) {
      setRole(user.role);
    }
  }, []);


  window.addEventListener("contextmenu", (e) => e.preventDefault());

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
     
     {/* <Paperbase user={user} isAuthenticated={isAuthenticated} children={<h1>}/> */}
      <Routes>
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/password/update" element={<UpdatePassword />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/update/profile" element={<UpdateProfile />} />
        <Route exact path="/profile" element={<Profile />} />

        <Route path="/foods" element={<ShowAllFood isAuthenticated={isAuthenticated} />} />
        <Route
          path="/volunteer/foods"
          element={<ShowAllFoodVol user={user} />}
        />
        <Route path="/volunteer/food/:id" element={<EachFood user={user} />} />
        <Route
          path="/volunteer/dashboard"
          element={<DashboardMainVol user={user} />}
        />
        <Route path="/request" element={<RequestFood user={user} />} />
        <Route path="/requests/my" element={<MyRequests />} />
        <Route path="/requests/accepted" element={<AcceptedRequests />} />
        <Route path="/foods/picked" element={<PickedRequests />} />

        <Route path="/dashboard" element={<DashboardMain isAuthenticated={isAuthenticated} />} />

      
            <Route exact path="/home" element={ <Welcome isAuthenticated={isAuthenticated} />}/>
   
    
        <Route path="/requests" element={<FoodRequests user={user} />} />
        <Route path="/volunteers" element={<Vols user={user} />} />
        <Route path="/hotels" element={<Hotels user={user} />} />
        <Route path="/add/food" element={<Add user={user} />} />
        <Route
          path="/requests/food/:id"
          element={<EachRequest user={user} />}
        />

        <Route path="/*" element={<NotFoundPage/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
