import Leaderboard from "../components/Leaderboard";
import { LeaderboardData } from "../types";

export default async function AllTimeLeaderboard() {
  const res = await fetch("http://localhost:3000/api/leaderboard/all-time", {
    cache: "no-store", // Ensure fresh data
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const initialData: LeaderboardData = await res.json();

  return (
    <Leaderboard
      apiEndpoint="http://localhost:3000/api/leaderboard/all-time"
      title="All-Time Leaderboard"
      defaultSortField="totalGames" // Set default sort field
      defaultSortOrder="desc" // Set default sort order
      initialData={initialData} // Pass initial data to Leaderboard
    />
  );
}
