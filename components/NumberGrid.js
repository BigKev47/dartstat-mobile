import React from "react";
import {StyleSheet, View} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {NumButton, SecButton} from "./Buttons";


export class NumberGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          currentNum: "",
          currentSec: null
        };

        this.handleNum = this.handleNum.bind(this);
        this.handleSec = this.handleSec.bind(this);
    }

    handleNum = (number) => {
          if (number === "Miss") {
            this.props.onPress({numberHit: 0, sectionHit: null});
            this.setState({currentNum: ""})
          } else {
            this.setState({currentNum: number})
          }
        };

    handleSec = async (sectionHit) => {
        let numberHit = this.state.currentNum;
        let dart = {numberHit: numberHit, sectionHit: sectionHit};
        try {
          await this.props.onPress(dart);
          // await <dartHandler {dartEntry} />;
          this.setState( {currentNum: "", currentSec: null});
        }
        catch(error) {console.log(error)}
    };
//TODO Find a way to make these grids with some sort of map/iterator function to cut down on code length
  render(){

    if (!this.state.currentNum) {
      return <Grid>
        <Row>
          <NumButton title={"20"} onPress={this.handleNum}/>
          <NumButton title={"19"} onPress={this.handleNum}/>
          <NumButton title={"18"} onPress={this.handleNum}/>
          <NumButton title={"17"} onPress={this.handleNum}/>
          <NumButton title={"16"} onPress={this.handleNum}/>
        </Row>
        <Row>
          <NumButton title={"15"} onPress={this.handleNum}/>
          <NumButton title={"14"} onPress={this.handleNum}/>
          <NumButton title={"13"} onPress={this.handleNum}/>
          <NumButton title={"12"} onPress={this.handleNum}/>
          <NumButton title={"11"} onPress={this.handleNum}/>
        </Row>
        <Row>
          <NumButton title={"10"} onPress={this.handleNum}/>
          <NumButton title={"9"} onPress={this.handleNum}/>
          <NumButton title={"8"} onPress={this.handleNum}/>
          <NumButton title={"7"} onPress={this.handleNum}/>
          <NumButton title={"6"} onPress={this.handleNum}/>
        </Row>
        <Row>
          <NumButton title={"5"} onPress={this.handleNum}/>
          <NumButton title={"4"} onPress={this.handleNum}/>
          <NumButton title={"3"} onPress={this.handleNum}/>
          <NumButton title={"2"} onPress={this.handleNum}/>
          <NumButton title={"1"} onPress={this.handleNum}/>
        </Row>
        <Row>
          <NumButton title={"Bull"} onPress={this.handleNum}/>
          <NumButton title={"Miss"} onPress={this.handleNum}/>
        </Row>
      </Grid>;
    }else {
      return <Grid>
              <Row>
                  <SecButton
                      title="Outer Single"
                      sectionHit={0}
                      onPress={this.handleSec} />
                  <SecButton
                      title="Inner Single"
                      sectionHit={1}
                      onPress={this.handleSec} />
              </Row><Row>
                  <SecButton
                      title="Double"
                      sectionHit={2}
                      onPress={this.handleSec} />
                  <SecButton
                      title="Triple"
                      sectionHit={3}
                      onPress={this.handleSec} />
              </Row>
          </Grid>
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 20,
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
