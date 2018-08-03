import React from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { createDart, allUsers, createGame } from "../../graphql";
import { graphql, compose } from "@expo/react-apollo";
import NumberGrid from "../NumberGrid";
import { cricketHandler, ohOneHandler } from "./dartEntry/dartHandlers";
import { roundHandler } from "./dartEntry/roundHandler";
import { gameOver } from "./GameOver";

export class DartEntry extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.dartHandler = this.dartHandler.bind(this);
  }


  dartHandler = async dart => {
    const { currentGame, createDart, updateCurrentGame } = this.props;
    const playerIdx = currentGame.currentPlayerIndex;

    let currentDarts = currentGame.currentDarts.slice(0);
    currentDarts.push(dart);

    try {
      switch (currentGame.gameType) {
        case "Cricket":
          await cricketHandler(this.props, dart);
          break;
        case "501":
          await ohOneHandler(this.props, dart);
          break;
      }

      //This pushes the dartEntry to the gql backend DISABLED FOR DEV
      // await createDart({
      //   variables: {
      //     //TODO get player login worked out and remove this hard-code
      //     playerId: currentGame.playersIds[playerIdx],
      //     gameId: currentGame.id,
      //     numberHit: parseInt(dart.numberHit),
      //     sectionHit: dart.sectionHit
      //   }
      // });

      await updateCurrentGame({
        variables: {
          index: "currentDarts",
          value: currentDarts
        }
      });
    } catch (err) {
      console.log(err);
    }
   await roundHandler(this.props)
  };


  render() {
    return (
      <View style={styles.scoreentry}>
        <View style={styles.numberhit}>
          <NumberGrid onPress={this.dartHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  scoreboardheader: {
    flex: 1,
    backgroundColor: "#164c16",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "white"
  },

  scoreboard: {
    flex: 4,
    backgroundColor: "#164c16"
  },
  //TODO: Figure out how to properly scale my text sizes.
  scoretext: {
    fontFamily: "chalk-it-up",
    color: "white",
    fontSize: 28,
    flex: 3,
    alignContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 6,
    paddingVertical: 6

    // adjustsFontSizeToFit: true
    //textDecorationLine: 'line-through',
  },

  right: {
    textAlign: "right"
    //paddingRight: '6%',
  },

  left: {
    textAlign: "left"
    //paddingLeft: '6%',
  },

  scoreheader: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "sketchy"
  },

  scoreentry: {
    flex: 3,
    flexDirection: "row"
  },

  numberhit: {
    flex: 4,
    //flexDirection: 'row',
    //flexWrap: 'wrap',
    backgroundColor: "white",
    //justifyContent: 'space-around',
  },

  dartlog: {
    flex: 1,
    backgroundColor: "darkgray"
  },

  scoringsection: {
    flex: 5,
    backgroundColor: "darkgray",
    flexDirection: "row"
  }
});
