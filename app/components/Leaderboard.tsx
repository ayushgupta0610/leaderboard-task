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
import Avatar from "@mui/material/Avatar"; // Import Avatar component

interface User {
  id: number;
  username: string;
  avatar: string;
  totalGames: number;
  volume: number;
  games24h: number;
}

interface LeaderboardProps {
  apiEndpoint: string;
  title: string;
}

export default function Leaderboard({ apiEndpoint, title }: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  //   const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(7);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsersPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `${apiEndpoint}?currentPage=${
          currentPage + 1
        }&usersPerPage=${usersPerPage}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setUsers(data.users);
      //   setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords);
      setUsersPerPage(data.usersPerPage);
    };
    fetchUsers();
  }, [currentPage, usersPerPage, apiEndpoint]);

  return (
    <TableContainer component={Paper}>
      <h2>{title}</h2>
      <Table sx={{ minWidth: 480 }} aria-label="leaderboard table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Rank</TableCell>
            <TableCell align="center">User</TableCell>
            <TableCell align="right">Total Games</TableCell>
            <TableCell align="right">Volume</TableCell>
            <TableCell align="right">24h Games</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                {currentPage * usersPerPage + index + 1}
              </TableCell>
              <TableCell
                align="center"
                component="th"
                scope="row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%", // Ensure full width
                }}
              >
                <Avatar
                  src={user.avatar || "/images/placeholder-avatar.png"}
                  alt={user.username}
                  style={{ marginRight: "8px" }}
                />
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
              colSpan={5}
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
