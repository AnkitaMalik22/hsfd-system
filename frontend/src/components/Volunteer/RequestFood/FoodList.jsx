import React from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

const FoodList = ({ food }) => {
  const navigate = useNavigate();
  return (
    <>
      <TableRow
        key={food._id}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/volunteer/food/${food._id}`)}
      >
        <TableCell component="th" scope="row">
          {food.name}
        </TableCell>

        <TableCell align="right" sx={{ display : {xs : 'none',sm:'table-cell'}}}>{food.owner}</TableCell>
      </TableRow>
    </>
  );
};

export default FoodList;
