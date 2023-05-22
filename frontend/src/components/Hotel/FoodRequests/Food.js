import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { Paper } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import {
  acceptFoodRequest,
  markFoodPicked,
  deleteFood,
} from "../../../actions/foodAction.js";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Food = ({ food }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  const img = food.image && food.image[0] ? food.image[0].url : "";
  const [open, setOpen] = React.useState(true);
  const [picked, setPicked] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const [status, setStatus] = React.useState(false);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type, message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };
  // useEffect(() => {

  //       showSnackbar("Food Marked As Picked !","success")

  // }, [picked]);
  // useEffect(() => {
  //   showSnackbar("Request Accepted Successfully !","success")

  // }, [accepted]);

  const handlePicked = () => {
    dispatch(markFoodPicked(food._id));
    showSnackbar("Food Marked As Picked !", "success");
  };

  function handleAccept(foodId, requestId) {
    // console.log(foodId,requestId);
    dispatch(acceptFoodRequest({ requestId: requestId }, foodId)) &&
      setStatus(true);

    showSnackbar("Request Accepted Successfully !", "success");
    //  food.status == true ? setStatus(true) : setStatus(false)  ;
  }
  const handleDelete = () => {
    dispatch(deleteFood(food._id));
    showSnackbar("Food Deleted Sucessfully !", "success");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <Link
              to="/requests"
              style={{ textDecoration: "none", color: "#ffff" }}
            >
              {" "}
              <ArrowBack />
            </Link>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            FoodDetails
          </Typography>

          {/* <Button autoFocus color="inherit" onClick={handleClose} >
        <Link to="/requests" style={{textDecoration:"none"}}><CloseIcon /></Link> 
        </Button> */}
        </Toolbar>
      </AppBar>

      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 1200,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            {/* <ButtonBase sx={{ width: 128, height: 128 }}> */}
            <Img alt="foodImg" src={img} />
            {/* </ButtonBase> */}
          </Grid>
          <Grid item xs={24} sm container>
            <div sx={{ width: "100%", maxWidth: 360 }}>
              <div>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="h4">
                      {food.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="h6">
                      {food.quantity}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography color="textSecondary" variant="body2">
                  {food.description}
                </Typography>
              </div>
              <Divider variant="middle" sx={{ my: 2 }} />
              <div>
                <div>
                  {food.numOfRequests <= 0 ? (
                    <Chip color="primary" label="No Requests Yet!" />
                  ) : (
                    <Chip
                      color="primary"
                      label={`Requested by - ${food.numOfRequests} volunteers `}
                    />
                  )}
                  {/* <Chip  label="Extra Soft" />
      <Chip  color="primary" label="Soft" />
      <Chip  label="Medium" />
      <Chip  label="Hard" /> */}

                  <List sx={{ width: "100%", maxWidth: "36ch" }}>
                    {food.numOfRequests > 0 &&
                      food.requests.map((request) => (
                        <React.Fragment>
                          {/* key={request.id} */}
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt="Volunteer" />
                              {/* src={request.user.image.url} */}
                            </ListItemAvatar>
                            <ListItemText
                              primary={request.name}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ display: "inline" }}
                                    color="textPrimary"
                                  >
                                    {request.comment}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                            <Chip
                              color="secondary"
                              variant={
                                request.status ? "contained" : "outlined"
                              }
                              label={request.status ? "Accepted" : "Accept it"}
                              onClick={() => {
                                request.status
                                  ? alert("alreay accepted")
                                  : handleAccept(food._id, request.user);
                              }}
                            />
                          </ListItem>

                          <Divider variant="inset" component="li" />
                        </React.Fragment>
                      ))}
                  </List>
                </div>
              </div>
              <div>
                <Button
                  color="primary"
                  onClick={() => {
                    handleDelete(food._id);
                  }}
                >
                  <DeleteIcon />
                  Delete Food
                </Button>
                {food.accepted == true && (
                  <Chip
                    onClick={() =>
                      food.picked ? alert("already picked!") : handlePicked()
                    }
                    disabled={food.picked ? true : false}
                    variant="contained"
                    label={food.picked ? "Picked" : "Mark as Picked"}
                  />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider variant="middle" sx={{ my: 2 }} />
        <Typography
          component="span"
          variant="body2"
          sx={{ display: "inline" }}
          color="textSecondary"
        >
          Added at : {food.createdAt}
        </Typography>
        <Divider variant="middle" sx={{ my: 2 }} />
        <Typography
          component="span"
          variant="body2"
          sx={{ display: "inline" }}
          color="textPrimary"
        >
          @ {food.owner}
        </Typography>
      </Paper>
    </Dialog>
  );
};

export default Food;
