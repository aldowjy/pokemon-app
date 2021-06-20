import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { GlobalContext } from "../context/GlobalState";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    borderRadius: 15,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    width: "100%",
  },
  buttonProgress: {
    color: "#FF0000",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const MyPokemonList = () => {
  const classes = useStyles();
  const { removePokemon } = useContext(GlobalContext);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  let data = [];

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  if (typeof localStorage !== "undefined") {
    data = JSON.parse(localStorage.getItem("pokemon_history"));
  } else {
    data = [];
  }

  const handleClick = (nickname) => {
    setSuccess(false);
    setLoading(true);

    timer.current = window.setTimeout(() => {
      setSuccess(true);
      setLoading(false);

      removePokemon(nickname);
    }, 1500);
  };

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {data.map((pokemon) => (
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="caption" color="textSecondary">
                      NickName
                    </Typography>
                    <Typography
                      variant="h5"
                      component="p"
                      color="secondary"
                      gutterBottom
                    >
                      {pokemon.nick_name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Pokemon Name
                    </Typography>
                    <Typography
                      variant="h5"
                      component="p"
                      color="secondary"
                      gutterBottom
                    >
                      {pokemon.pokemon_name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={buttonClassname}
                      disabled={loading}
                      onClick={() => handleClick(pokemon.nick_name)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <p>No data.</p>
      )}
    </>
  );
};

export default MyPokemonList;
