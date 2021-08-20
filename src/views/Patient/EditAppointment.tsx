import React, { useRef, useState } from "react";
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
	Menu,
	Divider,
	HamburgerIcon,
	Pressable,
	ChevronDownIcon,
	ArrowBackIcon,
	Center,
	Select,
	CheckIcon,
} from "native-base";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ConsultantListItem } from "../../components/consultant-list-item";
import { StackNavigationProp } from "@react-navigation/stack";
import { getDaysInMonth, isSameDay } from "date-fns";
import { ToastAndroid, TouchableOpacity } from "react-native";
import _, { add } from "lodash";
import { colors } from "../../constants/colors";
import moment from "moment";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import { useCallback } from "react";
import { atom, useAtom } from "jotai";
import { StringLocale } from "yup/lib/locale";
import { FacilityListItem } from "../../components/facilities-list-item";
import { PatientComplaint } from "./PatientComplaint";
import { HomeNavKey } from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setDate, setTimeRange } from "../../store/slices/appointment";
import { TimeRange } from "../../types";
import firestore from '@react-native-firebase/firestore';
import { useMutation } from "react-query";


// TODO: this to be moved to the firebase function
const updateAppointment = async ({ appointmentId, date, timeRange }: { appointmentId: string, date: Date, timeRange: TimeRange }) => {
	try {
		await firestore().collection("appointments").doc(appointmentId).update({
			updatedAt: new Date(),
			timeRange: timeRange,
			date: date,
			utcDate: new Date(date).toUTCString()
		})
	}
	catch (e) {
		throw new Error("Error while updating appointment info")
	}
}

export type BookAppointmentStackParamList = {
	SetAppointmentTime: {
		consultant: any;
	};
	PatientComplaint: {
		consultant: any;
		appointment: any;
		appointmentType: "offline";
	};
};

function nextNMonths(n: number): Date {
	const d = new Date();
	d.setMonth(d.getMonth() + n);
	return d;
}

function listOfNextNMonths(n: number): Array<Date> {
	const d = new Date();
	const dates = [];
	for (let i = 0; i < n; i++) {
		dates.push(nextNMonths(i));
	}
	return dates;
}

const appointmentDateAtom = atom<Date>(new Date());

const setAppointmentDateAtom = atom(
	(get) => {
		return get(appointmentDateAtom);
	},
	(get, set, update: Date) => {
		// you can do more logic here for the state

		set(appointmentDateAtom, update);
	}
);

type PickADateSectionProps = {
	date: Date;
	onChangeDate: (date: Date) => void;
};

const PickADateSection: React.FC<PickADateSectionProps> = ({
	date,
	onChangeDate,
}) => {
	// const [chosenDate, onSelectDate] = useAtom(setAppointmentDateAtom);
	const daysListRef = useRef(null);

	return (
		<View>
			<HStack justifyContent="space-between" mb={3}>
				<Text fontSize="2xl" bold>
					Preferred Date
				</Text>

				<MonthDropDown
					onChangeDate={(date) => onChangeDate(date)}
					date={date}
				/>
			</HStack>
			<ScrollView
				snapToInterval={2}
				horizontal
				paddingBottom={3}
				ref={daysListRef}
				onLayout={() =>
					daysListRef.current?.scrollTo({
						x: 50 * date.getDate(),
						y: 0,
					})
				}
			>
				<HStack alignItems="center" space={1}>
					{_.times(getDaysInMonth(date), (n) => {
						const d = new Date(date);
						d.setDate(n + 1);
						return (
							<CalendarDay
								onPress={() => onChangeDate(d)}
								key={n}
								status={
									isSameDay(d, date) ? "active" : "inactive"
								}
								date={d}
							/>
						);
					})}
				</HStack>
			</ScrollView>
		</View>
	);
};

type TimeSlot = {
	period: TimeRange;
	min: string;
	max: String;
};
const timeSlots: Array<TimeSlot> = [
	{
		period: "morning",
		max: "12",
		min: "9",
	},
	{
		period: "afternoon",
		min: "12",
		max: "16",
	},

	{
		period: "evening",
		min: "16",
		max: "20",
	},
];

const appointmentTimeAtom = atom<string>("");

const setAppointmentTimeAtom = atom(
	(get) => {
		return get(appointmentTimeAtom);
	},
	(get, set, update: string) => {
		// you can do more logic here for the state

		set(appointmentTimeAtom, update);
	}
);

type PickATimeSectionProps = {
	timeRange: TimeRange;
	onChange: (t: TimeRange) => void;
};

const PickATimeSection: React.FC<PickATimeSectionProps> = ({
	timeRange,
	onChange,
}) => {
	return (
		<VStack space={5}>
			<Text fontSize="2xl" bold>
				Preferred Time Range
			</Text>
			<HStack justifyContent={"space-between"} space={2}>
				{timeSlots.map((slot) => {
					return (
						<Pressable
							onPress={() => {
								onChange(slot.period);
							}}
							flex={1}
						>
							<Box
								borderWidth={1}
								borderColor="#ccc"
								rounded={10}
								// width={100}
								py={2}
								backgroundColor={
									timeRange === slot.period
										? "#258FBE"
										: "white"
								}
							>
								<Center>
									<Text
										style={{
											color:
												timeRange === slot.period
													? "white"
													: "grey",
										}}
									>
										{_.upperFirst(slot.period)}
									</Text>
									<Text
										style={{
											color:
												timeRange === slot.period
													? "white"
													: "grey",
										}}
									>
										{slot.min}-{slot.max}
									</Text>
								</Center>
							</Box>
						</Pressable>
					);
				})}
			</HStack>
		</VStack>
	);
};

