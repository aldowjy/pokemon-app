import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { ButtonDelete } from "../components/ButtonDelete";

const MyPokemonList = () => {
  const [myPokemon, setPokemon] = useState([]);

  useEffect(() => {
    let data =
      typeof localStorage !== "undefined"
        ? JSON.parse(localStorage.getItem("pokemon_history"))
        : [];
    setPokemon({ ...myPokemon, results: data });
  }, [myPokemon]);

  const handleChange = (newValue) => {
    setPokemon({ ...myPokemon, results: newValue });
  };

  return (
    <>
      {myPokemon.results && myPokemon.results.length > 0 ? (
        <Grid container spacing={3}>
          {myPokemon.results.map((pokemon, index) => (
            <Grid item xs={12} sm={6} key={index}>
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
                  <ButtonDelete
                    variant="contained"
                    color="secondary"
                    label="Delete"
                    value={pokemon.nick_name}
                    onChange={handleChange}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No data.</p>
      )}
    </>
  );
};

export default MyPokemonList;
