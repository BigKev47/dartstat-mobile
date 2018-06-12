import gql from "graphql-tag";

export const resolvers = {
  Mutation: {
    updateCurrentGame: (_, {index, value}, {cache}) => {
      const query = gql`
          query GetCurrentGame {
              currentGame @client {
                  id
                  players {
                      id
                      firstName
                      lastName
                  }
                  scores
                  scoreHistory
                  currentPlayerIndex
                  darts
                  currentDarts
                  roundScore
                  round
                  gameActive
              }
          }
      `
      const previous = cache.readQuery({query});
      const data = {
        currentGame: {
          ...previous.currentGame,
          [index]: value
        }
      };

      cache.writeQuery({query, data});
      return null
    },
    resetCurrentGame: (_, d, {cache}) => {
      cache.writeData({data: defaultState})
      return null
    },
    endTurn: (_, d, {cache}) => {
      const query = gql`
          query EndTurn {
              currentGame @client {
                  id
                  currentPlayerIndex
                  roundScore
                  round
                  currentDarts
              } }
      `
      const previous = cache.readQuery({query});
      const newPlayerIndex = (previous.currentGame.currentPlayerIndex + 1) % 2;
      const newRound = newPlayerIndex === 0 ? previous.currentGame.round + 1 : previous.currentGame.round;
      const roundScore = 0;

      const data = {
        currentGame: {
          ...previous.currentGame,
          currentPlayerIndex: newPlayerIndex,
          round: newRound,
          roundScore: roundScore,
          currentDarts: []
        }
      };
      cache.writeQuery({query, data});
      return null

    }
  }
};