
import React, { Fragment,  useState, useEffect } from "react";
import Loader from "../../layouts/Loader/Loader.js";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
//also check is authenticated or not
import { clearErrors, createFood } from "../../../actions/foodAction.js";
import './AddFood.css'
import { Category, FoodBank, FoodBankOutlined, HotelOutlined,EventAvailable } from "@mui/icons-material";
import store from '../../../store.js'
import { loadUser } from "../../../actions/userActions.js";




const AddFood = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user ,loading} = useSelector((state) => state.user);

  const { error, success,food,load } = useSelector(
    (state) => state.newFood
  );
  const [addFood, setAddFood] = useState({
    name:"",
    description: "",
    quantity: "",
    category:""
   
  });
  useEffect(() => {
    store.dispatch(loadUser());
    if (error) {
     console.error(error);
     
      alert(error);
      dispatch(clearErrors());
    }
  
 
    if (success) {
      // history.push(redirect);
      console.log("success")

    //  navigate("/foods");
    }
  }, []);

  const { name, description,quantity,category } = addFood;
  const [image, setImage] = useState("/Profile.png");
  const [owner ,setOwner] = useState(``)
  const [country, setCountry] = useState(``)
  const [state, setState] = useState(``)
  const [district, setDistrict] = useState(``)
  // const [category ,setCategory]= useState("")
  // const images=[];
  const [imagePreview, setImagePreview] = useState("/Profile.png");

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Successfully food Added!', { variant });
  };




  const foodSubmit = (e) => {
    e.preventDefault();

    user &&  setCountry(`${user.country}`)
    user &&  setState(`${user.state}`)
    user &&  setDistrict(`${user.district}`)
    user &&  setOwner(`${user._id}`) 

    const myForm = new FormData();
    // const blob = new Blob([image], {type : 'text/xml'});

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("owner", owner);
    myForm.set("quantity", quantity);
    myForm.set("image", image);
    myForm.set("country",country);
    myForm.set("state",state);
    myForm.set("district",district);
console.log(name,description,category,owner,state,country,district,quantity)
    
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
    console.log("quantity" ,quantity)
    console.log("category" ,category)
    user &&  setCountry(`${user.country}`)
    user &&  setState(`${user.state}`)
    user &&  setDistrict(`${user.district}`)
    user &&  setOwner(`${user._id}`) 
     
      setAddFood({ ...addFood, [e.target.name]: e.target.value });
    
  };







  return (


<Fragment>
      {loading || load ? (
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
                  {/* <input
                    type="text"
                    placeholder="Category"
                    required
                    name="category"
                    value={category}
                    onChange={foodDataChange}
                  /> */}
                  <select
                   type="text"
                   placeholder="Category"
                   required
                   name="category"
                   value={category}
                   onChange={foodDataChange}
                >


<option value='' >None</option>
          <option value='Fast food'>Fast food</option>
          <option value='Bengali Food'>Bengali Food</option>
          <option value='Chinese'>Chinese Food</option>
        
        </select>
                </div>
                <div className="foodQuantity">
               <EventAvailable/>
                  {/* <LockOpen /> */}
                  {/* <input
                    type="text"
                    placeholder="Quantity"
                    required
                    name="quantity"
                    value={quantity}  
                    onChange={foodDataChange}
                  />
                </div> */}
                <select
                     type="text"
                     placeholder="Quantity"
                     required
                     name="quantity"
                     value={quantity}  
                     onChange={foodDataChange}
                >


<option value='' >None</option>
          <option value='1kg'>1kg</option>
          <option value='6kg'>6kg</option>
          <option value='11kg'>11kg</option>
        
        </select>
                </div> 
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