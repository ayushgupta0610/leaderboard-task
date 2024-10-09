import Leaderboard from "../components/Leaderboard";

export default function AllTimeLeaderboard() {
  return (
    <Leaderboard
      apiEndpoint="http://localhost:3000/api/leaderboard/all-time"
      title="All-Time Leaderboard"
    />
  );
}
