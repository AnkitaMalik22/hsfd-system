import { Paper, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, clearErrors } from "../../../actions/userActions";
import { totalFoodsOfHotel } from "../../../actions/foodAction.js";
import Loader from "../../layouts/Loader/Loader.js";
import MetaData from "../../layouts/MetaData.js";
import CardFood from "../Card.js";
import { useSnackbar } from "notistack";

export default function Foods() {
  const dispatch = useDispatch();
  const { totalFoods, loading, error } = useSelector(
    (state) => state.totalFoods
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [userId, setUserId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type, message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (error) {
      showSnackbar("error", error);
      dispatch(clearErrors());
    }
  }, [error]);

  React.useLayoutEffect(() => {
    user && user._id ? setUserId(`${user._id}`) : setUserId("");
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(totalFoodsOfHotel(userId));
  }, [dispatch, userId]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`FOODS`} />
          <div className="foods">
            {totalFoods &&
              totalFoods.map((food) => (
                <CardFood key={food._id} food={food} maxWidth={906} />
              ))}
          </div>
        </Fragment>
      )}
      {totalFoods && totalFoods.length == 0 && (
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
