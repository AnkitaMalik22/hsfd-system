import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getFoods } from "../../../actions/foodAction.js";
import Loader from "../../layouts/Loader/Loader.js";
import MetaData from "../../layouts/MetaData.js";

import CardFood from "./Card";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions.js";

export default function FoodsVol() {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const { foods, load, error } = useSelector((state) => state.foods);
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  const [place, setPlace] = useState({
    country: ``,
    state: ``,
    district: ``,
  });

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useLayoutEffect(() => {
    setPlace({
      country: user && user.country ? `${user.country}` : "",
      state: user && user.state ? `${user.state}` : "",
      district: user && user.district ? `${user.district}` : "",
    });
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(getFoods(place));
  }, [place, dispatch]);

  return (
    <Fragment>
      {load || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`FOODS`} />
          <div className="foods">
            {foods &&
              foods.map((food) => (
                <CardFood key={food._id} food={food} maxWidth={906} />
              ))}
          </div>
        </Fragment>
      )}
      {!loading && foods && foods.length == 0 && (
        <Paper
          sx={{
            overflow: "hidden",
            border: "1px solid #e3f2fd",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No Foods!
          </Typography>
        </Paper>
      )}
    </Fragment>
  );
}
