import React, {useState } from 'react';
import { styled } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Paper } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


import {  Send } from '@mui/icons-material';
import Grid from '@mui/material/Grid';

import Chip from '@mui/material/Chip';
import{newFoodRequest} from "../../../actions/foodAction.js";
import { useDispatch,useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';




const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





const Food = ({food}) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
  
    // const [comment, setComment] = useState("");
    const [foodId ,setFoodId] = useState(`${food._id}`)

    const [foodReq,setFoodReq] = useState({
      comment : ""
    })
  
    const [open, setOpen] = React.useState(true);
    const { error,success } = useSelector((state) => state.newFoodRequest);

    
    const img = food && food.image && food.image[0] ? food.image[0].url :"" ;

   
  
  
    const showSnackbar = (type,message) => {
      enqueueSnackbar(message, {
        variant: type,
      });
    };
  
  // React.useEffect(() => {
  //   if (error) {
  //     showSnackbar("error",error)
  //   }
  // },[error])

  // React.useEffect(() => {
  //   if (success) {
  //     showSnackbar('success','Requested Successfully!')
  //   }
  // },[success])
  
  const {comment}=foodReq;
  
  const foodRequestSubmit = (e) => {
      e.preventDefault();
      
      const myForm = new FormData();
     
      myForm.set("comment", comment);
      myForm.set("foodId", foodId);
    
      dispatch(newFoodRequest(myForm));
      if (error) {
        showSnackbar("error",error)
      }
      if (success) {
            showSnackbar('success','Requested Successfully!')
          }
    };
    const foodReqDataChange = (e) => {
    
        setFoodId(`${food._id}`)
        setFoodReq({ ...foodReq, [e.target.name]: e.target.value });
      
    };
    
      const handleClose = () => {
      navigate("/request")
      };

  return (
<Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
   
        <AppBar sx={{ position: 'relative' }}>
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
        margin: 'auto',
        maxWidth: 1200,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          {/* <ButtonBase sx={{ width: 128, height: 128 }}> */}
            <Img alt="foodImg" src={img} />
          {/* </ButtonBase> */}
        </Grid>
        <Grid item xs={24} sm container>
        <div sx={{ width: '100%',
    maxWidth: 360,
   }}>
      <div >
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
           { food.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
          { food.quantity}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
      { food.description}
        </Typography>
      </div>
      <Divider variant="middle" sx={{my:2}} />
      <div>
      
        <div>
        {
  food && food.requests ? (
    food.requests.length === 0 ? (
      <Chip color="primary" label="No Requests Yet!" />
    ) : (
      <Chip
        color="primary"
        label={`Requested by - ${food.requests.length} volunteers`}
      />
    )
  ) : null
}

  

<List sx={{ width: '100%',
    maxWidth: '36ch',}}>
 {food.numOfRequests >0 && food.requests.map((request) => (

     <React.Fragment>
      {/* key={request.id} */}
       <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt="Volunteer"  />
          {/* src={request.user.image.url} */}
        </ListItemAvatar>
        <ListItemText
          primary={request.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{display: 'inline'}}
                color="textPrimary"
              >
                 {request.comment}
              </Typography>
            
            </React.Fragment>
          }
        />
         <Chip  color="secondary" variant={request.status ? "contained" : 'outlined'} label={request.status ? "accepted" : "Not Accepted"}
          />
      </ListItem>
      
      <Divider variant="inset" component="li" />
      </React.Fragment>
     
))}
</List>

        </div>
      </div>
      <div  className='request-food'>
      
{/* -----------------Request Form Start ------------------------ */}

<form  onSubmit={foodRequestSubmit}>
  {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />  Food Id */}
  <TextField type="text"  id="outlined-multiline-static"
          label="Comment" name="comment" 
          multiline  required rows={4} sx={{padding:"1rem 0"}}  value={comment} onChange={foodReqDataChange} fullWidth />
  
  {/* <TextField
  fullWidth
          id="outlined-multiline-static"
          label="Comment"
          multiline
        
          rows={4}
          onChange={foodReqDataChange}
          defaultValue={comment}
          variant="outlined"
          sx={{padding:"1rem 0"}}
        /> */}
        <Button
        variant="contained"
        color="primary"
        type='submit'
        value="CreateFood" 
        className="addFoodBtn" 
  sx={{margin:""}}
        endIcon={<Send/>}
      >
        Send
      </Button>
        
</form>


      </div>
    </div>
 {/* -----------------Request Form End ------------------------ */}
        </Grid>
        
      </Grid>
      <Divider variant="middle" sx={{my:2}} />
      <Typography
                component="span"
                variant="body2"
                sx={{display: 'inline'}}
                color="textSecondary"
              >
              Added at :  {food.createdAt}
              </Typography>
              <Divider variant="middle" sx={{my:2}} />
      <Typography
                component="span"
                variant="body2"
                sx={{display: 'inline'}}
                color="textPrimary"
              >
             @ {food.owner}
              </Typography>
    </Paper>

</Dialog>
  )
}

export default Food