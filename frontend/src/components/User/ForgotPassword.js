import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layouts/Loader/Loader.js";
import MailOutline from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userActions.js";
// import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData.js";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    // if (message) {
    //   alert.success(message);
    // }
  }, [dispatch, error,  message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
