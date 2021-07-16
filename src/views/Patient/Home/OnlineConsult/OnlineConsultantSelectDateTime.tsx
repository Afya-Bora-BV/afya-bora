import React, { useState, useRef, useCallback } from "react";
import {
	Box,
	VStack,
	Text,
	Heading,
	StatusBar,
	ScrollView,
	HStack,
	Button,
	View,
	Menu,
	Pressable,
	ChevronDownIcon,
	ArrowBackIcon,
} from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { colors } from "../../../../constants/colors";
import { HeaderwithBack, IconContainer } from "../../../../components/header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import _ from "lodash";
import moment from "moment";
import { getDaysInMonth, isSameDay } from "date-fns";
import { toggleStringFromList } from "../../../../utils";

import { OnlineNavKey } from "./_navigator";
import { HomeNavKey as MainNavKey } from "../_navigator";
import MainContainer from "../../../../components/containers/MainContainer";

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

function PickATimeSection({ chosenTimeSlots, onSelectTimeSlot }) {
	const selectTime = (timeBlock: string) => {
		const list = toggleStringFromList(timeBlock, chosenTimeSlots);
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
										chosenTimeSlots.includes(time1)
											? "#258FBE"
											: "white"
									}
									p={2}
								>
									<Text
										color={
											!chosenTimeSlots.includes(time1)
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
										chosenTimeSlots.includes(time2)
											? "#258FBE"
											: "white"
									}
									p={2}
								>
									<Text
										color={
											!chosenTimeSlots.includes(time2)
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

export default function OnlineConsultantSelectDateTime() {
	// const { goBack, navigate } = useNavigation();
	const navigation = useNavigation();

	// const daysListRef = useRef(null);

	const [chosenDate, selectDate] = useState<Date>(new Date());
	const [chosenTimeSlots, setTimeSlots] = useState<string[]>([]);

	// React.useEffect(() => {
	// 	console.log("Mounted");
	// }, []);

	const goNext = useCallback(() => {
		navigation.navigate(OnlineNavKey.ChooseConsultantScreen, {
			appointment: {
				date: chosenDate,
				timeSlots: chosenTimeSlots,
			},
		});
	}, [chosenDate, chosenTimeSlots, navigation]);

	const goHome = () => {
		navigation.navigate(MainNavKey.HomeScreen);
	};

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
				{/* Picking appointment times */}
				<VStack bg="white" p={2} shadow={2} rounded={10} mb={1}>
					<PickADateSection
						chosenDate={chosenDate}
						onSelectDate={selectDate}
					/>
					<PickATimeSection
						chosenTimeSlots={chosenTimeSlots}
						onSelectTimeSlot={setTimeSlots}
					/>
				</VStack>

				<Button bg={colors.primary} onPress={goNext} rounded={20}>
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