function appReducer(state, action) {
  const CACHE_KEY = "pokemon_history";

  function putHistory(data) {
    if (typeof Storage !== "undefined") {
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

  const getHistory = () => {
    if (typeof Storage !== "undefined") {
      return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
      return [];
    }
  };

  switch (action.type) {
    case "ADD_POKEMON":
      const data = action.payload;
      const params = {
        id: data.id,
        nick_name: data.nickname,
        pokemon_name: data.pokemonname,
      };

      putHistory(params);

      return {
        ...state,
        pokemons: [...state.pokemons, getHistory()],
      };
    case "REMOVE_POKEMON":
      const newData = JSON.parse(localStorage.getItem(CACHE_KEY));
      let item = [];

      for (var i = 0; i < newData.length; i++) {
        item = newData[i];
        if (item.nick_name === action.payload) {
          newData.splice(i, 1);
        }
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(newData));

      return {
        ...state,
        pokemons: [...state.pokemons, getHistory()],
      };
    default:
      return state;
  }
}

export default appReducer;
