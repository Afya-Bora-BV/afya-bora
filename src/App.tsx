import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
// import { Text } from 'react-native'

import { extendTheme, NativeBaseProvider, ToastProvider } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { colors } from "./constants/colors";

import { AuthProvider, useAuthStore } from "./internals/auth/context";
import { SafeAreaProvider } from "react-native-safe-area-context";

import PlainAppView from "./views/_Main";
import PatientAppView from "./views/Patient";
import DoctorAppView from "./views/Doctor";
import ProfileSelectorView from "./views/SelectProfile";

import { AppointmentTempoStoreProvider } from "./internals/appointment/context";

import { QueryClient, QueryClientProvider } from "react-query";

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
	const user = useAuthStore((s) => s.user);
	const currentProfile = useAuthStore((s) => s.currentProfile);
	const [profileType, ] = useState<'patient' | 'doctor'>('patient')

	const [
		getUserProfiles, addProfile,
		applyProfile, fetchProfile,
		toRemove_setProfile
	] = useAuthStore((s) => [
		s.getProfiles, s.addProfile,
		s.applyProfile, s.fetchProfile,
		s.setProfile
	]);
	const [ready, setReady] = useState(false);

	// eecuted when screen is viewed
	useEffect(() => {
		async function preQuery() {
			// checks from storage, if there is internal state of the user
			//  if there is or missing, remove
			// setSplashToHide(true);
			if (user !== null) {

				const profiles = await getUserProfiles();
				if (profiles.length === 0) {
					// NOTE: this is expected to work since the forced user has this id

					// TODO default as patients
					const patientProfiles = await fetchProfile(user.uid, profileType)
					patientProfiles.forEach(
						(profile) => {
							addProfile({ type: 'patient', profile: profile as PatientProfile })
						}
					)
					
					if (patientProfiles.length > 0) {
						// NOTE: force put the patient profile
						const profile = patientProfiles[0]
						toRemove_setProfile({ type: profileType, profile } as UserProfile)
					}
				} else {
					if (profiles.length > 0) {
						// Go to the profile screen
						const defaultIndex = 0;
						await applyProfile(defaultIndex);
					}
				}
			}
		}

		// set the profile
		preQuery();
	}, [user, profileType]);

	/**
	 * Checks to see if the user has logged in
	 */
	useEffect(() => {
		if (currentProfile !== undefined) {
			// ready only if the profile isn't set
			setReady(true);
		}
	}, [currentProfile]);

	useEffect(() => {
		// Remove splash screen if ready

		SplashScreen.hide();
	}, [ready]);

	// If not ready... Don't ready anything
	// if (!ready) return SplashScreen.hide();

	/**
	 * Loads if there is the user component
	 */
	if (user !== null) {
		if (currentProfile !== undefined) {
			if (currentProfile.type === "patient") {
				return (
					<AppointmentTempoStoreProvider>
						<PatientAppView />
					</AppointmentTempoStoreProvider>
				);
			}

			if (currentProfile.type === "doctor") {
				return (
					<AppointmentTempoStoreProvider>
						<DoctorAppView />
					</AppointmentTempoStoreProvider>
				);
			}
		} else {
			return <ProfileSelectorView />
		}
	}

	// Not authenticated
	return <PlainAppView />;
}

export default function App() {
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
	);
}
