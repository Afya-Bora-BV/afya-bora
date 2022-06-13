// import {Localization} from "expo-localization"
// import i18n from "i18n-js"
// import en from "./en.json"
// import sw from "./sw.json"

// i18n.fallbacks = true
// i18n.defaultLocale = 'en'
// i18n.translations = { en, sw }

// i18n.locale = Localization.locale || "en"

// /**
//  * Builds up valid keypaths for translations.
//  * Update to your default locale of choice if not English.
//  */
// type DefaultLocale = typeof en
// export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

// type RecursiveKeyOf<TObj extends Record<string, any>> = {
//   [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
//     ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
//     : `${TKey}`
// }[keyof TObj & string]

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import * as Localization from "expo-localization";
import * as RNLocalize from "react-native-localize";

import en from "./en.json";
import sw from "./sw.json";

export const resources = {
	en: { translation: { ...en } },
	sw: { translation: { ...sw } },
} as const;

const languageDetector = {
	type: "languageDetector",
	async: true, // flags below detection to be async
	detect: (callback) => {
		return new Promise((resolve, reject) => {
			const { languageTag } = RNLocalize.findBestAvailableLanguage(
				Object.keys(resources)
			) || { languageTag: "en" };
			resolve(languageTag);
		}).then((language) => callback(language));
		// return /*'en'; */ Localization.getLocalizationAsync().then(
		// 	({ locale }) => {
		// 		callback(locale);
		// 	}
		// );
	},
	init: () => {},
	cacheUserLanguage: () => {},
};

i18n.use(languageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		// lng: Localization.locale || "en",
		lng: RNLocalize.getLocales()[0].languageCode || "en",
		resources,
		// ns: ["common"],
		// defaultNS: "common",
	});

// =================

// const translations = { en, sw };

const { languageTag } = RNLocalize.findBestAvailableLanguage(
	Object.keys(resources)
) || { languageTag: "en" };

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
// const languageDetector = {
// 	type: "languageDetector",
// 	async: true, // flags below detection to be async
// 	detect: (callback) => {
// 		return /*'en'; */ Localization.getLocalizationAsync().then(
// 			({ locale }) => {
// 				callback(locale);
// 			}
// 		);
// 	},
// 	init: () => {},
// 	cacheUserLanguage: () => {},
// };

// i18n.use(languageDetector)
// 	.use(reactI18nextModule)
// 	.init({
// 		fallbackLng: "en",

// 		resources: {
// 			en: {
// 				home: {
// 					title: "Welcome",
// 					introduction:
// 						"This text comes from i18next and is provided in english.",
// 				},
// 				page2: {
// 					title: "Page 2",
// 					introduction: "This text on page two.",
// 				},
// 				common: {
// 					currentLanguage: 'The current language is "{{lng}}"',
// 					actions: {
// 						toggleToGerman: "Deutsch",
// 						toggleToEnglish: "English",
// 						goToPage2: "Open page 2",
// 					},
// 					infoText:
// 						"<0><0>Eins </O><1>Zwei </1><2>Drei </2><3>Vier </3><4>Fünf</4></O>",
// 				},
// 			},
// 			de: {
// 				home: {
// 					title: "Willkommen",
// 					introduction:
// 						"Dieser Text ist von i18next und ist in deutsch.",
// 				},
// 				page2: {
// 					title: "Seite 2",
// 					introduction: "Text auf Seite 2",
// 				},
// 				common: {
// 					currentLanguage: 'Die Sprache ist auf "{{lng}}" gesetzt',
// 					actions: {
// 						toggleToGerman: "Deutsch",
// 						toggleToEnglish: "English",
// 						goToPage2: "Öffne Seite 2",
// 					},
// 				},
// 			},
// 		},

// 		// have a common namespace used around the full app
// 		ns: ["common"],
// 		defaultNS: "common",

// 		debug: true,

// 		// cache: {
// 		//   enabled: true
// 		// },

// 		interpolation: {
// 			escapeValue: false, // not needed for react as it does escape per default to prevent xss!
// 		},
// 	});

export default i18n;
