export const cricketHandler = async (props, dart) => {
  const { currentGame, updateCurrentGame } = props;
  const { sectionHit, numberHit } = dart;
  const { currentPlayerIndex, tempMarks, gameMarks, marks } = currentGame;

  if (gameMarks.includes(numberHit)) {
    let mult = sectionHit === 0 ? 1 : sectionHit;
    let markIdx = gameMarks.indexOf(numberHit);
    let newMarks = tempMarks.slice(0);
    let playerMarks = newMarks[currentPlayerIndex].slice(0);
    let prevMarkCount = playerMarks[markIdx];
    playerMarks[markIdx] = prevMarkCount + mult;
    let tempScore = 0;
    let scoreAdder = (item, index)=> {
      if (item >= 3) {
        let value = gameMarks[index] === "Bull" ? 25 : parseInt(gameMarks[index]);
        tempScore = tempScore + ((item - 3) * value);
        console.log(value)
      }
}; //asfhh
    playerMarks.forEach(scoreAdder);
    newMarks[currentPlayerIndex] = playerMarks;
    console.log("Score " + tempScore);

    try {
      await updateCurrentGame({
        variables: {
          index: "tempMarks",
          value: newMarks
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
