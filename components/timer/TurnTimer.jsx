import React, { useState, useEffect, useRef } from "react";

const TurnTimer = ({ onTimeout, onReset, gameState, isPlayerTurn }) => {
  const SECONDS_PER_TURN = 10;
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_TURN); // Set the initial time (e.g., 30 seconds)
  const timerRef = useRef(null);

  // Function to start the timer
  const startTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start a new timer
    setTimeLeft(SECONDS_PER_TURN); // Reset to initial seconds
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (gameState.gameStarted) {
      startTimer(); // Start the timer once the game starts
    }
  }, [gameState.gameStarted]);

  // Reset the timer whenever the current player changes
  useEffect(() => {
    if (gameState.currentPlayer) {
      startTimer(); // Reset and start the timer when the current player changes
    }
  }, [gameState.currentPlayer]);

  // Handle the countdown and call onTimeout when the timer reaches zero, only for the current player
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);

      // Only trigger onTimeout if it's the player's turn
      if (isPlayerTurn) {
        onTimeout(); // Only pass the turn if it's this player's turn
      }
    }
  }, [timeLeft, onTimeout, isPlayerTurn]);

  // Cleanup the timer when the component unmounts
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <p className="text-4xl font-bold animate-pulse">{timeLeft}</p>
      
    </div>
  );
};

export default TurnTimer;
