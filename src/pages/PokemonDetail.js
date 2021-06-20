import React, { useContext, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { gql, useQuery } from "@apollo/client";
import { GlobalContext } from "../context/GlobalState";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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

const checkData = (nick_name) => {
  const check_data = JSON.parse(localStorage.getItem("pokemon_history"));
  let check_item = [];
  let exist = false;

  if (check_data != null) {
    for (var i = 0; i < check_data.length; i++) {
      check_item = check_data[i];
      if (check_item.nick_name === nick_name) {
        exist = true;
      }
    }
  }

  return exist;
};

const PokemonDetail = (route) => {
  const classes = useStyles();
  const { addPokemon } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [nickname, setNickName] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const { server_loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      name: route.match.params.name,
    },
  });

  const handleClickOpen = () => {
    const caught = Math.random() < 0.5;

    if (!loading) {
      setSuccess(false);
      setLoading(true);

      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);

        if (caught) {
          alert("Berhasil");
          setOpen(true);
        } else {
          alert("Coba Lagi");
          setOpen(false);
        }
      }, 2000);
    }
  };

  const handleSubmit = () => {
    if (nickname === "") {
      alert("Nickname is Required!");
      return;
    }

    let checked = checkData(nickname);
    if (checked) {
      alert("Nickname cant be same!");
      return;
    }

    const params = {
      id: data.pokemon.id,
      nickname: nickname,
      pokemonname: data.pokemon.name,
    };

    addPokemon(params);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
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

  if (data && data.pokemon) {
    const {
      pokemon: { name, sprites, types, moves },
    } = data;

    return (
      <div className={classes.root}>
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
                    {types.map((type) => (
                      <Chip label={type.type.name} style={{ margin: "3px" }} />
                    ))}
                  </Box>

                  <Typography variant="body2" gutterBottom>
                    Move
                  </Typography>
                  <Box className={classes.pos}>
                    {moves.map((move) => (
                      <Chip label={move.move.name} style={{ margin: "3px" }} />
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
                  className={buttonClassname}
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

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog">
          <DialogTitle id="form-dialog">Enter Nickname</DialogTitle>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <TextField
                error
                autoFocus
                id="nickName"
                label="Nickname"
                value={nickname}
                type="text"
                helperText="Nickname is required!"
                onInput={(e) => setNickName(e.target.value)}
                fullWidth
              />
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="secondary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return null;
};

export default PokemonDetail;
