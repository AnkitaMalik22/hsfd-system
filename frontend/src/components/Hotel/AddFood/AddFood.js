import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
import Loader from "../../layouts/Loader/Loader.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
//also check is authenticated or not
import { clearErrors, createFood } from "../../../actions/foodAction.js";
import "./AddFood.css";
import {
  Category,
  FoodBank,
  FoodBankOutlined,
  HotelOutlined,
  EventAvailable,
} from "@mui/icons-material";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions.js";
import MetaData from "../../layouts/MetaData.js";

const AddFood = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  const { error, success, food, load } = useSelector((state) => state.newFood);
  const [addFood, setAddFood] = useState({
    name: "",
    description: "",
    quantity: "",
    category: "",
  });
  const { name, description, quantity, category } = addFood;
  const [image, setImage] = useState("/images/FoodPreview.png");

  const [place, setPlace] = useState({
    owner: ``,
    country: ``,
    state: ``,
    district: ``,
  });
  const { owner, country, district, state } = place;

  const [imagePreview, setImagePreview] = useState("/images/FoodPreview.png");

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  useLayoutEffect(() => {
    setPlace({
      owner: user && user._id ? `${user._id}` : "",
      country: user && user.country ? `${user.country}` : "",
      state: user && user.state ? `${user.state}` : "",
      district: user && user.district ? `${user.district}` : "",
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      showSnackbar("error", error);
      dispatch(clearErrors());
    }

    if (success) {
      showSnackbar("success", "Food Added Successfully");
      setAddFood({
        name: "",
        description: "",
        quantity: "",
        category: "",
      });
      setImage("/images/FoodPreview.png");
    }
  }, [dispatch, error, success]);

  const showSnackbar = (type, message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const foodSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("owner", owner);
    myForm.set("quantity", quantity);
    myForm.set("image", image);
    myForm.set("country", country);
    myForm.set("state", state);
    myForm.set("district", district);

    dispatch(createFood(myForm));
  };

  const foodDataChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);

          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    console.log("quantity", quantity);
    console.log("category", category);

    setAddFood({ ...addFood, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {loading || load ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Add Food" />

          <div className="CreateFoodContainer">
            <div className="CreateFoodBox">
              <form className="CreateFoodForm" onSubmit={foodSubmit}>
                <div className="foodName">
                  <FoodBank />
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
                  <FoodBankOutlined />
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
                  <Category />

                  <select
                    type="text"
                    placeholder="Category"
                    required
                    name="category"
                    value={category}
                    onChange={foodDataChange}
                  >
                    <option value="" disabled>
                      None
                    </option>
                    <option value="Fast food">Fast food</option>
                    <option value="Bengali Food">Bengali Food</option>
                    <option value="Chinese">Chinese Food</option>
                  </select>
                </div>
                <div className="foodQuantity">
                  <EventAvailable />

                  <select
                    type="text"
                    placeholder="Quantity"
                    required
                    name="quantity"
                    value={quantity}
                    onChange={foodDataChange}
                  >
                    <option value="">None</option>
                    <option value="1kg">1kg</option>
                    <option value="6kg">6kg</option>
                    <option value="11kg">11kg</option>
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

                <input
                  type="submit"
                  value="CreateFood"
                  className="addFoodBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AddFood;
