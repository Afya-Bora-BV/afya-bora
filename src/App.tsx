import "./i18n"
import React, { Suspense, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
// import { Text } from 'react-native'

import { extendTheme, NativeBaseProvider, ToastProvider } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { colors } from "./constants/colors";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider as JotaiProvider } from "jotai";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { QueryClient, QueryClientProvider } from "react-query";
import HomeView from "./views/Patient";
import { PersistGate } from 'redux-persist/integration/react'

import { Constants } from 'react-native-unimodules';
console.log(Constants.systemFonts);


const queryClient = new QueryClient();

export const theme = extendTheme({
	fontConfig: {
		Ubuntu: {
			100: {
				normal: "Ubuntu-Light",
				italic: "Ubuntu-LightItalic",
			},
			200: {
				normal: "Ubuntu-Light",
				italic: "Ubuntu-LightItalic",
			},
			300: {
				normal: "Ubuntu-Light",
				italic: "Ubuntu-LightItalic",
			},
			400: {
				normal: "Ubuntu-Regular",
				italic: "Ubuntu-Italic",
			},
			500: {
				normal: "Ubuntu-Medium",
				italic: "Ubuntu-MediumItalic",
			},
			600: {
				normal: "Ubuntu-Medium",
				italic: "Ubuntu-MediumItalic",
			},
			700: {
				normal: "Ubuntu-Bold",
				italic: "Ubuntu-BoldItalic",
			},
			800: {
				normal: "Ubuntu-Bold",
				italic: "Ubuntu-BoldItalic",
			},
			900: {
				normal: "Ubuntu-Bold",
				italic: "Ubuntu-BoldItalic",
			},
		},
	},
	fonts: {
		heading: "Ubuntu",
		body: "Ubuntu",
		mono: "Ubuntu",
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

export const AppTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
		background: "white",
	},
};

function Main() {
	const [ready, setReady] = useState(false);
	// Set an initializing state whilst Firebase connects
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	// Handle user state changes
	function onAuthStateChanged(user: any) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	useEffect(() => {
		// Remove splash screen if ready
		SplashScreen.hide();
	}, [ready]);

	if (initializing) return null;

	return <HomeView />;
}

export default function App() {
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<NativeBaseProvider theme={theme}>
						<NavigationContainer theme={AppTheme}>
							<ToastProvider>
								<QueryClientProvider client={queryClient}>
									<JotaiProvider>
										<Suspense fallback={null}>
											<Main />
										</Suspense>
									</JotaiProvider>
								</QueryClientProvider>
							</ToastProvider>
						</NavigationContainer>
					</NativeBaseProvider>
				</PersistGate>
			</Provider>
		</SafeAreaProvider>
	);
}
