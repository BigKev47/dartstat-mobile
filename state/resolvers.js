import gql from "graphql-tag";
import defaultState from "./defaultState";
import { getCurrentGame } from "../graphql";



const resolvers = {

  Mutation: {

    updateCurrentGame: (_, {index, value}, {cache}) => {
      const query = gql`
          query GetCurrentGame {
              currentGame @client {
                  id
                  playersIds
                  marks
                  tempMarks
                  gameMarks
                  scoreHistory
                  scores
                  currentPlayerIndex
                  darts
                  currentDarts
                  roundScore
                  round
                  gameType
                  gameActive
              }
          }
      `;
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
                  marks
                  tempMarks
                  scoreHistory
                  currentPlayerIndex
                  currentDarts
                  roundScore
                  round
              }
          }
      `;
      const previous = cache.readQuery({query});
      const newPlayerIndex = (previous.currentGame.currentPlayerIndex + 1) % 2;
      const newRound = newPlayerIndex === 0 ? previous.currentGame.round + 1 : previous.currentGame.round;
      const roundScore = 0;
      const newMarks = previous.currentGame.tempMarks
      const data = {
        currentGame: {
          ...previous.currentGame,
          marks: newMarks,
          currentPlayerIndex: newPlayerIndex,
          round: newRound,
          roundScore: roundScore,
          currentDarts: []
        }
      };
      cache.writeQuery({query, data});
      return null

    },
///sadgagh
    createCurrentGame: (_, {id, gameType, scores, marks, playersIds, scoreHistory, gameMarks}, {cache}) => {
      const query = gql`
        query CreateCurrentGame {
            currentGame @client {
                id
                playersIds
                marks
                tempMarks
                gameMarks
                scoreHistory
                scores
                currentPlayerIndex
                darts
                currentDarts
                roundScore
                round
                gameType
                gameActive
            }
        }
    `;
      const previous = cache.readQuery({query});
      const data = {
        currentGame: {
          ...previous.currentGame,
          id: id,
          gameType: gameType,
          scores: scores,
          marks: marks,
          tempMarks: marks,
          scoreHistory: scoreHistory,
          playersIds: playersIds,
          gameMarks: gameMarks
          },
      }; ///asdgasg
      cache.writeData({query, data});
      return null

    }
  }
};

export default resolvers