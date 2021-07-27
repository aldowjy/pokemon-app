import { render, screen } from "@testing-library/react";
import App from "./App";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import MyPokemonList from "./pages/MyPokemonList";

test("renders learn react link", () => {
  render(<PokemonList />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test("Render Pokemon Detail", () => {
  // render(<PokemonDetail />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test("Render My Pokemon List", () => {
  render(<MyPokemonList />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
