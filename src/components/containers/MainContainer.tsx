import React from "react";
import { Box, StatusBar, View, ScrollView, HStack } from "native-base";
import _BaseContainer from "./_BaseContainer";
import { Text } from "../text";

interface ContainerHeaderProps {
	title?: string;
	headerMode?: "float" | "default";
	leftSection?: () => JSX.Element;
	rightSection?: () => JSX.Element;
}

interface MainContainerProps extends ContainerHeaderProps {
	children: JSX.Element[] | JSX.Element;
	noScroll?: boolean;
}

export function ContainerHeader({
	title,
	headerMode,
	leftSection: LeftSection,
	rightSection: RightSection,
}: ContainerHeaderProps) {
	const _headerMode = headerMode || "default";
	const isAbsolute = _headerMode === "float";
	return (
		<HStack
			flexDirection="row"
			justifyContent="space-between"
			paddingX={5}
			paddingTop={8}
			paddingBottom={2}
			width="100%"
			position={isAbsolute ? "absolute" : undefined}
			zIndex={isAbsolute ? 999 : undefined}
			top={isAbsolute ? 0 : undefined}
			backgroundColor={"#FFFFFF"}
		>
			{/* Left section */}
			<View>{LeftSection !== undefined ? <LeftSection /> : null}</View>
			{/* Title section */}
			<Box
				// width="100%"
				// flexDirection="row"
				// alignItems="center"
				justifyContent="center"
			>
				{title !== undefined ? (
					<Text fontSize="xl" fontWeight="600" tx={title}>
						{title}
					</Text>
				) : null}
			</Box>
			{/* right section */}
			<View>{RightSection !== undefined ? <RightSection /> : null}</View>
		</HStack>
	);
}

export default function MainContainer({
	children,
	title,
	leftSection,
	rightSection,
	headerMode,
	noScroll,
}: MainContainerProps) {
	return (
		<_BaseContainer>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
			<Box
				width={"100%"}
				flex={1}
				position={headerMode === "float" ? "relative" : undefined}
				testID="MainContainer"
				backgroundColor={"#F4F6FA"}
			>
				{/* Header */}
				<ContainerHeader
					headerMode={headerMode}
					title={title}
					leftSection={leftSection}
					rightSection={rightSection}
					
				/>

				{/* Body */}
				{noScroll || false ? (
					<View flexGrow={1}>{children}</View>
				) : (
					<ScrollView
						flexGrow={1}
						showsVerticalScrollIndicator={false}
						// contentContainerStyle={{ paddingVertical: 1 }}
					>
						{children}
					</ScrollView>
				)}
			</Box>
		</_BaseContainer>
	);
}
