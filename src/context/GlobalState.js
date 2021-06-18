import React, { createContext, useReducer } from "react";
import appReducer from "./AppReducer";

const initialState = {
  pokemons: [],
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addPokemon(pokemon) {
    dispatch({
      type: "ADD_POKEMON",
      payload: pokemon,
    });
  }

  function removePokemon(nick_name) {
    dispatch({
      type: "REMOVE_POKEMON",
      payload: nick_name,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        pokemons: state.pokemons,
        addPokemon,
        removePokemon,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
