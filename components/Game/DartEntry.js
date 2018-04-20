import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import {createDart, allUsers, createGame} from "../../graphql";
import {graphql, compose} from "@expo/react-apollo";
import NumberGrid from "../NumberGrid";



export class DartEntry extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

    }
    render() {






//TODO Create a running scoreboard with all necessary information and proper columns
        return <View style={styles.scoreentry}>
            <View style={styles.numberhit}>
                <NumberGrid onPress={ this.props.onPress }/>
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
        flex: 3,
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