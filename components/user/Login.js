import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { withApollo } from "@expo/react-apollo";
import Button from "react-native-button";
import CreateUser from "./CreateUser";
import LoginUser from "./LoginUser";
import Colors from "../../constants/Colors";

class Login extends Component {
  state = {
    register: true
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.register ? (
          <CreateUser {...this.props} />
        ) : (
          <LoginUser {...this.props} />
        )}
        <Button
          style={styles.button}
          containerStyle={styles.buttoncontainer}
          onPress={() =>
            this.setState({
              register: !this.state.register
            })
          }
        >{this.state.register ? "Login" : "Register"}</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.scoreBoard,
    alignContent: "center",
    justifyContent: "center",
    padding: 15
  },
  button: {
    color: "white",
    alignContent: "center",
    fontSize: 30,
    fontFamily: "sketchy",
    fontWeight: "400"
  },

  buttoncontainer: {

    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    overflow: "hidden",
    borderRadius: 6,
    justifyContent: "center",
    backgroundColor: Colors.scoreBoard
  }
});

export default withApollo(Login);
