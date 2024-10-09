"use client";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex mb-5 bg-slate-200 p-3 space-x-3">
      {/* <Link href="/" className="mr-5">
        Solana Shuffle
      </Link> */}
      <Link href="/24hr" className="text-white">
        24hr Leaderboard
      </Link>
      <Link href="/all-time" className="text-white">
        All-Time Leaderboard
      </Link>
    </div>
  );
};

export default NavBar;
