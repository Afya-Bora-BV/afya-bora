import React from "react";
import {
	Box,
	StatusBar,
	View,
	Text,
	ScrollView,
	HStack,
	Stack,
} from "native-base";
import _BaseContainer from "./_BaseContainer";
import { StatusBarStyle } from "react-native";

interface AlternateContainerProps {
	children: JSX.Element[] | JSX.Element;
	title?: string;
	backdropHeight?: number;
	headerMode?: "with-back" | "none";
	navigation?: any;
	barStyle?: StatusBarStyle;
	bgColor?: string;
	titleColor?: string;
	leftSection?: () => JSX.Element;
	rightSection?: () => JSX.Element;
}

export default function AlternateContainer({
	children,
	title,
	leftSection: LeftSection,
	rightSection: RightSection,
	barStyle,
	bgColor,
	titleColor: textColor,
	backdropHeight,
}: AlternateContainerProps) {
	return (
		<_BaseContainer>
			<StatusBar barStyle={barStyle} backgroundColor={bgColor} />
			<Stack
				bgColor={bgColor}
				borderBottomRadius={36}
				height={backdropHeight}
				position="absolute"
				top={0}
				left={0}
				right={0}
			></Stack>
			<Box width={"100%"} flex={1}>
				{/* Header */}
				<HStack
					flexDirection="row"
					justifyContent="space-between"
					paddingX={5}
					paddingY={8}
				>
					{/* Left section */}
					{LeftSection !== undefined ? (
						<View>
							<LeftSection />
						</View>
					) : null}
					{/* Title section */}
					{title !== undefined ? (
						<Box
							flexDirection="row"
							alignItems="center"
							justifyContent="center"
						>
							<Text
								fontSize="2xl"
								alignContent="center"
								fontWeight="500"
								color={textColor}
							>
								{title}
							</Text>
						</Box>
					) : null}
					{/* right section */}
					{RightSection !== undefined ? (
						<View>
							<RightSection />
						</View>
					) : null}
				</HStack>
				{/* Body */}
				<ScrollView flexGrow={1} showsVerticalScrollIndicator={false}>
					{children}
				</ScrollView>
			</Box>
		</_BaseContainer>
	);
}
