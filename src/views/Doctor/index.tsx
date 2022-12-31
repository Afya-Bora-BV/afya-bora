import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

// TODO : to organize the doctors routes and patient routes better
import DoctorLogin from "../Doctor/LoginDoctor";
import DoctorHome from "../Doctor/HomeDoctor";
import DoctorAppointmentInfo from "../Doctor/AppointmentInfoDoctor";
import DoctorRemoteConsultation from "../Doctor/RemoteConsultationDoctor";

export const NavStack = createStackNavigator();


export const DoctorRoutes = {
    DoctorHome: "DoctorHome",
    DoctorLogin: "DoctorLogin",
    DoctorAppointmentInfo: "DoctorAppointmentInfo",
    DoctorRemoteConsultation: "DoctorRemoteConsultation",
};

function DoctorsStack({ initialRouteName }: any) {
    return (
        <NavStack.Navigator
            // headerMode="none"
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={initialRouteName}
        // initialRouteName={"Login"}
        >
            {/* TODO: to keep doctor routes to a separate stack */}

            <NavStack.Screen
                name={DoctorRoutes.DoctorHome}
                component={DoctorHome}
            />
            <NavStack.Screen
                name={DoctorRoutes.DoctorAppointmentInfo}
                component={DoctorAppointmentInfo}
            />
            <NavStack.Screen
                name={DoctorRoutes.DoctorRemoteConsultation}
                component={DoctorRemoteConsultation}
            />

        </NavStack.Navigator>
    );
}

export default DoctorsStack
