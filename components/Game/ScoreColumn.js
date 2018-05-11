import React from 'react';
import {View, ScrollView, Text, Button, StyleSheet, FlatList} from 'react-native';
import {createDart, allUsers, createGame, getCurrentGame} from "../../graphql";
import {graphql, compose} from "@expo/react-apollo";



export class ScoreColumn extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    const {playerIdx,currentGame} = this.props;
    const alignStyle = playerIdx === 0 ? styles.left : styles.right;

//TODO Create a running scoreboard with all necessary information and proper columns
    return <View style={styles.container}>
      <View style={styles.scoreboardheader}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.scoretext, styles.scoreheader, alignStyle ]}>{currentGame.players[playerIdx].firstName} </Text>

      </View>
      <View style={{flex: 10}}>
        <FlatList
            data={currentGame.scoreHistory[playerIdx]}
            keyExtractor={item => item}
            style={{flex:0, flexGrow:0}}
            renderItem={({ item }) => (
                <Text style={[styles.scoretext, styles.scorehistory, alignStyle]} key={item.index}>{item}</Text>
        )}
            />
        <Text style={[styles.scoretext, alignStyle]}>{currentGame.scores[playerIdx]}</Text>
      </View>
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
  },

//TODO: Figure out how to properly scale my text sizes.
  scoretext: {
    fontFamily: 'chalk-it-up',
    color: 'white',
    fontSize: 28,
    flex: 0,

    textAlign: 'center',
    paddingHorizontal: 6,
    paddingVertical: -2,

    // adjustsFontSizeToFit: true
  },

  scorehistory: {
    color: 'white',
    fontSize: 26,
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
    fontSize: 20

  },



  dartlog: {
    flex: 1,
    backgroundColor: 'darkgray',
  },

});


export default graphql(getCurrentGame, {
  props: ({data: {currentGame, loading}}) => ({
    currentGame,
    loading
  })
})(ScoreColumn);

