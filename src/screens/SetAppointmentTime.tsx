import React from "react";
import {
	View,
	Text,
	StatusBar,
	ScrollView,
	Box,
	HStack,
	Stack,
	Button,
	VStack,
} from "native-base";
import { HeaderwithBack } from "../components/header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ConsultantListItem } from "../components/consultant-list-item";
import { RootStackParamList } from "..";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import _ from "lodash";
import { colors } from "../contants/colors";

type SetAppointmentTimeScreenRouteProp = RouteProp<
	RootStackParamList,
	"SetAppointmentTime"
>;

type SetAppointmentTimeNavigationProp = StackNavigationProp<
	RootStackParamList,
	"SetAppointmentTime"
>;

type SetAppointmentTimeProps = {
	route: SetAppointmentTimeScreenRouteProp;
	navigation: SetAppointmentTimeNavigationProp;
};

// type SetAppointmentTimeProps = {
// 	route: any;
// };

const SetAppointmentTime: React.FC<SetAppointmentTimeProps> = ({ route }) => {
	const navigation = useNavigation();
	const handleBackPress = () => navigation.goBack();

	const consultant = route.params.consultant;

	console.log(consultant);

	const handleNext = () => navigation.navigate("PatientComplaint")
	return (
		<ScrollView p={2} marginTop={12}>
			<StatusBar backgroundColor="#fff" />
			<HeaderwithBack onBackPress={handleBackPress} text="Day and Time" />

			<Box marginY={3}>
				{consultant && (
					<ConsultantListItem
						onPress={console.log}
						consultant={consultant}
					/>
				)}
			</Box>

			<Box bg="white" p={2} shadow={2} rounded="lg" mb={1}>
				<VStack p={1} space={10}>
					<View>
						<HStack justifyContent="space-between">
							<Text fontSize="2xl" bold>
								Pick a Date
							</Text>

							<HStack alignItems="center">
								<Text>September 2021</Text>
								<MaterialCommunityIcons
									size={18}
									name="chevron-down"
								/>
							</HStack>
						</HStack>
						<ScrollView
							snapToInterval={2}
							horizontal
							paddingBottom={3}
						>
							<HStack space={1}>
								{_.times(31, (n) => (
									<CalendarDay key={n} date={new Date()} />
								))}
							</HStack>
						</ScrollView>
					</View>

					<View>
						<HStack justifyContent="space-between">
							<Text fontSize="2xl" bold>
								Pick a Time
							</Text>

							<HStack alignItems="center">
								<Text>September 2021</Text>
								<MaterialCommunityIcons
									size={18}
									name="chevron-down"
								/>
							</HStack>
						</HStack>

						<VStack space="sm" mt={4}>
							{_.times(14, (n) => {
								const t = n + 6;
								return (
									<HStack flexWrap="wrap" space="md">
										<TouchableOpacity style={{ flex: 1 }}>
											<Box
												borderWidth={1}
												borderColor="#ccc"
												rounded="lg"
												alignItems="center"
												p={2}
											>
												<Text>
													{_.padStart(t + "", 2, "0")}
													:00 {t > 11 ? "PM" : "AM"}
												</Text>
											</Box>
										</TouchableOpacity>
										<TouchableOpacity style={{ flex: 1 }}>
											<Box
												borderWidth={1}
												borderColor="#ccc"
												rounded="lg"
												alignItems="center"
												p={2}
											>
												<Text>
													{_.padStart(t + "", 2, "0")}
													:30 {t > 11 ? "PM" : "AM"}
												</Text>
											</Box>
										</TouchableOpacity>
									</HStack>
								);
							})}
						</VStack>
					</View>
				</VStack>
			</Box>

			<Button my={6} bg={colors.primary} onPress={handleNext} rounded={20}>
				Next
			</Button>
		</ScrollView>
	);
};

type CalendarDayProps = {
	date: Date;
};

const CalendarDay: React.FC<CalendarDayProps> = ({ date }) => (
	<TouchableOpacity>
		<Box
			bg="#fff"
			borderWidth={1}
			borderColor="#ccc"
			p={3}
			rounded="xl"
			alignItems="center"
		>
			<Text>Mon</Text>
			<Text>09/09</Text>
		</Box>
	</TouchableOpacity>
);

export { SetAppointmentTime };
