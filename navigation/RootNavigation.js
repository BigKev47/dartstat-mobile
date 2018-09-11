import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { graphql, withApollo } from "@expo/react-apollo";

import MainTabNavigator from './MainTabNavigator';
import Game from "../screens/Game";
import Login from "../components/user/Login";
import userQuery from "../graphql/userQuery";
// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: withApollo(Game)
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

const NavWrapper = ({ loading, user, client }) => {
  if (loading) return null;
  if (!user) return <Login/>;
  return <RootStackNavigator screenProps={{ user }}/>;
};

export default graphql(userQuery, {
  props: ({ data: { loading, user }, client }) => ({
    loading,
    user,
    resetOnLogout: async () => client.resetStore()
  })
})(NavWrapper);



  // _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    // registerForPushNotificationsAsync();

    // Watch for incoming notifications
//     this._notificationSubscription = Notifications.addListener(this._handleNotification);
//   }
//
//   _handleNotification = ({ origin, data }) => {
//     console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
//   };
// }
