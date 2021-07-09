import React from "react";
import {
	HStack,
	NativeBaseProvider,
	VStack,
	Text,
	extendTheme,
	View,
} from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Button from "./components/button";
import Header from "./components/header";
import Cards from "./components/cards";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "./contants/colors";
import {
	TextInput,
	SearchBar,
	DropDown,
	Location,
} from "./components/textFields";
import { CheckBox, FBLogo, TimeSet } from "./components/bars";
import { PicAvatar } from "./components/avatar";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/SignUp";
import VerifyScreen from "./screens/Verify";
import ServiceScreen from "./screens/Service";
import ConsultantsList from "./screens/ConsultantsList";
import FindFacility from "./screens/FindFacility";
import OnlineConsultantSelectTime from "./screens/OnlineConsultantSelectTime";
import OnlineConsultantSelectConsultant from "./screens/OnlineConsultantSelectConsultant";
import FindFacilityList from "./screens/FindFacilityList"

import ProfileScreen from "./screens/Profile"
import ScheduleScreen from "./screens/Schedule"
import ChatScreen from "./screens/Chat"

import { SetAppointmentTime } from "./screens/SetAppointmentTime";
import { PatientComplaint } from "./screens/PatientComplaint";
import { CreateProfile } from "./screens/CreateProfile";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabHomeIcon from "./assets/icons/TabHomeIcon"
import TabScheduleIcon from "./assets/icons/TabScheduleIcon"
import TabChatIcon from "./assets/icons/TabChatIcon"
import TabProfileIcon from "./assets/icons/TabProfileIcon"
import { backgroundColor } from "styled-system";

const Profile = () => {
	return (
		<HStack space={4} alignItems="center">
			<MaterialIcons name="person" size={32} color={colors.primary} />
			<Text>Profile</Text>
		</HStack>
	);
};

export type RootStackParamList = {
	SetAppointmentTime: {
		consultant: any;
	};
};

const Stack = createStackNavigator();

const AppTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
		background: "white",
	},
};

const theme = extendTheme({
	colors: {
		// Add new color
		//   primary: {
		//     50: '#E3F2F9',
		//     100: '#C5E4F3',
		//     200: '#A2D4EC',
		//     300: '#7AC1E4',
		//     400: '#47A9DA',
		//     500: '#0088CC',
		//     600: '#007AB8',
		//     700: '#006BA1',
		//     800: '#005885',
		//     900: '#003F5E',
		//   },
		// Redefinig only one shade, rest of the color will remain same.
		//   amber: {
		//     400: '#d97706',
		//   },
	},
	config: {
		// Changing initialColorMode to 'dark'
		initialColorMode: "light",
	},
	components: {
		Button: {
			baseStyle: {
				backgroundColor: colors.primary,
			},
		},
		Input: {
			baseStyle: {
				// borderRadius: "lg",
			},
			variants: {
				rounded: {
					borderRadius: 16,
				},
			},
		},
	},
});

const AllComponents: React.FC = () => {
	return (
		<ScrollView>
			<VStack
				space={24}
				paddingX={12}
				paddingY={10}
				style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
			>
				<Profile />
				<Header />
				<Button />
				<Cards />
				<TextInput holderText={"First Name and Last Name"} />
				<SearchBar />
				<DropDown holderText={"First Name and Last Name"} />
				<Location holderText={"London"} />
				<TimeSet time={"6:00 AM"} />
				<FBLogo />
				{/* <Number number={10} /> */}
				<CheckBox item={"item"} />
				<PicAvatar />
			</VStack>
		</ScrollView>
	);
};

const Tab = createBottomTabNavigator();

// TODO: customize tab look, icons and behaviour
const MainTab: React.FC = () => {
	return (


		<Tab.Navigator
			initialRouteName="Home"
			tabBar={(props) => <BottomTabBar {...props} />}
			tabBarOptions={{
				activeTintColor: "#561BB3",
				inactiveTintColor: "#B0B3C7"

			}}

		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => (
						<TabHomeIcon size={8} color={color} />
					),
				}}
			/>

			<Tab.Screen
				name="Schedule"
				component={ScheduleScreen}
				options={{
					tabBarLabel: 'Schedule',
					tabBarIcon: ({ color, size }) => (
						<TabScheduleIcon size={8} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Chat"
				component={ChatScreen}
				options={{
					tabBarLabel: 'Chat',
					tabBarIcon: ({ color, size }) => (
						<TabChatIcon size={8} color={color} />
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => (
						<TabProfileIcon size={8} color={color} />
					),
				}}
			/>


		</Tab.Navigator >

	);
}


export default () => {
	return (
		<NavigationContainer theme={AppTheme}>
			<NativeBaseProvider theme={theme}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				// initialRouteName="FindFacilityList"
				>

					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="SignUp" component={SignUpScreen} />
					<Stack.Screen name="Verify" component={VerifyScreen} />
					<Stack.Screen name="Service" component={ServiceScreen} />
					<Stack.Screen
						name="FindFacility"
						component={FindFacility}
					/>
					<Stack.Screen
						name="FindFacilityList"
						component={FindFacilityList}
					/>
					<Stack.Screen
						name="OnlineConsultantSelectTime"
						component={OnlineConsultantSelectTime}
					/>
					<Stack.Screen
						name="OnlineConsultantSelectConsultant"
						component={OnlineConsultantSelectConsultant}
					/>

					<Stack.Screen name="Home" component={MainTab} />

					<Stack.Screen
						name="CreateProfile"
						component={CreateProfile}
					/>

					<Stack.Screen
						name="ConsultantsList"
						component={ConsultantsList}
					/>
					<Stack.Screen
						name="SetAppointmentTime"
						component={SetAppointmentTime}
					/>
					<Stack.Screen
						name="PatientComplaint"
						component={PatientComplaint}
					/>
				</Stack.Navigator>
			</NativeBaseProvider>
		</NavigationContainer>
	);
};
