import React, { useMemo, useRef, useState } from "react";
import {
	View,
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
import { ConsultantListItem } from "../../components/consultant-list-item";
import { StackNavigationProp } from "@react-navigation/stack";
import { getDaysInMonth, isSameDay } from "date-fns";
import { FlatList, TouchableOpacity } from "react-native";
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
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setDate, setTimeRange } from "../../store/slices/appointment";
import { TimeRange } from "../../types";
import { Text } from "../../components/text";
import { languageAtom } from "../../store/atoms";
import { IScrollViewProps } from "native-base/lib/typescript/components/basic/ScrollView/types";


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

export const isDayPast = (date: Date) => (day: Date | string) => {
	return moment(day).isBefore(date, "days");
};

const PickADateSection: React.FC<PickADateSectionProps> = React.memo(
	({ date, onChangeDate }) => {
		// const [chosenDate, onSelectDate] = useAtom(setAppointmentDateAtom);
		const daysListRef = useRef<any>(null);

		const days = useMemo(() => {
			const inFuture = (day: Date | string) =>
				!isDayPast(new Date())(day);
			return _.times(getDaysInMonth(date), (n) => {
				const d = new Date(date);
				d.setDate(n + 1);
				return d;
			}).filter(inFuture);
		}, [date]);

		const renderDay = ({ item }: { item: Date }) => (
			<CalendarDay
				onPress={() => onChangeDate(item)}
				status={isSameDay(item, date) ? "active" : "inactive"}
				date={item}
			/>
		);

		console.log("Render PickADateSection");

		return (
			<View>
				<HStack justifyContent="space-between" mb={3}>
					<Text fontSize="2xl" tx="appointmentTime.preferredDate">
						Preferred Date
					</Text>
				</HStack>

				<HStack justifyContent="flex-end" mb={3}>
					<MonthDropDown
						onChangeDate={(date) => onChangeDate(date)}
						date={date}
					/>
				</HStack>
				<FlatList
					horizontal={true}
					data={days}
					renderItem={renderDay}
					keyExtractor={(item) => item.toString()}
				/>
				{/*<ScrollView*/}
				{/*	snapToInterval={2}*/}
				{/*	horizontal*/}
				{/*	paddingBottom={3}*/}
				{/*	ref={daysListRef}*/}
				{/*	// onLayout={() =>*/}
				{/*	// 	daysListRef.current?.scrollTo({*/}
				{/*	// 		x: 50 * date.getDate(),*/}
				{/*	// 		y: 0,*/}
				{/*	// 	})*/}
				{/*	// }*/}
				{/*>*/}
				{/*	<HStack alignItems="center" space={1}>*/}
				{/*		/!* TODO: REFACTOR FOR PERFORMANCE *!/*/}
				{/*		{days.map((d, n) => {*/}
				{/*			return (*/}
				{/*				<CalendarDay*/}
				{/*					onPress={() => onChangeDate(d)}*/}
				{/*					key={n}*/}
				{/*					status={*/}
				{/*						isSameDay(d, date)*/}
				{/*							? "active"*/}
				{/*							: "inactive"*/}
				{/*					}*/}
				{/*					date={d}*/}
				{/*				/>*/}
				{/*			);*/}
				{/*		})}*/}
				{/*	</HStack>*/}
				{/*</ScrollView>*/}
			</View>
		);
	},
	(prev, next) => {
		return prev.date === next.date;
	}
);

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

const timeSlotsSwahili: Array<TimeSlot> = [
	{
		period: "asubuhi",
		max: "12",
		min: "9",
	},
	{
		period: "mchana",
		min: "12",
		max: "16",
	},

	{
		period: "jioni",
		min: "16",
		max: "20",
	},
];

type PickATimeSectionProps = {
	timeRange: TimeRange;
	onChange: (t: TimeRange) => void;
};

