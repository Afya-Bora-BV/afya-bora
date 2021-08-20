import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import appointment from "../store/slices/appointment";

// FIXME: Add type annotation
function usePatientAppointments(patientId: string | undefined) {
	const [allAppointments, setAllAppointments] = useState([]);

	console.log("PID : ",patientId)
	useEffect(() => {
		if (patientId) {
			const subscription = firestore()
				.collection("appointments")
				.where("patient.id", "==", patientId)
				.orderBy("date", "desc")
				.onSnapshot(
					(snap) => {
						setAllAppointments(
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

	const appointments = allAppointments.filter((appointment: any) => (appointment.status !== "rejected")).filter((appointment:any)=>(appointment.status!=="cancelled"))
	return { appointments };
}

export { usePatientAppointments };
