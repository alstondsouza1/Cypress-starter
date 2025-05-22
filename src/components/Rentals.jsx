import React from "react";
import RentalCard from "./RentalCard.jsx";
import { Grid } from "@mui/material";

const Rentals = ({ rentals }) => {
  return (
    <Grid container spacing={4}>
      {rentals.map((rental, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <RentalCard rental={rental} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Rentals;
