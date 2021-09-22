import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
import _ from "lodash";

export function toggleStringFromList(text: string, list: string[]): string[] {
	if (list.includes(text)) {
		return list.filter((t) => t !== text);
	}
	return [...list, text];
}

export const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export function friendlyFormatDate(timeStamp: Date | string | number) {
	const dateObj = new Date(timeStamp);
	const d = new Date();
	const date = dateObj.getDate();
	const month = dateObj.getMonth();
	const year = dateObj.getFullYear();
	const monthName = MONTH_NAMES[d.getMonth()];

	return `${date} ${monthName}`;
}

/**
 * Update the current users messaging token that is stored in firestore.
 *
 * @export
 * @param {string} userId
 * @return {*} 
 */
export function updateDeviceMessagingToken(userId: string) {
	messaging().onTokenRefresh;
	return messaging()
		.getToken()
		.then(async (res) => {
			console.log(res, userId);
			const serverTimestamp = firestore.FieldValue.serverTimestamp();
			const dateTimestamp = new Date().getTime();

			const docRef = firestore()
				.collection("messaging-device-keys")
				.doc(userId);

			const document = await docRef.get();

			if (document.exists) {
				const { tokens } = document.data();

				// check that the current token doesnt already exist
				const exists = _.values(tokens).includes(res);

				if (exists) {
					return;
				}
				const tokenPath = `tokens.${dateTimestamp}`;

				return docRef.update({
					[tokenPath]: res,
				});
			}
			return firestore()
				.collection("messaging-device-keys")
				.doc(userId)
				.set({
					uid: userId,
					// [dateTimestamp]: res,
					tokens: {
						[dateTimestamp]: res,
					},
					updatedAt: serverTimestamp,
				});
		})
		.catch((error) => {
			console.log(error);
		});
}
