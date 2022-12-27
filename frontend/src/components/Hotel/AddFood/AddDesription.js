
import React, { Fragment,  useState, useEffect } from "react";
import Loader from "../../layouts/Loader/Loader.js";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
//also check is authenticated or not
import { clearErrors, createFood } from "../../../actions/foodAction.js";
import './AddFood.css'
import { Category, FoodBank, FoodBankOutlined, HotelOutlined,EventAvailable } from "@mui/icons-material";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';





const AddFood = ({user}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success,food } = useSelector(
    (state) => state.newFood
  );
  const [addFood, setAddFood] = useState({
    name:"",
    description: "",
   category: "",
   quantity: "",
  });
  const { name, description, category,quantity } = addFood;
  const [image, setImage] = useState("/Profile.png");
  const [owner ,setOwner] = useState(`${user._id}`)
  const [place ,setPlace] = useState({
  
      country:user.place.country,
      state:user.place.state,
      district:user.place.district,

  })
  // const images=[];
  const [imagePreview, setImagePreview] = useState("/Profile.png");

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Successfully food Added!', { variant });
  };


  const foodSubmit = (e) => {
    e.preventDefault();
    

    const myForm = new FormData();
    // const blob = new Blob([image], {type : 'text/xml'});

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("owner", owner);
    myForm.set("quantity", quantity);
    myForm.set("image", image);
    myForm.set("place", place);
// console.log(name,description,category,owner)
    
    dispatch(createFood(myForm));
    // handleClickVariant('success')
    alert("successfully added food")
  
  };


  const foodDataChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
        setImagePreview(reader.result);
        // const res={url:`${reader.result}`,public_id:"img"};
        setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } 
     setPlace({
      country:user.place.country,
      state:user.place.state,
      district:user.place.district,
  })
      setOwner(`${user._id}`)
      setAddFood({ ...addFood, [e.target.name]: e.target.value });
    
  };
  useEffect(() => {
    if (error) {
     console.error(error);
     
      alert(error);
      dispatch(clearErrors());
    }
  
    console.log(owner,user._id);
    if (success) {
      // history.push(redirect);
      console.log("success")

    //  navigate("/foods");
    }
  }, [dispatch, error, success,navigate,image]);






  return (


<Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
  {/* <h6 className="CreateFoodBox__header__title">Create Food</h6> */}

          <div className="CreateFoodContainer">  
          
          <div className="CreateFoodBox">
        
            {/* <div className="CreateFoodBox__header"> */}
              
              <form
                className="CreateFoodForm"
                 onSubmit={foodSubmit}
              >
                  <div className="foodName">
                    <FoodBank/>
                  {/* <Food name icon/> */}
                  <input
                   type="text"
                   placeholder="Name"
                   required
                   name="name"
                   value={name}
                   onChange={foodDataChange}
                  />
                </div>
                <div className="foodDescription">
                  <FoodBankOutlined/>
                  {/* < Face /> */}
                  
                  <input
                    type="text"
                    placeholder="Description"
                    required
                    name="description"
                    value={description}
                    onChange={foodDataChange}
                  />
                </div>
              
                <div className="foodCategory">
                  <Category/>
                  {/* < Face /> */}
                  <input
                    type="text"
                    placeholder="Category"
                    required
                    name="category"
                    value={category}
                    onChange={foodDataChange}
                  />
                </div>
                <div className="foodQuantity">
               <EventAvailable/>
                  {/* <LockOpen /> */}
                  <input
                    type="text"
                    placeholder="Quantity"
                    required
                    name="quantity"
                    value={quantity}  
                    onChange={foodDataChange}
                  />
                </div>
                {/* <div className="foodOwner">
                  <HotelOutlined/> */}
                  {/* <LockOpen /> */}
                  {/* <input
                    type="text"
                    placeholder="Owner--enter hotel name"
                    required
                    name="owner"
                    value={owner}  
                    onChange={foodDataChange}
                  />
                </div> */}
                <div id="foodImage">
                  <img src={imagePreview} alt="Food Img Preview" />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={foodDataChange}
                  />
                </div>
                
                <input type="submit" value="CreateFood" className="addFoodBtn" />
              </form>
              </div>
          </div>
          
          
            {/* </div> */}

               </Fragment>
      )}
    </Fragment>
  );
};

export default AddFood;