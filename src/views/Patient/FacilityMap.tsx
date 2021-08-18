import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import {
	StyleSheet,
	View,
	Dimensions,
	Animated,
	Platform,
	Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import {
	ArrowBackIcon,
	Avatar,
	Heading,
	VStack,
	HStack,
	Text,
	Box,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HomeNavKey } from ".";
import axios from "axios";
import { useQuery } from "react-query";
import { Facility } from "../../types";
import { API_ROOT, getFacilities } from "../../api";
import { useDispatch } from "react-redux";
import { setFacility } from "../../store/slices/appointment";
import functions from "@react-native-firebase/functions";
const { width } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

// export const markers = [
// 	{
// 		id: "SAdad",
// 		name: "Demo Hospital",
// 		geopoint: {
// 			lat: -6.801707786030863,
// 			lng: 39.27184542122396,
// 		},
// 		address: "Malik Rd, Dar es Salaam",
// 		rating: {
// 			stars: 4.5,
// 			count: 934
// 		}
// 	},

// ];

/**
 * Region window to show the contents
 */
const region = {
	latitude: -6.8039469,
	longitude: 39.2750461,
	latitudeDelta: 0.04864195044303443,
	longitudeDelta: 0.040142817690068,
};

const FindFacility: React.FC = () => {
	const route = useRoute<any>();
	const navigation = useNavigation();
	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0);
	const [state, setState] = React.useState<Facility[]>([]);

	const { location } = route?.params;

	const requestLocation = [location?.coords?.latitude || null, location?.coords?.longitude || null]

	const _map = React.useRef(null);
	const _scrollView = React.useRef(null);

	const dispatch = useDispatch();

	React.useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
			if (index >= state.length) {
				index = state.length - 1;
			}
			if (index <= 0) {
				index = 0;
			}
			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index) {
					mapIndex = index;
					const { geopoint } = state[index];
					_map.current?.animateToRegion(
						{
							...geopoint,
							latitudeDelta: region.latitudeDelta,
							longitudeDelta: region.longitudeDelta,
						},
						350
					);
				}
			}, 10);

			clearTimeout(regionTimeout);
		});
	});

	const interpolations = state.map((marker, index) => {
		const inputRange = [
			(index - 1) * CARD_WIDTH,
			index * CARD_WIDTH,
			(index + 1) * CARD_WIDTH,
		];

		const scale = mapAnimation.interpolate({
			inputRange,
			outputRange: [1, 1.5, 1],
			extrapolate: "clamp",
		});

		return { scale };
	});

	const onMarkerPress = (mapEventData: any) => {
		const markerID = mapEventData._targetInst.return.key;

		let x = markerID * CARD_WIDTH + markerID * 20;
		if (Platform.OS === "ios") {
			x = x - SPACING_FOR_CARD_INSET;
		}

		_scrollView.current.scrollTo({ x: x, y: 0, animated: true });
	};

	const selectFacility = (facility: Facility) => {
		dispatch(setFacility(facility));
		navigation.navigate(HomeNavKey.FacilityInfo);
		// navigation.navigate(HomeNavKey.FacilityInfo)
	};



	const getNearByFacilities = async () => {
		const res = await functions().httpsCallable("getNearByFacilities")({
			location: requestLocation
		})

		return res.data.data
	}

	const {
		status,
		data: facilityList,
		error,
		isLoading,
	} = useQuery(["facilities"], getNearByFacilities, {
		onError: (e) => {
			console.log("Something went wrong ",)
			console.log(e)
		}
	});
	const facilities = facilityList || [];

	React.useEffect(() => {
		console.log(facilities);
		setTimeout(() => setState(facilities), 1000);
	}, [facilities]);

	console.log("Current location : ", requestLocation)

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
			<MapView ref={_map} style={styles.map} initialRegion={region}>
				{state.map((marker, index) => {
					return (
						<Marker
							key={index}
							coordinate={{
								longitude: marker.geopoint.lng,
								latitude: marker.geopoint.lat,
							}}
							onPress={(e) => onMarkerPress(e)}
							title={`${marker.name}`}
							description={marker.address}
						/>
					);
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
					right: SPACING_FOR_CARD_INSET,
				}}
				contentContainerStyle={{
					paddingHorizontal:
						Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
				}}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: mapAnimation,
								},
							},
						},
					],
					{ useNativeDriver: true }
				)}
			>
				{state.map((marker, index) => (
					<Pressable
						key={index}
						onPress={() => selectFacility(marker)}
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
							marginRight={5}
						>
							<Avatar
								alignSelf="flex-start"
								width="100%"
								height={120}
								borderRadius={20}
								source={{
									uri:
										marker?.imageUrl ||
										"https://wallpaperaccess.com/full/317501.jpg",
								}}
							/>
							{/* Text ara */}
							<VStack>
								<Heading fontSize="lg">{marker.name}</Heading>
								<Text fontSize="md" bold color="#747F9E">
									{marker.address}
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
										{marker.rating.stars} (
										{marker.rating.count})
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

export default FindFacility;
