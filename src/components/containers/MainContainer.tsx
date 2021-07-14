import React from 'react'
import { Box, StatusBar, View, Text, ScrollView } from 'native-base';
import _BaseContainer from "./_BaseContainer";


export default function MainContainer ({ children, title, leftSection: LeftSection, rightSection: RightSection }: any) {
	return (
		<_BaseContainer>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
			<Box width={"100%"} flex={1}>
				{/* Header */}
				<View flexDirection="row" justifyContent="space-between" paddingX={5} paddingY={8}>
					{ LeftSection !== undefined ?  (
						<View>
							<LeftSection />
						</View>
					) : null }
					<View flexGrow={1} width="100%" flexDirection="row" alignItems="center" justifyContent="center">
						<Text fontSize="xl">{title}</Text>
					</View>
					{ RightSection !== undefined ?  (
						<View>
							<RightSection />
						</View>
					) : null }
				</View>
				{/* Body */}
				<ScrollView flexGrow={1}>
					{ children }
				</ScrollView>
			</Box>
		</_BaseContainer>
	)
}