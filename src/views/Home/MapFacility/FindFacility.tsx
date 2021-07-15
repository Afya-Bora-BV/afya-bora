import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Animated, Platform, Pressable } from "react-native";
import { Box, HStack, ScrollView, ZStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


export const markers = [
	{
		coordinate: {
			latitude: 22.6293867,
			longitude: 88.4354486,
		},
		title: "Amazing Food Place",
		description: "This is the best food place",
	},
	{
		coordinate: {
			latitude: 22.6345648,
			longitude: 88.4377279,
		},
		title: "Second Amazing Food Place",
		description: "This is the second best food place",
	},
	{
		coordinate: {
			latitude: 22.6281662,
			longitude: 88.4410113,
		},
		title: "Third Amazing Food Place",
		description: "This is the third best food place",
	},
	{
		coordinate: {
			latitude: 22.6341137,
			longitude: 88.4497463,
		},
		title: "Fourth Amazing Food Place",
		description: "This is the fourth best food place",
	},
	{
		coordinate: {
			latitude: 22.6292757,
			longitude: 88.444781,
		},
		title: "Fifth Amazing Food Place",
		description: "This is the fifth best food place",

	},
];

const region = {
	latitude: 22.62938671242907,
	longitude: 88.4354486029795,
	latitudeDelta: 0.04864195044303443,
	longitudeDelta: 0.040142817690068,
}

const initialState = {
	markers,
	region
}
const FindFacility: React.FC = () => {

	const { navigate } = useNavigation()
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
		<View style={styles.container}>
			<MapView
				ref={_map}
				style={styles.map}
				initialRegion={state.region}

			>
				{state.markers.map((marker, index) => {
					const scaleStyle = {
						transform: [
							{
								scale: interpolations[index].scale,
							},

						],
					};
					return (
						<Marker
							key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}
							title={`Hospital ${index}`}
							description={`Descriptio ${index}`}
						>
							<Animated.View style={{
								alignItems: "center",
								justifyContent: "center",
								width: 50,
								height: 50,
							}}>
								<Animated.Image
									source={require('../../../assets/images/pin.png')}
									style={[{
										alignItems: "center",
										justifyContent: "center",
										width: 38,
										height: 38,
									}, scaleStyle]}
									resizeMode="cover"
								/>

							</Animated.View>
						</Marker>

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
					<Pressable onPress={() => {
						console.log("Pressed map carc : ", marker)
						// TODO: taking this to a separate method
						navigate("FindFacilityList", { facility: marker })
					}}>
						<View style={styles.card} key={index}>
							{/* <Box
							h="full"
							w="full"
							borderRadius={6}
							shadow={2}
							mx={2}
							backgroundColor="white"
						></Box> */}
						</View>
					</Pressable>
				))}
			</Animated.ScrollView>

		</View>
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
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		marginHorizontal: 10,
		shadowColor: "#000",
		shadowRadius: 5,
		shadowOpacity: 0.3,
		shadowOffset: { width: 2, height: -2 },
		height: CARD_HEIGHT,
		width: CARD_WIDTH,
		overflow: "hidden",
	},
});

export default FindFacility;
