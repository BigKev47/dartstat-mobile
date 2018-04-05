import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import Game from '../screens/Game';
import StatsScreen from '../screens/StatsScreen';

export default TabNavigator(
  {
    Home: {
      screen: Game,
    },
    Game: {
      screen: Game,
    },
    Stats: {
      screen: StatsScreen,
    },
  },
    {
        navigationOptions: ({navigation}) => ({
                tabBarIcon: ({focused}) => {
                    const {routeName} = navigation.state;
                    let iconName;
                    switch (routeName) {
                        case 'Home':
                            iconName =
                                Platform.OS === 'ios'
                                    ? `ios-information-circle${focused ? '' : '-outline'}`
                                    : 'md-information-circle';
                            break;
                        case 'Game':
                            iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-alarm';
                            return (<MaterialCommunityIcons
                                name="bullseye"
                                size={26}
                                style={{marginVertical:3}}
                                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}/>);
                        case 'Stats':
                            iconName =
                                Platform.OS === 'ios' ? `ios-analytics${focused ? '' : '-outline'}` : 'md-analytics';
                    }
                    return (
                        <Ionicons
                            name={iconName}
                            size={26}
                            style={{marginVertical: 3}}
                            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                        />
                    );
                },

            }),
        tabBarOptions: {
            tabStyle: {
                paddingTop: 10
            },
            labelStyle: {
                color: Colors.tabIconDefault,
                paddingVertical: 3
            },
            style: {backgroundColor: Colors.tabBar, height: 64},
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        animationEnabled: false,
        swipeEnabled: false,

    }
);
