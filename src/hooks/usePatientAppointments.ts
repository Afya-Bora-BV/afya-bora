import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Appointment } from "../types";
import moment from "moment";

type PatientAppointments = {
	appointments: Appointment[];
	generalAppointments: Appointment[];
	loading: boolean;
};

function usePatientAppointments(
	patientId: string | undefined
): PatientAppointments {
	const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {

		if (patientId) {
			const subscription = firestore()
				.collection("appointments")
				.where("pid", "==", patientId)
				// .where("date", ">=", today)
				.orderBy("date", "asc")
				.onSnapshot(
					async (snap) => {

						var results: Appointment[] = await Promise.all(snap.docs.map(async (data): Promise<Appointment> => {
							const fid = data.data().fid
							if (fid) {

								const docSnap = await firestore().collection('facilities').doc(fid).get()
								if (docSnap.exists) {
									const facility = docSnap.data();
									const final = {
										id: data.id,
										...data.data(),
										facility
									} as Appointment
									return final
								} else {
									// TODO : to be removed since every appointment must have fid
									const final = {
										id: data.id,
										...data.data(),
									} as Appointment
									return final
								}
							} else {
								const final = {
									id: data.id,
									...data.data(),
								} as Appointment
								return final
							}
						}));
						setAllAppointments([
							...results,
						])


						setLoading(false);
					},
					(error) => {
						console.log("Error: ");
						console.log(error);
						setLoading(false);
					}
				);
			return () => subscription();
		} else {
			// console.log("WHATS GOING ON")
		}
	}, [patientId]);


	const appointments = allAppointments
		.filter((appointment: any) => appointment.status !== "rejected")
		.filter((appointment: any) => appointment.status !== "cancelled")
		.filter((appointment: Appointment) => moment(appointment.date.toDate()).isSameOrAfter(moment(),"day"))

	const generalAppointments = allAppointments;
	return {
		appointments: appointments,
		generalAppointments,
		loading,
	};
}

export { usePatientAppointments };
