import React from 'react';
import {View, ScrollView, Text, Button, StyleSheet, FlatList} from 'react-native';
import {createDart, allUsers, createGame, getCurrentGame} from "../../graphql";
import {graphql, compose} from "@expo/react-apollo";
import Grid from "react-native-easy-grid/Components/Grid";
import Col from "react-native-easy-grid/Components/Col";
import Row from "react-native-easy-grid/Components/Row";



export class ScoreColumn extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    const {playerIdx, currentGame} = this.props;
    const alignStyle = playerIdx === 0 ? styles.left : styles.right;
    let markNums = [];
    for (let i = 15; i < 21; i++) {
      markNums.push(<Row key={i}><Text>{i}</Text></Row>)
    }



//TODO Figure out the array/object scorecard and iterate over it good
    return <View style={styles.container}>
      {/*<View style={styles.scoreboardheader}>*/}
        {/*<Text adjustsFontSizeToFit numberOfLines={1}*/}
              {/*style={[styles.scoretext, styles.scoreheader, alignStyle]}>{currentGame.players[playerIdx].firstName} </Text>*/}

      {/*</View>*/}
      <View style={{flex: 10}}>
        <Grid>
          <Col>
            <FlatList
                ref={ref => this.flatList = ref}
                data={currentGame.scoreHistory[playerIdx]}
                keyExtractor={item => item}
                style={{flex: 0, flexGrow: 0}}
                onContentSizeChange={() => this.flatList.scrollToEnd({animated: false})}
                renderItem={({item}) => (
                    <Text style={[styles.scoretext, styles.scorehistory, {textAlign: 'center'}]}
                          key={item.index}>{item}</Text>
                )}
            />
            <Text style={[styles.scoretext, {textAlign: 'center'}]}>{currentGame.scores[playerIdx]}</Text>
          </Col>
          {/*<Col>*/}
            {/*{markNums}*/}
          {/*</Col>*/}
        </Grid>

      </View>
    </View>
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
  },

  scoreboardheader: {
    flex: 1,
    backgroundColor: '#164c16',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    alignContent: 'center',
    paddingTop: 8
  },

//TODO: Figure out how to properly scale my text sizes.
  scoretext: {
    fontFamily: 'chalk-it-up',
    color: 'white',
    fontSize: 32,
    flex: 0,

    alignContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: -2,

    // adjustsFontSizeToFit: true
  },

  scorehistory: {
    color: 'white',
    fontSize: 28,
    textDecorationLine: 'line-through',
    opacity: .7,
    flex: 0

  },

  right: {
    textAlign: 'right',
    //paddingRight: '6%',
  },

  left: {
    textAlign: 'left',
    //paddingLeft: '6%',
  },

  scoreheader: {

    flex: 1,
    flexDirection: 'column',
    fontFamily: 'sketchy',
    fontSize: 24

  },



  dartlog: {
    flex: 1,
    backgroundColor: 'darkgray',
  },

});


export default graphql(getCurrentGame, {
  props: ({data: {currentGame, loading}}) => ({
    currentGame,
    loading
  })
})(ScoreColumn);

