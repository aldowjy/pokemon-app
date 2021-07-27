/** @jsxImportSource @emotion/react */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { gql, useQuery } from "@apollo/client";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { DialogAdd } from "../components/DialogAdd";
import { css } from "@emotion/react";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 800,
  },
  image: {
    width: 100,
    height: 100,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  pos: {
    marginBottom: 20,
  },
}));

const GET_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

const PokemonDetail = (route) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      name: route.match.params.name,
    },
  });

  if (loading)
    return (
      <Paper className={classes.paper}>
        <Grid item xs={6}>
          <Skeleton width="50%"></Skeleton>
          <Skeleton width="80%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
          <Skeleton width="50%"></Skeleton>
          <Skeleton width="80%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
          <Skeleton width="50%"></Skeleton>
          <Skeleton width="80%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
        </Grid>
      </Paper>
    );
  if (error) return <Alert severity="error">Something Wrong!</Alert>;

  if (data && data.pokemon) {
    const {
      pokemon: { name, sprites, types, moves },
    } = data;

    return (
      <>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item>
              <Paper className={classes.image}>
                <img
                  className={classes.img}
                  src={sprites.front_default}
                  alt={name}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm container className={classes.pos}>
              <Grid item xs={12} container direction="column">
                <Grid item xs>
                  <Typography
                    variant="h4"
                    color="secondary"
                    className={classes.pos}
                  >
                    {name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Type
                  </Typography>
                  <Box className={classes.pos}>
                    {types.map((type, index) => (
                      <Chip
                        key={index}
                        label={type.type.name}
                        css={css`
                          margin: 3px;
                        `}
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" gutterBottom>
                    Move
                  </Typography>
                  <Box className={classes.pos}>
                    {moves.slice(0, 10).map((move, index) => (
                      <Chip
                        key={index}
                        label={move.move.name}
                        css={css`
                          margin: 3px;
                        `}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container>
              <DialogAdd value={data} />
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }

  return null;
};

export default PokemonDetail;
