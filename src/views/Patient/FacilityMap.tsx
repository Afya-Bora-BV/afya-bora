import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import {
	StyleSheet,
	View,
	Dimensions,
	Animated,
	Platform,
	Pressable,
	TouchableOpacity,
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
	Box,
	Center,
	Image,
	Modal,
	Stack
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HomeNavKey } from ".";
import axios from "axios";
import { useQuery } from "react-query";
import { Facility } from "../../types";
import { useDispatch } from "react-redux";
import { setFacility } from "../../store/slices/appointment";
import functions from "@react-native-firebase/functions";
import { Text } from "../../components/text";
import firestore from '@react-native-firebase/firestore';
import MapPin from "../../assets/icons/MapPinIcon"
import { Icon, IIconProps } from "native-base";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


import { distanceBetween } from "geofire-common";
import { colors } from "../../constants/colors";
import AppointmentCustomizer from "../../components/appointment-customizer";
import { PrimaryButton } from "../../components/button";
import FilterIcon from "../../assets/icons/FilterIcon";
const radiusInM = 50 * 1000;

/**
 * Region window to show the contents
 */




function useFacilities({ location }: { location: [number, number] }) {
	const [facilities, setFacilities] = React.useState<Facility[]>([])

	React.useEffect(() => {
		const subscriber = firestore()
			.collection('facilities')
			.onSnapshot((snaps) => {

				const data = snaps.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data()
					} as Facility
				})
				setFacilities(data)
			});

		// Stop listening for updates when no longer required
		return () => subscriber();
	}, []);



	const facilitiesWithGeopoint = facilities.filter((doc) => {
		return doc?.geopoint
	})

	const nearByFacilities = facilitiesWithGeopoint.filter((doc) => {
		const distanceInKm = distanceBetween(
			[doc?.geopoint?.latitude, doc?.geopoint?.longitude],
			location
		);
		const distanceInM = distanceInKm * 1000;
		return distanceInM <= radiusInM;
	})

	// console.log("Facilities ")
	// console.log(JSON.stringify(nearByFacilities, null, 3))

	return { nearByFacilities }
}

const FindFacility: React.FC = () => {
	const route = useRoute<any>();
	const navigation = useNavigation();
	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0);

	const [modalVisible, setModalVisible] = React.useState(false);

	// const [state, setState] = React.useState<Facility[]>([]);
	const { location } = route?.params;

	const requestLocation = [location?.coords?.latitude, location?.coords?.longitude] as [number, number]

	const { nearByFacilities: facilityList } = useFacilities({ location: requestLocation })

	const facilities = facilityList || [];







	const region = {
		latitude: requestLocation[0],
		longitude: requestLocation[1],
		latitudeDelta: 0.04864195044303443,
		longitudeDelta: 0.040142817690068,
	};


	const _map = React.useRef(null);
	const _scrollView = React.useRef(null);

	const dispatch = useDispatch();

	React.useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
			if (index >= facilities.length) {
				index = facilities.length - 1;
			}
			if (index <= 0) {
				index = 0;
			}
			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index) {
					mapIndex = index;
					const { geopoint } = facilities[index];
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

	// const interpolations = facilities.map((marker, index) => {
	// 	const inputRange = [
	// 		(index - 1) * CARD_WIDTH,
	// 		index * CARD_WIDTH,
	// 		(index + 1) * CARD_WIDTH,
	// 	];

	// 	const scale = mapAnimation.interpolate({
	// 		inputRange,
	// 		outputRange: [1, 1.5, 1],
	// 		extrapolate: "clamp",
	// 	});

	// 	return { scale };
	// });

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



	const openFilterModal = () => {
		setModalVisible(true)
		console.log("Open modal")
	}


	// const getNearByFacilities = async () => {
	// 	const res = await functions().httpsCallable("getNearByFacilities")({
	// 		location: requestLocation
	// 	})

	// 	return res.data.data
	// }

	// const {
	// 	status,
	// 	data: facilityList,
	// 	error,
	// 	isLoading,
	// } = useQuery(["facilities"], getNearByFacilities, {
	// 	onError: (e) => {
	// 		console.log("Something went wrong ",)
	// 		console.log(e)
	// 	}
	// });



	// React.useEffect(() => {
	// 	console.log(facilities);
	// 	setTimeout(() => setState(facilities), 1000);
	// }, [facilities]);



	return (
		<>
			<Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
				<Modal.Content>
					<Modal.CloseButton />
					<Modal.Header>Filters</Modal.Header>
					<Modal.Body>
						<AppointmentCustomizer />
					</Modal.Body>
					<Modal.Footer>


						<PrimaryButton
							flex="1"
							onPress={() => {
								setModalVisible(false);
							}}>
							<Text tx="common.close" color="white">
								Close
							</Text>
						</PrimaryButton>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
			<MainContainer
				noScroll
				title="facilityMap.findFacility"
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

				rightSection={
					() => {
						return (
							<Stack mt={0}>
								<IconContainer>
									<TouchableOpacity onPress={() => {
										openFilterModal()
									}}>
										<FilterIcon size={6} color={"#561BB3"} />
									</TouchableOpacity>
								</IconContainer>
							</Stack>

						)
					}
				}
			>
				<MapView ref={_map} style={styles.map} initialRegion={region}>
					<Marker
						coordinate={{ latitude: requestLocation[0], longitude: requestLocation[1] }}
						title={"My Location"}
						description={"My Location"}
					>
					</Marker>

					{facilities.map((marker, index) => {
						console.log("Coords")
						console.log(marker.geopoint)
						return (
							<Marker
								key={index}
								coordinate={{
									latitude: marker.geopoint.latitude,
									longitude: marker.geopoint.longitude
								}}
								onPress={(e) => onMarkerPress(e)}
								title={`${marker.name}`}
								description={marker.city}
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
					{/* {isLoading &&
					<Center
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
						minHeight={200}
						bgColor="#FFF"
						shadow={40}
						padding={3}
						borderRadius={20}
						marginRight={5}
					>
						<Text
							tx="common.pleaseWait"
						>Loading nearby facilities....</Text>
					</Center>
				} */}
					{/* {state.length === 0 && !isLoading && */}
					{facilities.length === 0 &&
						<Center
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
							minHeight={200}
							bgColor="#FFF"
							shadow={40}
							padding={3}
							borderRadius={20}
							marginRight={5}
						>
							<Text
								tx="facilityMap.noNearByFacility"
							>No nearby facilities</Text>
						</Center>
					}
					{facilities.map((marker, index) => (
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

								<Image
									source={{
										uri: marker.photoUrl ? marker.photoUrl
											: "https://firebasestorage.googleapis.com/v0/b/afya-bora-fb.appspot.com/o/c2c820d8-1d2b-4a96-a947-7405156a8f41?alt=media&token=5a364ace-4e71-4b1e-a9f5-38f73b9e24fc",
									}}
									alt="Alternate Text" size="xl"
									width="100%"
									height={120}
									borderRadius={4}

								/>
								{/* Text ara */}
								<VStack>
									<Heading fontSize="lg">{marker.name}</Heading>
									<Text fontSize="md" bold color="#747F9E">
										{marker.city}
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
											{/* {marker.rating.stars} ( */}
											{/* {marker.rating.count}) */}
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
		</>
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
