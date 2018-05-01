import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import {createDart, allUsers, createGame} from "../../graphql";
import {graphql, compose} from "@expo/react-apollo";



export class Scoreboard extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
      const {player} = this.props;

//TODO Create a running scoreboard with all necessary information and proper columns
        return <View>
                <View style={styles.scoreboardheader}>
                    <Text adjustsFontSizeToFit numberOfLines={1}
                          style={[styles.scoretext, styles.scoreheader, awayActive]}>P1: {this.props.players[0]} </Text>

                </View>
                <View style={{flex: 10, flexDirection: 'row'}}>
                    <Text style={[styles.scoretext, styles.left, awayActive]}>{this.props.homeScore}</Text>
                </View>
            </View>

    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    flex: 3,
    alignContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 6

    // adjustsFontSizeToFit: true
    //textDecorationLine: 'line-through',
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

