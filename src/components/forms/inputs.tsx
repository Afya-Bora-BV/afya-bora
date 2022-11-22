import React from "react";
import { Stack, Spacer, Input } from "native-base";
import { useController, Controller } from "react-hook-form";
import {Text} from '../text'
/**
 * Input form that uses react controller
 */
export function ControllerFormInput({
	label,
	keyboardType,
	control,
	name,
	text,
	...inputProps
}: any & {
	text?: string
}) {
	// console.log({ others })
	const {
		formState: { errors },
	} = useController({ name, control });

	return (
		<Stack testID="ControllerFormInput">
			<Text tx={text}>{label}</Text>
			<Spacer size={2} />
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						rounded={4}
						value={value}
						onBlur={onBlur}
						onChangeText={onChange}
						outlineColor={errors[name] ? "red" : ""}
						variant="rounded"
						autoCapitalize={"none"}
						{...inputProps}
						placeholder={label}
						keyboardType={keyboardType}
					/>
				)}
				name={name}
				rules={{ required: true }}
				defaultValue=""
			/>
		</Stack>
	);
}
