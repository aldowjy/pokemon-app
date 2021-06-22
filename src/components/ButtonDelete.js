import React, { useState, useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import Button from "@material-ui/core/Button";

export const ButtonDelete = ({ label, value, ...props }) => {
  const { removePokemon } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const timer = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleClick = (nick_name) => {
    setLoading(true);

    timer.current = window.setTimeout(() => {
      setLoading(false);
      removePokemon(nick_name);

      let data = JSON.parse(localStorage.getItem("pokemon_history"));
      props.onChange(data);
    }, 1500);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={loading}
      onClick={() => handleClick(value)}
    >
      {label}
    </Button>
  );
};
