import React from "react";
import { StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {NumButton, SecButton} from "./Buttons";

export class RoundConfirmaton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
        </View>)
  }
}


      const styles = StyleSheet.create({
        container: {
          flex: 1,
          paddingTop: 20,
          backgroundColor: '#fff',
        }
      });
