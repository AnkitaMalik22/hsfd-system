// import { CardMedia, Container, FormControl, OutlinedInput,Box  } from '@mui/material'
import React, { Fragment, useRef, useState, useEffect } from "react";
import Loader from "../../layouts/Loader/Loader";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//also check is authenticated or not
import { clearErrors, createFood } from "../../../actions/foodAction.js";
import './AddFood.css'



const AddFood = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success,food } = useSelector(
    (state) => state.newFood
  );
  const [addFood, setAddFood] = useState({
    name:"",
    description: "",
   category: "",
   owner:"",
   quantity: "",
  });
  const { name, description, category,quantity,owner } = addFood;
  const [image, setImage] = useState("/Profile.png");
  // const images=[];
  const [imagePreview, setImagePreview] = useState("/Profile.png");

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

    
    dispatch(createFood(myForm));
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
    } else {
      setAddFood({ ...addFood, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
     console.error(error);
     
      alert(error);
      dispatch(clearErrors());
    }
    console.log(image);
    if (success) {
      // history.push(redirect);
      alert("Food Added Successfully");
     navigate("/foods");
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
                <div className="foodOwner">
                  {/* <LockOpen /> */}
                  <input
                    type="text"
                    placeholder="Owner--enter hotel name"
                    required
                    name="owner"
                    value={owner}  
                    onChange={foodDataChange}
                  />
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