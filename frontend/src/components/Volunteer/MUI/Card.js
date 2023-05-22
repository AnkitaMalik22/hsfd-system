import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { Paper } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import { Comment, Send } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

import Chip from "@mui/material/Chip";
import { newFoodRequest } from "../../../actions/foodAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Icon from "@mui/material/Icon";

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

export default function CardFood({ food }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  // const [comment, setComment] = useState("");
  const [foodId, setFoodId] = useState(`${food._id}`);
  const [foodReq, setFoodReq] = useState({
    comment: "",
  });

  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [foodOpen, setFoodOpen] = React.useState(false);
  const [foodDesc, setFoodDes] = React.useState({
    id: food._id,
    name: food.name,
    quantity: food.Quantity,
    description: food.description,
    category: food.category,
    requests: food.requests,
    picked: food.picked,
    createdAt: food.createdAt,
    owner: food.owner,
    numOfRequests: food.numOfRequests,
  });
  const img = food.image[0] ? food.image[0].url : "";
  const [status, setStatus] = React.useState(false);
  const { error, success } = useSelector((state) => state.newFoodRequest);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const showSnackbar = (type, message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const { comment } = foodReq;

  const foodRequestSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("comment", comment);
    myForm.set("foodId", foodId);

    dispatch(newFoodRequest(myForm));

    if (error) {
      showSnackbar("error", error);
    }
    if (success) {
      showSnackbar("success", "Requested Successfully!");
    }
  };
  const foodReqDataChange = (e) => {
    setFoodId(`${food._id}`);
    setFoodReq({ ...foodReq, [e.target.name]: e.target.value });

    console.log(comment);
  };

  return (
    // maxWidth: 936
    <Paper
      sx={{
        overflow: "hidden",
        border: "1px solid #e3f2fd",
        marginBottom: "1rem",
      }}
    >
      {/* {foodOpen ? <FoodDetails/> : "" } */}
      <Card sx={{ width: "auto", display: foodOpen ? "none" : "static" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="username">
              <Typography paragraph> {food.owner}</Typography>
            </Avatar>
          }
          action={
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
          title={food.name}
          subheader={food._id}
        />

        <CardMedia component="img" height="194" image={img} alt="Food Image" />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {food.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="view food">
            <Button variant="outlined" onClick={handleClickOpen}>
              View food
            </Button>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {!expanded ? (
              <IconButton aria-label="comment">
                <Comment />{" "}
                {food.requests.length > 0 ? (
                  <Typography paragraph> {food.numOfRequests}</Typography>
                ) : (
                  <Typography>0</Typography>
                )}
              </IconButton>
            ) : (
              <ExpandMoreIcon />
            )}
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {food.requests &&
                food.requests.map((request) => (
                  <React.Fragment>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={request.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {request.comment}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
      <React.Fragment>
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
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                FoodDetails
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                close
              </Button>
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
                <Img alt="foodImg" src={img} />
              </Grid>
              <Grid item xs={24} sm container>
                <div sx={{ width: "100%", maxWidth: 360 }}>
                  <div>
                    <Grid container alignItems="center">
                      <Grid item xs>
                        <Typography gutterBottom variant="h4">
                          {foodDesc.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="h6">
                          {foodDesc.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography color="textSecondary" variant="body2">
                      {foodDesc.description}
                    </Typography>
                  </div>
                  <Divider variant="middle" sx={{ my: 2 }} />
                  <div>
                    <div>
                      {foodDesc.requests.length <= 0 ? (
                        <Chip color="primary" label="No Requests Yet!" />
                      ) : (
                        <Chip
                          color="primary"
                          label={`Requested by - ${foodDesc.requests.length} volunteers `}
                        />
                      )}

                      <List sx={{ width: "100%", maxWidth: "36ch" }}>
                        {foodDesc.numOfRequests > 0 &&
                          foodDesc.requests.map((request) => (
                            <React.Fragment>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar alt="Volunteer" />
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
                                  label={
                                    request.status ? "accepted" : "Not Accepted"
                                  }
                                />
                              </ListItem>

                              <Divider variant="inset" component="li" />
                            </React.Fragment>
                          ))}
                      </List>
                    </div>
                  </div>
                  <div className="request-food">
                    {/* -----------------Request Form Start ------------------------ */}

                    <form onSubmit={foodRequestSubmit}>
                      <TextField
                        type="text"
                        id="outlined-multiline-static"
                        label="Comment"
                        name="comment"
                        multiline
                        required
                        rows={4}
                        sx={{ padding: "1rem 0" }}
                        value={comment}
                        onChange={foodReqDataChange}
                        fullWidth
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        value="CreateFood"
                        className="addFoodBtn"
                        sx={{ margin: "" }}
                        endIcon={<Send />}
                      >
                        Send
                      </Button>
                    </form>
                  </div>
                </div>
                {/* -----------------Request Form End ------------------------ */}
              </Grid>
            </Grid>
            <Divider variant="middle" sx={{ my: 2 }} />
            <Typography
              component="span"
              variant="body2"
              sx={{ display: "inline" }}
              color="textSecondary"
            >
              Added at : {foodDesc.createdAt}
            </Typography>
            <Divider variant="middle" sx={{ my: 2 }} />
            <Typography
              component="span"
              variant="body2"
              sx={{ display: "inline" }}
              color="textPrimary"
            >
              @ {foodDesc.owner}
            </Typography>
          </Paper>
        </Dialog>
      </React.Fragment>
    </Paper>
  );
}
