import React from "react";
import { Grid } from "@mui/material";
import Achivement from "./Achivement";
import MonthlyOverview from "./MonthlyOverview";
import OrderTableView from "../view/OrderTableView";
import ProductTableView from "../view/ProductTableView";
import TotalDiscountedPriceGraph from "./TotalDiscountedPriceGraph";

const Dashboard = () => {
  return (
    <div className="p-10">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <div className="shadow-lg shadow-gray-600">
            <Achivement />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="shadow-lg shadow-gray-600">
            <MonthlyOverview />
          </div>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <Grid item xs={12} md={8}>
            <div className="shadow-lg shadow-gray-600">
              <TotalDiscountedPriceGraph />
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className="shadow-lg shadow-gray-600">
            <OrderTableView />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="shadow-lg shadow-gray-600">
            <ProductTableView />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
