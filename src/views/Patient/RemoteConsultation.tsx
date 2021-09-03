import React from "react";
import { Text } from "react-native";
import TeleHealth from "react-native-telehealth";
import firestore from "@react-native-firebase/firestore";
import type { RTCPeerConnectionConfiguration } from "react-native-webrtc";
import { TURN_URL, TURN_USERNAME, TURN_PASSWORD } from '@env';

const configuration: RTCPeerConnectionConfiguration = {
	iceServers: [
	  { urls: ['stun:stun.l.google.com:19302'] },
	  {
		urls: [TURN_URL as string],
		username: TURN_USERNAME,
		credential: TURN_PASSWORD,
	  },
	],
  };

const RemoteConsultation = () => {
	const callRef = firestore().collection("meet").doc("chatId2");

	return (
		<TeleHealth
			isPatient={false}
			isClinician={true}
			connectiongConfig={configuration}
			callRef={callRef}
		/>
		// <Text>Result</Text>
		// </Telehealth> */}
		// </GestureHandlerRootView>
	);
};

export default RemoteConsultation;
