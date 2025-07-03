import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f4f6f8",
          padding: "20px",  // Added padding to make the content look better
          display: "flex",
          flexDirection: "column",
          overflow: "auto", // To handle overflow content
        }}
      >
        {/* Render the content based on routes */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
