import React from "react";
import {View, ScrollView, Text, Button, StyleSheet, Image} from "react-native";
import Grid from "react-native-easy-grid/Components/Grid";
import Col from "react-native-easy-grid/Components/Col";
import Row from "react-native-easy-grid/Components/Row";
import PlayerColumn from "./scoreboard/PlayerColumn";
import gameQuery from "../../graphql/gameQuery";
import {graphql, compose} from "@expo/react-apollo";
import { ScoreboardHeader } from "./scoreboard/ScoreboardHeader";

export class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentGame, loading } = this.props;
    let gameMarks = currentGame.gameMarks.map(i => (
      <Row key={i}>
        <Col><Text style={styles.gameMarks}>{i}</Text>
        </Col>
      </Row>
    ));

    if (loading) {
      return (<View style={[styles.scoreboard, { flex: 5, flexDirection: "row" }]}><Text
        style={[styles.scoretext, styles.scoreheader]}>Loading</Text></View>)
    } else {



      //TODO Format Down to Player Columns and style
      return (
        <View style={[styles.container, { flex: 5, flexDirection: "row" }]}>
          <Grid style={styles.scoreboard}>
            <ScoreboardHeader {...this.props}  />
            <Row style={{ flex: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#fff' }}>
              <PlayerColumn {...this.props} playerIdx={0}/>
              <Col style={{ flex: 1}}>{gameMarks}</Col>
              <PlayerColumn {...this.props} playerIdx={1} style={{ flex: 2 }}/>
            </Row>

          </Grid>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  scoreboard: {
    flex: 1,
    backgroundColor: "#164c16",
    flexDirection: "column",
  },
  //TODO: Figure out how to properly scale my text sizes.
  scoreColumn: {
    borderWidth: 1,
    borderColor: "white",
  },

  gameMarks: {
    fontFamily: "sketchy",
    color: "white",
    fontSize: 40,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 2,
    paddingVertical: 2
  },

  dartlog: {
    flex: 1,
    backgroundColor: "darkgray"
  }
});

export default
  (Scoreboard)
