import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <img src="pikachu.png" alt="pikachu" width={30} />
        <Box flexGrow={1} ml={1}>
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography variant="h5">Pokemon App</Typography>
          </Link>
        </Box>
        <Link style={{ textDecoration: "none" }} to="/myPokemon">
          <Button variant="contained" color="secondary">
            My Pokemon
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
