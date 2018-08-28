import React from 'react'
import Row from "react-native-easy-grid/Components/Row";
import Col from "react-native-easy-grid/Components/Col";
import { StyleSheet, Text } from "react-native";
import { PlayerInfo } from "./playerInfo";


export class ScoreboardHeader extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {

    const { currentGame } = this.props;
    return (

      <Row>
        <PlayerInfo currentGame={currentGame} playerIdx={0}  />
        <Col>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.gameInfo}
          >
            {currentGame.gameType}
          </Text>
        </Col>
        <PlayerInfo currentGame={currentGame}  playerIdx={1} />
      </Row>
    )
  }
}

const styles = StyleSheet.create({
  gameInfo: {
    flex: 1,
    flexDirection: "column",
    color: '#fff',
    fontFamily: "sketchy",
    fontSize: 30,
    textAlign: 'center',
  },
});


