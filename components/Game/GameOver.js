import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {createDart, allUsers, createGame} from "../../graphql";
import {graphql, compose} from "@expo/react-apollo";
import Button from "react-native-button";
import Colors from "../../constants/Colors";



export class GameOver extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {

//TODO Create a running scoreboard with all necessary information and proper columns
        return <Text onPress={this.props.onPress}
                       style={{color: "white",
                           alignContent: "center",
                           fontSize: 50,
                           fontFamily: 'sketchy',
                           fontWeight: "400",}
                       }>Game Over</Text>


    }
}