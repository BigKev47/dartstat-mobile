const defaultState = {
  currentGame: {
    __typename: 'currentGame',
    id: "",
    darts: [],
    playersIds: [],
    scores: [],
    scoreHistory: [],
    marks: [[],[]],
    gameMarks: [],
    gameType: "Cricket",
    currentPlayerIndex: 0,
    currentDarts: [],
    roundScore: 0,
    round: 1,
    gameActive: false,
    gameCompleted: false
  }
};

export default defaultState

