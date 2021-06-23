import React, { useState, useContext, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../context/GlobalState";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
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

export const DialogAdd = ({ value }) => {
  const { addPokemon } = useContext(GlobalContext);
  const [nickname, setNickName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timer = useRef();
  const classes = useStyles();

  const checkData = (nick_name) => {
    const check_data = JSON.parse(localStorage.getItem("pokemon_history"));
    let check_item = [];
    let exist = false;

    if (check_data != null) {
      for (let i = 0; i < check_data.length; i++) {
        check_item = check_data[i];
        if (check_item.nick_name === nick_name) {
          exist = true;
        }
      }
    }

    return exist;
  };

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
      }, 1500);
    }
  };

  const handleSubmit = () => {
    const data = value;

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
    setNickName("");
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="form-dialog"
      >
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
              <Button onClick={handleClickClose} color="primary">
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
};
