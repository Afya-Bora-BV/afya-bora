import React from "react";
import { Box, StatusBar, View, Text, ScrollView, HStack } from "native-base";
import _BaseContainer from "./_BaseContainer";



interface ContainerHeaderProps {
	title?: string,
	headerMode?: "float" | "default",
	leftSection?: () => JSX.Element,
	rightSection?: () => JSX.Element,
}

interface MainContainerProps extends ContainerHeaderProps {
	children: JSX.Element[] | JSX.Element,
	noScroll?: boolean
}

function ContainerHeader ({ 
	title,
	headerMode,
	leftSection: LeftSection,
	rightSection: RightSection, 
}: ContainerHeaderProps) { 
	const _headerMode = headerMode || "default"
	const isAbsolute = _headerMode === "float"
	return (<HStack
		flexDirection="row"
		justifyContent="space-between"
		paddingX={5}
		paddingTop={8}
		paddingBottom={2}
		position={isAbsolute ? "absolute" : undefined }
		zIndex={isAbsolute ? 999 : undefined}
		top={isAbsolute ? 0 : undefined}
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
				width="100%"
				flexDirection="row"
				alignItems="center"
				justifyContent="center"
			>
				<Text textAlign="left" fontSize="xl" fontWeight="600">
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
	)
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
			<Box width={"100%"} flex={1} position={headerMode === "float" ? "relative" : undefined }>
				{/* Header */}
				<ContainerHeader 
					headerMode={headerMode}
					title={title}
					leftSection={leftSection}
					rightSection={rightSection} />
				
				{/* Body */}
				{
					noScroll || false ? (
						<View flexGrow={1}>
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
