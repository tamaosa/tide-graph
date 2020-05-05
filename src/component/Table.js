import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../App.css";

const StyledTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 240,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const rows = props.data;

  return (
    <div style={{ marginTop: "1rem" }}>
      <TableContainer component={Paper} elevation={0}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>日付</StyledTableCell>
              <StyledTableCell align="right">潮名</StyledTableCell>
              <StyledTableCell align="right">満潮</StyledTableCell>
              <StyledTableCell align="right">干潮</StyledTableCell>
              <StyledTableCell align="right">日出(入)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.date}>
                <StyledTableCell component="th" scope="row">
                  {row.date}
                </StyledTableCell>
                <StyledTableCell align="right">{row.tidetype}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.high_time[0]}
                  <br />
                  {row.high_time[1]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.low_time[0]}
                  <br />
                  {row.low_time[1]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.sunrise}
                  <br />
                  {row.sunset}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
