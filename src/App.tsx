import React from 'react'

import { extendTheme, NativeBaseProvider } from "native-base"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { colors } from "./contants/colors";

import PlainAppView from "./views/_PlainAppView";
import { AuthProvider, useAuthStore } from './internals/firebase/context';
import { useEffect } from 'react';
import AuthenticatedAppView from './views/_AuthenticatedAppView';

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

export const AppTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
		background: "white",
	},
};

function Main () {
    const [login, user] = useAuthStore(({login, user}) => [login, user])

    // eecuted when screen is viewed
    useEffect(() => {
        login()
    }, [])

    if (user !== null)
        return <AuthenticatedAppView />

    return <PlainAppView />    
}

export default function App () {
    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer theme={AppTheme}>
                <AuthProvider>
                    <Main />
                </AuthProvider>
            </NavigationContainer>
        </NativeBaseProvider>
    )
}