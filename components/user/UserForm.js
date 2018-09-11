import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "react-native-button";
import { Form, Item, Input, Label } from "native-base";
import Colors from "../../constants/Colors";

export default class UserForm extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  submitForm = () => {
    const { email, password, firstName, lastName } = this.state;
    this.props.onSubmit({
      email,
      password,
      firstName,
      lastName
    });
  };

  render() {
    const firstName = this.props.type !== "Login" ?
      <Item style={styles.input} floatingLabel>
        <Label>First Name</Label>
        <Input
          value={this.state.firstName}
          onChangeText={firstName => this.setState({ firstName })}
        />
      </Item>
      :
      null;
    const lastName = this.props.type !== "Login" ?
      < Item style={styles.input} floatingLabel>
        < Label> Last Name </Label>
        <Input
          value={this.state.lastName}
          onChangeText={lastName => this.setState({ lastName })}
        />
      </Item>
      :
      null;


    return (
      <Form>
        {firstName}
        {lastName}
        <Item style={styles.input} floatingLabel>
          <Label>Email</Label>
          <Input
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </Item>
        <Item style={styles.input} floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </Item>
        <Button style={styles.button}
                containerStyle={styles.buttoncontainer}
                onPress={this.submitForm}>{this.props.type}</Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.scoreBoard,
    alignContent: "center",
    paddingHorizontal: 20
  },
  input: {
    backgroundColor: "white"
  },
  label: {
    color: "grey"
  },
  button: {
    color: "white",
    alignContent: "center",
    fontSize: 40,
    fontFamily: "sketchy",
    fontWeight: "400"
  },

  buttoncontainer: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    overflow: "hidden",
    borderRadius: 6,
    justifyContent: "center"
    // backgroundColor: Colors.scoreBoard
  }
});
