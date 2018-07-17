export const cricketHandler = async (props, dart)=> {
  const { currentGame, updateCurrentGame } = this.props;
  const {sectionHit, numberHit} = dart;
  let { currentPlayerIdx, currentDarts, gameMarks, marks }  = currentGame;


  console.log(dart);


  if (gameMarks.includes(numberHit)) {
    let mult = sectionHit === 0 ? 1 : sectionHit;
    let markIdx = gameMarks.findIndex(numberHit);
    let newMarks = marks.slice(0);
    let prevMarkCount = marks[currentPlayerIdx][markIdx];
    newMarks[currentPlayerIdx][markIdx] = prevMarkCount + mult;

    //This calculates the score by multiplying any triples or doubles
    try {
      await
      updateCurrentGame({
        variables: {
          index: "marks"
          value: newMarks
        }
      });
      await
      updateCurrentGame({
        variables: {
          index: "currentDarts",
          value: currentDarts
        }
      });
      console.log(marks);
      this.roundHandler(dart);
    } catch (err) {
      console.log(err);

    }
  }};

    //If not a scoring dart


const ohOne= (props, dart)=> {
  let mult = sectionHit === 0 ? 1 : sectionHit;
  let dartscore = dart.sectionHit === null ? 0 : dart.numberHit * (dart.sectionHit === 0 ? 1 : dart.sectionHit);
}
;
