import Leaderboard from "../components/Leaderboard";
import { LeaderboardData } from "../types";

const DAILY_ENDPOINT = "http://localhost:3000/api/leaderboard/24hr";

export default async function TwentyFourHourLeaderboard() {
  const res = await fetch(DAILY_ENDPOINT, {
    cache: "no-store", // Ensure fresh data
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const initialData: LeaderboardData = await res.json();

  return (
    <Leaderboard
      apiEndpoint={DAILY_ENDPOINT}
      title="24 Hour Leaderboard"
      defaultSortField="games24h" // Set default sort field
      defaultSortOrder="desc" // Set default sort order
      initialData={initialData} // Pass initial data to Leaderboard
    />
  );
}
