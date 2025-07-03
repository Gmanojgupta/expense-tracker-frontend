import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Home as HomeIcon,
  Receipt as ReceiptIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const handleDrawerToggle = () => setOpen(!open);
  const user = useAppSelector((state) => state.auth.user);
  const navItems = [
    { text: "Expenses", icon: <ReceiptIcon />, path: "/expenses" },
  ];
  if (user && user.role === "ADMIN") {
    navItems.unshift({
      text: "Dashboard",
      icon: <HomeIcon />,
      path: "/dashboard",
    });
  }
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    logout();
    window.location.href = "/login"; // Redirect to login page after logout
  };
  return (
    <div>
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        // anchor="left"
        open={isMobile ? open : true}
        onClose={handleDrawerToggle}
        sx={{
          width: 220,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 220,
            boxSizing: "border-box",
            backgroundColor: "#2c3e50",
            color: "white",
            paddingTop: "20px",
            borderRight: "1px solid #34495e",
            borderRadius: 0,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                "&:hover": {
                  backgroundColor: "#34495e",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "white" }} />
            </ListItem>
          ))}
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              "&:hover": {
                backgroundColor: "#e74c3c",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "white" }} />
          </ListItem>
        </List>
        <Divider sx={{ backgroundColor: "#34495e" }} />
      </Drawer>
    </div>
  );
};

export default SideNav;
