import { useNavigation } from "@react-navigation/core";
import {
	ArrowBackIcon,
	HStack,
	Text,
	View,
	ScrollView,
	VStack,
	Box,
	Menu,
	ChevronDownIcon,
	Switch,
	Button,
	Input,
} from "native-base";
import React, { useRef, useState } from "react";
import { Dimensions, Pressable, TouchableOpacity } from "react-native";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";
import { getDaysInMonth, isSameDay, setDate } from "date-fns";
import _ from "lodash";
import { toggleStringFromList } from "../../../utils";
import moment from "moment";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../constants/colors";
import { Agenda, Calendar, CalendarList } from "react-native-calendars";

export default function UpdateCalendar() {
	const navigation = useNavigation();

	const [lowLevel, setLowLevel] = useState(false);
	const [AllYear, setAllYear] = useState(false);
	return (
		<MainContainer
			title="Update Calendar"
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
			<ScrollView paddingX={2}>
				<View padding={5}>
					<HStack justifyContent="space-between">
						<Text>All Year</Text>
						<Switch
							colorScheme="primary"
							isChecked={AllYear}
							onToggle={() => {
								AllYear === false
									? setAllYear(true)
									: setAllYear(false);
							}}
						/>
					</HStack>

					<CalendarShow />

					<Spacer size={10} />

					<HStack justifyContent="space-between">
						<Text>Low Level Availability</Text>

						<Switch
							colorScheme="primary"
							isChecked={lowLevel}
							onToggle={() => {
								lowLevel === false
									? setLowLevel(true)
									: setLowLevel(false);
							}}
						/>
					</HStack>
					{lowLevel === true && <LowLevelAvailability />}
				</View>
				<Button bg={colors.primary} onPress={() => {}} rounded={20}>
					Update Calendar Configurations
				</Button>
			</ScrollView>
		</MainContainer>
	);
}

function HighLevelAvailability() {
	const [showFrom, setShowFrom] = useState(false);
	const showTimePickerFrom = () => {
		setShowFrom(true);
	};

	const [showTo, setShowTo] = useState(false);
	const showTimePickerTo = () => {
		setShowTo(true);
	};

	const [from, setFrom] = useState("");

	return (
		<View>
			<View>
				<View>
					<Text>Hours Available</Text>
				</View>
				<CalendarShow />
			</View>

			<Spacer size={10} />
		</View>
	);
}

function LowLevelAvailability() {
	const [chosenDate, selectDate] = useState<Date>(new Date());
	const [chosenTimeSlot, setTimeSlot] = useState("");

	return (
		<VStack bg="white" p={2} shadow={2} rounded={10} mb={1}>
			<PickADateSection
				chosenDate={chosenDate}
				onSelectDate={selectDate}
			/>
			<PickATimeSection
				chosenTimeSlot={chosenTimeSlot}
				onSelectTimeSlot={setTimeSlot}
			/>
		</VStack>
	);
}

function PickADateSection({ chosenDate, onSelectDate }: any) {
	const daysListRef = useRef(null);

	return (
		<View>
			<HStack justifyContent="space-between" mb={3}>
				<Text fontSize="2xl" bold>
					Pick a Date
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

function PickATimeSection({ chosenTimeSlot, onSelectTimeSlot }) {
	const selectTime = (timeBlock: string) => {
		const list = toggleStringFromList(timeBlock, chosenTimeSlot);
		onSelectTimeSlot(list);
	};

	return (
		<View>
			<HStack justifyContent="space-between">
				<Text fontSize="2xl" bold>
					Pick a Time
				</Text>
			</HStack>

			<VStack space="sm" mt={4}>
				{_.times(14, (n) => {
					const t = n + 6;
					const time1 = `${_.padStart(t + "", 2, "0") + ":00"} ${
						t > 11 ? "PM" : "AM"
					}`;
					const time2 = `${_.padStart(t + "", 2, "0") + ":30"} ${
						t > 11 ? "PM" : "AM"
					}`;
					return (
						<HStack flexWrap="wrap" space="md">
							<TouchableOpacity
								onPress={() => selectTime(time1)}
								style={{ flex: 1 }}
							>
								<Box
									borderWidth={1}
									borderColor="#ccc"
									rounded={10}
									alignItems="center"
									bg={
										chosenTimeSlot.includes(time1)
											? "#258FBE"
											: "white"
									}
									p={2}
								>
									<Text
										color={
											!chosenTimeSlot.includes(time1)
												? "black"
												: "white"
										}
									>
										{time1}
									</Text>
								</Box>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => selectTime(time2)}
								style={{ flex: 1 }}
							>
								<Box
									borderWidth={1}
									borderColor="#ccc"
									rounded={10}
									alignItems="center"
									bg={
										chosenTimeSlot.includes(time2)
											? "#258FBE"
											: "white"
									}
									p={2}
								>
									<Text
										color={
											!chosenTimeSlot.includes(time2)
												? "black"
												: "white"
										}
									>
										{time2}
									</Text>
								</Box>
							</TouchableOpacity>
						</HStack>
					);
				})}
			</VStack>
		</View>
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

function CalendarShow() {
	const [startDay, setStartDay] = useState("");
	const [endDay, setEndDay] = useState("");

	return (
		<View justifyContent={"center"} backgroundColor={"red"}>
			<Calendar
				enableSwipeMonths={true}
				onDayPress={(day) => {
					setEndDay(day.dateString.toString());
				}}
				onDayLongPress={(day) => {
					setStartDay(day.dateString.toString());
				}}
				markingType={"period"}
				markedDates={{
					startDay: { startingDay: true, color: "green" },
					endDay: { endingDay: true, color: "green" },
				}}
				dayComponent={({ date, state }) => {
					return (
						<View>
							<Text
								style={{
									textAlign: "center",
									color:
										state === "disabled" ? "gray" : "green",
								}}
							>
								{date.day}
							</Text>
						</View>
					);
				}}
			/>
		</View>
	);
}
