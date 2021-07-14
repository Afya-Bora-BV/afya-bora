import React, { useState, useEffect } from "react";
import {
	HStack,
	NativeBaseProvider,
	VStack,
	Text,
	extendTheme,
	View,
	StatusBar,
} from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Button from "./components/button";
import { Header } from "./components/header";
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

import HomeScreen from "./views/Home/HomeScreen";
import LoginScreen from "./views/Login";
import SignUpScreen from "./screens/SignUp";
import VerifyScreen from "./views/SignUp/VerifyScreen";
import ServiceScreen from "./screens/Service";
import ConsultantsList from "./views/BookAppointment/ConsultantsList";
import { FindFacility } from "./views/Home/MapFacility/FindFacility";
import OnlineConsultantSelectTime from "./views/OnlineConsult/OnlineConsultantSelectDateTime";
import OnlineConsultantSelectConsultant from "./views/OnlineConsult/OnlineConsultChooseConsultant";
import FindFacilityList from "./screens/FindFacilityList";

import ProfileScreen from "./views/Profile";
import ScheduleScreen from "./views/Schedule";
import ChatScreen from "./views/Chat";

import { SetAppointmentTime } from "./views/BookAppointment/SetAppointmentTime";
import { PatientComplaint } from "./views/BookAppointment/PatientComplaint";
import { CreateProfile } from "./views/Profile/CreateProfile";
import {
	BottomTabBar,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import TabHomeIcon from "./assets/icons/TabHomeIcon";
import TabScheduleIcon from "./assets/icons/TabScheduleIcon";
import TabChatIcon from "./assets/icons/TabChatIcon";
import TabProfileIcon from "./assets/icons/TabProfileIcon";
import { backgroundColor } from "styled-system";
import { HealthRecords } from "./screens/HealthRecords";
import ProfileMain from "./views/Profile/ProfileMain";

import { QueryClient, QueryClientProvider } from "react-query";

// import auth from '@react-native-firebase/auth';

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
	PatientComplaint: {
		consultant: any;
		appointment: any;
	};
};

export const AppTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
		background: "white",
	},
};

export const theme = extendTheme({
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
				{/* <Header /> */}
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
const Stack = createStackNavigator();

// TODO: customize tab look, icons and behaviour
const MainTab: React.FC = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			tabBar={(props) => <BottomTabBar {...props} />}
			tabBarOptions={{
				activeTintColor: "#561BB3",
				inactiveTintColor: "#B0B3C7",
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<TabHomeIcon size={8} color={color} />
					),
				}}
			/>

			<Tab.Screen
				name="Schedule"
				component={ScheduleScreen}
				options={{
					tabBarLabel: "Schedule",
					tabBarIcon: ({ color, size }) => (
						<TabScheduleIcon size={8} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Chat"
				component={ChatScreen}
				options={{
					tabBarLabel: "Chat",
					tabBarIcon: ({ color, size }) => (
						<TabChatIcon size={8} color={color} />
					),
				}}
			/>

			<Tab.Screen
				name="ProfileMain"
				component={ProfileMain}
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size }) => (
						<TabProfileIcon size={8} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const AuthStak: React.FC = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="Verify" component={VerifyScreen} />
			<Stack.Screen name="CreateProfile" component={CreateProfile} />
		</Stack.Navigator>
	);
};

const MainStack: React.FC = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Home"
		>
			<Stack.Screen name="Home" component={MainTab} />
			<Stack.Screen name="Service" component={ServiceScreen} />
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen
				name="FindFacility"
				initialParams={{ selected: 1, amount: 1 }}
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

			<Stack.Screen name="ConsultantsList" component={ConsultantsList} />
			<Stack.Screen
				name="SetAppointmentTime"
				component={SetAppointmentTime}
			/>
			<Stack.Screen
				name="PatientComplaint"
				component={PatientComplaint}
			/>
			<Stack.Screen name="HealthRecords" component={HealthRecords} />
		</Stack.Navigator>
	);
};

const AuthGate = () => {
	// Set an initializing state whilst Firebase connects
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		// const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		// return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) return null;

	// TODO: show main screen if only the user is signed in and registred
	// considering using global store to track that info
	if (!user) {
		return <AuthStak />;
	}

	return <MainStack />;
};
const queryClient = new QueryClient();

export default () => {
	return (
		<NavigationContainer theme={AppTheme}>
			<StatusBar translucent backgroundColor={colors.primary} />
			<QueryClientProvider client={queryClient}>
				<NativeBaseProvider theme={theme}>
					<AuthGate />
				</NativeBaseProvider>
			</QueryClientProvider>
		</NavigationContainer>
	);
};
