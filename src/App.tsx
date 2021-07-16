import React, { useEffect } from "react";
import SplashScreen from 'react-native-splash-screen'
// import { Text } from 'react-native'

import { extendTheme, NativeBaseProvider, Text, ToastProvider } from "native-base"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { colors } from "./constants/colors";

import { AuthProvider, useAuthStore } from './internals/auth/context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PlainAppView from "./views/_Main";
import PatientAppView from './views/Patient';
import DoctorAppView from './views/Doctor';
import ProfileSelectorView from './views/SelectProfile'

import { AppointmentTempoStoreProvider } from './internals/appointment/context';

import {
	QueryClient,
	QueryClientProvider,
} from 'react-query'
import { useState } from "react";

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
	const [user, getUserProfiles, applyProfile] = useAuthStore(s => [s.user, s.getProfiles, s.applyProfile]);
	const currentProfile = useAuthStore(s => s.currentProfile)
	const [ready, setReady] = useState(false)

	// eecuted when screen is viewed
	useEffect(() => {
		async function preQuery () {
			// checks from storage, if there is internal state of the user
			//  if there is or missing, remove
			// setSplashToHide(true);
			if (user !== null) {
				const profiles = await getUserProfiles();
				if (profiles.length > 0) {
					// Go to the profile screen
					const defaultIndex = 0
					applyProfile(defaultIndex)
				}
			}
		}


		// set the profile
		preQuery()
	}, [user]);

	/**
	 * Checks to see if the user has logged in
	 */
	useEffect(() => {
		if (currentProfile !== undefined) {
			// ready only if the profile isn't set
			setReady(true)
		}
	}, [currentProfile])

	useEffect(() => {
		// Remove splash screen if ready
		if (ready) {
			SplashScreen.hide()
		}
	}, [ready])

	// If not ready... Don't ready anything
	if (!ready) return null

	/**
	 * Loads if there is the user component
	 */
	if (currentProfile !== undefined) {
		if (currentProfile.type === 'patient') {
			return (
				<AppointmentTempoStoreProvider>
					<PatientAppView />
				</AppointmentTempoStoreProvider>
			)
		}

		if (currentProfile.type === 'doctor') {
			return (
				<AppointmentTempoStoreProvider>
					<DoctorAppView />
				</AppointmentTempoStoreProvider>
			)
		}		
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
