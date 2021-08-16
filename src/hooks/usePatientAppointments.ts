import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

// FIXME: Add type annotation
function usePatientAppointments(patientId: string | undefined) {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		if (patientId) {
			const subscription = firestore()
				.collection("appointments")
				.where("patient.uid", "==", patientId)
				.orderBy("date", "desc")
				.onSnapshot(
					(snap) => {
						setAppointments(
							snap?.docs.map((doc) => ({
								...doc.data(),
								id: doc.id,
							}))
						);
					},
					(error) => {
						console.log("Error: ");
						console.log(error);
					}
				);
			return () => subscription();
		}
	}, [patientId]);

	return { appointments };
}

export { usePatientAppointments };
