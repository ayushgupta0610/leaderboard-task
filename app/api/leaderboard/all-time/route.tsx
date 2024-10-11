import { NextResponse } from "next/server";
import { usersAllTime } from "../../../mockData";
import { getLeaderboardData } from "../utils"; // Import the reusable function

// This function is called when a GET request is made to /api/leaderboard/all-time
export async function GET(request: Request) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("currentPage") || "1", 10);
  const usersPerPage = parseInt(
    url.searchParams.get("usersPerPage") || "7",
    10
  );
  const sortField = url.searchParams.get("sortField") || "totalGames"; // Default sort field
  const sortOrder = url.searchParams.get("sortOrder") || "desc"; // Default sort order

  const allTimeLeaderboard = getLeaderboardData(
    usersAllTime,
    currentPage,
    usersPerPage,
    sortField,
    sortOrder
  );

  return NextResponse.json(allTimeLeaderboard);
}
