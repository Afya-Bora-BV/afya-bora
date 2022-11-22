import React from "react";
import { atom, useAtom } from "jotai";
import { TouchableOpacity } from "react-native";
import { CheckIcon, HStack, Select, Spacer, Stack } from "native-base";
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
// these attoms to be moved since the state might be needed somewhere

const specialities: { name: string }[] = [
	"Specialities",
	"Dentist",
	"Dermatologist",
	"General",
	"Other",
].map((speciality) => ({ name: speciality }));

const regions: { name: string }[] = [
	"Residency Location",
	"Arusha",
	"Dar es Salaam",
	"Dodoma",
	"Geita",
	"Iringa",
	"Kagera",
	"Katavi",
	"Kigoma",
	"Kilimanjaro",
	"Lindi",
	"Manyara",
	"Mara",
	"Mbeya",
	"Morogoro",
	"Mtwara",
	"Mwanza",
	"Njombe",
	"Pemba North",
	"Pemba South",
	"Pwani",
	"Rukwa",
	"Ruvuma",
	"Shinyanga",
	"Simiyu",
	"Singida",
	"Tabora",
	"Tanga",
	"Zanzibar North",
	"Zanzibar South and Central",
	"Zanzibar West",
].map((region) => ({ name: region }));

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
	(get, set) => {}
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
	const [type, location] = useSelector(
		({ appointment }: RootState) => [
			appointment.type,
			appointment.location,
		],
		shallowEqual
	);
	const [language] = useAtom(languageAtom);
	const languagePlaceholder = language === "en" ? "Location" : "Mahali";
	const dispatch = useDispatch();

	console.log("AppointmentCustomizer");

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

			{/*<Stack space={2}>*/}
			{/*	<MemoizedSelect placeholder={languagePlaceholder} selectedValue={location} accessibilityLabel />*/}
			{/*</Stack>*/}

			<Stack space={2}>
				<Text tx="home.chooseLocation">Choose Location</Text>
				<MemoizedSelect

					// variant="rounded"
					rounded={4}
					selectedValue={location}
					minWidth={200}
					accessibilityLabel="Location"
					renderToHardwareTextureAndroid={true}
					placeholder={languagePlaceholder}
					options={regions.map((region) => ({
						label: region.name,
						value: region.name.toLowerCase(),
						key: region.name,
					}))}
					onValueChange={(itemValue) => {
						dispatch(setLocation(itemValue));
					}}
					_selectedItem={{
						bg: colors.primary,
						// justifyItems: "space-between",
						style: { alignContent: "space-between" },
						_text:{color:"#FFFFFF"},
						startIcon: <CheckIcon size={4} />,
					}}
					
				/>
			</Stack>
		</Stack>
	);
};

export default AppointmentCustomizer;
