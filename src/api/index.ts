import functions from "@react-native-firebase/functions";

export const getFacilities = async (): Promise<any> => {
	const result = await functions().httpsCallable("getFacilities")({});

	if (result && result.data) {
		return result.data;
	}

	// FIXME: potentially just return the error
	console.log("Error: Unable to get list of facilities");
	return { count: 0, data: [] };
};
