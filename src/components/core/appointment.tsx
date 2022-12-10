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
} from "native-base";
import { TextPropTypes, TouchableOpacity } from "react-native";
import moment from "moment";
import { RealTimeAppointment } from "../../types";
import { useNavigation } from "@react-navigation/core";
import { HomeNavKey } from "../../views/Patient";
import { colors } from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "../text";
import _ from "lodash";


export function AppointmentAlert({
  appointment,
}: {
  appointment: any
}) {
  const navigation = useNavigation()
  const openAppointment = (appointment: any) => {
    navigation.navigate(HomeNavKey.AppointmentInfo, { appointment });
  };

  if (!appointment) return null;
  return (
    <View
    >
      <Box
        bgColor="#FFF"
        p={4}
        flexDirection="row"
        borderRadius={8}
        shadow={3}
      >
        <View flex={1.4}>
          <Icon
            size={32}
            color={colors.primary}
            name="calendar-month-outline"
          />
        </View>
        <VStack flex={5} space={1}>
          <Text fontSize="md" fontWeight="bold">
            {appointment?.facility?.name}
            {/* {appointment?.fid} */}
          </Text>
          <Text
            fontWeight="bold"
            color="gray.400"
          >
            {moment(appointment.utcDate).format(
              "DD MMMM YYYY"
            )}
          </Text>
          <Text
            color={
              appointment?.status === "accepted" ? "#24D626" :
                null
            }
          >
            {appointment?.status}
          </Text>
          <Text
            tx={
              appointment.type === "online"
                ? "common.online"
                : "common.atFacility"
            }
          >
            {appointment.type === "online"
              ? "Online"
              : "At Facility"}
          </Text>
        </VStack>
        <View flex={2.2} justifyContent="center">
          <TouchableOpacity
            onPress={() => openAppointment(appointment)}
          >
            <HStack space={1}>
              <Text
                color={colors.primary}
                fontSize="lg"
                tx="common.join"
              >
                Join
              </Text>
              <Text
                color={colors.primary}
                fontSize="md"
              // tx="common.join"
              >
                /
              </Text>

              <Text
                color={colors.primary}
                fontSize="lg"
                tx="common.edit"
              >
                Edit
              </Text>

            </HStack>

          </TouchableOpacity>

        </View>
      </Box>
    </View>
  );
}

export function StatusAppointmentAlert({
  time = "",
  hours = "",
  type = "offline",
  status = "pending"
}: {
  time: string;
  type: "offline" | "online";
  status?: "pending" | "cancelled" | "accepted";
  hours: string
}) {
  console.log("Whats time ", time)
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={5}
      borderRadius={8}
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
            {moment(time).format("ddd, DD MMM YYYY")}
          </Heading>
          {status === "accepted" && <Text >Time : {hours}</Text>}
          <Text 
            tx={
              type === "online"
                ? "common.online"
                : "common.atFacility"
            }
          >
            {type === "online"
              ? "Online"
              : "At Facility"}
          </Text>

        </VStack>
      </HStack>

      {/* right */}
      <View alignSelf="flex-end" justifyContent="center">
        {/* TODO FIX: "Status positioning" */}
        <Box borderRadius={"md"} backgroundColor={status === "accepted" ? "#e9fbe9" : "#ffdede"} px={6} py={2}>
          <Text fontSize="sm" color={status === "accepted" ? "#3ada3c" : "#ff5a5b"}>
            {_.upperFirst(status)}
          </Text>
        </Box>
      </View>
    </Box>
  );
}
