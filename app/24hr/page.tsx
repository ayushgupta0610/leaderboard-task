import Leaderboard from "../components/Leaderboard";
import { LeaderboardData } from "../types";

export default async function TwentyFourHourLeaderboard() {
  const res = await fetch("http://localhost:3000/api/leaderboard/24hr", {
    cache: "no-store", // Ensure fresh data
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const initialData: LeaderboardData = await res.json();

  return (
    <Leaderboard
      apiEndpoint="http://localhost:3000/api/leaderboard/24hr"
      title="24 Hour Leaderboard"
      defaultSortField="games24h" // Set default sort field
      defaultSortOrder="desc" // Set default sort order
      initialData={initialData} // Pass initial data to Leaderboard
    />
  );
}
