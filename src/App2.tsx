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

import auth from '@react-native-firebase/auth';


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
    const profile = useAuthStore((s) => s.user);
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

    if (initializing) return null;

    // If not ready... Don't ready anything
    // if (!ready) return SplashScreen.hide();

    /**
     * Loads if there is the user component
     */

    // Not authenticated
    if (!user) {
        return <PlainAppView />;
    }

    // if (user !== null) {
    // 	if (currentProfile !== undefined) {
    // 		if (currentProfile.type === "patient") {
    // 			return (
    // 				<AppointmentTempoStoreProvider>
    // 					<PatientAppView />
    // 				</AppointmentTempoStoreProvider>
    // 			);
    // 		}

    // 		if (currentProfile.type === "doctor") {
    // 			return (
    // 				<AppointmentTempoStoreProvider>
    // 					<DoctorAppView />
    // 				</AppointmentTempoStoreProvider>
    // 			);
    // 		}
    // 	}
    // }

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
