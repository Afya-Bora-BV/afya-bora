import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base'
import React from 'react'
import { colors } from "./contants/colors";
// import {colors} from "./contants";

import LoginView from './views/Login'
import SignUpView from './views/Signup'

const theme = extendTheme({
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

export default function App () {
    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <SignUpView />
            </NavigationContainer>
        </NativeBaseProvider>
    )
}
