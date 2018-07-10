import React from "react";
import {View, ScrollView, Text, Button, StyleSheet, Image} from "react-native";
import Grid from "react-native-easy-grid/Components/Grid";
import Col from "react-native-easy-grid/Components/Col";
import Row from "react-native-easy-grid/Components/Row";
import PlayerColumn from "./PlayerColumn/PlayerColumn";

export class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentGame } = this.props;
    let gameMarks = currentGame.gameMarks.map(i => (
      <Row key={i}>
        <Col><Text style={styles.scoretext}>{i}</Text>
        </Col>
      </Row>
    ));

    //TODO Format Down to Player Columns and style
    return (
      <View style={[styles.container, { flex: 5, flexDirection: "row" }]}>
        <Grid  style={styles.scoreboardheader}>
          <Row>
            <Col>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[styles.scoretext, styles.scoreheader]}
              >
                {currentGame.players[0].firstName}
              </Text>
            </Col>
            <Col>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[styles.scoretext, styles.scoreheader]}
              >
                Cricket
              </Text>
            </Col>
            <Col>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[styles.scoretext, styles.scoreheader]}
              >
                {currentGame.players[1].firstName}
              </Text>
            </Col>
          </Row>
          <Row style={{ flex: 10, flexDirection: 'row'}}>
            <PlayerColumn {...this.props} playerIdx={0}/>
            <Col style={{flex: 1}}>{gameMarks}</Col>
            <PlayerColumn {...this.props} playerIdx={1} style={{flex: 2}}/>
          </Row>
          {/*<Text adjustsFontSizeToFit numberOfLines={1}*/}
          {/*style={[styles.scoretext, styles.scoreheader, awayActive]}>P1: {this.props.players[0]} </Text>*/}
          {/*<Text adjustsFontSizeToFit numberOfLines={1}*/}
          {/*style={[styles.scoretext, styles.scoreheader]}>Round {this.pr-ops.round} </Text>*/}
          {/*<Text adjustsFontSizeToFit numberOfLines={1}*/}
          {/*style={[styles.scoretext, styles.scoreheader, homeActive]}>P2: {this.props.players[1]} </Text>*/}
          {/*</View>*/}
          {/*<View style={{flex: 10, flexDirection: 'row'}}>*/}
          {/*<Text style={[styles.scoretext, styles.left, awayActive]}>{this.props.homeScore}</Text>*/}
          {/*<Text/>*/}
          {/*<Text style={[styles.scoretext, styles.right, homeActive]}>{this.props.awayScore}</Text>*/}
          {/*</View>*/}
        </Grid>
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
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "white"
  },
  //TODO: Figure out how to properly scale my text sizes.
  scoretext: {
    fontFamily: "sketchy",
    flex: 3,
    color: "white",
    fontSize: 40,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 2,
    paddingVertical: 2

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
    fontFamily: "sketchy",
    fontSize: 20
  },

  dartlog: {
    flex: 1,
    backgroundColor: "darkgray"
  }
});
