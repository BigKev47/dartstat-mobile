import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {NumButton, SecButton} from "./Buttons";

export class NumberGrid extends React.Component {
  // numbers = ["20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Bull"];
  //
  // itemsArrayToGridArray(totalColumns) {
  //   let gridArray = [[]];
  //
  //   let countColumns = 1;
  //   for (var i = 0; i < this.numbers.length; i++) {
  //     gridArray[gridArray.length - 1].push(this.numbers[i]);
  //     if (countColumns <= totalColumns) {
  //       countColumns++;
  //     }
  //     if (countColumns > totalColumns && i !== this.numbers.length - 1) {
  //       countColumns = 1;
  //       gridArray.push([]);
  //     }
  //   }
  //
  //   return gridArray;
  // }
  //
  //
  // renderGrid(gridArray) {
  //   return gridArray.map(row => (
  //     <Row>{row.map(col => (<Text>{col}</Text>))}</Row>
  //   ));
  // }
  //
  //
  // render() {
  //   let gridArray = this.itemsArrayToGridArray(5);
  //   return <Grid>{this.renderGrid(gridArray)}</Grid>;
  // }
    //


    constructor(props) {
        super(props);

        this.handleNum = this.handleNum.bind(this);
        this.handleSec = this.handleSec.bind(this);
    }

    handleNum(number) {
        //const number = e.target.value;
        this.props.onPress(number);
    }

    handleSec(number, secmult, secid) {
        let dart = {numberHit: number, sectionHit: secid};
        if (number !== "Bull"){
            number = parseInt(number)
        }else{number = 25}
        let dartscore = number * secmult;
        console.log(dartscore)
        this.props.onPress([dart, dartscore]);
    }
//TODO Find a way to make these grids with some sort of map/iterator function to cut down on code length
  render(){
    if (!this.props.issection) {
        return <Grid>
            <Row>
                <NumButton title={this.props.numbers[20]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[19]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[18]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[17]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[16]} onPress={this.handleNum}/>
            </Row>
            <Row>
                <NumButton title={this.props.numbers[15]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[14]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[13]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[12]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[11]} onPress={this.handleNum}/>
            </Row>
            <Row>
                <NumButton title={this.props.numbers[10]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[9]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[8]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[7]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[6]} onPress={this.handleNum}/>
            </Row>
            <Row>
                <NumButton title={this.props.numbers[5]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[4]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[3]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[2]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[1]} onPress={this.handleNum}/>
            </Row>
            <Row>
                <NumButton title={this.props.numbers[21]} onPress={this.handleNum}/>
                <NumButton title={this.props.numbers[0]} onPress={this.handleNum}/>
            </Row>
        </Grid>;
    }else {
        return <Grid>
                <Row>
                    <SecButton
                        title={this.props.sections[0].section}
                        number={this.props.number}
                        mult={this.props.sections[0].mult}
                        id={this.props.sections[0].id}
                        onPress={this.handleSec} />
                    <SecButton
                        title={this.props.sections[1].section}
                        number={this.props.number}
                        mult={this.props.sections[1].mult}
                        id={this.props.sections[1].id}
                        onPress={this.handleSec} />
                </Row><Row>
                    <SecButton
                        title={this.props.sections[2].section}
                        number={this.props.number}
                        mult={this.props.sections[2].mult}
                        id={this.props.sections[2].id}
                        onPress={this.handleSec} />
                    <SecButton
                        title={this.props.sections[3].section}
                        number={this.props.number}
                        mult={this.props.sections[3].mult}
                        id={this.props.sections[3].id}
                        onPress={this.handleSec} />
                </Row>
            </Grid>
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },

  scoreboard: {
    flex: 3,
    flexDirection: 'row',
    backgroundColor: 'green',
  },

  scoreentry: {
    flex: 2,
    flexDirection: 'row',
  },

  numberhit: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    //justifyContent: 'space-around',
    marginVertical: 5,
  },

  dartlog: {
    flex: 1,
    backgroundColor: 'darkgray',
  },

  scoringsection: {
    flex:5,
    backgroundColor: 'darkgray',
    flexDirection: 'row',
  }
});


export default NumberGrid;
