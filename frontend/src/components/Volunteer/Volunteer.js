// import { useDispatch} from "react-redux";
// import {logout } from "../../actions/userActions";
import VolHome from "./MUI/VolHome";

const Volunteer = ({user}) => {
  // const dispatch = useDispatch();
  // function logoutUser() {
  //   dispatch(logout());
  //   alert("Logout Successfully");
  // }
  return (
  
    <>
    
    <VolHome user={user} children={null} />


    </>
  )
}

export default Volunteer