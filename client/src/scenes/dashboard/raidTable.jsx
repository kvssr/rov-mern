import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useGetRaidInfoByIdQuery } from "state/api";
import { CircularProgress } from "@mui/material";

const RaidTable = ({ id }) => {
  const { data } = useGetRaidInfoByIdQuery(id);
  if (!data || id === -1) return <CircularProgress color="secondary" />;
  console.log("🚀 ~ file: raidTable.jsx:15 ~ RaidTable ~ data:", data);

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Kills</TableCell>
            <TableCell align="right">Deaths</TableCell>
            <TableCell align="right">K/D</TableCell>
            <TableCell align="right">Allies (avg)</TableCell>
            <TableCell align="right">Enemies (avg)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={data.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="right">{data.total_kills}</TableCell>
            <TableCell align="right">{data.total_deaths}</TableCell>
            <TableCell align="right">
              {(data.total_kills / data.total_deaths).toFixed(1)}
            </TableCell>
            <TableCell align="right">{data.mean_allies}</TableCell>
            <TableCell align="right">{data.mean_enemies}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RaidTable;
