import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Props {
  mode: boolean;
  toggleMode: () => void;
}

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

export default function Header({ mode, toggleMode }: Props) {
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
          <Typography variant="h6">Metal Merch Store</Typography>
          <Switch checked={mode} onChange={toggleMode} />
        </Box>

        <Box></Box>
        <List sx={{ display: "flex" }}>
          {leftLinks.map(({ name }) => (
            <ListItem sx={{ color: "white", typography: "h6", ml: -2 }}>
              {name}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ name }) => (
              <ListItem
                sx={{
                  color: "white",
                  typography: "h6",
                  mr: -2,
                }}
              >
                {name}
              </ListItem>
            ))}
          </List>
          <IconButton
            aria-label="cart"
            sx={{
              typography: "h6",
            }}
          >
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
