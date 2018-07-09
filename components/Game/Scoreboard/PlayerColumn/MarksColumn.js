import React from 'react';
import {View, ScrollView, Text, Button, StyleSheet, FlatList} from 'react-native';
import {createDart, allUsers, createGame, getCurrentGame} from "../../../../graphql/index";
import {graphql, compose} from "@expo/react-apollo";
import Grid from "react-native-easy-grid/Components/Grid";
import Col from "react-native-easy-grid/Components/Col";
import Row from "react-native-easy-grid/Components/Row";



export default class ScoreColumn extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    const { currentGame, playerIdx } = this.props;
    let playerMarks = currentGame.marks[playerIdx].map((i, index) => (
        <Row key={index}>
            <Text style={styles.scoretext}>{i}</Text>
            {/*<Image*/}
                {/*style={{flex:1, height: undefined, width: undefined}}*/}
                {/*source={require('../../../assets/images/ThreeMark.png')}*/}
                {/*//Does this work?*/}
                {/*resizeMode="contain"*/}
            {/*/>*/}
        </Row>
    ));



//TODO Figure out the array/object scorecard and iterate over it good
    return <View style={styles.container}>
      <Col>
        {playerMarks}
      </Col>
    </View>
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
  },

  scoreboardheader: {
    flex: 1,
    backgroundColor: '#164c16',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    alignContent: 'center',
    paddingTop: 8
  },

//TODO: Figure out how to properly scale my text sizes.
  scoretext: {
    fontFamily: 'chalk-it-up',
    color: 'white',
    fontSize: 32,
    flex: 0,

    alignContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: -2,

    // adjustsFontSizeToFit: true
  },

  scorehistory: {
    color: 'white',
    fontSize: 28,
    textDecorationLine: 'line-through',
    opacity: .7,
    flex: 0

  },

  right: {
    textAlign: 'right',
    //paddingRight: '6%',
  },

  left: {
    textAlign: 'left',
    //paddingLeft: '6%',
  },

  scoreheader: {

    flex: 1,
    flexDirection: 'column',
    fontFamily: 'sketchy',
    fontSize: 24

  },



  dartlog: {
    flex: 1,
    backgroundColor: 'darkgray',
  },

});
