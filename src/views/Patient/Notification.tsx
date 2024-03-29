import { useNavigation } from "@react-navigation/native";
import {
	ArrowBackIcon,
	Box,
	Icon,
	Pressable,
	Spacer,
	Stack,
	Text,
} from "native-base";
import React from "react";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import BellIcon_Red from "../../assets/icons/BellIcon_Red";

const NotificationScreen = () => {
	const navigation = useNavigation();
	return (
		<MainContainer
			//TO DO : FIND A WAY TO ALIGN TEXT NEATLY
			title="Notification            "
			leftSection={
				// Go back if can go back
				navigation.canGoBack()
					? () => (
							<Pressable onPress={() => navigation.goBack()}>
								<IconContainer>
									<ArrowBackIcon size={6} color="#561BB3" />
								</IconContainer>
							</Pressable>
					  )
					: undefined
			}
		>
			<Spacer size={10}/>
			<Stack paddingBottom={10} alignItems="center" testID="NotificationScreen">
				<Box bg="white" shadow={2} rounded={10} width="90%">
					<Box
						position="absolute"
						top={-20}
						left={0}
						right={0}
						width="100%"
						paddingX={5}
					>
						<Icon size={10}>
							<BellIcon_Red size={10}/>
						</Icon>
					</Box>
					<Spacer size={5}/>
					<Stack padding={5}>
						<Text fontSize="xl" bold>
							The doctor has ended his consultation
						</Text>
						<Spacer size={2} />
						<Text color="#747F9E">
							Your consultation is timed and finished, please rate
							us so we can serve you better!
						</Text>
					</Stack>
				</Box>
			</Stack>
		</MainContainer>
	);
};

export default NotificationScreen;
