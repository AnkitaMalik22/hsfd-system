import React, { useEffect, useState } from "react";
import { totalFoodRequestOfVol } from "../../actions/foodAction.js";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { Paper } from "@mui/material";
import Loader from "../layouts/Loader/Loader";
import store from "../../store.js";
import VolHome from "../common/Paperbase.jsx";
import { loadUser } from "../../actions/userActions.js";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import MetaData from "../layouts/MetaData.js";

const MyRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { totalFoods, loading, error } = useSelector(
    (state) => state.totalRequestsVol
  );
  const [count, setCount] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type, message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  useEffect(() => {
    if (error) {
      showSnackbar("error", error);
    }
  }, [error]);

  useEffect(() => {
    if (user && user._id) {
      dispatch(totalFoodRequestOfVol(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <MetaData title="Requests" />
      <VolHome
        user={user}
        children={
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell> My Requests</TableCell>

                  <TableCell align="right" sx={{ display : {xs : 'none',sm:'table-cell'}}}>status</TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <TableBody>
                  <Loader />
                </TableBody>
              ) : (
                <TableBody>
                  {totalFoods &&
                    totalFoods.map((food) => (
                      <TableRow
                        key={food.foodId}
                        style={{ cursor: "pointer", textDecoration: "none" }}
                      >
                        <TableCell component="th" scope="row">
                        <Link to={`/volunteer/food/${food.foodId}`}>
                          {food.comment}
                          </Link>
                        </TableCell>

                        <TableCell align="right" sx={{ display : {xs : 'none',sm:'table-cell'}}}>
                          <Link to={`/volunteer/food/${food.foodId}`}>
                            view food
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}

                  {totalFoods && totalFoods.length == 0 && (
                    <TableRow sx={{ display: count ? "none" : "table-row" }}>
                      <TableCell component="th" scope="row">
                        No requests!
                      </TableCell>
                      <TableCell align="right" sx={{ display : {xs : 'none',sm:'table-cell'}}}></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </Paper>
        }
      />
    </>
  );
};

export default MyRequests;
