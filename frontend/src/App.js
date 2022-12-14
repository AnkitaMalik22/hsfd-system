
import { Routes, Route, useNavigate} from "react-router-dom";
import { useEffect} from "react";
import { useSelector } from 'react-redux';import { createTheme,  ThemeProvider ,Box,Stack, Button, Typography} from "@mui/material";
import { useState } from "react";


import LoginSignUp from "./components/User/LoginSignUp.js";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Hotel   from './components/Hotel/Hotel.js';
import Volunteer from './components/Volunteer/Volunteer.js';
import store from "./store";
import { loadUser } from "./actions/userActions";
import ShowAllFood from "./components/Hotel/ShowAllFood";
import Loader from "./components/layouts/Loader/Loader";
import Welcome from './components/Hotel/Welcome.jsx'
import Add from "./components/Hotel/AddFood/Add";
import FoodRequests from './components/Hotel/FoodRequests/FoodRequests'
import EachRequest from "./components/Hotel/FoodRequests/EachRequest";
import DashboardMain from "./components/Hotel/Dashboard/DashboardMain";
import Vols from "./components/Hotel/Vol/Vol";
import ShowAllFoodVol from "./components/Volunteer/MUI/ShowAllFoodVol";
import Hotels from "./components/Volunteer/MUI/Hotels";
import EachFood from "./components/Volunteer/RequestFood/EachFood";
import RequestFood from "./components/Volunteer/RequestFood/Request";
// import DashboardVol from "./components/Volunteer/Dashboard/Dashboard";/
import DashboardMainVol from "./components/Volunteer/Dashboard/DashboardMain";
import MyRequests from "./components/Volunteer/MyRequests";
import AcceptedRequests from "./components/Volunteer/AcceptedRequests";
import PickedRequests from "./components/Volunteer/PickedRequests";
import UpdateProfile from "./components/User/UpdateProfile";
import Profile from "./components/User/Profile";
// import IndexPage from "./components/Index/IndexPage";

// import {logout } from "./actions/userActions";


function App() {
  
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [mode, setMode] = useState("light");
  const [role, setRole] = useState("");
  const { isAuthenticated, user ,loading} = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
   
    if(isAuthenticated){
      setRole(user.role)
    
    }
    

  }, []);
  // function logoutUser() {
  //   store.dispatch(logout());
  // }

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {/* {!isAuthenticated && <IndexPage/> } */}


{isAuthenticated && user.role==="volunteer" && <Volunteer user={user} />}
{isAuthenticated && user.role==="hotel" && <Hotel user={user} isAuthenticated={isAuthenticated} />}


  


    <Routes>
    <Route exact path="/login" element={<LoginSignUp/>} />
    {/* {isAuthenticated &&   <Route path="/" element={<p>{navigate('/home')}</p>} />} */}
    {/* <Route element={<ProtectedRoute/>}>/ */}
        <Route exact path="/password/update" element={<UpdatePassword/>} />
        <Route exact path="/password/forgot" element={<ForgotPassword/>} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
        <Route exact path="/update/profile" element={<UpdateProfile/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route path="/welcome/hotel" element={<Hotel user={user}/>} />

        <Route  path="/foods" element={<ShowAllFood user={user}/>} />
        <Route  path="/volunteer/foods" element={<ShowAllFoodVol user={user}/>} />
        <Route  path="/volunteer/food/:id" element={<EachFood user={user}/>} />
        <Route  path="/volunteer/dashboard" element={<DashboardMainVol user={user}/>} />
       <Route  path="/request" element={<RequestFood user={user}/>} />
       <Route path="/requests/my" element={<MyRequests />} />
       <Route path="/requests/accepted" element={<AcceptedRequests />} />
       <Route path="/foods/picked" element={<PickedRequests />} />

       <Route path="/dashboard" element={<DashboardMain user={user} />} />
        <Route path="/home" element={<Welcome user={user} isAuthenticated={isAuthenticated} /> } />
        <Route path="/requests" element={<FoodRequests user={user} /> } />
        <Route path="/volunteers" element={<Vols user={user} />} />
        <Route path="/hotels" element={<Hotels user={user} />} />
        <Route path="/add/food" element={<Add user={user}/> } />
        <Route path="/requests/food/:id" element={<EachRequest user={user} />} />
       
        <Route path="/*" element={<p>There's nothing here: 404!</p>} />
        
    </Routes>
    </ThemeProvider>
  );
}

export default App;
