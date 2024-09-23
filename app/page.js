// src/components/HomePage.js
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div
      id="content"
      className="max-w-4xl w-full flex flex-col justify-start items-center my-2 mx-2"
    >
      <div className="my-4 px-8">
        <Image
          src="./Presidents.svg"
          alt="Presidents Logo"
          width={500} // Set the width in pixels
          height={300}
        ></Image>
      </div>
      <p className="text-lg mb-8">How about it</p>
      <div className="space-x-4 w-full grid grid-cols-2 px-6">
        <Link href="/create">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 outline outline-blue-500 outline-2 transition w-full">
            Create Game
          </button>
        </Link>
        <Link href="/join">
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition outline outline-blue-600 outline-2 w-full">
            Join Game
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
