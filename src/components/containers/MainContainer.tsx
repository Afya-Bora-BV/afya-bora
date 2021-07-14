import React from 'react'
import { Box, StatusBar, View, Text, ScrollView, HStack } from 'native-base';
import _BaseContainer from "./_BaseContainer";


export default function MainContainer ({ children, title, leftSection: LeftSection, rightSection: RightSection }: any) {
	return (
		<_BaseContainer>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
			<Box width={"100%"} flex={1}>
				{/* Header */}
				<HStack flexDirection="row" justifyContent="space-between" paddingX={5} paddingY={8}>
					{/* Left section */}
					{ LeftSection !== undefined ?  (
						<View>
							<LeftSection />
						</View>
					) : null }
					{/* Title section */}
					{
						title !== undefined ? (
							<Box width="100%" flexDirection="row" alignItems="center" justifyContent="center">
								<Text fontSize="xl">{title}</Text>
							</Box>
						) : null
					}
					{/* right section */}
					{ RightSection !== undefined ?  (
						<View>
							<RightSection />
						</View>
					) : null }
				</HStack>
				{/* Body */}
				<ScrollView flexGrow={1} showsVerticalScrollIndicator={false}>
					{ children }
				</ScrollView>
			</Box>
		</_BaseContainer>
	)
}