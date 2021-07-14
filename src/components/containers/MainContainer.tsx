import React from 'react'
import { Box, StatusBar, View } from 'native-base';
import _BaseContainer from "./_BaseContainer";


export default function MainContainer ({ children, title, leftSection: LeftSection, rightSection: RightSection }: any) {
	return (
		<_BaseContainer>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
			<Box width={"100%"} flex={1}>
				{/* Header */}
				<View flexDirection="row" paddingX={5} paddingY={3}>
					{ LeftSection !== undefined ?  <LeftSection /> : null }
					<View flexGrow={1} flexDirection="row">
						{title}
					</View>
					{ RightSection !== undefined ?  <RightSection /> : null }
				</View>
				{/* Body */}
				<View>
					{ children }
				</View>
			</Box>
		</_BaseContainer>
	)
}