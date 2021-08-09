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
} from "native-base";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ConsultantListItem } from "../../../components/consultant-list-item";
import { StackNavigationProp } from "@react-navigation/stack";
import { getDaysInMonth, isSameDay } from "date-fns";
import { TouchableOpacity } from "react-native";
import _, { add } from "lodash";
import { colors } from "../../../constants/colors";
import moment from "moment";
import { NavKey } from "./BookAppointment/_navigator";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";
import { useCallback } from "react";
import { atom } from "jotai";
import { StringLocale } from "yup/lib/locale";

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

type SetAppointmentTimeScreenRouteProp = RouteProp<
	BookAppointmentStackParamList,
	"SetAppointmentTime"
>;
type SetAppointmentTimeNavigationProp = StackNavigationProp<
	BookAppointmentStackParamList,
	"SetAppointmentTime"
>;

type SetAppointmentTimeProps = {
	route: SetAppointmentTimeScreenRouteProp;
	navigation: SetAppointmentTimeNavigationProp;
};

function PickADateSection({ chosenDate, onSelectDate }: any) {
	const daysListRef = useRef(null);

	return (
		<View>
			<HStack justifyContent="space-between" mb={3}>
				<Text fontSize="2xl" bold>
					Preffered Date
				</Text>

				<MonthDropDown
					onChangeDate={(date) => onSelectDate(date)}
					date={chosenDate}
				/>
			</HStack>
			<ScrollView
				snapToInterval={2}
				horizontal
				paddingBottom={3}
				ref={daysListRef}
				onLayout={() =>
					daysListRef.current?.scrollTo({
						x: 50 * chosenDate.getDate(),
						y: 0,
					})
				}
			>
				<HStack alignItems="center" space={1}>
					{_.times(getDaysInMonth(chosenDate), (n) => {
						const date = new Date(chosenDate);
						date.setDate(n + 1);
						return (
							<CalendarDay
								onPress={() => onSelectDate(date)}
								key={n}
								status={
									isSameDay(date, chosenDate)
										? "active"
										: "inactive"
								}
								date={date}
							/>
						);
					})}
				</HStack>
			</ScrollView>
		</View>
	);
}


type TimeSlots = {
	period: string;
	min: string;
	max: String;
};

const specialities: TimeSlots[] = [
	{
		period: "Morning",
		min: "9",
		max: "12",
	},
].map((speciality) => ({ ...speciality }));

function PickATimeSection() {
	const appointmentTime = atom<string>("");

	const setAppointmentTime = atom(
		(get) => {
			return get(appointmentTime);
		},
		(get, set, update: "offline" | "online") => {
			// you can do more logic here for the state
			set(appointmentTime, update);
		}
	);
	return (
		<Box>
			<Text fontSize="2xl" bold>
				Preferred Time Range
			</Text>
			{specialities.map((times) => {
				return (
					<Pressable>
						<Box borderWidth={1} borderColor="#ccc" rounded={10}>
							<Center>
								<Text>{times.period}</Text>
								<Text>
									{times.min}-{times.max}
								</Text>
							</Center>
						</Box>
					</Pressable>
				);
			})}
		</Box>
	);
}

export default function SetAppointmentTime({ route }: SetAppointmentTimeProps) {
	const navigation = useNavigation();

	const [chosenDate, selectDate] = useState<Date>(new Date());
	const [chosenTimeSlot, setTimeSlot] = useState("");

	const { consultant } = route.params;

	const onPressNext = useCallback(() => {
		const time = chosenTimeSlot[0]?.split(" ")[0] || "00:00";
		const dateTime = `${moment(new Date(chosenDate)).format(
			"YYYY-MM-DD"
		)}T${time}:00`;
		const date = new Date(dateTime);
		navigation.navigate(NavKey.PatientComplaintScreen, {
			consultant,
			appointment: date.toUTCString(),
			appointmentType: "offline",
		});
	}, [chosenDate, chosenTimeSlot, navigation]);

	console.log("Hello COnsultant ");
	console.log(JSON.stringify(consultant, null, 3));

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
			<VStack paddingX={10} space={10}>
				{/* Consultant Preview */}
				<Box>
					<ConsultantListItem
						onPress={console.log}
						consultant={consultant}
					/>
				</Box>

				{/* Picking appointment times */}
				<VStack bg="white" p={2} shadow={2} rounded={10} mb={1}>
					<PickADateSection
						chosenDate={chosenDate}
						onSelectDate={selectDate}
					/>
					<PickATimeSection />
				</VStack>

				<Button bg={colors.primary} onPress={onPressNext} rounded={20}>
					Next
				</Button>
			</VStack>
		</MainContainer>
	);
}

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
