import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { useAppSelector } from "../store/Store";

function App() {
  const { darkMode } = useAppSelector((state) => state.ui);
  const modeType = darkMode ? "dark" : "light";
  const darkTheme = createTheme({
    palette: {
      mode: modeType,
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Nav />
        <CssBaseline />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
