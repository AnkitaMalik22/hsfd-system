import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layouts/Loader/Loader.js";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions.js";
import { useSnackbar } from 'notistack';
import MetaData from "../layouts/MetaData.js";
import LockOpen from "@mui/icons-material/LockOpen";
import Lock from "@mui/icons-material/Lock";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type,message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      showSnackbar("error",error)
    }

    if (success) {
      showSnackbar("success","Password Updated Successfully!")
      // alert.success("Password Updated Successfully");

      history.push("/login");
    }
  }, [dispatch, error,  history, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Lock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
