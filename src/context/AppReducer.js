export default function appReducer(state, action) {
  const CACHE_KEY = "pokemon_history";
  function checkForStorage() {
    return typeof Storage !== "undefined";
  }

  function putHistory(data) {
    if (checkForStorage()) {
      let historyData = null;
      if (localStorage.getItem(CACHE_KEY) === null) {
        historyData = [];
      } else {
        historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
      }
      historyData.unshift(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
  }

  function showHistory() {
    if (checkForStorage) {
      return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
      return [];
    }
  }

  switch (action.type) {
    case "ADD_POKEMON":
      const data = action.payload;
      const params = {
        id: data.id,
        nick_name: data.nickname,
        pokemon_name: data.pokemonname,
      };

      putHistory(params);
      const historyData = showHistory();

      return {
        ...state,
        pokemons: [...state.pokemons, historyData],
      };
    case "REMOVE_POKEMON":
      const new_data = JSON.parse(localStorage.getItem(CACHE_KEY));
      let item = [];

      for (var i = 0; i < new_data.length; i++) {
        item = new_data[i];
        if (item.nick_name === action.payload) {
          new_data.splice(i, 1);
        }
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(new_data));
      const historyNewData = showHistory();

      return {
        ...state,
        pokemons: [...state.pokemons, historyNewData],
      };
    // return {
    //   ...state,
    //   pokemons: state.pokemons.filter(
    //     (pokemon) => pokemon.id !== action.payload
    //   ),
    // };
    default:
      return state;
  }
}
