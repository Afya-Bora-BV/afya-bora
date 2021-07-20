import React from 'react';

import MedicalHistoryIcon from '../../assets/icons/MedicalHistory';
import ArrowIcon_Next from '../../assets/icons/ArrowIcon_Next';
import {
  Box,
  HStack,
  Square,
  VStack,
  View,
  Heading,
  Text,
  Icon,
} from 'native-base';
import { TouchableOpacity } from 'react-native';

/**
 * TODO: Upgrade this:
 *
 * Should:
 * - Know offline / online
 * - Render stuff only
 *   | Date, Name, Facility + Location (if offline, otherwise say Online),
 */

export function AppointmentAlert({ appointment }: { appointment: Appointment }) {
  if (!appointment) return null
  return (
    // <TouchableOpacity onPress={props.onPress}>
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={5}
      rounded={20}
      shadow={2}
      bg="white">
      {/* left */}
      <HStack space={3} flexGrow={1} justifyContent="flex-start">
        {/* Icon */}
        <Square size={8}>
          <MedicalHistoryIcon size={6} />
        </Square>
        <VStack>
          <Heading fontSize="lg" color="#000">
            {"Do Doctor "}
          </Heading>
          <Text fontSize="sm" color="#333">
            {appointment.appointment.date.seconds.toString()}
          </Text>
          <Text fontSize="sm" fontStyle="italic" color="#333">
            {/* TODO: include facility in appointment */}
            {appointment.type === "online" ? "Online" : "Facility Name"}
          </Text>
        </VStack>
      </HStack>
      {/* right */}
      <View alignItems="center" flexDirection="row">
        {appointment.type === "offline" ?
          <Text fontSize={15} color={'#561BB3'} onPress={() => {
            console.log("Offline facility edit")
          }}>
            Edit
          </Text>
          :
          <Text fontSize={15} color={'#561BB3'} onPress={() => {
            console.log("Online facility edit")
          }}>
            Join/Edit
          </Text>
        }


        <Icon size={5}>
          <ArrowIcon_Next size={5} />
        </Icon>
      </View>
    </Box>
    // </TouchableOpacity>
  );
}

export function StatusAppointmentAlert(/*{ consultant, appointmentDate, facility }*/) {
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
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={5}
      rounded={20}
      shadow={2}
      bg="white"
    >
      {/* left */}
      <HStack space={3} alignSelf="flex-start">
        {/* Icon */}
        <MedicalHistoryIcon size={6} />
        <VStack space={2}>
          <Heading fontSize="lg" color="#000">
            13 July, 14:30 PM
          </Heading>
          <Text fontSize="sm" fontStyle="italic" color="#333">
            Online Consultation
          </Text>
        </VStack>
      </HStack>

      {/* right */}
      <View alignSelf="flex-end" justifyContent="center">
        {/* TODO FIX: "Status positioning" */}
        <Box rounded={10} backgroundColor={'#A9FA0F'} padding={1.5}>
          <Text fontSize="sm" color={'#24D626'}>
            Confirmed
          </Text>
        </Box>
      </View>
    </Box>
  );
}
