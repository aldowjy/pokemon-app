import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

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
  detailLink: {
    color: "#FF0000",
    "&:hover, &:focus": {
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
});

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const gqlVariables = {
  limit: 50,
  offset: 1,
};

export default function PokemonsTable() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });
  const classes = useStyles();

  if (loading)
    return (
      <div>
        <Skeleton variant="text" width={350} height={60} />
        <Skeleton variant="text" height={350} />
      </div>
    );
  if (error) return <Alert severity="error">Something Wrong!</Alert>;

  return (
    <>
      <Typography variant="h5" color="inherit" className={classes.title}>
        List of Pokemon
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              {/* <StyledTableCell>Image</StyledTableCell> */}
              <StyledTableCell>Pokemon Name</StyledTableCell>
              <StyledTableCell align="right">Owned Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.pokemons.results.map((pokemon, index) => (
              <StyledTableRow key={pokemon.name}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                {/* <StyledTableCell>
                  <img src={pokemon.image} alt={pokemon.name} />
                </StyledTableCell> */}
                <StyledTableCell>
                  <Link
                    to={`/detail/${pokemon.name}`}
                    className={classes.detailLink}
                    style={{ textDecoration: "none" }}
                  >
                    {pokemon.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">0</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
