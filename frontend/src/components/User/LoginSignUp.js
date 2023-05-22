import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layouts/Loader/Loader.js";
import { Link } from "react-router-dom";
import MailOutline from "@mui/icons-material/MailOutline";
import LockOpen from "@mui/icons-material/LockOpen";
import Face from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userActions.js";
import { useNavigate } from "react-router-dom";
import { VerifiedUser } from "@mui/icons-material";

import { useSnackbar } from "notistack";
import MetaData from "../layouts/MetaData";

const LoginSignUp = ({ history, location }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type, message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const [user, setUser] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    country: "",
    state: "",
    district: "",
  });

  const { role, name, email, password, country, state, district } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("role", role);
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    myForm.set("country", country);
    myForm.set("state", state);
    myForm.set("district", district);

    dispatch(register(myForm));
    if (error) {
      showSnackbar("error", error);
    }
    if (isAuthenticated) {
      showSnackbar("success", "registered successfully!");
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      // console.log("role" ,role)

      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };



  useEffect(() => {
    if (error) {
      showSnackbar("error", error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Login SignUp" />
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpRole">
                  <VerifiedUser />

                  <select
                    type="text"
                    placeholder="Role"
                    required
                    name="role"
                    value={role}
                    onChange={registerDataChange}
                  >
                    <option value="">select</option>
                    <option value="hotel">hotel</option>
                    <option value="volunteer">volunteer</option>
                  </select>
                </div>

                <div className="signUpName">
                  <Face />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpPlace">
                  <select
                    type="text"
                    placeholder="Country"
                    list="place"
                    required
                    name="country"
                    value={country}
                    onChange={registerDataChange}
                    style={{ marginRight: "3px" }}
                  >
                    <option value="">
                      <em>None</em>
                    </option>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="France">France</option>
                    <option value="Bangladesh">Bangladesh</option>
                  </select>

                  {/* < LocationCity /> */}
                  <select
                    style={{ marginRight: "3px" }}
                    type="text"
                    placeholder="State"
                    required
                    name="state"
                    value={state}
                    onChange={registerDataChange}
                  >
                    <option value="">
                      <em>None</em>
                    </option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>

                  <select
                    type="text"
                    placeholder="District"
                    required
                    name="district"
                    value={district}
                    onChange={registerDataChange}
                  >
                    <option value="">
                      <em>None</em>
                    </option>
                    <option value="Hooghly">Hooghly</option>
                    <option value="Howrah">Howrah</option>
                  </select>
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
