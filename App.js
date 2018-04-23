import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import { AppLoading, Asset, Font } from 'expo';

import {ApolloProvider} from "@expo/react-apollo";
import { withClientState } from 'apollo-link-state'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import gql from "graphql-tag";


export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };


    render() {
        const cache = new InMemoryCache();

        const defaultState = {
          currentGame: {
            __typename: 'currentGame',
            gameId:"",
            darts: [],
            currentDarts: [],
            roundScore: 0,
            homeScore: 501,
            awayScore: 501,
            round: 1,
            homeTurn: true,
            gameActive: false
            gameCompleted: false
            }
        };

        const stateLink = withClientState({
            cache,
            defaults: defaultState,
            resolvers: {
                Mutation: {
                    updateGame: (_, { index, value }, { cache }) => {
                        const query = gql`
                            query GetCurrentGame {
                                currentGame @client {
                                    id
                                    darts
                                    currentDarts
                                    roundScore
                                    homeScore
                                    awayScore
                                    round
                                    homeTurn
                                    gameActive
                                }
                            }
                        `
                        const previous = cache.readQuery({ query })
                        const data = {
                            currentGame: {
                                ...previous.currentGame,
                                [index]: value
                            }
                        };

                        cache.writeQuery({ query, data })
                    },
                    resetCurrentGame: (_, d, { cache }) => {
                        cache.writeData({ data : defaultState })
                    }
                }
            }
        });

        const client = new ApolloClient({
            link: ApolloLink.from([
                stateLink,
                new HttpLink({
                    uri: 'https://api.graph.cool/simple/v1/cjf65iozh1xj701410jqbrlf2'
                })
            ]),
            cache
        });

        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <ApolloProvider client={client}>
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                    <RootNavigation />
                </View>
                </ApolloProvider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                'rob-graves': require('./assets/fonts/RobGraves.ttf'),
                'chalk-it-up': require('./assets/fonts/DJBChalkItUp.ttf'),
                'sketchy': require('./assets/fonts/Sketchy.ttf')
            }),
        ]);
    };

    _handleLoadingError = (error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});
