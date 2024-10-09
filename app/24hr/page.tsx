import Leaderboard from "../components/Leaderboard";

export default function TwentyFourHourLeaderboard() {
  return (
    <Leaderboard
      apiEndpoint="http://localhost:3000/api/leaderboard/24hr"
      title="24 Hour Leaderboard"
      defaultSortField="games24h" // Set default sort field
      defaultSortOrder="desc" // Set default sort order
    />
  );
}
