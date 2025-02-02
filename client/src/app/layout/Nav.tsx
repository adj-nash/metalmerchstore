import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/Store";
import { setDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";

const leftLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Catalogue", path: "/catalogue" },
];

const rightLinks = [
  { name: "Login ", path: "/login" },
  { name: "Register", path: "/register" },
];

const navStyles = {
  color: "white",
  typography: "h6",
  ml: -2,
  "&.active": {
    color: "secondary.main",
  },
};

export default function Nav() {
  const { darkMode, isLoading } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { data: basket } = useFetchBasketQuery();

  const itemCount =
    basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <AppBar position="fixed" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            component={NavLink}
            to={"/"}
            variant="h6"
            sx={{ textDecoration: "none", "&.active": "none" }}
          >
            Metal Merch Store
          </Typography>
          <Switch checked={darkMode} onChange={() => dispatch(setDarkMode())} />
        </Box>

        <Box>
          <List sx={{ display: "flex" }}>
            {leftLinks.map(({ name, path }) => (
              <ListItem component={NavLink} to={path} sx={navStyles}>
                {name}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box display="flex" alignItems="center">
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ name, path }) => (
              <ListItem component={NavLink} to={path} sx={navStyles}>
                {name}
              </ListItem>
            ))}
          </List>
          <IconButton
            key="basket"
            component={NavLink}
            to="basket"
            aria-label="cart"
            sx={{
              typography: "h6",
            }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="primary" />
        </Box>
      )}
    </AppBar>
  );
}
