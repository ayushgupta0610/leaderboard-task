interface User {
  id: number;
  username: string;
  totalGames: number;
  volume: number;
  gamesLast24h: number;
  avatar: string;
}

const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: `User${i + 1}`,
    totalGames: Math.floor(Math.random() * 2000) + 100,
    volume: parseFloat((Math.random() * 5).toFixed(2)),
    gamesLast24h: Math.floor(Math.random() * 200),
    avatar: "/placeholder-avatar.png", // Replace with an actual placeholder image
  }));
};

export const users24h = generateMockUsers(50);
export const usersAllTime = generateMockUsers(50);