const PickATimeSection: React.FC<PickATimeSectionProps> = React.memo(
	({ timeRange, onChange }) => {
		const [language, setLanguage] = useAtom(languageAtom);

		const slots = language === "en" ? timeSlots : timeSlotsSwahili;
		return (
			<VStack space={5}>
				<Text fontSize="2xl" tx="appointmentTime.preferredTimeRange">
					Preferred Time Range
				</Text>
				<HStack justifyContent={"space-between"} space={2}>
					{slots.map((slot) => {
						return (
							<Pressable
								onPress={() => {
									onChange(slot.period);
								}}
								flex={1}
								key={slot.period}
							>
								<Box
									borderWidth={1}
									borderColor="#ccc"
									rounded={10}
									// width={100}
									py={2}
									backgroundColor={
										timeRange === slot.period
											? colors.primary
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
	},
	(prev, next) => prev.timeRange === next.timeRange
);

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
				<Select.Item
					key={doctor.name}
					label={doctor.name}
					value={doctor.name}
				/>
			))}
		</Select>
	);
};

type MonthDropDownProps = {
	date: Date;
	onChangeDate: (date: Date) => void;
};

const MonthDropDown: React.FC<MonthDropDownProps> = React.memo(
	({ date, onChangeDate }) => {
		return (
			<Menu
				closeOnSelect={true}
				trigger={(triggerProps) => {
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
				{listOfNextNMonths(12).map((date, i, arr) => {
					return (
						<TouchableOpacity
							style={{
								padding: 10,
								paddingHorizontal: 15,
								borderBottomWidth: i === arr.length - 1 ? 0 : 1,
								borderBottomColor: "#ccc",
							}}
							key={date.toString()}
							onPress={() => onChangeDate(date)}
						>
							{/* <Menu.Item key={String(date)}> */}
							<Text>{moment(date).format("MMMM YYYY")}</Text>
							{/* </Menu.Item> */}
						</TouchableOpacity>
					);
				})}
			</Menu>
		);
	},
	(prev, next) => prev.date === next.date
);

type CalendarDayProps = {
	date: Date;
	onPress: (date: Date) => void;
	status: "active" | "inactive";
};

const CalendarDay: React.FC<CalendarDayProps> = React.memo(
	({ date, onPress, status }) => {
		return (
			<TouchableOpacity onPress={() => onPress(date)}>
				<Box
					borderWidth={1}
					borderColor="#ccc"
					p={status === "active" ? 4 : 3}
					rounded="xl"
					bg={status === "active" ? colors.primary : "#fff"}
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
	},
	(prev, next) => prev.status === next.status
);

export default function SetAppointmentTime() {
	const navigation = useNavigation();

	const onPressNext = useCallback(() => {
		navigation.navigate(HomeNavKey.ConfirmAppointment);
	}, []);

	const [facility, date, timeRange] = useSelector(
		({ appointment }: RootState) => [
			appointment.facility,
			appointment.date,
			appointment.timeRange,
		],
		shallowEqual
	);

	const selectDate = useCallback(
		(date) => dispatch(setDate(date.getTime())),
		[]
	);

	const selectedDate = useMemo(() => new Date(date), [date]);

	console.log("render", selectedDate);

	const dispatch = useDispatch();

	return (
		<MainContainer
			title="appointmentTime.dayAndTime"
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
			<VStack paddingX={3} mt={4} space={4}>
				{/* Consultant Preview */}
				<Box>
					{facility && (
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {}}
						>
							<FacilityListItem facility={facility} />
						</TouchableOpacity>
					)}
				</Box>

				{/* Picking appointment times */}
				<VStack
					bg="white"
					p={3}
					shadow={2}
					space={6}
					rounded={10}
					mb={1}
				>
					<PickADateSection
						date={selectedDate}
						onChangeDate={selectDate}
					/>

					<PickATimeSection
						timeRange={timeRange}
						onChange={(range) => dispatch(setTimeRange(range))}
					/>
				</VStack>

				<Text
					tx="common.requestChangeMessage"
					fontSize={"md"}
					color={"#B0B3C7"}
					textAlign="center"
				>
					*Your exact appointment day, time, and doctor will be
					confirmed by the facility administrator.
				</Text>

				<Button
					mb={3}
					bg={colors.primary}
					onPress={onPressNext}
					rounded={4}
				>
					<Text color="white" tx="common.next">
						Preferred Time Range
					</Text>
				</Button>
			</VStack>
		</MainContainer>
	);
}
