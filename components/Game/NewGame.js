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

      this.createGame = this.createGame.bind(this);
    }

   createGame = async () => {
     const { createGame, currentGame, loading } = this.props;
     let gameMarks = [];
     for (let i=20; i>14; i--){
       gameMarks.push(i)
     }
     gameMarks.push("Bull");
     //let marks = [[0,-1,-2,-3,-3,-1,0],[-1,-2,-3,-3,-1,0,-3]];
     let marks = [[],[]];
     for (let i = 0; i<gameMarks.length; i++){
       marks[0].push(-3);
       marks[1].push(-3);
     }
     try {
       const newGame = await createGame({
         variables: {
           gameType: "Cricket",
           playersIds: ["cjf673owt4whi0104fng14osm", "cjf677xt84xp50104rig3zrmd"]
         }
       });
       console.log("gameID:" + newGame.data.createGame.id);
       const { updateCurrentGame } = this.props;
       //This is where I create the scorecard for Cricket Games it's not working
       await updateCurrentGame({
         variables: {
           index: "id",
           value: newGame.data.createGame.id
         }
       });
       await updateCurrentGame({
         variables: {
           index: "gameMarks",
           value: gameMarks
         }
       });
       await updateCurrentGame({
         variables: {
           index: "marks",
           value: marks
         }
       });

       // console.log("Game Marks " + currentGame.gameMarks)
     } catch (error) {
       console.log(error);
     }
     if(!loading){console.log(currentGame)}
   };

    render() {
      const { allUsers, loading } = this.props;
      if (loading) return null;


//TODO Create a running scoreboard with all necessary information and proper columns
        return <View style={styles.container}><Button onPress={ this.createGame }
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
