import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { gql, useQuery } from "@apollo/client";
import { GlobalContext } from "../context/GlobalState";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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
  const { addPokemon } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [nickname, setNickName] = useState("");

  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      name: route.match.params.name,
    },
  });

  const handleClickOpen = () => {
    const caught = Math.random() < 0.5;

    if (caught) {
      alert("Berhasil");
      setOpen(true);
    } else {
      alert("Coba Lagi");
      setOpen(false);
    }
  };

  const handleSubmit = () => {
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

  if (loading) return <Skeleton variant="rect" width={210} height={118} />;
  if (error) return <Alert severity="error">Something Wrong!</Alert>;

  if (data && data.pokemon) {
    const {
      pokemon: { name, sprites },
    } = data;

    return (
      <>
        <Card className={classes.root}>
          <img src={sprites.front_default} alt={name} />
          <CardContent>
            <Typography variant="h3" className={classes.pos} color="secondary">
              {name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClickOpen(data)}
            >
              Catch Me
            </Button>
          </CardActions>
        </Card>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog">
          <DialogTitle id="form-dialog">Nickname is Required!</DialogTitle>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <TextField
                autoFocus
                id="nickName"
                label="Nickname"
                value={nickname}
                type="text"
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
      </>
    );
  }

  return null;
};

export default PokemonDetail;
