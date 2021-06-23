import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";

const StyleCard = withStyles({
  root: {
    borderRadius: 10,
    transition: "transform 0.15s ease-in-out",
    "&:hover, &:focus": { transform: "scale3d(1.03, 1.03, 1)" },
  },
})(Card);

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const defaultPokemons = {
  results: [],
};

function PokemonList() {
  const [pokemons, setPokemon] = useState(defaultPokemons);
  const [limit, setLimit] = useState(10);
  const [isLoading] = useState(false);
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: limit },
  });

  useEffect(() => {
    if (!loading && data) {
      const myData =
        typeof localStorage !== "undefined"
          ? JSON.parse(localStorage.getItem("pokemon_history"))
          : [];
      let newData = JSON.parse(JSON.stringify(data.pokemons.results));

      const countPokemon = (arr, val) =>
        arr.reduce((a, v) => (v.pokemon_name === val ? a + 1 : a), 0);

      if (myData != null) {
        for (var i = 0; i < newData.length; i++) {
          var detail = newData[i];
          Object.assign(detail, { own: countPokemon(myData, detail.name) });
        }
      }

      setPokemon(() => {
        return {
          results: [...newData],
        };
      });
    }
  }, [loading, data]);

  if (loading) {
    return (
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Skeleton width="20%"></Skeleton>
            <Skeleton width="30%">
              <Typography gutterBottom>.</Typography>
            </Skeleton>
            <Skeleton width="15%"></Skeleton>
            <Skeleton width="5%"></Skeleton>
          </CardContent>
        </Card>
      </Grid>
    );
  }
  if (error) return <Alert severity="error">Something Wrong!</Alert>;

  return (
    <>
      <Grid container spacing={3}>
        {pokemons.results.map((pokemon) => (
          <Grid item xs={12} sm={6} key={pokemon.name}>
            <Link
              to={`/detail/${pokemon.name}`}
              style={{ textDecoration: "none" }}
            >
              <StyleCard>
                <CardContent>
                  <Typography variant="caption" color="textSecondary">
                    Pokemon
                  </Typography>
                  <Typography
                    variant="h5"
                    component="p"
                    color="secondary"
                    gutterBottom
                  >
                    {pokemon.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Owned Total
                  </Typography>
                  <Typography variant="h6" component="p">
                    {pokemon.own != null ? pokemon.own : "0"}
                  </Typography>
                </CardContent>
              </StyleCard>
            </Link>
          </Grid>
        ))}
      </Grid>
      {pokemons.results.length < parseInt(data.pokemons.count) ? (
        <Grid container justify="center">
          <Box m={2}>
            <Button
              variant="contained"
              color="secondary"
              disabled={isLoading}
              onClick={() => setLimit((limit) => limit + 10)}
            >
              Load More
            </Button>
          </Box>
        </Grid>
      ) : null}
    </>
  );
}

export default PokemonList;
