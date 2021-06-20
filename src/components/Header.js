import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

export const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          className={classes.title}
          style={{ textDecoration: "none" }}
          to="/"
        >
          <Typography variant="h5">
            Pokemon App
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/myPokemon">
          <Button variant="contained" color="secondary">
            My Pokemon
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
