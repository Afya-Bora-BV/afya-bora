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

	console.log("Appointments : ", patientId)
	console.log(allAppointments)
	useEffect(() => {
		const today = (() => {
			const d = new Date();
			d.setHours(0, 0);
			return d;
		})();
		if (patientId) {
			const subscription = firestore()
				.collection("appointments")
				.where("pid", "==", patientId)
				// .where("date", ">=", today)
				// .orderBy("date", "desc")
				.onSnapshot(
					(snap) => {

						snap.forEach(async (data) => {
							const fid = data.data().fid
							if (fid) {
								const docSnap = await firestore().collection('facilities').doc(fid).get()
								if (docSnap.exists) {

									const facility = docSnap.data();
									// Use a City instance method
									const final = {
										id: data.id,
										...data.data(),
										facility
									} as Appointment
									console.log(final)
									setAllAppointments([
										...allAppointments,
										final
									])

								}
							} else {

								// TODO : to be removed since every appointment must have fid
								const final = {
									id: data.id,
									...data.data()
								} as Appointment
								setAllAppointments([
									...allAppointments,
									final
								])
							}

						})

						// setAllAppointments(
						// 	snap?.docs.map(
						// 		(doc) =>
						// 		({
						// 			...doc.data(),
						// 			id: doc.id,
						// 		} as Appointment)
						// 	)
						// );
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
			console.log("WHATS GOING ON")
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
