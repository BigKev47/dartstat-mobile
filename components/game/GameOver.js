import React from 'react';
import { Alert } from "react-native";

export const gameOver = (playerIdx, reset) => {

  let winner = (playerIdx === 0) ? "Home" : "Away";
  Alert.alert(
    "Game Over",
    winner + " Wins!",
    [{ text: "View Match Report", onPress: () => console.log("Ask me later pressed") },
      { text: "Done", onPress: () => reset() }
    ]);
};
