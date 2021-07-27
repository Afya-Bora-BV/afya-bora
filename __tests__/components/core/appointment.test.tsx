import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View } from "native-base";
import {
	AppointmentAlert,
	AppointmentAlertDoctor,
	StatusAppointmentAlert,
	UpcomingAppointmentAlert,
} from "../../../src/components/core/appointment";

describe("Appointment Views", () => {
	const dummyClick = () => {};

	const DummyConsultant = {
		id: "string;",
		uid: "Uid;",
		identifier: "string;",
		name: "string;",
		gender: "male",
		email: "string;",
		residence: "string;",
		rating: 4,
		ratedBy: 123,
		clinicianType: "string;",
		specialities: "string[];",
	};

	const DummyAppointment = {
		cid: "string;",
		consultant: DummyConsultant,
		aboutVisit: {
			complaint: "string;",
			symptoms: ["string[]", "asdbasf"],
		},
		facilityId: "string;",
		type: "offline",
		pid: "string;",
		createdAt: {
			seconds: 1826439754692,
			nanoseconds: 1546576774563452,
		},
		date: {
			seconds: 23456790987,
			nanoseconds: 12353446657,
		},
	};
	test("Appointment Alert Doctor", () => {
		expect(AppointmentAlertDoctor(DummyAppointment, dummyClick)).toBeDefined();
	});

	test("Appointment Alert", () => {
		expect(AppointmentAlert(DummyAppointment, dummyClick)).toBeDefined();
	});

	test("UpcomingAppointmentAlert", () => {
		expect(
			UpcomingAppointmentAlert(DummyAppointment, dummyClick)
		).toBeDefined();
	});

	test("StatusAppointmentAlert", () => {
		expect(StatusAppointmentAlert("1234253", "offline")).toBeDefined();
	});
});
