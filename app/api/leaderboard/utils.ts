export function getLeaderboardData(
  users: any[],
  currentPage: number,
  usersPerPage: number,
  sortField: string,
  sortOrder: string
) {
  const offset = (currentPage - 1) * usersPerPage;

  // Sorting logic
  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedUsers = sortedUsers.slice(offset, offset + usersPerPage);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const totalRecords = sortedUsers.length;

  return {
    users: paginatedUsers,
    currentPage,
    usersPerPage,
    totalPages,
    totalRecords,
  };
}
