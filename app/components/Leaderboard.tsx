"use client";

import React, { useState } from "react";
import Image from "next/image";

interface User {
  id: number;
  username: string;
  totalGames: number;
  volume: number;
  gamesLast24h: number;
  avatar: string;
}

interface LeaderboardProps {
  title: string;
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title, users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="py-2">User</th>
            <th className="py-2">Total Games</th>
            <th className="py-2">Volume</th>
            <th className="py-2">24h Games</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id} className="border-t border-gray-700">
              <td className="py-2 flex items-center">
                <span className="mr-2">{indexOfFirstUser + index + 1}.</span>
                <Image
                  src={user.avatar}
                  alt={user.username}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
                <span className="text-white">{user.username}</span>
              </td>
              <td className="py-2 text-white">{user.totalGames}</td>
              <td className="py-2 text-white">{user.volume} SOL</td>
              <td className="py-2 text-white">{user.gamesLast24h}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
