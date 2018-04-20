import React from 'react';
import { View, StyleSheet } from 'react-native';

import {createDart, allUsers, createGame} from "../../graphql";
import {graphql, compose} from "@expo/react-apollo";
import Button from "react-native-button";
import Colors from "../../constants/Colors";



export class NewGame extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {

//TODO Create a running scoreboard with all necessary information and proper columns
        return <Button onPress={this.props.onPress}
                    style={styles.button}
                    containerStyle={styles.buttoncontainer}>New Game</Button>


    }
}


const styles = StyleSheet.create({
    button: {
        color: "white",
        alignContent: "center",
        fontSize: 50,
        fontFamily: 'sketchy',
        fontWeight: "400",
    },

    buttoncontainer: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 6,
        justifyContent: 'center',
        backgroundColor: Colors.scoreBoard,

        //flexDirection: 'row',
    },

});
