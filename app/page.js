// src/components/HomePage.js
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-8">Presidents</h1>
    <div className="my-4">
      <Image src="./Presidents.svg" alt="Presidents Logo" width={20} height={20}></Image>
    </div>
    <p className="text-lg mb-8">How about it</p>
    <div className="space-x-4">
      <Link href="/create">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Create Game
        </button>
      </Link>
      <Link href="/join">
        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition outline outline-blue-600 outline-2">
          Join Game
        </button>
      </Link>
    </div>
  </div>
);

export default HomePage;
