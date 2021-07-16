import React from 'react';
import DoctorProfile from './Profile';
import DoctorHome from './Home';

import TabHomeIcon from "../../assets/icons/TabHomeIcon";
import TabProfileIcon from "../../assets/icons/TabProfileIcon";

import { View } from 'native-base'

import {Tab, NavKey as TabNavKey} from './_navigator';

export default function BookAppointment() {
  return (
		<Tab.Navigator
			lazy
			tabBarOptions={{
				activeTintColor: "#561BB3",
				inactiveTintColor: "#B0B3C7",
			}}
		>
        <Tab.Screen
          name={TabNavKey.HomeScreen}
          component={DoctorHome}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <TabHomeIcon size={8} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen
          name={TabNavKey.ScheduleView}
          component={ScheduleView}
          options={{
            tabBarLabel: "Schedule",
            tabBarIcon: ({ color, size }) => (
              <TabScheduleIcon size={8} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={TabNavKey.ChatView}
          component={ChatView}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size }) => (
              <TabChatIcon size={8} color={color} />
            ),
          }}
        /> */}
        <Tab.Screen
          name={TabNavKey.Profile}
          component={DoctorProfile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <TabProfileIcon size={8} color={color} />
            ),
          }}
        />
		</Tab.Navigator>
  );
}
