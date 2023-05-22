import React from "react";
import AddFood from "./AddFood.js";
import Paperbase from "../../common/Paperbase.jsx";

const Add = ({ user }) => {
  return <Paperbase user={user} children={<AddFood user={user} />} />;
};

export default Add;
