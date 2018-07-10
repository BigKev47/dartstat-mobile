import React from 'react';
import {View, ScrollView, Text, Button, StyleSheet, FlatList} from 'react-native';
import {createDart, allUsers, createGame, getCurrentGame} from "../../../../graphql/index";
import {graphql, compose} from "@expo/react-apollo";
import Grid from "react-native-easy-grid/Components/Grid";
import Col from "react-native-easy-grid/Components/Col";
import Row from "react-native-easy-grid/Components/Row";
import ScoreColumn from "./ScoreColumn";
import MarksColumn from "./MarksColumn";



export default class PlayerColumn extends React.Component {
  constructor(props) {
    super(props);

  }

  //this renders each player/team's overall scoring column and aligns it with center.
  render() {
    const { playerIdx } = this.props;
    const alignedColumn = ()=> (playerIdx === 0) ?
        <Col style={{flex: 2, flexDirection: 'row'}}>
          <ScoreColumn {...this.props} style={styles.scoretext} />
          <MarksColumn {...this.props} style={[styles.scoretext, {justifyContent: 'flex-end'}]} />
        </Col>
  :
        <Col style={{flex: 2, flexDirection: 'row'}}>
          <MarksColumn {...this.props} style={[styles.scoretext, {justifyContent: 'flex-start'}]} />
          <ScoreColumn  {...this.props} style={styles.scoretext}/>
        </Col>;



    return alignedColumn()



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
    fontFamily: "chalk-it-up",
    color: "white",
    fontSize: 28,
    flex: 3,
    alignContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 2,
    paddingVertical: 6,

    // adjustsFontSizeToFit: true
    //textDecorationLine: 'line-through',
  }
});