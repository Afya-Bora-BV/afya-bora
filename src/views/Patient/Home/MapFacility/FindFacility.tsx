import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Animated, Platform, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MainContainer from "../../../../components/containers/MainContainer";
import { IconContainer } from "../../../../components/misc";
import { ArrowBackIcon, Avatar, Heading, VStack, HStack, Text, Box } from "native-base";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { NavKey } from "./_navigator"

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


export const markers = [
	{
		ratings: 4.1,
		raters: 183,
		coordinate: {
			latitude: -6.803380008888317,
			longitude: 39.28789428424221,
		},
		title: "Aga Khan Hospital",
		location: "Ocean Road Dar es Salaam TZ, 2289",
	},
	{
		ratings: 4.2,
		raters: 190,
		imageUrl: "https://lh5.googleusercontent.com/p/AF1QipNDZ_RfsPE7WneCCNts_7sPVr_48YkPGf1qUMii=w408-h244-k-no",
		coordinate: {
			latitude: -6.801707786030863,
			longitude: 39.27184542122396,
		},
		title: "Muhimbili National Hospital",
		location: "Malik Rd, Dar es Salaam",
	},
];

/**
 * Region window to show the contents
 */
const region = {
	latitude: -6.8039469,
	longitude: 39.2750461,
	latitudeDelta: 0.04864195044303443,
	longitudeDelta: 0.040142817690068,
}

const initialState = {
	markers,
	region
}

const FindFacility: React.FC = () => {

	const navigation = useNavigation()
	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0);
	const [state, setState] = React.useState(initialState);

	const _map = React.useRef(null);
	const _scrollView = React.useRef(null);

	React.useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
			if (index >= state.markers.length) {
				index = state.markers.length - 1;
			}
			if (index <= 0) {
				index = 0;
			}
			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index) {
					mapIndex = index;
					const { coordinate } = state.markers[index];
					_map.current?.animateToRegion(
						{
							...coordinate,
							latitudeDelta: state.region.latitudeDelta,
							longitudeDelta: state.region.longitudeDelta,
						},
						350
					);
				}
			}, 10);

			clearTimeout(regionTimeout);


		});
	});

	const interpolations = state.markers.map((marker, index) => {
		const inputRange = [
			(index - 1) * CARD_WIDTH,
			index * CARD_WIDTH,
			((index + 1) * CARD_WIDTH),
		];

		const scale = mapAnimation.interpolate({
			inputRange,
			outputRange: [1, 1.5, 1],
			extrapolate: "clamp"
		});

		return { scale };
	});

	const onMarkerPress = (mapEventData: any) => {
		const markerID = mapEventData._targetInst.return.key;

		let x = (markerID * CARD_WIDTH) + (markerID * 20);
		if (Platform.OS === 'ios') {
			x = x - SPACING_FOR_CARD_INSET;
		}

		_scrollView.current.scrollTo({ x: x, y: 0, animated: true });
	}

	return (

		<MainContainer
			noScroll
			title="Find Facilty"
			headerMode="float"
			leftSection={
				// Go back if can go back
				navigation.canGoBack()
					? () => (
							<Pressable onPress={() => navigation.goBack()}>
								<IconContainer>
									<ArrowBackIcon size={6} color="#561BB3" />
								</IconContainer>
							</Pressable>
					  )
					: undefined
			}
		>
			<MapView
				ref={_map}
				style={styles.map}
				initialRegion={state.region}
			>
				{state.markers.map((marker, index) => {
					return (
						<Marker
							key={index} 
							coordinate={marker.coordinate} 
							onPress={(e) => onMarkerPress(e)}
							title={`${marker.title}`}
							description={marker.location}
						/>
					)
				})}

			</MapView>

			<Animated.ScrollView
				ref={_scrollView}
				horizontal
				pagingEnabled
				scrollEventThrottle={1}
				showsHorizontalScrollIndicator={false}
				snapToInterval={CARD_WIDTH + 20}
				snapToAlignment="center"
				style={styles.scrollView}
				contentInset={{
					top: 0,
					left: SPACING_FOR_CARD_INSET,
					bottom: 0,
					right: SPACING_FOR_CARD_INSET
				}}
				contentContainerStyle={{
					paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
				}}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: mapAnimation,
								}
							},
						},
					],
					{ useNativeDriver: true }
				)}
			>
				{state.markers.map((marker, index) => (
					<Pressable  
						key={index} 
						onPress={() => {
							// console.log("Pressed map carc : ", marker)
							// TODO: taking this to a separate method
							navigation.navigate(NavKey.FindFacilityListScreen, { facility: marker })
						}}
					>
						<VStack 
							style={{
								shadowColor: "#CCC",
								shadowOffset: {
									width: 0,
									height: 5,
								},
								shadowOpacity: 0.57,
								shadowRadius: 13.19,

								elevation: 13,
							}}
							minWidth={300}
							bgColor="#FFF"
							shadow={40}
							padding={3} 
							space={1} 
							borderRadius={20}
							marginRight={5}>
							<Avatar
								alignSelf="flex-start"
								width="100%"
								height={120}
								borderRadius={20}
								source={{
									uri: marker.imageUrl || "https://wallpaperaccess.com/full/317501.jpg",
								}}
							/>
							{/* Text ara */}
							<VStack>
								<Heading fontSize="lg">{marker.title}</Heading>
								<Text fontSize="md" bold color="#747F9E">
									{marker.location}
								</Text>
							</VStack>

							{/* Ratings + Distance */}
							<HStack
								space={1}
								justifyContent="space-between"
								marginTop={2}
							>
								{/* Ratings */}
								<HStack space={1} alignItems="center">
									<MaterialCommunityIcons
										name="star"
										color="#FFC107"
										size={24}
									/>
									<Text fontSize="md" color="#B0B3C7">
										{marker.ratings} ({marker.raters})
									</Text>
								</HStack>

								{/* Distance */}
								<HStack
									space={1}
									px={2}
									py={1}
									borderRadius={4}
									justifyContent="center"
									alignItems="center"
									style={{
										backgroundColor: "rgba(37,143,190,0.2)",
									}}
								>
									<MaterialCommunityIcons
										name="google-maps"
										size={18}
										color="#258FBE"
									/>
									<Text color="#258FBE">{34}</Text>
								</HStack>
							</HStack>
						</VStack>
					</Pressable>
				))}
			</Animated.ScrollView>
		</MainContainer>
	);
};



const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
	},
	scrollView: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 10,
	},
	card: {
		// padding: 10,
		elevation: 2,
		backgroundColor: "#FFF",
		shadowColor: "#000",
		shadowRadius: 5,
		shadowOpacity: 0.3,
		shadowOffset: { width: 2, height: -2 },
		height: CARD_HEIGHT,
		width: CARD_WIDTH,
		overflow: "hidden",

		padding: 5,
		borderRadius: 20,
	},
});

export default  FindFacility;
