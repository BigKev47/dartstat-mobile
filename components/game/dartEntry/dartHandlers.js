export const cricketHandler = async (props, dart) => {
  const { currentGame: { currentPlayerIndex, tempMarks, gameMarks, marks, scores }, updateCurrentGame } = props;
  const { sectionHit, numberHit } = dart;

  let _roundScore = scores[currentPlayerIndex];
  let _tempMarks = tempMarks.slice();
  if (gameMarks.includes(numberHit)) {
    let markIdx = gameMarks.indexOf(numberHit);
    let opponentMarkCt = marks[(currentPlayerIndex + 1) % 2][markIdx];
    let prevMarkCt = tempMarks[markIdx];
    let mult = sectionHit === 0 ? 1 : sectionHit;


    if (opponentMarkCt >= 3 && prevMarkCt >= 3) {
      return null;
    }

    else {
      (opponentMarkCt >= 3 && (prevMarkCt + mult) > 3) ? _tempMarks[markIdx] = 3 :
        _tempMarks[markIdx] = prevMarkCt + mult;
      try {
        await updateCurrentGame({
          variables: {
            index: "tempMarks",
            value: _tempMarks
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  let tempScore = 0;
  let scoreAdder = (item, index) => {
    if (item >= 3) {
      let value = gameMarks[index] === "Bull" ? 25 : parseInt(gameMarks[index]);
      tempScore += ((item - 3) * value);
    }
  };
  _tempMarks.forEach(scoreAdder);
  _roundScore = tempScore;
  await updateCurrentGame({
    variables: {
      index: "roundScore",
      value: _roundScore
    }
  });
};




const ohOne = (props, dart) => {
  let mult = sectionHit === 0 ? 1 : sectionHit;
  let dartscore =
    dart.sectionHit === null
      ? 0
      : dart.numberHit * (dart.sectionHit === 0 ? 1 : dart.sectionHit);
};
