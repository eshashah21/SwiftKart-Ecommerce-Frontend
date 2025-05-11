import { CssBaseline, Drawer, ListItemText, useTheme } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShopIcon from "@mui/icons-material/Shop";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../Admin/components/Dashboard";
import CreateProductForm from "../Admin/components/CreateProductForm";
import CustomerTable from "../Admin/components/CustomerTable";
import OrderTable from "../Admin/components/OrderTable";
import ProductTable from "../Admin/components/ProductTable";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <CategoryIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <SupportAgentIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <ShopIcon /> },
  {
    name: "AddProduct",
    path: "/admin/product/create",
    icon: <AddShoppingCartIcon />,
  },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: 210,
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="relative">
      <div className="flex h-screen">
        <CssBaseline />
        <div className="shadow-lg shadow-gray-600 h-full w-[15%] sticky top-0 overflow-y-auto">
          {drawer}
        </div>

        <div className="w-[85%] h-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route
              path="/product/create"
              element={<CreateProductForm />}
            ></Route>
            <Route path="/products" element={<ProductTable />}></Route>
            <Route path="/orders" element={<OrderTable />}></Route>
            <Route path="/customers" element={<CustomerTable />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
