import { Box, HStack, ScrollView, Stack, Text } from "native-base";
import React from "react";
import { PrimaryButton } from "../components/button";
import { HeaderwithBack } from "../components/header";
import { Spacer } from "../components/Spacer";
import { Number } from "../components/textFields";
import { colors } from "../contants/colors";

const Verify = () => {
	return (
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
					<HeaderwithBack head="Verify Your Number" nav={() => {}} />
				</Stack>

				<Stack alignItems="center">
					<Box bg="white" shadow={2} rounded="lg" width="90%">
						<Stack paddingBottom={10}>
							<Spacer size={20} />

							<Stack style={{ paddingHorizontal: 25 }}>
								<Text style={{ justifyContent: "center" }}>
									Enter the verification number that was sent
									to your phone recently
								</Text>
							</Stack>
							<Spacer size={30} />
							<HStack
								justifyContent={"space-between"}
								style={{ paddingHorizontal: 30 }}
							>
								<Number />
								<Number />
								<Number />
								<Number />
							</HStack>
						</Stack>
						<Box mb={-10}>
							<PrimaryButton text={"Confirm"} press={() => {}} />
						</Box>
					</Box>
				</Stack>
			</Stack>
			<Stack alignItems="center">
				<Text color="#2AD3E7">Resend (00:39)</Text>
			</Stack>
		</ScrollView>
	);
};

export default Verify;