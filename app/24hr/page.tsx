"use client";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  avatar: string;
  totalGames: number;
  volume: number;
  games24h: number;
}

export default function TwentyFourHourLeaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users24h, setUsers24h] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(8);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `http://localhost:3000/api/leaderboard/24hr?currentPage=${currentPage}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      console.log("Data fetched for 24hr leaderboard", data);
      setUsers24h(data.users);
      setTotalPages(data.totalPages);
    };
    fetchUsers();
  }, [currentPage]);

  return (
    <div className="bg-indigo-900 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-indigo-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            TOP USERS BY 24H VOLUME
          </h2>
          <table className="w-full">
            <thead>
              <tr className="text-indigo-300 text-left">
                <th className="py-2">User</th>
                <th className="py-2">Total Games</th>
                <th className="py-2">Volume</th>
                <th className="py-2">24h Games</th>
              </tr>
            </thead>
            <tbody>
              {users24h?.map((user, index) => (
                <tr key={user.id} className="border-t border-indigo-700">
                  <td className="py-3 flex items-center">
                    <span className="text-indigo-300 mr-2">{index + 1}.</span>
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span className="text-white">{user.name}</span>
                  </td>
                  <td className="py-3 text-indigo-300">{user.totalGames}</td>
                  <td className="py-3 text-cyan-300">{user.volume} SOL</td>
                  <td className="py-3 text-indigo-300">{user.games24h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-indigo-900 px-4 py-3 flex items-center justify-between border-t border-indigo-800 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-indigo-700 text-sm font-medium rounded-md text-indigo-300 bg-indigo-800 hover:bg-indigo-700"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-indigo-700 text-sm font-medium rounded-md text-indigo-300 bg-indigo-800 hover:bg-indigo-700"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-indigo-300">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * 13 + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * 13, totalPages * 13)}
                </span>{" "}
                of <span className="font-medium">{totalPages * 13}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-indigo-700 bg-indigo-800 text-sm font-medium text-indigo-300 hover:bg-indigo-700"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {/* Add page numbers here if needed */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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
