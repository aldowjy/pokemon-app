import React, { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { GlobalContext } from "../context/GlobalState";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FF0000",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderRadius: 15,
  },
});

const MyPokemonList = () => {
  const classes = useStyles();
  const { removePokemon } = useContext(GlobalContext);
  let data = [];

  if (typeof localStorage !== "undefined") {
    data = JSON.parse(localStorage.getItem("pokemon_history"));
  } else {
    data = [];
  }

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <Typography variant="h5" color="inherit" className={classes.title}>
            My Pokemon
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>No</StyledTableCell>
                  <StyledTableCell>Nickname</StyledTableCell>
                  <StyledTableCell>Pokemon Name</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((pokemon, index) => (
                  <StyledTableRow key={pokemon.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{pokemon.nick_name}</StyledTableCell>
                    <StyledTableCell>{pokemon.pokemon_name}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removePokemon(pokemon.nick_name)}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <p>No data.</p>
      )}
    </>
  );
};

export default MyPokemonList;
