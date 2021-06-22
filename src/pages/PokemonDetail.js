import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { gql, useQuery } from "@apollo/client";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DialogAdd } from "../components/DialogAdd";

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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const timer = useRef();
  const { server_loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      name: route.match.params.name,
    },
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleClickOpen = () => {
    const caught = Math.random() < 0.5;

    if (!loading) {
      setLoading(true);

      timer.current = window.setTimeout(() => {
        setLoading(false);

        if (caught) {
          alert("Berhasil");
          setOpen(true);
        } else {
          alert("Gagal");
          setOpen(false);
        }
      }, 0);
    }
  };

  if (server_loading)
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

  const handleClose = () => {
    setOpen(false);
  };

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
                        style={{ margin: "3px" }}
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
                        style={{ margin: "3px" }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  onClick={() => handleClickOpen()}
                  fullWidth
                >
                  Catch Me
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
        <DialogAdd open={open} onClose={() => handleClose()} value={data} />
      </>
    );
  }

  return null;
};

export default PokemonDetail;
