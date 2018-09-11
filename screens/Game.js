import React from "react";
import { View, Alert, StyleSheet, Text } from "react-native";

import { NumberGrid } from "../components/NumberGrid.js";
import {
  createDart,
  allUsers,
  createGame,
  endTurn,
  updateCurrentGame,
  getCurrentGame,
  resetCurrentGame
} from "../graphql";
import { graphql, compose } from "@expo/react-apollo";
import Scoreboard from "../components/game/Scoreboard";
import { DartEntry } from "../components/game/DartEntry";
import NewGame from "../components/game/NewGame";
import Colors from "../constants/Colors";
import { GameOver } from "../components/game/GameOver";
import gameQuery from "../graphql/gameQuery";

export class Game extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);

    this.state = {
      players: ["cjf673owt4whi0104fng14osm", "cjf677xt84xp50104rig3zrmd"]
    };
  }

  render() {
    const { currentGame, loading } = this.props;
    if (loading) {
      return null;
    }
    const screen = !currentGame.id ? (
      <NewGame {...this.props} />
    ) : (
      <DartEntry {...this.props} style={styles.dartentry} />
    );
    const scoreBoard = currentGame.id ? (
      <Scoreboard {...this.props} id={currentGame.id}  />
    ) : null;

    //TODO Create a running scoreboard with all necessary information and proper columns
    return (
      <View style={styles.container}>
        {scoreBoard}
        {screen}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.scoreBoard,
    alignContent: "center"
  },

  scoreboard: {
    flex: 5,
    backgroundColor: Colors.scoreBoard
  },
  //TODO: Figure out how to properly scale my text sizes.

  dartentry: {
    flex: 3,
    flexDirection: "row"
  }
});

export default compose(
  graphql(createDart, { name: "createDart" }),
  graphql(createGame, { name: "createGame" }),
  graphql(endTurn, { name: "endTurn" }),
  graphql(getCurrentGame, {
    props: ({ data: { currentGame, loading } }) => ({
      currentGame,
      loading
    })
  }),
  graphql(updateCurrentGame, {
    name: "updateCurrentGame"
  }),
  graphql(resetCurrentGame, {
    name: "resetCurrentGame"
  })
)(Game);
