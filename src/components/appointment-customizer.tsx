import React from "react";
import { atom, useAtom } from "jotai";
import { TouchableOpacity } from "react-native";
import { CheckIcon, HStack, Select, Spacer, Stack, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "./button";
import { colors } from "../constants/colors";
import { RootState } from "../store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
	setAppointmentType,
	setLocation,
	setSpeciality,
} from "../store/slices/appointment";
import { Text } from "./text";
import { ConsultantionType } from "../internals/data";
import { languageAtom } from "../store/atoms";
import MemoizedSelect from "./MemoizedSelect";
import { specialities } from "../data/specialities";
// these attoms to be moved since the state might be needed somewhere



const appointmentTypeAtom = atom<"offline" | "online" | "">("");
const locationAtom = atom<string>("");
const specialityAtom = atom<string>("");

export const completeScheduleAtom = atom(
	(get) => {
		// you can do more logic to check
		return {
			type: get(appointmentTypeAtom),
			location: get(locationAtom),
			speciality: get(specialityAtom),
		};
	},
	(get, set) => { }
);
type AppointmentType = {
	title: string;
	value: ConsultantionType;
	onPress: (val: ConsultantionType) => void;
	isActive: boolean;
	text: string;
};

const AppointmentTypeButton: React.FC<AppointmentType> = ({
	title,
	value,
	onPress,
	isActive,
	text,
}) => {
	return (
		<TouchableOpacity
			onPress={() => {
				onPress(value);
			}}
			style={{
				backgroundColor: isActive ? colors.primary : "white",
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 10,
				borderColor: isActive ? colors.primary : "grey",
				borderWidth: 1,
				paddingVertical: 16,
			}}
		>
			<Text
				style={{
					color: isActive ? "white" : "grey",
				}}
				tx={text}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const AppointmentCustomizer: React.FC = () => {
	const [type, location, speciality] = useSelector(
		({ appointment }: RootState) => [
			appointment.type,
			appointment.location,
			appointment.speciality
		],
		shallowEqual
	);
	const [language] = useAtom(languageAtom);
	const languagePlaceholder = language === "en" ? "Location" : "Mahali";
	const dispatch = useDispatch();

	// console.log("AppointmentCustomizer");

	return (
		<Stack space={7}>
			<Stack space={2}>
				<Text tx="home.chooseTypeOfAppointment">
					Choose Type of Appointment
				</Text>
				<HStack space={2}>
					<AppointmentTypeButton
						title={"At Facility"}
						text="common.atFacility"
						value={"offline"}
						isActive={type === "offline"}
						onPress={(v) => dispatch(setAppointmentType(v))}
					/>
					<AppointmentTypeButton
						title={"Online (Virtual)"}
						value={"online"}
						text="common.online"
						isActive={type === "online"}
						onPress={(v) => dispatch(setAppointmentType(v))}
					/>
				</HStack>
			</Stack>


			<Stack space={2}>
				<View>
					{/* <Text
						fontSize={"xl"}
						fontWeight="medium"
						tx="aboutVisit.doctorSpecialization"
					>
						Doctor Specialization
					</Text> */}

					<Text tx="aboutVisit.doctorSpecializationDescription">
						Please select a specialist.
					</Text>
				</View>

				{/* </SimpleGrid> */}
				<Select 
					selectedValue={speciality} 
					minWidth="200" 
					accessibilityLabel="Choose Specialty" 
					placeholder="Choose Specialty" 
					_selectedItem={{
					// bg: "teal.600",
					backgroundColor: colors.primary,
					endIcon: <CheckIcon size="5" color={"#FFFFFF"} />,
					color: "red.400",
					_text: { color: "#FFFFFF" }
				}} mt={1} onValueChange={itemValue => {
					dispatch(
						setSpeciality(itemValue)
					);
				}}
				>
					{specialities.map(speciality => (
						<Select.Item key={speciality.value} label={speciality.label} value={speciality.value} />
					))}
				</Select>
			</Stack>
		</Stack>
	);
};

export default AppointmentCustomizer;
