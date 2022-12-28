// import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./i18n";
import React, { Suspense, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "./store";
import { Text as RNText } from 'react-native'
import Spinner from "react-native-spinkit";
import {
	extendTheme,
	NativeBaseProvider,
	Text,
	ToastProvider,
} from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { colors } from "./constants/colors";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider as JotaiProvider, useAtom } from "jotai";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { QueryClient, QueryClientProvider } from "react-query";
import HomeView, { DoctorRoutes, HomeNavKey } from "./views/Patient";
import { PersistGate } from "redux-persist/integration/react";

// import { Constants } from "react-native-unimodules";
import { languageAtom, showOnboardAtom } from "./store/atoms";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { updateDeviceMessagingToken } from "./utils";
import { View } from "react-native";
import { LoadingFullScreen } from "./components/LoadingFullScreen";
import OnBoard from "./views/Patient/OnBoard";
// console.log(Constants.systemFonts);

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

const AtomsPreLoader = () => {
	const [] = useAtom(languageAtom);
	const [] = useAtom(showOnboardAtom)
	return null
}

// TODO: SO MUCH JUNK HERE!!
function Main() {
	const [language, setLanguage] = useAtom(languageAtom);
	const [isFirstTime, setIsFirstTime] = useAtom(showOnboardAtom);

	const { t, i18n } = useTranslation();

	const { user, profile, loading } = useAuth();

	const createProfileFirst = !loading && user !== null && profile === null;
	console.info(loading, user, profile);

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [language, isFirstTime]);

	useEffect(() => {
		// Remove splash screen if ready
		!loading && SplashScreen.hide();
	}, [loading]);

	// console.log("Current language  : ", language);
	// TODO: Put placeholder to prevent screen splashing white
	// if (!loading) return <LoadingFullScreen />;

	// Render the first time the app is installed only



	if (isFirstTime) {
		return <OnBoard />
		// return <HomeView initialRouteName={HomeNavKey.OnBoard} />
	}

	if (profile?.type === "consultant") {
		console.log("PROFILE TYPE : ", profile?.type)

		return <HomeView initialRouteName={DoctorRoutes.DoctorHome} />;
	}

	if (createProfileFirst) {
		return <HomeView initialRouteName={HomeNavKey.CreateProfile} />;
	}




	return <HomeView initialRouteName={HomeNavKey.HomeScreen} />;
}

export default function App() {
	return (

		// <GestureHandlerRootView>
		<SafeAreaProvider>
			<Provider store={store}>
				<AuthProvider>
					<PersistGate loading={null} persistor={persistor}>
						<NativeBaseProvider theme={theme}>
							<NavigationContainer theme={AppTheme}>
								<ToastProvider>
									<QueryClientProvider client={queryClient}>
										<JotaiProvider>
											<Suspense fallback={null}>
												<AtomsPreLoader />
												<Main />
											</Suspense>
										</JotaiProvider>
									</QueryClientProvider>
								</ToastProvider>
							</NavigationContainer>
						</NativeBaseProvider>
					</PersistGate>
				</AuthProvider>
			</Provider>
		</SafeAreaProvider>
		// </GestureHandlerRootView>
	);
}
