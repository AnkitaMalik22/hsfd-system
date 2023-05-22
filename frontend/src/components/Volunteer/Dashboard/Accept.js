import React, { useEffect } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../../common/Title.js";
import { useSelector, useDispatch } from "react-redux";

function preventDefault(event) {
  event.preventDefault();
}

export default function Accept() {
  const { acceptedFoods, loading, error } = useSelector(
    (state) => state.acceptedFoods
  );


  return (
    <React.Fragment>
      <Title>Total Acceptance</Title>
      <Typography component="p" variant="h4">
        {acceptedFoods &&
          acceptedFoods.totalAcceptedFoods &&
          acceptedFoods.totalAcceptedFoods.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on This Year
      </Typography>
      <div>
        <Link color="primary" href="/foods" onClick={preventDefault}>
          View Foods
        </Link>
      </div>
    </React.Fragment>
  );
}
