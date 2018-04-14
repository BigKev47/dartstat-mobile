import React, { Component } from 'react'
import Row from "react-native-easy-grid/Components/Row";
import Grid from "react-native-easy-grid/Components/Grid";
import {Text} from "react-native";


export default class MappedGrid extends Component {


  itemsArrayToGridArray(totalColumns) {
      let gridArray = [[]];
    const numbers = ["20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Bull"]

      let countColumns = 1;
      for (var i = 0; i < numbers.length; i++) {
        gridArray[gridArray.length - 1].push(numbers[i]);
        if (countColumns <= totalColumns) {
          countColumns++;
        }
        if (countColumns > totalColumns && i !== numbers.length - 1) {
          countColumns = 1;
          gridArray.push([]);
        }
      }

      return gridArray;
    }


    renderGrid(gridArray) {
      let key = gridArray.index;
      return gridArray.map(row => (
        <Row>{row.map(key, col => (<Text>{col}</Text>))}</Row>
      ));
    }


    render() {
      let gridArray = this.itemsArrayToGridArray(5);
      return <Grid>{this.renderGrid(gridArray)}</Grid>;
    }

}