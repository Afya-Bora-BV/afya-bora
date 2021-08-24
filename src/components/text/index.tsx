import * as React from "react";
import {
	TextProps as TextProperties,
	StyleProp,
	TextStyle,
} from "react-native";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { Text as NativeBaseText } from "native-base";
// import { presets } from "./text.presets";
// import { TextProps } from "./text.props";
import { translate } from "../../i18n";
import { languageAtom } from "../../store/atoms";

type TextPresets = {
	[key: string]: any;
};

interface TextProps extends TextProperties {
	/**
	 * Children components.
	 */
	children?: React.ReactNode;

	/**
	 * Text which is looked up via i18n.
	 */
	tx?: TxKeyPath;

	/**
	 * Optional options to pass to i18n. Useful for interpolation
	 * as well as explicitly setting locale or translation fallbacks.
	 */
	// txOptions?: i18n.TranslateOptions;

	/**
	 * The text to display if not using `tx` or nested components.
	 */
	text?: string;

	/**
	 * An optional style override useful for padding & margin.
	 */
	style?: StyleProp<TextStyle>;

	/**
	 * One of the different types of text presets.
	 */
	preset?: TextPresets;
}

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in Native Base one.
 */
export function Text(props: TextProps) {
	// grab the props
	const {
		preset = "default",
		tx,
		txOptions,
		text,
		children,
		style: styleOverride,
		...rest
	} = props;

	// grab the language
	const [language, _] = useAtom(languageAtom);
	console.log("Input language  : ", language)
	const { t, i18n } = useTranslation([language, "en", "sw"], { useSuspense: false });

	// figure out which content to use
	const i18nText = i18n.t(tx); // tx && translate(tx, txOptions);
	const content = i18nText || text || children;

	return (
		<NativeBaseText {...rest} style={styleOverride}>
			{content}
		</NativeBaseText>
	);
}
