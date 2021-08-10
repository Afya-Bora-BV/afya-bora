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
import { RouteProp, useNavigation } from "@react-navigation/native";
import { getDaysInMonth, isSameDay } from "date-fns";
import { TouchableOpacity } from "react-native";
import _, { add } from "lodash";
import { colors } from "../../../constants/colors";
import moment from "moment";
import { NavKey } from "./BookAppointment/_navigator";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";
import { useCallback } from "react";

import { useAtom, atom } from 'jotai'
import { setSelectedFacilityAtom } from "./FacilityList";
import { FacilityListItem } from "../../../components/facilities-list-item";

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

const dateAtom = atom<Date>(new Date())

const setSelectedDateAtom = atom((get) => {
	return get(dateAtom)
}, (get, set, update: Date) => {
	// console.log("UPdate nay : ",update)
	set(dateAtom, update)
})

const SelectMonth: React.FC = ({
}) => {
	const [date, setDate] = useAtom(setSelectedDateAtom)

	console.log("Date : ", date)
	return (
		<Menu
			closeOnSelect={true}
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
					onPress={() => setDate(date)}
				>
					{/* <Menu.Item key={String(date)}> */}
					<Text>{moment(date).format("MMMM YYYY")}</Text>
					{/* </Menu.Item> */}
				</TouchableOpacity>
			))}
		</Menu>
	);
};


function PickADateSection({ chosenDate, onSelectDate }: any) {
	const daysListRef = useRef(null);

	return (
		<View>
			<HStack justifyContent="space-between" mb={3}>
				<Text fontSize="2xl" bold>
					Preffered Date
				</Text>

				<SelectMonth />
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

function PickATimeSection() {

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

const FacilityInfo = () => {
	const [facility] = useAtom(setSelectedFacilityAtom)
	if (!facility) return null
	return (
		<FacilityListItem
			facility={facility}
			onPress={() => {
				console.log("Facility : ", facility)
			}}
		/>
	)
}

const doctors: { name: string }[] = ["Dentist", "Dermatologist"].map(
	(speciality) => ({ name: speciality })
);

const setPreferedDoctorAtom = atom<string>("");

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

	const [chosenDate, selectDate] = useState<Date>(new Date());
	const [chosenTimeSlot, setTimeSlot] = useState("");


	const onPressNext = useCallback(() => {
		const time = chosenTimeSlot[0]?.split(" ")[0] || "00:00";
		const dateTime = `${moment(new Date(chosenDate)).format(
			"YYYY-MM-DD"
		)}T${time}:00`;
		const date = new Date(dateTime);
		navigation.navigate(NavKey.PatientComplaintScreen, {
			appointment: date.toUTCString(),
			appointmentType: "offline",
		});
	}, [chosenDate, chosenTimeSlot, navigation]);


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
				<Box>
					<FacilityInfo />
				</Box>
				<VStack bg="white" p={2} shadow={2} rounded={10} mb={1}>
					<PickADateSection
						chosenDate={chosenDate}
						onSelectDate={selectDate}
					/>
					<PickATimeSection />
				</VStack>

				<VStack
					bg="white"
					p={4}
					shadow={2}
					rounded={10}
					mb={1}
					space={4}
				>
					<Text fontSize="2xl" bold>
						Preferred Doctor
					</Text>
					<PreferedDoctor />
				</VStack>
				<Text fontSize={"md"} color={"#B0B3C7"}>
					*Your exact appointment day, time, and doctor will be
					confirmed by the facility administrator.
				</Text>
				<Button bg={colors.primary} onPress={onPressNext} rounded={20}>
					Next
				</Button>
			</VStack>
		</MainContainer>
	);
}


