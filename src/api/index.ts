import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";

export const getFacilities = async (): Promise<any> => {
	const result = await functions().httpsCallable("getFacilities")({});

	if (result && result.data) {
		return result.data;
	}

	// FIXME: potentially just return the error
	console.log("Error: Unable to get list of facilities");
	return { count: 0, data: [] };
};

/**
 * Checks whether a user has the a patients profile or not
 * @param uid
 * @return boolean
 */
export const userHasProfile = async (uid: string): Promise<boolean> => {
	const profile = await firestore().collection("patients").doc(uid).get();
	return profile.exists;
};
