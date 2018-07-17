export const cricketHandler = async (props, dart) => {
  const { currentGame, updateCurrentGame } = props;
  const { sectionHit, numberHit } = dart;
  const { currentPlayerIndex, currentDarts, gameMarks, marks } = currentGame;

  console.log(numberHit);
  console.log(gameMarks.includes(numberHit.toString()));

  if (gameMarks.includes(numberHit)) {
    let mult = sectionHit === 0 ? 1 : sectionHit;
    let markIdx = gameMarks.indexOf(numberHit);
    let newMarks = marks.slice(0);
    let playerMarks = newMarks[currentPlayerIndex].slice(0);
    let prevMarkCount = playerMarks[markIdx];
    playerMarks[markIdx] = prevMarkCount + mult;
    newMarks[currentPlayerIndex] = playerMarks;
    try {
      await updateCurrentGame({
        variables: {
          index: "marks",
          value: newMarks
        }
      });
      console.log(marks);
    } catch (err) {
      console.log(err);
    }
  }
};

    //If not a scoring dart


const ohOne = (props, dart) => {
  let mult = sectionHit === 0 ? 1 : sectionHit;
  let dartscore =
    dart.sectionHit === null
      ? 0
      : dart.numberHit * (dart.sectionHit === 0 ? 1 : dart.sectionHit);
};
