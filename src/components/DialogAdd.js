import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export const DialogAdd = ({ open, value, onClose }) => {
  const { addPokemon } = useContext(GlobalContext);
  const [nickname, setNickName] = useState("");

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
    setNickName("");
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog">
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
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
