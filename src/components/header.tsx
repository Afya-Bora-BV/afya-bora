import {
	Center,
	Heading,
	HStack,
	Pressable,
	Stack,
	Text,
	VStack,
} from "native-base";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from "../constants/colors";
import BackIcon from "../assets/icons/BackIcon";
import AddPersonIcon from "../assets/icons/AddPersonIcon";

// Custom BackIcon
// type BackIconProps = SvgProps & {};
// const BackIcon = (props: BackIconProps) => {
// 	return (
// 		<Svg width={40} height={40} viewBox="0 0 20 20" fill="none" {...props}>
// 			<Path
// 				fillRule="evenodd"
// 				clipRule="evenodd"
// 				d="M6 10.488l5.14 5.863c.225.257.75.48 1.128.15.378-.33.226-.824 0-1.08l-4.73-5.399 4.73-5.399c.226-.256.382-.777 0-1.128-.38-.35-.903-.06-1.129.198L6 9.556a.733.733 0 00.001.932z"
// 				fill={colors.primary}
// 			/>
// 		</Svg>
// 	);
// };

// Custom BackIcon
type SearchIconProps = SvgProps & {};
const SearchIcon = (props: SearchIconProps) => {
	return (
		<Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.17 11.709l4.898 4.994a.976.976 0 01-.01 1.349.93.93 0 01-1.323.011l-4.86-4.955.017-.02a6.204 6.204 0 01-8.56-.658c-2.241-2.48-2.217-6.305.054-8.755a6.203 6.203 0 018.569-.547C14.508 5.27 15 9.063 13.08 11.808l.09-.1zM3.254 8.085c0 2.656 2.111 4.81 4.716 4.81 2.603-.003 4.713-2.155 4.716-4.81 0-2.656-2.111-4.81-4.716-4.81S3.253 5.43 3.253 8.086z"
				fill={colors.primary}
			/>
		</Svg>
	);
};

type IconContainer = {};
export const IconContainer: React.FC<IconContainer> = ({ children }) => {
	return (
		<Center
			bg="#E7E5FF"
			borderRadius={4}
			_text={{
				color: "white",
				fontWeight: "bold",
			}}
			height={10}
			width={{
				base: 10,
				lg: 10,
			}}
		>
			{children}
		</Center>
	);
};

type headerProps = {
	text: string;
	onBackPress: any;
	color?: string;
};

export const Header: React.FC<headerProps> = ({ text }) => {
	return (
		<Stack space={6}>
			<HStack justifyContent="space-between" alignItems="center">
				<Text color="white" fontSize="2xl">
					{text}
				</Text>
			</HStack>
		</Stack>
	);
};

// TODO: Support accepting a custom right side icon
const HeaderwithBack: React.FC<headerProps> = ({
	text,
	onBackPress,
	color = "black",
}) => {
	return (
		<HStack justifyContent="space-evenly">
			<Stack
				style={{
					flex: 0.5,
					alignSelf: "flex-start",
				}}
			>
				<Pressable onPress={onBackPress}>
					<IconContainer>
						<MaterialIcons
							name="chevron-left"
							size={25}
							color={colors.primary}
						/>
					</IconContainer>
				</Pressable>
			</Stack>
			<Stack
				style={{
					flex: 3,
					justifyContent: "center",
					alignItems: "center",
					paddingRight: 30,
				}}
			>
				<Text color={color} fontSize="2xl">
					{text}
				</Text>
			</Stack>

			<Stack
				style={{
					flex: 0.5,
					alignSelf: "flex-end",
				}}
			></Stack>
		</HStack>
	);
};

const HeaderWithSearch = () => {
	return (
		<Stack space={6}>
			<HStack justifyContent="space-between" alignItems="center">
				<IconContainer>
					<MaterialIcons
						name="chevron-left"
						size={25}
						color={colors.primary}
					/>
				</IconContainer>
				<Text fontSize="lg">Doctot List</Text>
				<IconContainer>
					<AntDesign
						name="search1"
						size={24}
						color={colors.primary}
					/>
				</IconContainer>
			</HStack>

			<HStack justifyContent="space-between" alignItems="center">
				<MaterialIcons
					name="chevron-left"
					size={25}
					color={colors.primary}
				/>
				<AntDesign name="search1" size={24} color={colors.primary} />
			</HStack>
			{/* <Header head="Login" /> */}
		</Stack>
	);
};

type headerIconsProps = {
	text: string;
	rText: string;
	iconPress: () => {};
	rPress: () => {};
};

const HeaderWithRText: React.FC<headerIconsProps> = ({
	text,
	rText,
	iconPress,
	rPress,
}) => {
	return (
		<Stack>
			<HStack justifyContent="space-between" alignItems="center">
				<Pressable onPress={iconPress}>
					<IconContainer>
						<BackIcon size={22} color="#7065E4" />
					</IconContainer>
				</Pressable>

				<Heading fontSize="lg">{text}</Heading>
				<HStack>
					<Pressable onPress={rPress}>
						<Text fontSize="sm">{rText}</Text>
					</Pressable>
				</HStack>
			</HStack>
		</Stack>
	);
};

type headerIcons2Props = {
	text: string;
	rText: string;
	iconPress: () => {};
	rPress: () => {};
};

const HeaderWith2Icons: React.FC<headerIcons2Props> = ({
	text,
	iconPress,
	rPress,
}) => {
	return (
		<Stack>
			<HStack justifyContent="space-between" alignItems="center">
				<Pressable onPress={iconPress}>
					<IconContainer>
						<BackIcon size={22} color="#7065E4" />
					</IconContainer>
				</Pressable>

				<Heading fontSize="lg" color="white">
					{text}
				</Heading>
				<HStack>
					<Pressable onPress={rPress}>
						<IconContainer>
							<AddPersonIcon size={31} color="white" />
						</IconContainer>
					</Pressable>
				</HStack>
			</HStack>
		</Stack>
	);
};

export { HeaderWithSearch, HeaderwithBack, HeaderWith2Icons, HeaderWithRText };
