import React from "react";
import { StyleSheet } from 'react-native';
import { Col } from "react-native-easy-grid";
import Button from 'react-native-button';
import Colors from "../constants/Colors";


export class NumButton extends React.Component {
    render(){
        return <Col>
                <Button
                    style={styles.button}
                    containerStyle={styles.buttoncontainer}
                    onPress= {()=>{this.props.onPress(this.props.title)}}>{this.props.title}</Button>
                </Col>
    }
}

export class SecButton extends React.Component {
    render(){
        return <Col>
                <Button style={styles.button}
                        containerStyle={[styles.buttoncontainer, styles.section]}
                        onPress={()=>{this.props.onPress(this.props.sectionHit)}}>{this.props.title}</Button>
                </Col>
    }
}

const styles = StyleSheet.create({
    button: {
        color: "white",
        alignContent: "center",
    },

    buttoncontainer: {
        flex: 1,
        marginHorizontal: 3,
        marginVertical: 3,
        padding: 4,
        overflow: 'hidden',
        borderRadius: 6,
        justifyContent: 'center',
        backgroundColor: Colors.numberButton,

        //flexDirection: 'row',
    },

    section: {
        backgroundColor: Colors.sectionButton,
    }
});
