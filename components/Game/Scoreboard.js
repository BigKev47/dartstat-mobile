import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import {createDart, allUsers, createGame} from "../../graphql";
import {graphql, compose} from "@expo/react-apollo";
import ScoreColumn from "./ScoreColumn";
import Grid from "react-native-easy-grid/Components/Grid";
import Col from "react-native-easy-grid/Components/Col";



export class Scoreboard extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        // const homeActive = this.props.homeTurn ? {opacity: .7} : null;
        // const awayActive = this.props.awayTurn ? {opacity: .7} : null;
//TODO Create a running scoreboard with all necessary information and proper columns
        return <Grid  style={{flex:5, flexDirection: 'row'}}>
          {/*<View style={styles.scoreboardheader}>*/}
          <Col><ScoreColumn playerIdx = {0} /></Col>
          <Col><ScoreColumn playerIdx = {1} /></Col>
                    {/*<Text adjustsFontSizeToFit numberOfLines={1}*/}
                          {/*style={[styles.scoretext, styles.scoreheader, awayActive]}>P1: {this.props.players[0]} </Text>*/}
                    {/*<Text adjustsFontSizeToFit numberOfLines={1}*/}
                          {/*style={[styles.scoretext, styles.scoreheader]}>Round {this.props.round} </Text>*/}
                    {/*<Text adjustsFontSizeToFit numberOfLines={1}*/}
                          {/*style={[styles.scoretext, styles.scoreheader, homeActive]}>P2: {this.props.players[1]} </Text>*/}
                {/*</View>*/}
                {/*<View style={{flex: 10, flexDirection: 'row'}}>*/}
                    {/*<Text style={[styles.scoretext, styles.left, awayActive]}>{this.props.homeScore}</Text>*/}
                    {/*<Text/>*/}
                    {/*<Text style={[styles.scoretext, styles.right, homeActive]}>{this.props.awayScore}</Text>*/}
                {/*</View>*/}
            </Grid>
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
