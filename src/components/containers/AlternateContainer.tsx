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

export interface AlternateContainerProps {
	children: JSX.Element[] | JSX.Element;
	title?: string;
	backdropHeight?: number;
	navigation?: any;
	barStyle?: StatusBarStyle;
	bgColor?: string;
	titleColor?: string;
	leftSection?: () => JSX.Element | null;
	rightSection?: () => JSX.Element | null;
	noScroll?: boolean
}

export default function AlternateContainer({
	children,
	title,
	leftSection: LeftSection,
	rightSection: RightSection,
	barStyle,
	bgColor,
	noScroll,
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
			<Box width={"100%"} flex={1} height={"100%"} testID="AlternateContainer">
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
							width="100%"
						>
							<Text
								fontSize="2xl"
								alignContent="center"
								textAlign="center"
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
				{/* Body */}
				{
					noScroll || true ? (
						<View flex={1}>
							{children}
						</View>
					) : (
						<ScrollView flexGrow={1} showsVerticalScrollIndicator={false}>
							{children}
						</ScrollView>
					)
				}
			</Box>
		</_BaseContainer>
	);
}
