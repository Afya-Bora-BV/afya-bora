import React from "react";

import MedicalHistoryIcon from "../../assets/icons/MedicalHistory";
import ArrowIcon_Next from "../../assets/icons/ArrowIcon_Next";
import {
  Box,
  HStack,
  Square,
  VStack,
  View,
  Heading,
  Text,
  Icon,
} from "native-base";
import { TextPropTypes, TouchableOpacity } from "react-native";
import moment from "moment";
import { RealTimeAppointment } from "../../types";

/**
 * TODO: Upgrade this:
 *
 * Should:
 * - Know offline / online
 * - Render stuff only
 *   | Date, Name, Facility + Location (if offline, otherwise say Online),
 */

export function AppointmentAlertDoctor({
  appointment,
  onPress,
}: {
  appointment: RealTimeAppointment;
  onPress: () => void;
}) {
  if (!appointment) return null;
  return (
    // <TouchableOpacity onPress={props.onPress}>
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={5}
      rounded={20}
      shadow={2}
      bg="white"
      testID="AppointmentAlertDoctor"
    >
      {/* left */}
      <HStack space={3} flexGrow={1} justifyContent="flex-start">
        {/* Icon */}
        <Square size={8}>
          <MedicalHistoryIcon size={6} />
        </Square>
        <VStack>
          <Heading fontSize="lg" color="#000">
            {appointment.consultant.name}
          </Heading>
          <Text fontSize="sm" color="#333">
            {moment(appointment.date.seconds).format(
              "DD MMM, H:MM A"
            )}
          </Text>
          <Text fontSize="sm" fontStyle="italic" color="#333">
            {/* TODO: include facility in appointment */}
            {appointment.type === "online"
              ? "Online"
              : appointment.facility?.name}
          </Text>
        </VStack>
      </HStack>
      {/* right */}
      <View alignItems="center" flexDirection="row">
        {appointment.type === "offline" ? (
          <Text
            fontSize={15}
            color={"#561BB3"}
            onPress={() => {
              console.log("Offline facility edit");
              onPress();
            }}
          >
            Edit
          </Text>
        ) : (
          <Text
            fontSize={15}
            color={"#561BB3"}
            onPress={() => {
              console.log("Online facility edit");
              onPress();
            }}
          >
            Join/Edit
          </Text>
        )}

        <Icon size={5}>
          <ArrowIcon_Next size={5} />
        </Icon>
      </View>
    </Box>
    // </TouchableOpacity>
  );
}

export function AppointmentAlert({
  appointment,
  onPress,
}: {
  appointment: RealTimeAppointment;
  onPress: () => void;
}) {
  if (!appointment) return null;
  return (
    // <TouchableOpacity onPress={props.onPress}>
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={5}
      rounded={20}
      shadow={2}
      bg="white"
      testID="AppointmentAlert"
    >
      {/* left */}
      <HStack space={3} flexGrow={1} justifyContent="flex-start">
        {/* Icon */}
        <Square size={8}>
          <MedicalHistoryIcon size={6} />
        </Square>
        <VStack>
          <Heading fontSize="lg" color="#000">
            Dr. {appointment.consultant.name}
          </Heading>
          <Text fontSize="sm" color="#333">
            {moment.unix(appointment.date.seconds).format(
              "DD MMM, H:MM A"
            )}
          </Text>
          <Text fontSize="sm" fontStyle="italic" color="#333">
            {/* TODO: include facility in appointment */}
            {appointment.type === "online"
              ? "Online"
              : appointment.facility?.name}
          </Text>
        </VStack>
      </HStack>
      {/* right */}
      <View alignItems="center" flexDirection="row">
        {appointment.type === "offline" ? (
          <Text
            fontSize={15}
            color={"#561BB3"}
            onPress={() => {
              console.log("Offline facility edit");
              onPress();
            }}
          >
            Edit
          </Text>
        ) : (
          <Text
            fontSize={15}
            color={"#561BB3"}
            onPress={() => {
              console.log("Online facility edit");
              onPress();
            }}
          >
            Join/Edit
          </Text>
        )}

        <Icon size={5}>
          <ArrowIcon_Next size={5} />
        </Icon>
      </View>
    </Box>
    // </TouchableOpacity>
  );
}

export function UpcomingAppointmentAlert({
  appointment,
  onPress,
}: {
  appointment: RealTimeAppointment;
  onPress: () => void;
}) {
  if (!appointment) return null;
  return (
    // <TouchableOpacity onPress={props.onPress}>
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={5}
      rounded={20}
      shadow={2}
      bg="white"
      testID="UpcomingAppointmentAlert"
    >
      {/* left */}
      <HStack space={3} flexGrow={1} justifyContent="flex-start">
        {/* Icon */}
        <Square size={8}>
          <MedicalHistoryIcon size={6} />
        </Square>
        <VStack>
          <Heading fontSize="lg" color="#000">
            Dr. {appointment.consultant.name}
          </Heading>
          <Text fontSize="sm" color="#333">
            {moment(appointment.date.seconds).format(
              "DD MMM, H:MM A"
            )}
          </Text>
          <Text fontSize="sm" fontStyle="italic" color="#333">
            {/* TODO: include facility in appointment */}
            {appointment.type === "online"
              ? "Online"
              : appointment.facility?.name}
          </Text>
        </VStack>
      </HStack>
      {/* right */}
      <View alignItems="center" flexDirection="row">
        <Icon size={5} onPress={onPress}>
          <ArrowIcon_Next size={5} />
        </Icon>
      </View>
    </Box>
    // </TouchableOpacity>
  );
}

export function StatusAppointmentAlert({
  time = "",
  type = "offline",
  status = "pending"
}: {
  time: string;
  type: "offline" | "online";
  status?: "pending" | "cancelled" | "confirmed"
}) {
  console.log("Whats time ", time)
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={5}
      rounded={20}
      shadow={2}
      bg="white"
      testID="StatusAppointmentAlert"
    >
      {/* left */}
      <HStack space={3} alignSelf="flex-start">
        {/* Icon */}
        <MedicalHistoryIcon size={6} />
        <VStack space={2}>
          <Heading fontSize="lg" color="#000">
            {moment(time).format("DD MMM, H:MM A")}
          </Heading>
          <Text fontSize="sm" fontStyle="italic" color="#333">
            {TextPropTypes} Consultation
          </Text>
        </VStack>
      </HStack>

      {/* right */}
      <View alignSelf="flex-end" justifyContent="center">
        {/* TODO FIX: "Status positioning" */}
        <Box rounded={10} backgroundColor={"#A9FA0F"} padding={1.5}>
          <Text fontSize="sm" color={"#24D626"}>
            {status}
          </Text>
        </Box>
      </View>
    </Box>
  );
}
