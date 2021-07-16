import React, { useEffect } from "react";
import SplashScreen from 'react-native-splash-screen'
// import { Text } from 'react-native'

import { extendTheme, NativeBaseProvider, ToastProvider } from "native-base"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { colors } from "./constants/colors";

import { AuthProvider, useAuthStore } from './internals/auth/context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PlainAppView from "./views/_Main";
import PatientAppView from './views/Patient';
import DoctorAppView from './views/Doctor';
import { AppointmentTempoStoreProvider } from './internals/appointment/context';

import {
	QueryClient,
	QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()


export const theme = extendTheme({
	fontConfig: {
		"Ubuntu": {
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
		}
	},
	fonts: {
		heading: 'Ubuntu',
		body: 'Ubuntu',
		mono: 'Ubuntu',
	},
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

export const AppTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
		background: "white",
	},
};

function Main() {
	const user = useAuthStore((state) => state.user);
	const getUserStatus = ''

	// eecuted when screen is viewed
	useEffect(() => {
		// checks from storage, if there is internal state of the user
		//  if there is or missing, remove
		// setSplashToHide(true);
		SplashScreen.hide()
	}, []);

	// Show splash screen if not ready
	// if (!isSplashToClose) return <Splash />;

	if (user !== null) {
		return (
			<AppointmentTempoStoreProvider>
				<PatientAppView />
			</AppointmentTempoStoreProvider>
		)
	}

	// Not authenticated
	return <PlainAppView />
}

export default function App () {
    return (
		<SafeAreaProvider>
			<NativeBaseProvider theme={theme}>
				<NavigationContainer theme={AppTheme}>
					<ToastProvider>
						<AuthProvider>
							<QueryClientProvider client={queryClient}>
								<Main />
							</QueryClientProvider>
						</AuthProvider>
					</ToastProvider>
				</NavigationContainer>
			</NativeBaseProvider>
		</SafeAreaProvider>
    )
}
