import React, { useEffect } from "react";
import SplashScreen from 'react-native-splash-screen'

import { extendTheme, NativeBaseProvider } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { useFonts } from 'expo-font'

import { colors } from "./contants/colors";

import { AuthProvider, useAuthStore } from './internals/auth/context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PlainAppView from "./views/_Plain";
import AuthenticatedAppView from './views/_Authenticated';

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
	// const [isSplashToClose, setSplashToHide] = useState(false);

	// eecuted when screen is viewed
	useEffect(() => {
		// checks from storage, if there is internal state of the user
		//  if there is or missing, remoce
		// setSplashToHide(true);
		SplashScreen.hide()
	}, []);

	// Show splash screen if not ready
	// if (!isSplashToClose) return <Splash />;

	if (user !== null && user !== undefined) {
		return <AuthenticatedAppView />;
	}

	// Not authenticated
	return <PlainAppView />;
}

export default function App () {
	let [fontsLoaded] = useFonts({
		"Ubuntu-Bold": require('./assets/fonts/Ubuntu-Bold.ttf'),
		"Ubuntu-BoldItalic": require('./assets/fonts/Ubuntu-BoldItalic.ttf'),
		
		"Ubuntu-Light": require('./assets/fonts/Ubuntu-Light.ttf'),
		"Ubuntu-LightItalic": require('./assets/fonts/Ubuntu-LightItalic.ttf'),

		"Ubuntu-Medium": require('./assets/fonts/Ubuntu-Medium.ttf'),
		"Ubuntu-MediumItalic": require('./assets/fonts/Ubuntu-MediumItalic.ttf'),

		"Ubuntu-Regular": require('./assets/fonts/Ubuntu-Regular.ttf'),
		"Ubuntu-Italic": require('./assets/fonts/Ubuntu-Italic.ttf'),
	})
	
    return (
		<SafeAreaProvider>
			<NativeBaseProvider theme={theme}>
				<NavigationContainer theme={AppTheme}>
					<AuthProvider>
						{/* <Main /> */}
						<AuthenticatedAppView />
					</AuthProvider>
				</NavigationContainer>
			</NativeBaseProvider>
		</SafeAreaProvider>
    )
}
