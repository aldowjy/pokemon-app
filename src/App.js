import "./App.css";
import Container from "@material-ui/core/Container";
import { Header } from "./components/Header";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import MyPokemonList from "./pages/MyPokemonList";
import Box from "@material-ui/core/Box";
import { Switch, Route } from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <Container my={8}>
        <Box my={8}>
          <Switch>
            <Route path="/" component={PokemonList} exact />
            <Route path="/detail/:name" component={PokemonDetail} />
            <Route path="/myPokemon" component={MyPokemonList} />
          </Switch>
        </Box>
      </Container>
    </GlobalProvider>
  );
}

export default App;
