import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';

import { NumberGrid } from '../components/NumberGrid.js';
import {createDart, allUsers, createGame} from "../graphql";
import {graphql, compose, withApollo} from "@expo/react-apollo";



export class Game extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            players: ["cjf673owt4whi0104fng14osm"],
            currentnum: "",
            issection: false,
            roundscore: 0,
            darts: [[],[]],
            homeScore: 501,
            awayScore: 501,
            round: 1,
            homeTurn: true,
            gameCompleted: false,
            gameId: ""
        };

        this.player = this.player.bind(this);
        this.switchEntryScreen = this.switchEntryScreen.bind(this);
        this.dartHandler = this.dartHandler.bind(this);
        this.turnSwitcher = this.turnSwitcher.bind(this);
        this.roundHandler = this.roundHandler.bind(this);
        this.newGame = this.newGame.bind(this);
    };
//TODO: Refactor gameplay and incorporate round scores and game winning/losing conditions
    player = () => {
        if (this.state.homeTurn){
            return 0
        }else{
            return 1
        }
    };
    switchEntryScreen = (input) => {
        if (!this.state.issection) {
            this.setState({
                issection: true,
                currentnum: input
            })
        } else {
            let dart = input[0];
            let player = this.player();
            this.dartHandler(dart, player);
            //this.setState({roundscore: this.state.roundscore + dartscore});
            //this.scoreHandler(dart, player);
        }
    };

    turnSwitcher = () => {
        this.setState(
            {homeTurn: !this.state.homeTurn,
            roundscore: 0}
        );
        if (!this.state.homeTurn) {
            this.state.round++
        }
    };

    roundHandler = (dart, player) => {
        let tempScore = (!this.state.homeTurn) ? this.state.awayScore : this.state.homeScore;
        let outScore = tempScore - this.state.roundscore;
        if (outScore < 2) {
            if (outScore === 0 && dart.sectionHit === 2) {
                console.log("Game Over")
            } else {
                console.log("Bust");
                this.turnSwitcher()
            }
        }else{
            if (this.state.darts[player].length % 3 === 0) {
                let playerScore = (!this.state.homeTurn) ? this.state.awayScore : this.state.homeScore;
                console.log("playerScore:" + playerScore);
                let newScore = playerScore - this.state.roundscore;
                this.setState((!this.state.homeTurn) ? {awayScore: newScore} : {homeScore: newScore} )
                this.turnSwitcher()}
            }
    };

    dartHandler = (dart, player) => {

        let dartscore = dart.numberHit * (dart.sectionHit > 1 ? dart.sectionHit : 1);
        let darts = this.state.darts;
        let roundscore = this.state.roundscore + dartscore;
        console.log("roundscore:" + roundscore, "dartscore:" + dartscore);
        darts[player].push(dart);
        const { createDart } = this.props;
        createDart({
            variables: {
                //TODO get player login worked out and remove this hard-code
                playerId: this.state.players[player],
                gameId: this.state.gameId,
                numberHit: parseInt(dart.numberHit),
                sectionHit: parseInt(dart.sectionHit)
            }
        });
        console.log(this.props);

        this.setState({darts: darts, roundscore: roundscore, issection: false},
            () => {
                this.roundHandler(dart, player)
            });
    };

    newGame = async ({loading, error}) => {
        const { createGame } = this.props;
        try {
            await createGame({
                variables: {
                    gameType: "501",
                    // playersIds: this.state.players
                }
            });
            console.log("gameID:"+ this.props.data.id);
            this.setState({gameId: this.props.data.id});

        }
        catch (error) {
            console.log(error);
        }
    };

    render() {
        const { createGame } = this.props;
        const {gameId} = this.state;
        const numbers = ["Miss", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Bull"];
        const sections = [
            {section: 'Outer Single', mult: 1, id: 0},
            {section: 'Inner Single', mult: 1, id: 1},
            {section: 'Double', mult: 2, id: 2},
            {section: 'Triple', mult: 3, id: 3}

            ];
        const screen = !this.state.gameId ?
            <View style={styles.dartlog}>
            <Button onPress={this.newGame} title={"New"} />
            </View> :
            <NumberGrid issection={this.state.issection}
                                  sections={sections}
                                  numbers={numbers}
                                  number={this.state.currentnum}
                                  onPress={this.switchEntryScreen}/>;




//TODO Create a running scoreboard with all necessary information and proper columns
            return <View style={styles.container}>
                <View style={styles.scoreboard}>
                    <View style={styles.scoreboardheader}>
                        <Text adjustsFontSizeToFit numberOfLines={1}
                              style={[styles.scoretext, styles.scoreheader]}>P1: {this.state.players[0]} </Text>
                        <Text adjustsFontSizeToFit numberOfLines={1}
                              style={[styles.scoretext, styles.scoreheader]}>Rnd {this.state.round} </Text>
                        <Text adjustsFontSizeToFit numberOfLines={1}
                              style={[styles.scoretext, styles.scoreheader]}>P2: {this.state.players[1]} </Text>
                    </View>
                    <View style={{flex: 8, flexDirection: 'row'}}>
                        <Text style={[styles.scoretext, styles.left]}>{this.state.homeScore}</Text>
                        <Text/>
                        <Text style={[styles.scoretext, styles.right]}>{this.state.awayScore}</Text>
                    </View>
                </View>
                <View style={styles.scoreentry}>
                    <View style={styles.dart}></View>
                    <View style={styles.numberhit}>
                        { screen }
                    </View>
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

    scoreboard: {
        flex: 4,
        backgroundColor: '#164c16',
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
    },

    scoreentry: {
        flex: 2,
        flexDirection: 'row',
    },

    numberhit: {
        flex: 4,
        //flexDirection: 'row',
        //flexWrap: 'wrap',
        backgroundColor: 'white',
        //justifyContent: 'space-around',
        marginVertical: 5,
    },

    dartlog: {
        flex: 1,
        backgroundColor: 'darkgray',
    },

    scoringsection: {
        flex: 5,
        backgroundColor: 'darkgray',
        flexDirection: 'row',
    }
});

export default compose(
    graphql(createDart, { name: 'createDart' }),
    graphql(createGame, { name: 'createGame'
        // ,
        // props: ({ data }) => ({ ...data })
    })
)(withApollo(Game))
