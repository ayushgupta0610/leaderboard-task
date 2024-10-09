import { NextResponse } from "next/server";
import { usersAllTime } from "../../../mockData";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("currentPage") || "1", 10);
  const usersPerPage = 7;
  const offset = (currentPage - 1) * usersPerPage;

  const paginatedUsers = usersAllTime.slice(offset, offset + usersPerPage);
  const totalPages = Math.ceil(usersAllTime.length / usersPerPage);
  const allTimeLeaderboard = { users: paginatedUsers, currentPage, totalPages };
  return NextResponse.json(allTimeLeaderboard);
}
