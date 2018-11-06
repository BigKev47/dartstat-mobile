import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import {
  createDart,
  allUsers,
  createGame,
  updateCurrentGame
} from "../../graphql";
import { graphql, compose, withApollo } from "@expo/react-apollo";
import Button from "react-native-button";
import Colors from "../../constants/Colors";
import { Game } from "../../screens/Game";
import ModalDropdown from "react-native-modal-dropdown";
import createCurrentGame from "../../graphql/client/createCurrentGame";
import { default as variables } from "./newGame/queryVariables";
import { signOut } from "../../loginUtils";
import { client } from "../../state";

class NewGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = { menu: null };
  }

  handleClick = () => {
    this.setState({ menu: "gameType" });
  };

  createCricket = async () => {
    const {
      createGame,
      currentGame,
      updateCurrentGame,
      createCurrentGame,
      loading
    } = this.props;
    let gameMarks = [];
    for (let i = 20; i > 14; i--) {
      gameMarks.push(i.toString());
    }
    gameMarks.push("Bull");
    let marks = [[], []];
    for (let i = 0; i < gameMarks.length; i++) {
      marks[0].push(0);
      marks[1].push(0);
    }
    let tempMarks = marks[0];
    try {
      // Disabled for Dev
      // const newGame = await createGame({
      //   variables: {
      //     gameType: "Cricket",
      //     playersIds: ["cjf673owt4whi0104fng14osm", "cjf677xt84xp50104rig3zrmd"]
      //   }
      // });
      await createCurrentGame({
        variables: {
          id: "testGame", //newGame.data.createGame.id,
          playersIds: ["Home", "Away"],
          scores: [0, 0],
          gameType: "Cricket",
          scoreHistory: [[], []],
          gameMarks: gameMarks,
          marks: marks,
          tempMarks: tempMarks,
          roundScore: 0
        }
      });
      console.log(currentGame);
    } catch (error) {
      console.log(error);
    }
  };

  createOhOne = async () => {
    const { createGame, currentGame, createCurrentGame, loading } = this.props;
    try {
      // Disabled for Dev
      // const newGame = await createGame({
      //   variables: {
      //     gameType: "Cricket",
      //     playersIds: ["cjf673owt4whi0104fng14osm", "cjf677xt84xp50104rig3zrmd"]
      //   }
      // });
      await createCurrentGame({
        variables: {
          id: "testGame", //newGame.data.createGame.id,
          playersIds: ["Home", "Away"],
          scores: [501, 501],
          gameType: "501",
          scoreHistory: [[], []],
          roundScore: 0,
          gameMarks: [],
          marks: [[], []],
          tempMarks: []
        }
      });
      console.log(currentGame);
    } catch (error) {
      console.log(error);
    }
  };

  logOut = () => {
    signOut();
    client.resetStore();
  };

  render() {
    const { allUsers, loading } = this.props;
    if (loading) return null;
    let menu;

    if (this.state.menu === null) {
      menu = (
        <View style={styles.container}>
          <Button
            onPress={this.handleClick}
            style={styles.button}
            containerStyle={styles.buttoncontainer}
          >
            New Game
          </Button>

          <Button
            onPress={this.logOut}
            style={[styles.button, { fontSize: 25 }]}
            containerStyle={styles.buttoncontainer}
          >
            Log Out
          </Button>
        </View>
      );
    } else if (this.state.menu === "gameType") {
      menu = (
        <View style={styles.container}>
          <Button
            onPress={this.createOhOne}
            style={styles.button}
            containerStyle={styles.buttoncontainer}
          >
            501
          </Button>

          <Button
            onPress={this.createCricket}
            style={styles.button}
            containerStyle={styles.buttoncontainer}
          >
            Cricket
          </Button>
        </View>
      );
    }

    return <View style={{ flex: 1 }}>{menu}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.scoreBoard,
    alignContent: "center"
  },
  button: {
    color: "white",
    alignContent: "center",
    fontSize: 50,
    fontFamily: "sketchy",
    fontWeight: "400"
  },

  buttoncontainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    overflow: "hidden",
    borderRadius: 6,
    justifyContent: "center",
    backgroundColor: Colors.scoreBoard

    //flexDirection: 'row',
  }
});

export default compose(
  graphql(allUsers, {
    props: ({ data }) => ({ ...data })
  }),
  graphql(createCurrentGame, { name: "createCurrentGame" })
)(NewGame);
