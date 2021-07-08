import { Box, ScrollView, Stack } from "native-base";
import React from "react";
import { PrimaryButton } from "../components/button";
import { Header, HeaderwithBack } from "../components/header";
import { TextInput } from "../components/textFields";
import { colors } from "../contants/colors";

const SignUp = () => {
	return (
		<Stack>
			<ScrollView>
				<Stack
					backgroundColor={colors.primary}
					borderBottomRadius={40}
					height={"80%"}
					position="absolute"
					top={0}
					left={0}
					right={0}
				></Stack>
				<Stack paddingBottom={10}>
					<Stack
						alignItems="center"
						style={{ paddingVertical: 80, paddingLeft: 25 }}
					>
						<HeaderwithBack head="Sign up" nav={() => {}} />
					</Stack>

					<Stack alignItems="center">
						<Box bg="white" shadow={2} rounded="lg" width="90%">
							<Stack
								style={{
									paddingHorizontal: 20,
									paddingTop: 10,
									paddingBottom: 40,
								}}
							>
								<TextInput
									holderText={"Email or Phone Number"}
								/>
							</Stack>
							<Box mb={-10}>
								<PrimaryButton
									text={"Confirm"}
									press={() => {}}
								/>
							</Box>
						</Box>
					</Stack>
				</Stack>
			</ScrollView>
		</Stack>
	);
};

export default SignUp;
