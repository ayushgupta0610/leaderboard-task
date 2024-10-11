interface User {
  id: number;
  username: string;
  avatar: string;
  totalGames: number;
  volume: number;
  games24h: number;
}

interface LeaderboardData {
  users: User[];
  currentPage: number;
  usersPerPage: number;
  totalPages: number;
  totalRecords: number;
}

export type { User, LeaderboardData };
