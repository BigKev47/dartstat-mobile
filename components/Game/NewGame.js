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

        this.state = {
          on: false,
          playersIds: ["cjf673owt4whi0104fng14osm"],
          gameType: null
        }
    }
  gameMenu = () => {
    const {allUsers, loading} = this.props;
    const {on, playersIds, gameType} = this.state;
    if (loading) {
      return null
    } else if (!on) {
      return <Button onPress={this.setState({on: true})}
                     style={styles.button}
                     containerStyle={styles.buttoncontainer}>New Game</Button>
    } else if (!gameType) {
      return (
          <View>
            <Text style={styles.button}>Choose Game</Text>
            <Button onPress={this.setState({gameType: "501"})}
                    style={[styles.button, styles.smallButton]}
                    containerStyle={styles.buttoncontainer}>501</Button>
            <Button //onPress={ this.setState({gameType: "501"}) }
                style={[styles.button, styles.smallButton, {opacity: .6}]}
                containerStyle={styles.buttoncontainer}>Cricket</Button>
          </View>)
    }
  };

    render() {
      const gameMenu = this.gameMenu();








//TODO Create a running scoreboard with all necessary information and proper columns
        return <View style={styles.container}>
          {gameMenu}


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

  smallbutton: {
    fontSize: 40,
    fontWeight: "300"
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
