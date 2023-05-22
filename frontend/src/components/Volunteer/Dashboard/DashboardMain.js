import React, { useEffect } from "react";
import VolHome from "../../common/Paperbase.jsx";
import Dashboard from "./Dashboard.jsx";
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions";
import MetaData from "../../layouts/MetaData.js";

const DashboardMainVol = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      {" "}
      <MetaData title={`Dashboard`} />{" "}
      <VolHome user={user} children={<Dashboard />} />{" "}
    </>
  );
};

export default DashboardMainVol;
