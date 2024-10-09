"use client";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

interface User {
  id: number;
  username: string;
  avatar: string;
  totalGames: number;
  volume: number;
  games24h: number;
}

export default function AllTimeLeaderboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [usersAllTime, setUsersAllTime] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(7);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log("New page", newPage);
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Rows per page", event.target.value);
    setUsersPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `http://localhost:3000/api/leaderboard/24hr?currentPage=${
          currentPage + 1
        }&usersPerPage=${usersPerPage}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      console.log("Data fetched for all time leaderboard", data);
      setUsersAllTime(data.users);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords);
      setUsersPerPage(data.usersPerPage);
    };
    fetchUsers();
  }, [currentPage]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 480 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Total Game&nbsp;</TableCell>
            <TableCell align="right">Volume&nbsp;</TableCell>
            <TableCell align="right">24h Games&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersAllTime.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{user.id}</TableCell>

              <TableCell align="right" component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="right">{user.totalGames}</TableCell>
              <TableCell align="right">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    src="/images/solana.jpeg"
                    alt="Solana Icon"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "5px",
                    }}
                  />
                  {user.volume} SOL
                </div>
              </TableCell>
              <TableCell align="right">{user.games24h}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                7,
                10,
                { label: "All", value: totalRecords },
              ]}
              colSpan={3}
              count={totalRecords}
              rowsPerPage={usersPerPage}
              page={currentPage}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