const doctors: { name: string }[] = ["Dentist", "Dermatologist"].map(
	(speciality) => ({ name: speciality })
);

const PreferedDoctorAtom = atom<string>("");

const setPreferedDoctorAtom = atom(
	(get) => {
		return get(PreferedDoctorAtom);
	},
	(get, set, update: string) => {
		set(PreferedDoctorAtom, update);
	}
);

const PreferedDoctor = () => {
	const [preferedDoctor, setPreferedDoctor] = useAtom(setPreferedDoctorAtom);
	return (
		<Select
			variant="rounded"
			selectedValue={preferedDoctor}
			minWidth={200}
			accessibilityLabel="PreferedDoctor"
			placeholder="PreferedDoctor"
			onValueChange={(itemValue) => {
				setPreferedDoctor(itemValue);
			}}
			_selectedItem={{
				bg: "cyan.600",
				endIcon: <CheckIcon size={4} />,
			}}
		>
			{doctors.map((doctor) => (
				<Select.Item label={doctor.name} value={doctor.name} />
			))}
		</Select>
	);
};

type MonthDropDownProps = {
	date: Date;
	onChangeDate: (date: Date) => void;
};

const MonthDropDown: React.FC<MonthDropDownProps> = ({
	date,
	onChangeDate,
}) => {
	return (
		<Menu
			// closeOnSelect={true}
			trigger={(triggerProps) => {
				console.log("here");
				console.log(_.keys(triggerProps));
				console.log(triggerProps.onPress);
				return (
					<Pressable
						accessibilityLabel="More options menu"
						{...triggerProps}
					>
						<HStack>
							{/* <HamburgerIcon /> */}
							<Text>{moment(date).format("MMMM YYYY")}</Text>
							<ChevronDownIcon />
						</HStack>
					</Pressable>
				);
			}}
		>
			{/* <Menu.Item>{moment(new Date()).format("MMMM YYYY")}</Menu.Item> */}
			{listOfNextNMonths(3).map((date, i, arr) => (
				<TouchableOpacity
					style={{
						padding: 10,
						paddingHorizontal: 15,
						borderBottomWidth: i === arr.length - 1 ? 0 : 1,
						borderBottomColor: "#ccc",
					}}
					onPress={() => onChangeDate(date)}
				>
					{/* <Menu.Item key={String(date)}> */}
					<Text>{moment(date).format("MMMM YYYY")}</Text>
					{/* </Menu.Item> */}
				</TouchableOpacity>
			))}
		</Menu>
	);
};

type CalendarDayProps = {
	date: Date;
	onPress: (date: Date) => void;
	status: "active" | "inactive";
};

const CalendarDay: React.FC<CalendarDayProps> = ({ date, onPress, status }) => {
	return (
		<TouchableOpacity onPress={() => onPress(date)}>
			<Box
				borderWidth={1}
				borderColor="#ccc"
				p={status === "active" ? 4 : 3}
				rounded="xl"
				bg={status === "active" ? "#258FBE" : "#fff"}
				alignItems="center"
			>
				<Text
					color={status === "active" ? "#fff" : "#000"}
					fontSize={status === "active" ? "xl" : "md"}
				>
					{moment(date).format("ddd")}
				</Text>
				<Text
					color={status === "active" ? "#fff" : "#000"}
					fontSize={status === "active" ? "lg" : "sm"}
				>
					{moment(date).format("DD/MM")}
				</Text>
			</Box>
		</TouchableOpacity>
	);
};

export default function SetAppointmentTime() {
	const navigation = useNavigation();
	const route = useRoute<any>()
	const { appointment } = route?.params

	const onPressNext = useCallback(() => {
		navigation.navigate(HomeNavKey.PatientComplaint);
	}, []);

	const [facility, date, timeRange] = useSelector(
		({ appointment }: RootState) => [
			appointment.facility,
			appointment.date,
			appointment.timeRange,
		]
	);

	const handleEditAppointment = () => {
		// console.log("Date ", date)
		editedAppointment({
			appointmentId: appointment.id,
			date: date,
			timeRange: timeRange
		})
	}

	const dispatch = useDispatch();

	const { mutate: editedAppointment, isLoading } = useMutation(updateAppointment,
		{
			onMutate: (variables) => { },
			onError: (error, variables, context) => {
				console.log("Something went wrong");
			},
			onSuccess: (data, variables, context) => {
				console.log("Data updated ");
				console.log("Whats the response : ", data);
				ToastAndroid.show(
					"Appointment updated",
					ToastAndroid.SHORT);
				navigation.navigate(HomeNavKey.HomeScreen);
				// Boom baby!
			},
		}
	);


	console.log("Edit appointment page")
	console.log(JSON.stringify(appointment, null, 3))
	return (
		<MainContainer
			title="Day and Time"
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
			<VStack paddingX={3} mt={2} space={10}>


				<VStack bg="white" p={3} shadow={2} space={6} rounded={10} mb={1}>
					<PickADateSection
						date={date}
						onChangeDate={(date) => dispatch(setDate(date))}
					/>

					<PickATimeSection
						timeRange={timeRange}
						onChange={(range) => dispatch(setTimeRange(range))}
					/>
				</VStack>

				<Text fontSize={"md"} color={"#B0B3C7"} textAlign="center">
					*Your requested change will be reviewed by the doctor. If they acceept your request, you will be notified.
				</Text>

				<Button
					mb={3}
					bg={colors.primary}
					onPress={handleEditAppointment}
					rounded={20}
					isLoading={isLoading}
					disabled={isLoading}
				>
					Request Change
				</Button>
			</VStack>
		</MainContainer>
	);
}
