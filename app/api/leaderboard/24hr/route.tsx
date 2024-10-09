import { NextResponse } from "next/server";
import { users24h } from "../../../mockData";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("currentPage") || "1", 10);
  const usersPerPage = 7;
  const offset = (currentPage - 1) * usersPerPage;

  const paginatedUsers = users24h.slice(offset, offset + usersPerPage);
  const totalPages = Math.ceil(users24h.length / usersPerPage);
  const dailyLeaderboard = {
    users: paginatedUsers,
    currentPage,
    totalPages,
  };
  return NextResponse.json(dailyLeaderboard);
}
