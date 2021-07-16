import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AppointmentInfo from './AppointmentInfo';
import DoctorHome from './Home';
import {NavStack, NavKey} from './_navigator';

export default function BookAppointment() {
  return (
    <NavStack.Navigator
      headerMode="none"
      // initialRouteName={NavKey.SetAppointmentTimeScreen}
    >
      <NavStack.Screen name={NavKey.HomeScreen} component={DoctorHome} />
      <NavStack.Screen
        name={NavKey.AppointmentInfoScreen}
        component={AppointmentInfo}
      />
    </NavStack.Navigator>
  );
}
