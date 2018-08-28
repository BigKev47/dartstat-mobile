import React from 'react'
import Col from "react-native-easy-grid/Components/Col";
import { StyleSheet, Text } from "react-native";

export class PlayerInfo extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const {currentGame, playerIdx} = this.props;
    const inactiveStyle = playerIdx !== currentGame.currentPlayerIndex ? {opacity: .5} : null;
    const alignment = playerIdx === 0 ? styles.left : styles.right;
    return(
      <Col style={{marginVertical: '2%'}}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.scoreheader, inactiveStyle, alignment]}
        >
          {currentGame.playersIds[playerIdx]}
        </Text>
      </Col>
    )
  }
}

const styles = StyleSheet.create({
  right: {
    textAlign: "right",
    paddingRight: '6%',
  },

  left: {
    textAlign: "left",
    paddingLeft: '6%',
  },

  scoreheader: {
    flex: 1,
    flexDirection: "column",
    color: '#fff',
    fontFamily: "sketchy",
    fontSize: 20,
  }
});