export const cricketHandler = async (props, dart) => {
  const { currentGame, updateCurrentGame } = props;
  const { sectionHit, numberHit } = dart;
  const { currentPlayerIndex, tempMarks, gameMarks, marks } = currentGame;

  if (gameMarks.includes(numberHit)) {
    let mult = sectionHit === 0 ? 1 : sectionHit;
    let markIdx = gameMarks.indexOf(numberHit);
    let newMarks = tempMarks.slice(0);
    let playerMarks = newMarks[currentPlayerIndex].slice(0);
    let opponentMarks = newMarks[(currentPlayerIndex + 1) % 2];
    let prevMarkCount = playerMarks[markIdx];
    playerMarks[markIdx] = prevMarkCount + mult;
    let tempScore = 0;
//     let scoreAdder = (item, index)=> {
//       if (item >= 3) {
//         let value = gameMarks[index] === "Bull" ? 25 : parseInt(gameMarks[index]);
//         tempScore = tempScore + ((item - 3) * value);
//       }
// };
//     //TODO Figure out score/roundScore alogorithm to replace scoreAdder.
//     playerMarks.forEach(scoreAdder);
    newMarks[currentPlayerIndex] = playerMarks;
    let newScores = currentGame.scores.slice();
    newScores[currentPlayerIndex] = tempScore;

    try {
      await updateCurrentGame({
        variables: {
          index: "tempMarks",
          value: newMarks
        }
      });
      await updateCurrentGame({
        variables: {
          index: "roundScore",
          value: tempScore
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};




const ohOne = (props, dart) => {
  let mult = sectionHit === 0 ? 1 : sectionHit;
  let dartscore =
    dart.sectionHit === null
      ? 0
      : dart.numberHit * (dart.sectionHit === 0 ? 1 : dart.sectionHit);
};
