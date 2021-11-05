import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Appointment } from "../types";

type PatientAppointments = {
	appointments: Appointment[];
	generalAppointments: Appointment[];
	loading: boolean;
};

// FIXME: Add type annotation
function usePatientAppointments(
	patientId: string | undefined
): PatientAppointments {
	const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const today = (() => {
			const d = new Date();
			d.setHours(0, 0);
			return d;
		})();
		if (patientId) {
			const subscription = firestore()
				.collection("appointments")
				.where("patient.id", "==", patientId)
				.where("date", ">=", today)
				.orderBy("date", "desc")
				.onSnapshot(
					(snap) => {
						setAllAppointments(
							snap?.docs.map(
								(doc) =>
									({
										...doc.data(),
										id: doc.id,
									} as Appointment)
							)
						);
						setLoading(false);
					},
					(error) => {
						console.log("Error: ");
						console.log(error);
						setLoading(false);
					}
				);
			return () => subscription();
		}
	}, [patientId]);

	const appointments = allAppointments
		.filter((appointment: any) => appointment.status !== "rejected")
		.filter((appointment: any) => appointment.status !== "cancelled");

	const generalAppointments = allAppointments;
	return {
		appointments: appointments.reverse(),
		generalAppointments,
		loading,
	};
}

export { usePatientAppointments };
