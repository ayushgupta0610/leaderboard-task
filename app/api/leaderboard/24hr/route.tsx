import { NextResponse } from "next/server";
import { users24h } from "../../../mockData";
import { getLeaderboardData } from "../utils"; // Import the reusable function

// This function is called when a GET request is made to /api/leaderboard/24hr
export async function GET(request: Request) {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("currentPage") || "1", 10);
  const usersPerPage = parseInt(
    url.searchParams.get("usersPerPage") || "7",
    10
  );
  const sortField = url.searchParams.get("sortField") || "games24h"; // Default sort field
  const sortOrder = url.searchParams.get("sortOrder") || "desc"; // Default sort order

  const dailyLeaderboard = getLeaderboardData(
    users24h,
    currentPage,
    usersPerPage,
    sortField,
    sortOrder
  );

  return NextResponse.json(dailyLeaderboard);
}
