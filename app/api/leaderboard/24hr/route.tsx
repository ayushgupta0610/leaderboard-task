import { NextResponse } from "next/server";
import { users24h } from "../../../mockData";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("currentPage") || "1", 10);
  const usersPerPage = parseInt(
    url.searchParams.get("usersPerPage") || "7",
    10
  );
  const sortField = url.searchParams.get("sortField") || "games24h"; // Default sort field
  const sortOrder = url.searchParams.get("sortOrder") || "asc"; // Default sort order
  const offset = (currentPage - 1) * usersPerPage;

  // Sorting logic
  const sortedUsers = [...users24h].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedUsers = sortedUsers.slice(offset, offset + usersPerPage);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const totalRecords = sortedUsers.length;
  const dailyLeaderboard = {
    users: paginatedUsers,
    currentPage,
    usersPerPage,
    totalPages,
    totalRecords,
  };

  return NextResponse.json(dailyLeaderboard);
}
