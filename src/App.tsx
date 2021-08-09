import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
// import { Text } from 'react-native'

import { extendTheme, NativeBaseProvider, ToastProvider } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { colors } from "./constants/colors";

import { AuthProvider, useAuthStore } from "./internals/auth/context";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider as JotaiProvider } from 'jotai'


import { QueryClient, QueryClientProvider } from "react-query";
import HomeView from "./views/Patient/Home";

const queryClient = new QueryClient();

export const theme = extendTheme({
	fontConfig: {
		Ubuntu: {
			100: {
				normal: 'Ubuntu-Light',
				italic: 'Ubuntu-LightItalic',
			},
			200: {
				normal: 'Ubuntu-Light',
				italic: 'Ubuntu-LightItalic',
			},
			300: {
				normal: 'Ubuntu-Light',
				italic: 'Ubuntu-LightItalic',
			},
			400: {
				normal: 'Ubuntu-Regular',
				italic: 'Ubuntu-Italic',
			},
			500: {
				normal: 'Ubuntu-Medium',
				italic: 'Ubuntu-MediumItalic',
			},
			600: {
				normal: 'Ubuntu-Medium',
				italic: 'Ubuntu-MediumItalic',
			},
			700: {
				normal: 'Ubuntu-Bold',
				italic: 'Ubuntu-BoldItalic',
			},
			800: {
				normal: 'Ubuntu-Bold',
				italic: 'Ubuntu-BoldItalic',
			},
			900: {
				normal: 'Ubuntu-Bold',
				italic: 'Ubuntu-BoldItalic',
			},
		},
	},
	fonts: {
		heading: 'Ubuntu',
		body: 'Ubuntu',
		mono: 'Ubuntu',
	},
	config: {
		// Changing initialColorMode to 'dark'
		initialColorMode: 'light',
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

	useEffect(() => {
		// Remove splash screen if ready
		SplashScreen.hide();
	}, [ready]);
	
	return <HomeView />;
}

export default function App() {
	return (
		<SafeAreaProvider>
			<NativeBaseProvider theme={theme}>
				<NavigationContainer theme={AppTheme}>
					<ToastProvider>
						<AuthProvider>
							<QueryClientProvider client={queryClient}>
								<JotaiProvider>
									<Main />
								</JotaiProvider>
							</QueryClientProvider>
						</AuthProvider>
					</ToastProvider>
				</NavigationContainer>
			</NativeBaseProvider>
		</SafeAreaProvider>
	);
}
