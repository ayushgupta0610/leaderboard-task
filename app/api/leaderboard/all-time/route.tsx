import { NextResponse } from "next/server";
import { usersAllTime } from "../../../mockData";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("currentPage") || "1", 10);
  const usersPerPage = parseInt(
    url.searchParams.get("usersPerPage") || "7",
    10
  );
  const offset = (currentPage - 1) * usersPerPage;

  const paginatedUsers = usersAllTime.slice(offset, offset + usersPerPage);
  const totalPages = Math.ceil(usersAllTime.length / usersPerPage);
  const totalRecords = usersAllTime.length;
  const allTimeLeaderboard = {
    users: paginatedUsers,
    currentPage,
    usersPerPage,
    totalPages,
    totalRecords,
  };
  return NextResponse.json(allTimeLeaderboard);
}
