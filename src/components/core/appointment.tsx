import React from 'react'

import MedicalHistoryIcon from "../../assets/icons/MedicalHistory";
import ArrowIcon_Next from "../../assets/icons/ArrowIcon_Next";
import { Box, HStack, Square, VStack, View, Heading, Text, Icon } from 'native-base'
import { IconContainer } from '../misc';

/**
 * TODO: Upgrade this:
 * 
 * Should:
 * - Know offline / online
 * - Render stuff only 
 *   | Date, Name, Facility + Location (if offline, otherwise say Online), 
 */
export function AppointmentAlert (/*{ consultant, appointmentDate, facility }*/) {
	return (
		<Box 
			flex={1} 
			flexDirection="row" 
			justifyContent="space-between"
			alignItems="center"
			padding={5} 
			rounded={20}
			shadow={2}
		>
			{/* left */}
			<HStack space={3} flexGrow={1} justifyContent="flex-start">
				{/* Icon */}
				<Square size={8}>
					<MedicalHistoryIcon size={6} />
				</Square>
				<VStack>
					<Heading fontSize="lg" color="#000">Dr. Mohamedali</Heading>
					<Text fontSize="sm" color="#333">13 July, 14:30 PM</Text>
					<Text fontSize="sm" fontStyle="italic" color="#333">Aga Khan Hospital, Arusha</Text>
				</VStack>
			</HStack>
			{/* right */}
			<View alignItems="center" flexDirection="column">
				<Text>Edit</Text>
                <Icon size={4}>
                    <ArrowIcon_Next size={4}/>
                </Icon>
			</View>
		</Box>
	)
}

export function StatusAppointmentAlert (/*{ consultant, appointmentDate, facility }*/) {
	// <VStack>
// 			<HStack
// 				justifyContent="space-between"
// 				alignItems="center"
// 				shadow={2}
// 				rounded={10}
// 				bg="white"
// 				p={4}
// 			>
// 				<VStack>
// 					<HStack
// 						justifyContent="space-between"
// 						alignItems="center"
// 						space={4}
// 					>
// 						<MedicalHistoryIcon />
// 						<VStack>
// 							{/* TODO: specify the correct time for appointment */}

// 							<HStack>
// 								<Text bold color="#747F9E">
// 									{friendlyFormatDate(date) + ", "}
// 								</Text>
// 								<Text bold color="#747F9E">
// 									{timeSlots[0]}
// 								</Text>
// 							</HStack>
// 							{/* TO DO - CHANGE TO SHOW STATUS */}
// 							<Text italic>Online Consultation</Text>
// 						</VStack>
// 					</HStack>
// 				</VStack>
// 				<Stack rounded={10} backgroundColor={"#A9FA0F"} padding={1.5}>
// 					<Text fontSize={12} color={"#24D626"}>
// 						Confirmed
// 					</Text>
// 				</Stack>
// 			</HStack>
// 		</VStack>
	return (
		<HStack 
			justifyContent="space-between"
			alignItems="center"
			padding={5}
			rounded={20}
			shadow={2}
		>
			{/* left */}
			<HStack space={3} alignSelf="flex-start">
				{/* Icon */}
				<MedicalHistoryIcon size={6} />
				<VStack space={2}>
					<Heading fontSize="lg" color="#000">13 July, 14:30 PM</Heading>
					<Text fontSize="sm" fontStyle="italic" color="#333">Online Consultation</Text>
				</VStack>
			</HStack>

			{/* right */}
			<View alignSelf="flex-end" justifyContent="center">
				{/* TODO FIX: "Status positioning" */}
				<Box rounded={10} backgroundColor={"#A9FA0F"} padding={1.5}>
					<Text fontSize="sm" color={"#24D626"}>
						Confirmed
					</Text>
				</Box>
			</View>
		</HStack>
		
	)
}

