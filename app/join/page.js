// src/components/JoinGame.js
"use client";

import React, { useState, useEffect } from "react";
import socket from "@/utils/socket"; // Adjust the path based on your project structure
import { useRouter } from "next/navigation";

const JoinGame = () => {
  const [name, setName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "Oh no! We have encountered an error.",
  });
  const router = useRouter();

  // Extract gameCode from URL query parameters and set it in state
  useEffect(() => {
    // Check if the window object is available to avoid SSR issues
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const codeFromURL = params.get("gameCode"); // Extracts the 'gameCode' parameter
      if (codeFromURL) {
        setGameCode(codeFromURL); // Sets the game code in the input field
      }
    }
  }, []);

  const handleJoinGame = (e) => {
    e.preventDefault();

    // Check if the code is running in the browser before using sessionStorage
    if (typeof window !== "undefined") {
      if (!socket.connected) {
        socket.connect();
      }

      // Emit 'joinGame' event to the server
      socket.emit("joinGame", { name, gameCode }, (response) => {
        console.log("response", response);
        if (response.error) {
          setErrorMessage({ error: true, message: response.error });
        } else {
          // Store playerName and gameCode in sessionStorage
          sessionStorage.setItem("playerName", name);
          sessionStorage.setItem("gameCode", gameCode);
          sessionStorage.setItem("playerId", response.playerId);
          router.push("/game");
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Join Game</h2>
        <form onSubmit={handleJoinGame} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nickname:</label>
            <input
              type="text"
              placeholder="eg. Jimmy"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Game Code:</label>
            <input
              type="text"
              placeholder="eg. 672ACD"
              required
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errorMessage.error && errorMessage.message && (
            <div className="mb-4 px-4 py-2 bg-red-200 text-red-800 rounded">
              <p>{errorMessage.message}</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Join Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinGame;
