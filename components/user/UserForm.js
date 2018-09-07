import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { Form, Item, Input, Label } from "native-base";

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
    return (
      <Form>
        <Item floatingLabel>
          <Label>First Name</Label>
          <Input
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />
        </Item>
        <Item floatingLabel>
          <Label>Last Name</Label>
          <Input
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />
        </Item>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </Item>
        <Button title={this.props.type} onPress={this.submitForm} />
      </Form>
    );
  }
}
