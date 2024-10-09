"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface User {
  id: number;
  username: string;
  avatar: string;
  totalGames: number;
  volume: number;
  games24h: number;
}

export default function TwentyFourHourLeaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users24h, setUsers24h] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(8);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `http://localhost:3000/api/leaderboard/24hr?currentPage=${currentPage}&usersPerPage=7`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setUsers24h(data.users);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords);
    };
    fetchUsers();
  }, [currentPage]);

  return (
    <div className="bg-indigo-950 min-h-screen p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-indigo-900/50 rounded-lg overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            TOP USERS BY 24H VOLUME
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-indigo-300 text-left">
                  <th className="py-2 px-2 sm:px-4">User</th>
                  <th className="py-2 px-2 sm:px-4">Total Games</th>
                  <th className="py-2 px-2 sm:px-4">Volume</th>
                  <th className="py-2 px-2 sm:px-4">24h Games</th>
                </tr>
              </thead>
              <tbody>
                {users24h?.map((user, index) => (
                  <tr key={user.id} className="border-t border-indigo-800">
                    <td className="py-3 px-2 sm:px-4 flex items-center">
                      <span className="text-indigo-300 mr-2 w-4">{index + 1}.</span>
                      <div className="relative w-8 h-8 mr-2">
                        <Image
                          src={user.avatar}
                          alt={user.username}
                          layout="fill"
                          className="rounded-full"
                        />
                      </div>
                      <span className="text-white">{user.username}</span>
                      {index === 0 && <span className="ml-2 text-xs text-cyan-300">(You)</span>}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-indigo-300">{user.totalGames}</td>
                    <td className="py-3 px-2 sm:px-4 text-cyan-300 font-semibold">{user.volume.toFixed(2)} SOL</td>
                    <td className="py-3 px-2 sm:px-4 text-indigo-300">{user.games24h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-indigo-950/50 px-4 py-3 flex items-center justify-between border-t border-indigo-800 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-indigo-700 text-sm font-medium rounded-md text-indigo-300 bg-indigo-800 hover:bg-indigo-700"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-indigo-700 text-sm font-medium rounded-md text-indigo-300 bg-indigo-800 hover:bg-indigo-700"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-indigo-300">
                Showing <span className="font-medium">{(currentPage - 1) * 7 + 1}</span> to{" "}
                <span className="font-medium">{Math.min(currentPage * 7, totalRecords)}</span> of{" "}
                <span className="font-medium">{totalRecords}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-indigo-700 bg-indigo-800 text-sm font-medium text-indigo-300 hover:bg-indigo-700"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-indigo-700 bg-indigo-800 text-sm font-medium text-indigo-300 hover:bg-indigo-700"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}