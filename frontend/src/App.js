
import { Routes, Route,useNavigate} from "react-router-dom";
import { useEffect} from "react";
import { useSelector } from 'react-redux';import { createTheme,  ThemeProvider ,Box,Stack, Button} from "@mui/material";
import { useState } from "react";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; 
import Food from "./components/Food.js"; 
import LoginSignUp from "./components/User/LoginSignUp.js";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Hotel   from './components/Hotel/Hotel.js';
import Volunteer from './components/Volunteer/Volunteer.js';
import store from "./store";
import { loadUser } from "./actions/userActions";
import AllFoods from "./components/Hotel/AllFoods";
import AddFood from "./components/Hotel/AddFood/AddFood.js";
import FoodDetails from "./components/Hotel/FoodDetails/FoodDetails";
import FoodCreateRequest from "./components/Volunteer/FoodCreateRequest.js";
import { Logout } from "@mui/icons-material";
import {logout} from './actions/userActions';
import {useDispatch} from 'react-redux'
import ProtectedRoute from "./components/Route/ProtectedRoute";
import FoodDetailsVol from "./components/Volunteer/FoodDetailsVol";
import Loader from "./components/layouts/Loader/Loader";
import FoodAcceptRequest from "./components/Hotel/FoodAcceptRequest";



function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mode, setMode] = useState("light");
  const [role, setRole] = useState("");
  const { isAuthenticated, user ,loading} = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
    console.log(user)
    if(isAuthenticated){
      setRole(user.role)
      console.log(role)
    }
    console.log(role)

  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>

{!isAuthenticated &&  <Box bgcolor={"background.default"} color={"text.primary"}>
    <NavBar/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
      <Sidebar setMode={setMode} mode={mode} />
      <Food/>
    </Stack>
    </Box>}
   {isAuthenticated &&  <Button onClick={()=>{ dispatch(logout())}}><Logout/>Logout</Button>}
{isAuthenticated && user.role==="volunteer" && <Volunteer user={user} />}
{isAuthenticated && user.role==="hotel" && <Hotel user={user} />}
{/* {isAuthenticated &&} */}

  


    <Routes>
    <Route exact path="/login" element={<LoginSignUp/>} />
    {/* <Route element={<ProtectedRoute/>}>/ */}
       <Route exact path="/password/update" element={<UpdatePassword/>} />
       {/* <Route  path="/home" element={ <Hotel/>} />
        <Route  path="/home" element={<Volunteer/>} /> */}
        <Route exact path="/password/forgot" element={<ForgotPassword/>} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
      
        <Route path="/welcome/hotel" element={<Hotel user={user}/>} />

        <Route  path="/foods" element={<AllFoods/>} />
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        {/* <Route path="/inbox" element={<Requests/>} /> */}
        <Route path="/add/food" element={<AddFood/> } />
  
        {/* <Route path="/food/:id" element={isAuthenticated && role.toString() === "hotel"  ? <FoodDetails/> : (isAuthenticated &&  role.toString() === "volunteer" && <FoodDetailsVol  userId={user._id}/>)} /> */}
              <Route exact path="/food/:id" element={ !loading && isAuthenticated   ? (user.role === "hotel" ? ( <FoodDetails/> ):((<FoodDetailsVol  userId={user._id}/>))) : (<Loader/>) } />
     
        {/* -----------------Only For Volunteer------------------ */}
        <Route path="/request/accept/foodId=:foodId/requestId=:requestId" element={  <FoodAcceptRequest isAuthenticated={isAuthenticated} loading={loading} /> } />

{/* </Route> */}
        {/* <Route path="/profile" element={<UpdateProfile/>} /> */}
        {/* <Route path="/food/:id" element={<FoodDetails />} /> */}
        {/* <Route path="/*" element={<p>There's nothing here: 404!</p>} /> */}
    </Routes>
    </ThemeProvider>
  );
}

export default App;
