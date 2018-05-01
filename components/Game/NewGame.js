import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';

import {createDart, allUsers, createGame} from "../../graphql";
import {graphql, compose} from "@expo/react-apollo";
import Button from "react-native-button";
import Colors from "../../constants/Colors";
import {Game} from "../../screens/Game";
import ModalDropdown from 'react-native-modal-dropdown';



 class NewGame extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      const { allUsers, loading } = this.props;
      if (loading) return null;


//TODO Create a running scoreboard with all necessary information and proper columns
        return <View style={styles.container}><Button onPress={ this.props.onPress }
                    style={styles.button}
                    containerStyle={styles.buttoncontainer}>New Game</Button>
            {/*<FlatList*/}
              {/*style={{flex: 1}}*/}
              {/*data={allUsers}*/}
              {/*renderItem={({ item }) => (*/}
                  {/*<Text style={{color: "white"}}>{item.firstName} {item.lastName}</Text>*/}
              {/*)}*/}
              {/*keyExtractor={item => item.id}/>*/}

            {/*<ModalDropdown options={ playerNames }>*/}
            {/*</ModalDropdown>*/}
        </View>


    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.scoreBoard,
    alignContent: "center",
  },
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

export default graphql(allUsers, {
  props: ({ data }) => ({ ...data })


    }
)(NewGame);
